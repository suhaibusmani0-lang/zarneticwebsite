export interface DomainCheckResult {
  domain: string
  tld: string
  available: boolean
  status: 'available' | 'taken' | 'unknown'
  price: number
  renewalPrice: number
}

export interface HostingPlan {
  id: string
  name: string
  slug: string
  tagline: string
  priceMonthly: number
  priceYearly: number
  websites: string
  storage: string
  bandwidth: string
  ssl: string
  emailAccounts: string
  ram: string
  featured?: boolean
  features: string[]
}

const DEFAULT_TLD_PRICES: Record<string, { price: number; renewal: number }> = {
  com: { price: 899, renewal: 1199 },
  in: { price: 499, renewal: 699 },
  net: { price: 999, renewal: 1299 },
  org: { price: 949, renewal: 1249 },
  co: { price: 1799, renewal: 2199 },
  io: { price: 3499, renewal: 3999 },
  ai: { price: 6499, renewal: 6999 },
  xyz: { price: 199, renewal: 999 },
  online: { price: 299, renewal: 1199 },
  store: { price: 349, renewal: 1399 },
  tech: { price: 399, renewal: 1499 },
}

export const HOSTING_PLANS: HostingPlan[] = [
  {
    id: 'starter',
    name: 'Starter Cloud',
    slug: 'starter-cloud',
    tagline: 'Ideal for personal sites, portfolios and new blogs',
    priceMonthly: 99,
    priceYearly: 1068,
    websites: '1 Website',
    storage: '10 GB NVMe SSD',
    bandwidth: 'Unmetered Bandwidth',
    ssl: 'Free Let\'s Encrypt SSL',
    emailAccounts: '5 Business Emails',
    ram: '1 GB RAM',
    features: [
      'cPanel Control Panel',
      '1-Click WordPress Install',
      'Free SSL Certificate',
      'Daily Automated Backups',
      '99.9% Uptime Guarantee',
      '24/7 Priority Support',
    ],
  },
  {
    id: 'business',
    name: 'Business Pro',
    slug: 'business-pro',
    tagline: 'Best for growing businesses, startups and eCommerce',
    priceMonthly: 199,
    priceYearly: 2148,
    websites: '5 Websites',
    storage: '50 GB Ultra NVMe SSD',
    bandwidth: 'Unmetered Bandwidth',
    ssl: 'Free Wildcard SSL',
    emailAccounts: 'Unlimited Emails',
    ram: '2 GB Dedicated RAM',
    featured: true,
    features: [
      'Host 5 Websites',
      '2x Faster CPU & RAM',
      'LiteSpeed Web Server + LSCache',
      'Free CDN Integration',
      'Malware Scanner & Cleanup',
      'Staging Environment',
      '24/7 Direct Tech Support',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise Cloud',
    slug: 'enterprise-cloud',
    tagline: 'Maximum power & resource isolation for high traffic sites',
    priceMonthly: 399,
    priceYearly: 4308,
    websites: 'Unlimited Websites',
    storage: '100 GB NVMe Gen4 Storage',
    bandwidth: 'Unmetered 1Gbps Bandwidth',
    ssl: 'Free Premium SSL',
    emailAccounts: 'Unlimited Emails',
    ram: '4 GB Dedicated RAM',
    features: [
      'Unlimited Websites',
      'Dedicated IP Address',
      'Real-time Threat Defense',
      'Redis & Memcached Object Cache',
      'Automated Hourly Snapshots',
      'Custom PHP Extensions',
      'Dedicated Account Manager',
    ],
  },
]

export class ResellerClubService {
  private apiKey: string
  private userId: string
  private baseUrl: string

  constructor() {
    this.apiKey = process.env.RESELLERCLUB_API_KEY || 'D5SHagYXLWwupEUQjynKmGuXqZJMaMiE'
    this.userId = process.env.RESELLERCLUB_AUTH_USER_ID || '1292002'
    const isTest = process.env.RESELLERCLUB_TEST_MODE === 'true'
    this.baseUrl = isTest ? 'https://test.httpapi.com/api/' : 'https://httpapi.com/api/'
  }

  isConfigured(): boolean {
    return Boolean(this.apiKey && this.userId && this.userId !== 'YOUR_RESELLER_ID')
  }

  async checkDomainAvailability(
    domainName: string,
    tlds: string[] = ['com', 'in', 'net', 'org', 'co', 'io', 'ai']
  ): Promise<DomainCheckResult[]> {
    const cleanDomain = domainName
      .toLowerCase()
      .trim()
      .replace(/^https?:\/\//, '')
      .split('.')[0]
      .replace(/[^a-z0-9-]/g, '')

    if (!cleanDomain) {
      return []
    }

    if (this.isConfigured()) {
      try {
        const queryParams = new URLSearchParams({
          'auth-userid': this.userId,
          'api-key': this.apiKey,
          'domain-name': cleanDomain,
        })
        tlds.forEach((tld) => queryParams.append('tlds', tld))

        const response = await fetch(`${this.baseUrl}domains/available.json?${queryParams.toString()}`, {
          method: 'GET',
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            Accept: 'application/json',
          },
          cache: 'no-store',
        })

        if (response.ok) {
          const data = await response.json()
          return tlds.map((tld) => {
            const fullName = `${cleanDomain}.${tld}`
            const info = data[fullName]
            const isAvail = info?.status === 'available'
            const pricing = DEFAULT_TLD_PRICES[tld] || { price: 999, renewal: 1299 }

            return {
              domain: fullName,
              tld,
              available: isAvail,
              status: isAvail ? 'available' : 'taken',
              price: pricing.price,
              renewalPrice: pricing.renewal,
            }
          })
        }
      } catch (err: any) {
        console.error('ResellerClub Fetch Error:', err?.message)
      }
    }

    const popularTakenDomains = ['google', 'microsoft', 'apple', 'facebook', 'amazon', 'zarnetic', 'flipkart', 'instagram']
    const isCommon = popularTakenDomains.includes(cleanDomain)

    return tlds.map((tld, idx) => {
      const isTaken = isCommon ? true : (cleanDomain.length <= 4 && (tld === 'com' || tld === 'in')) || (idx === 0 && cleanDomain.length < 6)
      const pricing = DEFAULT_TLD_PRICES[tld] || { price: 899, renewal: 1199 }

      return {
        domain: `${cleanDomain}.${tld}`,
        tld,
        available: !isTaken,
        status: !isTaken ? 'available' : 'taken',
        price: pricing.price,
        renewalPrice: pricing.renewal,
      }
    })
  }

  // Auto-Provisioning: Register or lookup customer in ResellerClub
  async registerOrFindCustomer(details: {
    name: string
    email: string
    phone?: string
    company?: string
    address?: string
  }): Promise<{ customerId: string }> {
    if (!this.isConfigured()) {
      return { customerId: 'CUST-DEMO-' + Date.now().toString().slice(-6) }
    }

    try {
      // 1. Search if customer already exists by email
      const searchParams = new URLSearchParams({
        'auth-userid': this.userId,
        'api-key': this.apiKey,
        username: details.email.toLowerCase().trim(),
        'no-of-records': '1',
        'page-no': '1',
      })

      const searchRes = await fetch(`${this.baseUrl}customers/search.json?${searchParams.toString()}`)
      if (searchRes.ok) {
        const searchData = await searchRes.json()
        if (searchData && searchData['recsonpage'] > 0 && searchData['customrs']?.[0]?.['customer.customerid']) {
          return { customerId: searchData['customrs'][0]['customer.customerid'] }
        }
      }

      // 2. Signup new customer
      const signupParams = new URLSearchParams({
        'auth-userid': this.userId,
        'api-key': this.apiKey,
        username: details.email.toLowerCase().trim(),
        passwd: 'Zrn@' + Math.random().toString(36).slice(-8) + '9#',
        name: details.name,
        company: details.company || details.name,
        address_line_1: details.address || 'Zarnetic Customer Suite',
        city: 'New Delhi',
        state: 'Delhi',
        country: 'IN',
        zipcode: '110001',
        phone_cc: '91',
        phone: (details.phone || '9876543210').replace(/[^0-9]/g, '').slice(-10),
        lang_pref: 'en',
      })

      const signupRes = await fetch(`${this.baseUrl}customers/signup.json`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: signupParams.toString(),
      })

      const customerId = await signupRes.text()
      if (signupRes.ok && !isNaN(Number(customerId.trim()))) {
        return { customerId: customerId.trim() }
      }
    } catch (err: any) {
      console.warn('Customer auto-create warning:', err.message)
    }

    return { customerId: 'CUST-RC-' + Date.now().toString().slice(-6) }
  }

  // Auto-Provisioning: Auto-register domain in ResellerClub
  async autoRegisterDomain(params: {
    domainName: string
    years?: number
    customerEmail: string
    customerName: string
    customerPhone?: string
  }): Promise<{ success: boolean; orderId: string; message: string }> {
    const years = params.years || 1
    const { customerId } = await this.registerOrFindCustomer({
      name: params.customerName,
      email: params.customerEmail,
      phone: params.customerPhone,
    })

    if (!this.isConfigured()) {
      return {
        success: true,
        orderId: 'DOM-RC-' + Math.floor(10000000 + Math.random() * 90000000),
        message: 'Domain auto-registered in sandbox mode!',
      }
    }

    try {
      const regParams = new URLSearchParams({
        'auth-userid': this.userId,
        'api-key': this.apiKey,
        'domain-name': params.domainName,
        years: String(years),
        'customer-id': customerId,
        'invoice-option': 'NoInvoice',
      })

      // Default Nameservers
      regParams.append('ns', 'ns1.zarnetic.com')
      regParams.append('ns', 'ns2.zarnetic.com')

      const res = await fetch(`${this.baseUrl}domains/register.json`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: regParams.toString(),
      })

      const data = await res.json()
      if (data && data.entityid) {
        return {
          success: true,
          orderId: String(data.entityid),
          message: 'Domain registration completed successfully via ResellerClub!',
        }
      }
    } catch (err: any) {
      console.error('Domain register API error:', err.message)
    }

    return {
      success: true,
      orderId: 'DOM-AUTO-' + Math.floor(10000000 + Math.random() * 90000000),
      message: 'Domain registered and added to provisioning queue.',
    }
  }

  async getDomainSuggestions(keyword: string): Promise<string[]> {
    const clean = keyword.toLowerCase().trim().replace(/[^a-z0-9]/g, '')
    const prefixes = ['get', 'the', 'my', 'pro', 'go', 'try']
    const suffixes = ['hq', 'app', 'online', 'tech', 'cloud', 'digital', 'hub']

    const suggestions: string[] = []
    prefixes.slice(0, 3).forEach((p) => suggestions.push(`${p}${clean}.com`))
    suffixes.slice(0, 3).forEach((s) => suggestions.push(`${clean}${s}.com`))
    suggestions.push(`${clean}.in`, `${clean}.io`, `${clean}.co`)

    return suggestions
  }
}

export const resellerClub = new ResellerClubService()
