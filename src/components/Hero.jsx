import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { assets, cityList } from '../assets/assets'

const Hero = () => {
  const [pickupLocation, setPickupLocation] = useState('')
  const [pickupDate, setPickupDate] = useState('')
  const [returnDate, setReturnDate] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    const searchParams = new URLSearchParams()
    if (pickupLocation.trim()) {
      searchParams.set('q', pickupLocation.trim())
    }
    navigate(`/cars?${searchParams.toString()}`)
  }

  return (
    <section className="min-h-[85vh] flex flex-col items-center justify-center gap-8 sm:gap-10 lg:gap-12 bg-gradient-to-b from-slate-50 to-white pt-6 pb-12 sm:pb-16 px-4 text-center">
      <div className="w-full max-w-4xl">
        <p className="text-primary text-xs sm:text-sm font-semibold tracking-wide uppercase mb-2 sm:mb-3">Premium car rental</p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-tight px-2">
          Luxury cars on rent across Sri Lanka
        </h1>
        <p className="text-slate-500 text-base sm:text-lg mt-3 sm:mt-4 max-w-xl mx-auto px-2">
          Book sedans, SUVs & vans. Self-drive or with driver. Best rates, no hidden fees.
        </p>
      </div>

      <form onSubmit={handleSearch} className="w-full max-w-4xl">
        <div className="flex flex-col gap-3 p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-lg shadow-slate-200/50">
          {/* Mobile: Stack all fields vertically */}
          <div className="flex flex-col gap-3 md:hidden">
            <div className="flex flex-col items-start gap-1.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
              <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Pickup location</label>
              <select
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                className="w-full text-slate-800 font-medium bg-transparent border-0 p-0 focus:ring-0 cursor-pointer text-sm"
              >
                <option value="">Select city</option>
                {cityList.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col items-start gap-1.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
              <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Pick-up date</label>
              <input
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full text-slate-800 font-medium bg-transparent border-0 p-0 focus:ring-0 text-sm"
              />
            </div>

            <div className="flex flex-col items-start gap-1.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
              <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Return date</label>
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                min={pickupDate || new Date().toISOString().split('T')[0]}
                className="w-full text-slate-800 font-medium bg-transparent border-0 p-0 focus:ring-0 text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary hover:bg-primary-dull text-white font-semibold shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/30 transition-all"
            >
              <img src={assets.search_icon} alt="" className="w-4 h-4 brightness-0 invert" />
              Search
            </button>
          </div>

          {/* Desktop: Horizontal layout */}
          <div className="hidden md:flex md:items-center gap-3">
            <div className="flex flex-1 gap-4 divide-x divide-slate-200">
              <div className="flex flex-col items-start gap-1.5 text-left">
                <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Pickup location</label>
                <select
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  className="w-44 text-slate-800 font-medium bg-transparent border-0 p-0 focus:ring-0 cursor-pointer"
                >
                  <option value="">Select city</option>
                  {cityList.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                <span className="text-xs text-slate-400">{pickupLocation || 'Choose a city'}</span>
              </div>

              <div className="flex flex-col items-start gap-1.5 text-left pl-4">
                <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Pick-up date</label>
                <input
                  type="date"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-40 text-slate-800 font-medium bg-transparent border-0 p-0 focus:ring-0"
                />
              </div>

              <div className="flex flex-col items-start gap-1.5 text-left pl-4">
                <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Return date</label>
                <input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  min={pickupDate || new Date().toISOString().split('T')[0]}
                  className="w-40 text-slate-800 font-medium bg-transparent border-0 p-0 focus:ring-0"
                />
              </div>
            </div>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-primary hover:bg-primary-dull text-white font-semibold shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/30 transition-all"
            >
              <img src={assets.search_icon} alt="" className="w-4 h-4 brightness-0 invert" />
              Search
            </button>
          </div>
        </div>
      </form>

      <img 
        src={assets.main_car} 
        alt="Car" 
        className="max-h-40 sm:max-h-56 md:max-h-64 lg:max-h-72 w-auto object-contain drop-shadow-2xl" 
      />
    </section>
  )
}

export default Hero