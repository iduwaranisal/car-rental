import React, { useEffect, useMemo, useState } from 'react'
import { assets } from '../../assets/assets'
import { getOwnerCars, setOwnerCars } from '../../utils/ownerStore'

const ManageCars = () => {
  const [cars, setCars] = useState([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    setCars(getOwnerCars())
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return cars
    return cars.filter((c) => `${c.brand} ${c.model} ${c.category} ${c.location}`.toLowerCase().includes(q))
  }, [cars, query])

  const persist = (next) => {
    setCars(next)
    setOwnerCars(next)
  }

  const toggleAvailability = (id) => {
    persist(cars.map((c) => (c._id === id ? { ...c, isAvaliable: !c.isAvaliable } : c)))
  }

  const deleteCar = (id) => {
    if (!confirm('Delete this car?')) return
    persist(cars.filter((c) => c._id !== id))
  }

  const updatePrice = (id, pricePerDay) => {
    persist(cars.map((c) => (c._id === id ? { ...c, pricePerDay: Number(pricePerDay) || 0 } : c)))
  }

  const currency = import.meta.env.VITE_CURRENCY || 'LKR '

  return (
    <div className='space-y-4'>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'>
        <div>
          <p className='text-xl font-semibold text-gray-800'>Manage Cars</p>
          <p className='text-sm text-gray-500'>Edit, toggle availability, or remove cars (stored locally).</p>
        </div>
        <div className='flex items-center bg-white px-4 h-11 rounded-xl border border-slate-200 max-w-md w-full sm:w-96'>
          <img src={assets.search_icon} alt='' className='w-4.5 h-4.5 mr-2' />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Search cars...'
            className='w-full h-full outline-none text-gray-500'
          />
        </div>
      </div>

      <div className='bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden'>
        <div className='grid grid-cols-12 gap-3 px-5 py-3.5 text-xs font-semibold text-slate-500 bg-slate-50'>
          <div className='col-span-5'>Car</div>
          <div className='col-span-2'>Price/day</div>
          <div className='col-span-2'>Status</div>
          <div className='col-span-3 text-right'>Actions</div>
        </div>

        <div className='divide-y divide-slate-100'>
          {filtered.map((c) => (
            <div key={c._id} className='grid grid-cols-12 gap-3 px-5 py-4 items-center'>
              <div className='col-span-5 flex items-center gap-3 min-w-0'>
                <div className='h-10 w-14 rounded-xl overflow-hidden bg-light shrink-0'>
                  <img src={c.image} alt='' className='h-full w-full object-cover' />
                </div>
                <div className='min-w-0'>
                  <p className='font-medium text-gray-800 truncate'>
                    {c.brand} {c.model}
                  </p>
                  <p className='text-xs text-gray-500 truncate'>
                    {c.category} • {c.year} • {c.location}
                  </p>
                </div>
              </div>

              <div className='col-span-2'>
                <div className='flex items-center gap-1'>
                  <span className='text-gray-500'>{currency}</span>
                  <input
                    type='number'
                    defaultValue={c.pricePerDay}
                    onBlur={(e) => updatePrice(c._id, e.target.value)}
                    className='w-24 border border-slate-200 rounded-lg px-2 py-1.5 text-slate-800 focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none'
                    min='0'
                  />
                </div>
              </div>

              <div className='col-span-2'>
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full border ${
                    c.isAvaliable
                      ? 'bg-green-100 text-green-700 border-green-200'
                      : 'bg-gray-100 text-gray-600 border-gray-200'
                  }`}
                >
                  {c.isAvaliable ? 'Available' : 'Unavailable'}
                </span>
              </div>

              <div className='col-span-3 flex items-center justify-end gap-2'>
                <button
                  onClick={() => toggleAvailability(c._id)}
                  className='px-3 py-2 rounded-xl border border-slate-200 text-sm hover:bg-slate-50 transition-colors'
                >
                  Toggle
                </button>
                <button
                  onClick={() => deleteCar(c._id)}
                  className='px-3 py-2 rounded-xl border border-red-200 text-sm text-red-600 hover:bg-red-50'
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          {filtered.length === 0 && <div className='p-6 text-center text-gray-500'>No cars found.</div>}
        </div>
      </div>
    </div>
  )
}

export default ManageCars

