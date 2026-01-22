import React, { useEffect, useMemo, useState } from 'react'
import { assets } from '../../assets/assets'
import { getOwnerBookings, setOwnerBookings } from '../../utils/ownerStore'

const ManageBookings = () => {
  const [bookings, setBookings] = useState([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    setBookings(getOwnerBookings())
  }, [])

  const persist = (next) => {
    setBookings(next)
    setOwnerBookings(next)
  }

  const setStatus = (id, status) => {
    persist(bookings.map((b) => (b._id === id ? { ...b, status } : b)))
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return bookings
    return bookings.filter((b) => {
      const car = `${b.car?.brand || ''} ${b.car?.model || ''} ${b.car?.location || ''}`.toLowerCase()
      return car.includes(q) || String(b.status || '').toLowerCase().includes(q)
    })
  }, [bookings, query])

  const currency = import.meta.env.VITE_CURRENCY || 'LKR '

  const statusClasses = (status) => {
    if (status === 'confirmed') return 'bg-green-100 text-green-700 border-green-200'
    if (status === 'pending') return 'bg-yellow-100 text-yellow-700 border-yellow-200'
    if (status === 'completed') return 'bg-blue-100 text-blue-700 border-blue-200'
    if (status === 'cancelled') return 'bg-red-100 text-red-700 border-red-200'
    return 'bg-gray-100 text-gray-600 border-gray-200'
  }

  return (
    <div className='space-y-4'>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'>
        <div>
          <p className='text-xl font-semibold text-gray-800'>Manage Bookings</p>
          <p className='text-sm text-gray-500'>Update booking status (stored locally).</p>
        </div>
        <div className='flex items-center bg-white px-4 h-11 rounded-xl border border-slate-200 max-w-md w-full sm:w-96'>
          <img src={assets.search_icon} alt='' className='w-4.5 h-4.5 mr-2' />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Search by car / status...'
            className='w-full h-full outline-none text-gray-500'
          />
        </div>
      </div>

      <div className='bg-white rounded-2xl shadow-sm border border-borderColor/40 overflow-hidden'>
        <div className='grid grid-cols-12 gap-3 px-5 py-3 text-xs font-semibold text-gray-500 bg-light'>
          <div className='col-span-5'>Booking</div>
          <div className='col-span-2'>Dates</div>
          <div className='col-span-2'>Price</div>
          <div className='col-span-3 text-right'>Status</div>
        </div>

        <div className='divide-y divide-slate-100'>
          {filtered.map((b) => (
            <div key={b._id} className='grid grid-cols-12 gap-3 px-5 py-4 items-center'>
              <div className='col-span-5 flex items-center gap-3 min-w-0'>
                <div className='h-10 w-14 rounded-xl overflow-hidden bg-light shrink-0'>
                  <img src={b.car?.image} alt='' className='h-full w-full object-cover' />
                </div>
                <div className='min-w-0'>
                  <p className='font-medium text-gray-800 truncate'>
                    {b.car?.brand} {b.car?.model}
                  </p>
                  <p className='text-xs text-gray-500 truncate'>{b.car?.location}</p>
                </div>
              </div>

              <div className='col-span-2 text-sm text-gray-600'>
                <p>{new Date(b.pickupDate).toLocaleDateString()}</p>
                <p>{new Date(b.returnDate).toLocaleDateString()}</p>
              </div>

              <div className='col-span-2 font-semibold text-slate-900'>
                {currency}{Number(b.price || 0).toLocaleString()}
              </div>

              <div className='col-span-3 flex items-center justify-end gap-2'>
                <span className={`text-xs font-medium px-3 py-1 rounded-full border ${statusClasses(b.status)}`}>
                  {b.status}
                </span>
                {b.status === 'pending' && (
                  <>
                    <button
                      onClick={() => setStatus(b._id, 'confirmed')}
                      className='px-3 py-2 rounded-xl bg-green-600 hover:bg-green-700 transition-all text-white text-sm'
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => setStatus(b._id, 'cancelled')}
                      className='px-3 py-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 transition-all text-sm'
                    >
                      Reject
                    </button>
                  </>
                )}
                <select
                  value={b.status}
                  onChange={(e) => setStatus(b._id, e.target.value)}
                  className='border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none bg-white focus:border-primary focus:ring-1 focus:ring-primary/20'
                >
                  <option value='pending'>pending</option>
                  <option value='confirmed'>confirmed</option>
                  <option value='completed'>completed</option>
                  <option value='cancelled'>cancelled</option>
                </select>
              </div>
            </div>
          ))}

          {filtered.length === 0 && <div className='p-6 text-center text-gray-500'>No bookings found.</div>}
        </div>
      </div>
    </div>
  )
}

export default ManageBookings

