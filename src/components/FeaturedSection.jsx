import React, { useState, useEffect } from 'react'
import Title from './Title'
import { dummyCarData, assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import Carcards from './Carcards'
import { getOwnerCars } from '../utils/ownerStore'

const FeaturedSection = () => {
  const navigate = useNavigate()
  const [allCars, setAllCars] = useState([])

  useEffect(() => {
    // Get owner-added cars from localStorage
    const ownerCars = getOwnerCars()
    
    // Combine owner cars with dummy data (owner cars first to show newest)
    const combinedCars = [...ownerCars, ...dummyCarData]
    
    setAllCars(combinedCars)
  }, [])

  return (
    <section className="py-16 lg:py-24 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24">
      <Title
        title="Featured vehicles"
        subTitle="Premium cars and vans for city trips, holidays, and business travel across Sri Lanka."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-12 max-w-7xl mx-auto">
        {allCars.slice(0, 6).map((car) => (
          <div key={car._id}>
            <Carcards car={car} />
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-14">
        <button
          onClick={() => {
            navigate('/cars')
            scrollTo(0, 0)
          }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 font-medium hover:bg-slate-50 hover:border-slate-300 transition-all"
        >
          View all cars
          <img src={assets.arrow_icon} alt="" className="w-4 h-4" />
        </button>
      </div>
    </section>
  )
}

export default FeaturedSection