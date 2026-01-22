import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          <div className="lg:col-span-5 flex flex-col">
            <a href="/" className="inline-flex items-center gap-2 mb-6">
              <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
              </svg>
              <span className="text-xl font-bold text-white">Lanka<span className="text-primary">Ride</span></span>
            </a>
            <div className="w-24 h-px bg-slate-600 mb-6" />
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Premium car rental across Sri Lanka. From city cars to luxury vans for Negombo, Galle, Kandy & Colombo. Best rates, no hidden fees.
            </p>
            <p className="text-sm text-slate-500 mt-4">📍 No. 125, Galle Road, Colombo 03</p>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Quick links</h3>
            <ul className="space-y-2.5">
              {['Our Fleet', 'Airport Pickup', 'Self Drive', 'Wedding Cars', 'Contact'].map((l) => (
                <li key={l}>
                  <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Connect</h3>
            <ul className="space-y-2.5">
              <li><a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">WhatsApp (+94)</a></li>
              <li><a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Facebook</a></li>
              <li><a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Instagram</a></li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Offers</h3>
            <p className="text-xs text-slate-500 mb-4">Seasonal discounts for long-term rentals.</p>
            <div className="flex rounded-xl overflow-hidden border border-slate-700 bg-slate-800/50 h-11">
              <input type="email" placeholder="Email" className="flex-1 min-w-0 px-4 bg-transparent text-sm text-white placeholder-slate-500 outline-none" />
              <button type="button" className="px-4 text-sm font-medium text-white bg-primary hover:bg-primary-dull transition-colors">Join</button>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">© 2025 LankaRide. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-slate-500 hover:text-slate-400 transition-colors">Terms</a>
            <a href="#" className="text-xs text-slate-500 hover:text-slate-400 transition-colors">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
