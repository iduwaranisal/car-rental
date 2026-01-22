import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { assets } from '../assets/assets'
import Loader from '../components/Loader'
import { useAuth } from '../context/AuthContext'
import { getOwnerBookings, getOwnerCars, setOwnerBookings, uid } from '../utils/ownerStore'

const currency = import.meta.env.VITE_CURRENCY || 'LKR '

const Cardetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { session, isUser } = useAuth()
  const [car, setCar] = useState(null)
  const [pickupDate, setPickupDate] = useState('')
  const [returnDate, setReturnDate] = useState('')
  const [error, setError] = useState('')

  const days = useMemo(() => {
    if (!pickupDate || !returnDate) return 0
    const start = new Date(pickupDate)
    const end = new Date(returnDate)
    const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
    return Number.isFinite(diff) ? diff : 0
  }, [pickupDate, returnDate])

  const totalPrice = useMemo(() => {
    if (!car) return 0
    const d = Math.max(1, days || 0)
    return d * (Number(car.pricePerDay) || 0)
  }, [car, days])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!isUser) {
      navigate(`/login?next=${encodeURIComponent(`/car-details/${id}`)}`)
      return
    }
    if (!pickupDate || !returnDate) {
      setError('Please select pickup and return dates.')
      return
    }
    const start = new Date(pickupDate)
    const end = new Date(returnDate)
    if (!(end > start)) {
      setError('Return date must be after pickup date.')
      return
    }
    const booking = {
      _id: uid('booking'),
      car,
      user: session?.id,
      owner: car?.owner,
      pickupDate: new Date(pickupDate).toISOString(),
      returnDate: new Date(returnDate).toISOString(),
      status: 'pending',
      price: totalPrice,
      createdAt: new Date().toISOString(),
    }
    const existing = getOwnerBookings()
    setOwnerBookings([booking, ...existing])
    navigate('/my-bookings')
  }

  useEffect(() => {
    const found = getOwnerCars().find((item) => item._id === id)
    setCar(found)
  }, [id])

  if (!car) return <Loader />

  return (
    <div className="min-h-screen bg-slate-50/50 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 py-8 lg:py-12">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 text-sm font-medium"
      >
        <img src={assets.arrow_icon} alt="" className="rotate-180 w-4 h-4" />
        Back to all cars
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 max-w-7xl">
        <div className="lg:col-span-2 space-y-6">
          <img
            src={car.image}
            alt={`${car.brand} ${car.model}`}
            className="w-full h-auto max-h-[400px] object-cover rounded-2xl shadow-lg"
          />

          <div>
            <h1 className="text-3xl font-bold text-slate-900">{car.brand} {car.model}</h1>
            <p className="text-slate-500 mt-1">{car.category} · {car.year}</p>
          </div>

          <hr className="border-slate-200" />

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: assets.users_icon, text: `${car.seating_capacity} Seats` },
              { icon: assets.fuel_icon, text: car.fuel_type },
              { icon: assets.car_icon, text: car.transmission },
              { icon: assets.location_icon, text: car.location },
            ].map(({ icon, text }) => (
              <div key={text} className="flex flex-col items-center p-4 rounded-xl bg-white border border-slate-200">
                <img src={icon} alt="" className="h-5 w-5 mb-2 opacity-80" />
                <span className="text-sm text-slate-700 text-center">{text}</span>
              </div>
            ))}
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">Description</h2>
            <p className="text-slate-600 leading-relaxed">{car.description}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">Features</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {['360 Camera', 'Bluetooth', 'GPS', 'Heated Seats', 'Rear View Camera'].map((item) => (
                <li key={item} className="flex items-center gap-2 text-slate-600">
                  <img src={assets.check_icon} className="h-4 w-4" alt="" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="lg:col-span-1">
          <form
            onSubmit={handleSubmit}
            className="sticky top-24 rounded-2xl p-6 bg-white border border-slate-200 shadow-lg space-y-5"
          >
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-2xl font-bold text-slate-900">{currency}{Number(car.pricePerDay).toLocaleString()}</span>
              <span className="text-slate-500">per day</span>
            </div>
            <hr className="border-slate-200" />

            <div>
              <label htmlFor="pickup-date" className="block text-sm font-medium text-slate-700 mb-1.5">Pickup date</label>
              <input
                type="date"
                id="pickup-date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 focus:border-primary focus:ring-2 focus:ring-primary/10"
                required
              />
            </div>
            <div>
              <label htmlFor="return-date" className="block text-sm font-medium text-slate-700 mb-1.5">Return date</label>
              <input
                type="date"
                id="return-date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                min={pickupDate || new Date().toISOString().split('T')[0]}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 focus:border-primary focus:ring-2 focus:ring-primary/10"
                required
              />
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-slate-600">{days > 0 ? `${days} day(s)` : 'Select dates'}</span>
              <span className="font-semibold text-slate-900">Total: {currency}{totalPrice.toLocaleString()}</span>
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-dull text-white font-semibold shadow-md shadow-primary/20 hover:shadow-lg transition-all"
            >
              {isUser ? 'Book now' : 'Login to book'}
            </button>
            <p className="text-center text-xs text-slate-500">No payment required to reserve</p>
          </form>
        </aside>
      </div>
    </div>
  )
}

export default Cardetails
