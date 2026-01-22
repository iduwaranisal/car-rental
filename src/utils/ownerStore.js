import { dummyCarData, dummyMyBookingsData } from '../assets/assets'

const CARS_KEY = 'owner.cars'
const BOOKINGS_KEY = 'owner.bookings'

export function getOwnerCars() {
  try {
    const raw = localStorage.getItem(CARS_KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    // ignore
  }
  setOwnerCars(dummyCarData)
  return dummyCarData
}

export function setOwnerCars(cars) {
  localStorage.setItem(CARS_KEY, JSON.stringify(cars))
}

export function getOwnerBookings() {
  try {
    const raw = localStorage.getItem(BOOKINGS_KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    // ignore
  }
  setOwnerBookings(dummyMyBookingsData)
  return dummyMyBookingsData
}

export function setOwnerBookings(bookings) {
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings))
}

export function uid(prefix = 'id') {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`
}

