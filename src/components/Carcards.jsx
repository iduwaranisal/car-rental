import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Carcards = ({ car }) => {
  const currency = import.meta.env.VITE_CURRENCY || 'LKR '
  const navigate = useNavigate()

  return (
    <article
      onClick={() => {
        navigate(`/car-details/${car._id}`)
        scrollTo(0, 0)
      }}
      className="group rounded-2xl overflow-hidden bg-white border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-slate-200 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute bottom-4 right-4 flex items-baseline gap-1 bg-slate-900/90 backdrop-blur-sm text-white px-3.5 py-2 rounded-lg">
          <span className="font-bold text-lg">{currency}{Number(car.pricePerDay).toLocaleString()}</span>
          <span className="text-xs text-slate-300">/ day</span>
        </div>
        <span className="absolute top-4 left-4 bg-emerald-500 text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-sm">
          Available
        </span>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold text-slate-900">{car.brand} {car.model}</h3>
        <p className="text-slate-500 text-sm mt-0.5">{car.category} · {car.year}</p>

        <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-slate-600">
          <div className="flex items-center gap-2 text-sm">
            <img src={assets.users_icon} alt="" className="h-4 w-4 opacity-70" />
            <span>{car.seating_capacity} Seats</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <img src={assets.fuel_icon} alt="" className="h-4 w-4 opacity-70" />
            <span>{car.fuel_type}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <img src={assets.car_icon} alt="" className="h-4 w-4 opacity-70" />
            <span>{car.transmission}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <img src={assets.location_icon} alt="" className="h-4 w-4 opacity-70" />
            <span className="truncate">{car.location}</span>
          </div>
        </div>
      </div>
    </article>
  )
}

export default Carcards
