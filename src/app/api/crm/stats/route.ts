import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { Lead } from '@/models/Lead'
import { Client } from '@/models/Client'
import { Order } from '@/models/Order'
import { Activity } from '@/models/Activity'

export async function GET() {
  try {
    await connectDB()

    const [totalLeads, totalClients, totalOrders, convertedLeads, activities] = await Promise.all([
      Lead.countDocuments(),
      Client.countDocuments(),
      Order.countDocuments(),
      Lead.countDocuments({ status: 'Converted' }),
      Activity.find().sort({ createdAt: -1 }).limit(10),
    ])

    const revenueResult = await Order.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ])
    const totalRevenue = revenueResult[0]?.total || 0

    const conversionRate = totalLeads > 0 ? Math.round((convertedLeads / totalLeads) * 100) : 0

    return NextResponse.json({
      success: true,
      stats: {
        totalLeads,
        totalClients,
        totalOrders,
        convertedLeads,
        conversionRate,
        totalRevenue,
      },
      recentActivities: activities,
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Database not connected',
        stats: {
          totalLeads: 0,
          totalClients: 0,
          totalOrders: 0,
          convertedLeads: 0,
          conversionRate: 0,
          totalRevenue: 0,
        },
        recentActivities: [],
      },
      { status: 200 }
    )
  }
}
