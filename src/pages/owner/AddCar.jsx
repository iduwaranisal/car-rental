import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import { getOwnerCars, setOwnerCars, uid } from '../../utils/ownerStore'

const AddCar = () => {
  const [form, setForm] = useState({
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    category: 'Sedan',
    seating_capacity: 4,
    fuel_type: 'Petrol',
    transmission: 'Automatic',
    pricePerDay: 100,
    location: 'Colombo',
    image: assets.car_image1,
    description: '',
    isAvaliable: true,
  })

  const onChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((p) => ({
      ...p,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file')
        return
      }
      
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB')
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        setForm((p) => ({
          ...p,
          image: reader.result,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const cars = getOwnerCars()
    const newCar = {
      ...form,
      _id: uid('car'),
      createdAt: new Date().toISOString(),
      year: Number(form.year),
      seating_capacity: Number(form.seating_capacity),
      pricePerDay: Number(form.pricePerDay),
    }
    setOwnerCars([newCar, ...cars])
    setForm((p) => ({ 
      ...p, 
      brand: '', 
      model: '', 
      description: '',
      image: assets.car_image1
    }))
    const fileInput = document.querySelector('input[type="file"]')
    if (fileInput) fileInput.value = ''
    alert('Car added (stored in localStorage).')
  }

  return (
    <div className='w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8'>
      <div className='max-w-5xl mx-auto'>
        <div className='mb-6 sm:mb-8'>
          <p className='text-2xl sm:text-3xl font-semibold text-gray-800'>Add Car</p>
          <p className='text-sm sm:text-base text-gray-500 mt-1'>Create a new car listing (mock, stored locally).</p>
        </div>

        <form onSubmit={onSubmit} className='bg-white rounded-2xl shadow-lg p-6 sm:p-8 lg:p-10 border border-slate-200 space-y-6'>
          
          {/* Brand and Model */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Brand</label>
              <input
                name='brand'
                value={form.brand}
                onChange={onChange}
                className='w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all'
                placeholder='e.g. Toyota'
                required
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Model</label>
              <input
                name='model'
                value={form.model}
                onChange={onChange}
                className='w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all'
                placeholder='e.g. Corolla'
                required
              />
            </div>
          </div>

          {/* Year, Seats, Price */}
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Year</label>
              <input
                type='number'
                name='year'
                value={form.year}
                onChange={onChange}
                className='w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all'
                min='1990'
                max='2100'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Seats</label>
              <input
                type='number'
                name='seating_capacity'
                value={form.seating_capacity}
                onChange={onChange}
                className='w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all'
                min='1'
                max='12'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Price / day</label>
              <input
                type='number'
                name='pricePerDay'
                value={form.pricePerDay}
                onChange={onChange}
                className='w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all'
                min='1'
              />
            </div>
          </div>

          {/* Category, Fuel, Transmission */}
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Category</label>
              <select
                name='category'
                value={form.category}
                onChange={onChange}
                className='w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-800 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all'
              >
                <option>Sedan</option>
                <option>SUV</option>
                <option>Hatchback</option>
                <option>Sports</option>
                <option>Van</option>
              </select>
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Fuel</label>
              <select
                name='fuel_type'
                value={form.fuel_type}
                onChange={onChange}
                className='w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-800 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all'
              >
                <option>Petrol</option>
                <option>Diesel</option>
                <option>Hybrid</option>
                <option>Electric</option>
              </select>
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Transmission</label>
              <select
                name='transmission'
                value={form.transmission}
                onChange={onChange}
                className='w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-800 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all'
              >
                <option>Automatic</option>
                <option>Manual</option>
                <option>Semi-Automatic</option>
              </select>
            </div>
          </div>

          {/* Location and Image */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Location</label>
              <input
                name='location'
                value={form.location}
                onChange={onChange}
                className='w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all'
                placeholder='City'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Image</label>
              <input
                type='file'
                accept='image/*'
                onChange={handleImageChange}
                className='w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-800 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 cursor-pointer'
              />
            </div>
          </div>

          {/* Image Preview */}
          {form.image && (
            <div className='w-full'>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Preview</label>
              <div className='w-full max-w-md'>
                <img 
                  src={form.image} 
                  alt='Car preview' 
                  className='w-full h-48 sm:h-56 object-cover rounded-xl border-2 border-slate-200 shadow-md'
                />
              </div>
            </div>
          )}

          {/* Description */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>Description</label>
            <textarea
              name='description'
              value={form.description}
              onChange={onChange}
              className='w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none min-h-32 transition-all resize-y'
              placeholder='Short description...'
            />
          </div>

          {/* Availability Checkbox */}
          <label className='flex items-center gap-3 text-sm sm:text-base text-gray-700 cursor-pointer'>
            <input 
              type='checkbox' 
              name='isAvaliable' 
              checked={form.isAvaliable} 
              onChange={onChange}
              className='w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500'
            />
            <span className='font-medium'>Available now</span>
          </label>

          {/* Submit Button */}
          <div className='pt-4'>
            <button 
              type="submit" 
              className='w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 active:scale-95'
            >
              Add Car
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddCar