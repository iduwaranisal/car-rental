import React, { useMemo, useState, useEffect } from 'react'
import { assets, dummyCarData } from '../assets/assets'
import Title from '../components/Title'
import Carcards from '../components/Carcards'
import { getOwnerCars } from '../utils/ownerStore'
import { useSearchParams } from 'react-router-dom'

const Car = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [input, setInput] = useState(searchParams.get('q') || '')
  const [allCars, setAllCars] = useState([])

  useEffect(() => {
    // Combine dummy data with owner cars
    const ownerCars = getOwnerCars()
    const combined = [...dummyCarData, ...ownerCars]
    // Remove duplicates based on _id
    const uniqueCars = combined.filter((car, index, self) => 
      index === self.findIndex((c) => c._id === car._id)
    )
    setAllCars(uniqueCars)
  }, [])

  // Sync input with URL params
  useEffect(() => {
    const query = searchParams.get('q') || ''
    setInput(query)
  }, [searchParams])

  const handleSearch = (e) => {
    e.preventDefault()
    const query = input.trim()
    if (query) {
      setSearchParams({ q: query })
    } else {
      setSearchParams({})
    }
  }

  const filteredCars = useMemo(() => {
    const q = input.trim().toLowerCase()
    if (!q) return allCars
    return allCars.filter((car) => {
      const haystack = [car?.brand, car?.model, car?.category, car?.fuel_type, car?.transmission, car?.location]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
      return haystack.includes(q)
    })
  }, [input, allCars])

  return (
    <div className="min-h-screen bg-slate-50/50">
      <div className="flex flex-col items-center py-16 px-4">
        <Title title="Available cars" subTitle="Search by make, model, or features" />

        <form onSubmit={handleSearch} className="flex items-center w-full max-w-xl h-12 mt-8 px-5 rounded-xl bg-white border border-slate-200 shadow-sm focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10 transition-all">
          <img src={assets.search_icon} alt="" className="w-5 h-5 mr-3 text-slate-400" />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search by make, model, or features"
            className="flex-1 min-w-0 bg-transparent text-slate-700 placeholder-slate-400 outline-none"
          />
          <button
            type="submit"
            className="ml-2 px-4 py-2 bg-primary hover:bg-primary-dull text-white rounded-lg text-sm font-medium transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      <div className="px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 pb-20">
        <p className="text-slate-600 text-sm font-medium">
          Showing {filteredCars.length} car{filteredCars.length !== 1 ? 's' : ''}
        </p>
        {filteredCars.length === 0 ? (
          <div className="mt-12 text-center py-16">
            <img src={assets.car_image1} alt="" className="w-32 h-20 object-cover mx-auto mb-6 rounded-xl opacity-50" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No cars found</h3>
            <p className="text-slate-500 text-sm">
              {input.trim() 
                ? `No cars match your search "${input}". Try different keywords.`
                : 'No cars available at the moment.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-6 max-w-7xl">
            {filteredCars.map((car) => (
              <Carcards key={car._id} car={car} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Car
