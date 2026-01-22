import React from 'react'

const cardsData = [
  { image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200', name: 'Kasun Jayasuriya', handle: '@kasun_j', comment: 'Rented a Toyota Axio for 5 days. The vehicle was in top condition and very clean. The airport pickup was right on time.' },
  { image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200', name: 'Dilshan Madushanka', handle: '@dilshan_m', comment: 'Best rates in Colombo. I booked a WagonR for a week and it was very fuel efficient. No hidden charges at all.' },
  { image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60', name: 'Chamara Perera', handle: '@chamara_p', comment: 'Excellent service. We hired a KDH van for a family trip to Kandy. The driver was very safe and polite.' },
  { image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60', name: 'Nuwan Pradeep', handle: '@nuwan_rides', comment: 'Seamless booking process. The car was exactly as shown in the photos. Will definitely rent again.' },
]

const TestimonialCard = ({ card }) => (
  <div className="flex-shrink-0 w-72 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex gap-3">
      <img src={card.image} alt={card.name} className="w-11 h-11 rounded-full object-cover" />
      <div>
        <div className="flex items-center gap-1.5">
          <p className="font-semibold text-slate-900 text-sm">{card.name}</p>
          <svg className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 12 12"><path fillRule="evenodd" clipRule="evenodd" d="M4.555.72a4 4 0 0 1-.297.24c-.179.12-.38.202-.59.244a4 4 0 0 1-.38.041c-.48.039-.721.058-.922.129a1.63 1.63 0 0 0-.992.992c-.071.2-.09.441-.129.922a4 4 0 0 1-.041.38 1.6 1.6 0 0 1-.245.59 3 3 0 0 1-.239.297c-.313.368-.47.551-.56.743-.213.444-.213.96 0 1.404.09.192.247.375.56.743.125.146.187.219.24.297.12.179.202.38.244.59.018.093.026.189.041.38.039.48.058.721.129.922.163.464.528.829.992.992.2.071.441.09.922.129.191.015.287.023.38.041.21.042.411.125.59.245.078.052.151.114.297.239.368.313.551.47.743.56.444.213.96.213 1.404 0 .192-.09.375-.247.743-.56.146-.125.219-.187.297-.24.179-.12.38-.202.59-.244a4 4 0 0 1 .38-.041c.48-.039.721-.058.922-.129.464-.163.829-.528.992-.992.071-.2.09-.441.129-.922a4 4 0 0 1 .041-.38c.042-.21.125-.411.245-.59.052-.078.114-.151.239-.297.313-.368.47-.551.56-.743.213-.444.213-.96 0-1.404-.09-.192-.247-.375-.56-.743a4 4 0 0 1-.24-.297 1.6 1.6 0 0 1-.244-.59 3 3 0 0 1-.041-.38c-.039-.48-.058-.721-.129-.922a1.63 1.63 0 0 0-.992-.992c-.2-.071-.441-.09-.922-.129a4 4 0 0 1-.38-.041 1.6 1.6 0 0 1-.59-.245A3 3 0 0 1 7.445.72C7.077.407 6.894.25 6.702.16a1.63 1.63 0 0 0-1.404 0c-.192.09-.375.247-.743.56m4.07 3.998a.488.488 0 0 0-.691-.69l-2.91 2.91-.958-.957a.488.488 0 0 0-.69.69l1.302 1.302c.19.191.5.191.69 0z" /></svg>
        </div>
        <span className="text-xs text-slate-500">{card.handle}</span>
      </div>
    </div>
    <p className="text-sm text-slate-600 mt-4 leading-relaxed">{card.comment}</p>
  </div>
)

export default function Testimonial() {
  return (
    <div className="py-16 bg-slate-50/80 overflow-hidden">
      <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .marquee { animation: marquee 32s linear infinite; }
        .marquee-reverse { animation-direction: reverse; animation-duration: 30s; }
      `}</style>
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
        <div className="marquee flex gap-4 min-w-max py-2">
          {[...cardsData, ...cardsData].map((c, i) => <TestimonialCard key={`a-${i}`} card={c} />)}
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />
      </div>
      <div className="relative mt-6">
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
        <div className="marquee marquee-reverse flex gap-4 min-w-max py-2">
          {[...cardsData, ...cardsData].map((c, i) => <TestimonialCard key={`b-${i}`} card={c} />)}
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />
      </div>
    </div>
  )
}
