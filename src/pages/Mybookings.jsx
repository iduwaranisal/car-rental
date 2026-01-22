import React, { useEffect, useMemo, useState } from 'react'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import { useAuth } from '../context/AuthContext'
import { getOwnerBookings } from '../utils/ownerStore'
import { useNavigate } from 'react-router-dom'

const currency = import.meta.env.VITE_CURRENCY || 'LKR '

const Mybookings = () => {
  const { isLoggedIn, isAdmin, isUser, session } = useAuth()
  const navigate = useNavigate()
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    if (isAdmin) {
      navigate('/owner', { replace: true })
      return
    }
    if (!isLoggedIn || !isUser) {
      navigate(`/login?next=${encodeURIComponent('/my-bookings')}`)
      return
    }
    setBookings(getOwnerBookings())
  }, [isAdmin, isLoggedIn, isUser, navigate])

  const myBookings = useMemo(() => {
    if (!session?.id) return []
    return bookings.filter((b) => b.user === session.id)
  }, [bookings, session?.id])

  const formatDate = (iso) => {
    try {
      return new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
    } catch {
      return '-'
    }
  }

  const getStatusClasses = (status) => {
    if (status === 'confirmed') return 'bg-emerald-50 text-emerald-700 border-emerald-200'
    if (status === 'pending') return 'bg-amber-50 text-amber-700 border-amber-200'
    return 'bg-slate-100 text-slate-600 border-slate-200'
  }

  return (
    <div className="min-h-screen bg-slate-50/50">
      <div className="flex flex-col items-center py-16 px-4">
        <Title title="My bookings" subTitle="Your upcoming and past trips" />
      </div>

      <div className="px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 pb-20">
        {myBookings.length === 0 ? (
          <div className="max-w-md mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm p-10 text-center">
            <img src={assets.car_image1} alt="" className="w-36 h-24 object-cover mx-auto mb-6 rounded-xl opacity-70" />
            <h2 className="text-xl font-semibold text-slate-900 mb-2">No bookings yet</h2>
            <p className="text-slate-500 text-sm">
              You haven&apos;t booked any cars yet. Explore our fleet and schedule your first trip.
            </p>
          </div>
        ) : (
          <div className="space-y-4 max-w-3xl mx-auto">
            {myBookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col sm:flex-row gap-5"
              >
                <div className="w-full sm:w-36 h-28 rounded-xl overflow-hidden shrink-0">
                  <img src={booking.car?.image} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">
                        {booking.car?.brand} {booking.car?.model}
                      </h3>
                      <p className="text-sm text-slate-500">{booking.car?.year} · {booking.car?.category}</p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-xs text-slate-500">Total</p>
                      <p className="text-lg font-semibold text-slate-900">{currency}{Number(booking.price || 0).toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <img src={assets.calendar_icon_colored} alt="" className="h-4 w-4" />
                      <div>
                        <p className="text-xs text-slate-400">Pickup</p>
                        <p>{formatDate(booking.pickupDate)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <img src={assets.calendar_icon_colored} alt="" className="h-4 w-4" />
                      <div>
                        <p className="text-xs text-slate-400">Return</p>
                        <p>{formatDate(booking.returnDate)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <img src={assets.location_icon_colored} alt="" className="h-4 w-4" />
                      <div>
                        <p className="text-xs text-slate-400">Location</p>
                        <p>{booking.car?.location}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between flex-wrap gap-2">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getStatusClasses(booking.status)}`}>
                      {String(booking.status).charAt(0).toUpperCase() + String(booking.status).slice(1)}
                    </span>
                    <button className="text-sm font-medium text-primary hover:underline">View details</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Mybookings
