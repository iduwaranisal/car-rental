import React from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useAuth } from '../context/AuthContext'

const Banner = () => {
  const navigate = useNavigate()
  const { isLoggedIn, session } = useAuth()

  // Hide banner for admin users
  if (session?.type === 'admin') {
    return null
  }

  const handleListYourCar = () => {
    if (isLoggedIn) {
      // Redirect to owner add car page
      navigate('/owner/add-car')
    } else {
      // User is not logged in, redirect to login page with return URL
      navigate('/login', { state: { from: '/owner/add-car' } })
    }
  }

  return (
    <section className="px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 py-8 sm:py-10 md:py-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8 p-6 sm:p-8 md:p-10 lg:p-12 rounded-2xl bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 text-white overflow-hidden relative shadow-xl">
        
        {/* Content Section */}
        <div className="relative z-10 flex-1">
          <p className="text-blue-300 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-2">
            For car owners
          </p>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
            Own a luxury or family car?
          </h2>
          <p className="mt-3 sm:mt-4 text-slate-300 text-sm sm:text-base max-w-md leading-relaxed">
            List it on LankaRide. We handle insurance, verification & payments. Earn stress-free.
          </p>
          <button
            onClick={handleListYourCar}
            className="mt-4 sm:mt-5 md:mt-6 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-white text-slate-800 text-sm sm:text-base font-semibold hover:bg-slate-100 hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg"
          >
            List your car
          </button>
        </div>

        {/* Image Section */}
        <div className="relative z-10 flex-shrink-0 flex justify-center md:justify-end">
          <img
            src={assets.banner_car_image}
            alt="Luxury car"
            className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px] lg:max-w-[400px] h-auto object-contain opacity-90 drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  )
}

export default Banner