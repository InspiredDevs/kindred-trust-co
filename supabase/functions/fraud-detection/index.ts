import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { event, userId, data } = await req.json()

    // Fraud detection rules
    const riskScore = await calculateRiskScore(event, userId, data, supabase)
    
    if (riskScore > 80) {
      // High risk - auto-flag
      await createFraudSignal(userId, event, riskScore, data, supabase)
      
      // Auto-suspend if critical
      if (riskScore > 95) {
        await suspendUser(userId, supabase)
      }
    }

    return new Response(
      JSON.stringify({ riskScore, action: riskScore > 80 ? 'flagged' : 'approved' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Fraud detection error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})

async function calculateRiskScore(event: string, userId: string, data: any, supabase: any): Promise<number> {
  let score = 0

  // Check for multiple accounts from same IP/device
  if (event === 'signup') {
    const { data: duplicates } = await supabase
      .from('profiles')
      .select('id')
      .neq('user_id', userId)
      .like('verification_status', `%${data.ip}%`)
    
    if (duplicates && duplicates.length > 2) score += 40
  }

  // Check account age for GitHub/Figma verification
  if (event === 'github_verification') {
    const accountAge = new Date().getTime() - new Date(data.created_at).getTime()
    const monthsOld = accountAge / (1000 * 60 * 60 * 24 * 30)
    
    if (monthsOld < 3) score += 60 // Account too new
    if (!data.recent_activity) score += 30 // No recent activity
  }

  return Math.min(score, 100)
}

async function createFraudSignal(userId: string, signalType: string, riskScore: number, details: any, supabase: any) {
  await supabase
    .from('fraud_signals')
    .insert({
      user_id: userId,
      signal_type: signalType,
      risk_score: riskScore,
      details: details,
      is_resolved: false
    })
}

async function suspendUser(userId: string, supabase: any) {
  await supabase
    .from('profiles')
    .update({ is_active: false })
    .eq('user_id', userId)
}