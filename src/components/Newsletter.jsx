import React from 'react'

export default function Newsletter() {
  return (
    <section className="py-16 lg:py-20 px-4 bg-white">
      <div className="max-w-2xl mx-auto text-center">
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary bg-primary/10 rounded-full px-3 py-1.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          Travel smart
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-5">Ready to explore Sri Lanka?</h2>
        <p className="text-slate-500 mt-4">
          Get seasonal discounts on KDH vans and self-drive cars. First to know about rates for Negombo, Galle, Kandy & Colombo.
        </p>
        <form className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-slate-800 placeholder-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all"
            required
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-primary hover:bg-primary-dull text-white font-semibold shadow-md shadow-primary/20 hover:shadow-lg transition-all"
          >
            Get offers
          </button>
        </form>
        <p className="text-xs text-slate-400 mt-4">Unsubscribe anytime. We respect your privacy.</p>
      </div>
    </section>
  )
}
