import * as XLSX from 'xlsx'

export interface ParsedLeadRow {
  name: string
  email: string
  phone?: string
  company?: string
  serviceInterested?: string
  budget?: string
  notes?: string
  status?: string
}

export interface ParseResult {
  totalRows: number
  validLeads: ParsedLeadRow[]
  errors: { row: number; reason: string }[]
}

export function parseLeadsFromExcelBuffer(buffer: Buffer): ParseResult {
  const workbook = XLSX.read(buffer, { type: 'buffer' })
  const sheetName = workbook.SheetNames[0]
  if (!sheetName) {
    throw new Error('Excel sheet is empty or invalid')
  }

  const worksheet = workbook.Sheets[sheetName]
  const jsonData: Record<string, any>[] = XLSX.utils.sheet_to_json(worksheet, {
    defval: '',
    raw: false,
  })

  const validLeads: ParsedLeadRow[] = []
  const errors: { row: number; reason: string }[] = []

  jsonData.forEach((row, index) => {
    const rowNum = index + 2

    const normalized: Record<string, string> = {}
    Object.keys(row).forEach((k) => {
      const cleanKey = k.toLowerCase().replace(/[^a-z0-9]/g, '')
      normalized[cleanKey] = String(row[k] || '').trim()
    })

    const name =
      normalized['fullname'] ||
      normalized['name'] ||
      normalized['clientname'] ||
      normalized['contactname'] ||
      normalized['customername'] ||
      normalized['leadname'] ||
      normalized['person'] ||
      ''

    const email =
      normalized['email'] ||
      normalized['emailaddress'] ||
      normalized['mail'] ||
      normalized['clientemail'] ||
      ''

    const phone =
      normalized['phone'] ||
      normalized['mobile'] ||
      normalized['contact'] ||
      normalized['phonenumber'] ||
      normalized['mobilenumber'] ||
      normalized['whatsapp'] ||
      normalized['contactno'] ||
      ''

    const company =
      normalized['company'] ||
      normalized['companyname'] ||
      normalized['organization'] ||
      normalized['business'] ||
      normalized['firm'] ||
      ''

    const service =
      normalized['service'] ||
      normalized['serviceinterested'] ||
      normalized['requirement'] ||
      normalized['interestedin'] ||
      normalized['product'] ||
      'Web Development & Hosting'

    const budget =
      normalized['budget'] ||
      normalized['price'] ||
      normalized['estimatedbudget'] ||
      ''

    const notes =
      normalized['notes'] ||
      normalized['remarks'] ||
      normalized['comments'] ||
      normalized['message'] ||
      ''

    if (!name && !email && !phone) {
      errors.push({ row: rowNum, reason: 'Row has no Name, Email, or Phone' })
      return
    }

    validLeads.push({
      name: name || (email ? email.split('@')[0] : 'Lead #' + rowNum),
      email: email || `${(name || 'lead').toLowerCase().replace(/\s+/g, '')}${rowNum}@placeholder.com`,
      phone,
      company,
      serviceInterested: service,
      budget,
      notes,
      status: 'New',
    })
  })

  return {
    totalRows: jsonData.length,
    validLeads,
    errors,
  }
}

export function generateSampleExcelBuffer(): Buffer {
  const sampleData = [
    {
      'Full Name': 'Aman Sharma',
      'Email': 'aman.sharma@example.com',
      'Phone': '+91 9876543210',
      'Company': 'Apex Digital Media',
      'Service Interested': 'E-Commerce Website + Cloud Hosting',
      'Budget': '₹45,000',
      'Notes': 'Needs custom payment gateway & domain',
    },
    {
      'Full Name': 'Priya Patel',
      'Email': 'priya@techfusion.in',
      'Phone': '+91 9123456789',
      'Company': 'TechFusion Labs',
      'Service Interested': 'Web Application & Maintenance',
      'Budget': '₹75,000',
      'Notes': 'Looking for immediate kickoff next week',
    },
    {
      'Full Name': 'Rajesh Verma',
      'Email': 'rajesh.verma@globalexports.org',
      'Phone': '+91 9988776655',
      'Company': 'Global Exports Corp',
      'Service Interested': 'Domain Portfolio & Enterprise Hosting',
      'Budget': '₹30,000',
      'Notes': 'Migrating 4 domains and 10 email inboxes',
    },
  ]

  const worksheet = XLSX.utils.json_to_sheet(sampleData)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Leads')

  return XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' })
}
