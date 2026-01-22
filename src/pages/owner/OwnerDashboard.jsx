import React, { useEffect, useMemo, useState } from 'react'
import { assets } from '../../assets/assets'
import { getOwnerBookings, getOwnerCars } from '../../utils/ownerStore'

const currency = import.meta.env.VITE_CURRENCY || 'LKR '

const StatCard = ({ label, value, icon }) => (
  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-slate-500 font-medium">{label}</p>
        <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
      </div>
      <div className="h-11 w-11 rounded-xl bg-slate-100 flex items-center justify-center">
        <img src={icon} alt="" className="h-5 w-5" />
      </div>
    </div>
  </div>
)

const OwnerDashboard = () => {
  const [cars, setCars] = useState([])
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    setCars(getOwnerCars())
    setBookings(getOwnerBookings())
  }, [])

  const stats = useMemo(() => {
    const totalCars = cars.length
    const totalBookings = bookings.length
    const pendingBookings = bookings.filter((b) => b.status === 'pending').length
    const completedBookings = bookings.filter((b) => b.status === 'completed').length
    const monthlyRevenue = bookings.reduce((sum, b) => sum + (Number(b.price) || 0), 0)
    const recentBookings = [...bookings]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5)
    return { totalCars, totalBookings, pendingBookings: pendingBookings, completedBookings, monthlyRevenue, recentBookings }
  }, [cars, bookings])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total cars" value={stats.totalCars} icon={assets.carIconColored} />
        <StatCard label="Total bookings" value={stats.totalBookings} icon={assets.listIconColored} />
        <StatCard label="Pending" value={stats.pendingBookings} icon={assets.cautionIconColored} />
        <StatCard label="Revenue (mock)" value={`${currency}${Number(stats.monthlyRevenue).toLocaleString()}`} icon={assets.dashboardIconColored} />
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-200">
          <p className="font-semibold text-slate-900">Recent bookings</p>
          <p className="text-sm text-slate-500">Latest activity</p>
        </div>
        <div className="divide-y divide-slate-100">
          {stats.recentBookings.map((b) => (
            <div key={b._id} className="p-5 flex items-center gap-4">
              <div className="h-12 w-16 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                <img src={b.car?.image} alt="" className="h-full w-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-slate-900 truncate">{b.car?.brand} {b.car?.model}</p>
                <p className="text-sm text-slate-500 truncate">
                  {new Date(b.pickupDate).toLocaleDateString()} → {new Date(b.returnDate).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-semibold text-slate-900">{currency}{Number(b.price || 0).toLocaleString()}</p>
                <span className="text-xs text-slate-500">{b.status}</span>
              </div>
            </div>
          ))}
          {stats.recentBookings.length === 0 && (
            <div className="p-8 text-center text-slate-500">No bookings yet.</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default OwnerDashboard
