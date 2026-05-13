'use client'

import { usePathname } from 'next/navigation'
import { FooterOverride } from '@/overrides/footer'

/**
 * Hides the global site footer on /about* while keeping the override for all other routes.
 */
export function FooterOverrideGate() {
  const pathname = usePathname()
  if (pathname === '/about' || pathname?.startsWith('/about/')) {
    return null
  }
  return <FooterOverride />
}
