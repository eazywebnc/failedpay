'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import {
  Settings,
  CreditCard,
  Mail,
  Clock,
  Link2,
  Loader2,
  Crown,
  Zap,
  Trash2,
} from 'lucide-react'
import type { FPSettings, FPAccount } from '@/lib/types'

export default function SettingsPage() {
  const [settings, setSettings] = useState<FPSettings | null>(null)
  const [accounts, setAccounts] = useState<FPAccount[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [upgrading, setUpgrading] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    async function load() {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const [settingsRes, accountsRes] = await Promise.all([
        supabase.from('fp_settings').select('*').eq('user_id', user.id).single(),
        supabase.from('fp_accounts').select('*').eq('user_id', user.id),
      ])

      if (settingsRes.data) setSettings(settingsRes.data)
      if (accountsRes.data) setAccounts(accountsRes.data)
      setLoading(false)
    }
    load()
  }, [])

  async function saveSettings() {
    if (!settings) return
    setSaving(true)
    await supabase
      .from('fp_settings')
      .update({
        auto_retry: settings.auto_retry,
        retry_schedule: settings.retry_schedule,
        dunning_enabled: settings.dunning_enabled,
      })
      .eq('id', settings.id)
    setSaving(false)
  }

  async function handleUpgrade(plan: 'pro' | 'business') {
    setUpgrading(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      })
      const { url } = await res.json()
      if (url) window.location.href = url
    } catch {
      setUpgrading(false)
    }
  }

  async function removeAccount(accountId: string) {
    await supabase.from('fp_accounts').delete().eq('id', accountId)
    setAccounts(accounts.filter((a) => a.id !== accountId))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
      </div>
    )
  }

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Settings className="w-8 h-8 text-emerald-500" />
          Settings
        </h1>
        <p className="text-zinc-400 mt-1">
          Manage your recovery preferences and subscription
        </p>
      </div>

      {/* Plan Info */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Crown className="w-5 h-5 text-emerald-500" />
            <h2 className="text-lg font-semibold">Current Plan</h2>
          </div>
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-emerald-500/10 text-emerald-400 capitalize">
            {settings?.plan || 'free'}
          </span>
        </div>
        <p className="text-zinc-400 text-sm mb-4">
          {settings?.recovery_limit
            ? `${settings.recovery_limit} recovery attempts/mo`
            : 'Unlimited recovery attempts'}{' '}
          ·{' '}
          {settings?.accounts_limit
            ? `${settings.accounts_limit} connected account${settings.accounts_limit > 1 ? 's' : ''}`
            : 'Unlimited accounts'}
        </p>
        {settings?.plan !== 'business' && (
          <div className="flex gap-3">
            {settings?.plan === 'free' && (
              <button
                onClick={() => handleUpgrade('pro')}
                disabled={upgrading}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-medium text-sm hover:from-emerald-600 hover:to-green-700 transition-all disabled:opacity-50"
              >
                <Zap className="w-4 h-4" />
                Upgrade to Pro — $29/mo
              </button>
            )}
            <button
              onClick={() => handleUpgrade('business')}
              disabled={upgrading}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-emerald-500/30 text-emerald-400 font-medium text-sm hover:bg-emerald-500/10 transition-all disabled:opacity-50"
            >
              <Crown className="w-4 h-4" />
              {settings?.plan === 'free'
                ? 'Upgrade to Business — $79/mo'
                : 'Upgrade to Business — $79/mo'}
            </button>
          </div>
        )}
      </div>

      {/* Recovery Settings */}
      <div className="glass rounded-2xl p-6 space-y-6">
        <h2 className="text-lg font-semibold flex items-center gap-3">
          <Zap className="w-5 h-5 text-emerald-500" />
          Recovery Settings
        </h2>

        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-zinc-400" />
              <span className="font-medium">Auto-Retry</span>
            </div>
            <p className="text-zinc-500 text-sm mt-1">
              Automatically retry failed payments on a schedule
            </p>
          </div>
          <button
            onClick={() =>
              setSettings(
                settings
                  ? { ...settings, auto_retry: !settings.auto_retry }
                  : null
              )
            }
            className={`relative w-12 h-6 rounded-full transition-colors ${
              settings?.auto_retry ? 'bg-emerald-500' : 'bg-zinc-700'
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                settings?.auto_retry ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-zinc-400" />
            <span className="font-medium">Retry Schedule</span>
          </div>
          <select
            value={settings?.retry_schedule || '1h,24h,72h,168h'}
            onChange={(e) =>
              setSettings(
                settings
                  ? { ...settings, retry_schedule: e.target.value }
                  : null
              )
            }
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
          >
            <option value="1h,24h,72h,168h">
              Aggressive: 1h, 24h, 72h, 7 days
            </option>
            <option value="24h,72h,168h">
              Standard: 24h, 72h, 7 days
            </option>
            <option value="72h,168h,336h">
              Conservative: 3 days, 7 days, 14 days
            </option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-zinc-400" />
              <span className="font-medium">Email Dunning</span>
            </div>
            <p className="text-zinc-500 text-sm mt-1">
              Send recovery emails to customers with failed payments
            </p>
          </div>
          <button
            onClick={() =>
              setSettings(
                settings
                  ? { ...settings, dunning_enabled: !settings.dunning_enabled }
                  : null
              )
            }
            className={`relative w-12 h-6 rounded-full transition-colors ${
              settings?.dunning_enabled ? 'bg-emerald-500' : 'bg-zinc-700'
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                settings?.dunning_enabled ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        <button
          onClick={saveSettings}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-medium text-sm hover:from-emerald-600 hover:to-green-700 transition-all disabled:opacity-50"
        >
          {saving && <Loader2 className="w-4 h-4 animate-spin" />}
          Save Changes
        </button>
      </div>

      {/* Connected Accounts */}
      <div className="glass rounded-2xl p-6">
        <h2 className="text-lg font-semibold flex items-center gap-3 mb-4">
          <Link2 className="w-5 h-5 text-emerald-500" />
          Connected Stripe Accounts
        </h2>

        {accounts.length === 0 ? (
          <div className="text-center py-8">
            <CreditCard className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
            <p className="text-zinc-400">No connected accounts yet</p>
            <p className="text-zinc-500 text-sm mt-1">
              Connect your Stripe account to start recovering failed payments
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {accounts.map((account) => (
              <div
                key={account.id}
                className="flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 border border-white/5"
              >
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-emerald-500" />
                  <div>
                    <p className="font-medium">{account.account_name}</p>
                    <p className="text-zinc-500 text-sm">
                      {account.stripe_account_id}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-medium ${
                      account.is_active
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : 'bg-zinc-500/10 text-zinc-400'
                    }`}
                  >
                    {account.is_active ? 'Active' : 'Inactive'}
                  </span>
                  <button
                    onClick={() => removeAccount(account.id)}
                    className="p-1.5 rounded-lg hover:bg-red-500/10 text-zinc-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
