import React from 'react'

const Title = ({ title, subTitle, align, badge = 'Fleet & services' }) => {
  return (
    <div
      className={`flex flex-col justify-center items-center text-center py-4 ${
        align === 'left' ? 'md:items-start md:text-left' : ''
      }`}
    >
      {badge && <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-2">{badge}</p>}
      <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">{title}</h2>
      {subTitle && <p className="text-slate-500 text-base mt-2 max-w-lg">{subTitle}</p>}
    </div>
  )
}

export default Title
