import React from 'react'
import './button.css'

const VARIANT_CLASSES = {
  primary: 'bg-indigo-600 text-white hover:bg-indigo-700',
  outline: 'border border-indigo-600 text-indigo-600 bg-transparent hover:bg-indigo-50',
  white: 'bg-white text-black hover:bg-gray-100',
  maroon: "bg-[#800000] text-white hover:bg-[#660000]",
  orange: "bg-[#993404] text-white hover:bg-[#7a2f03]",
}

export default function Button({
  children,
  variant = 'primary',
  as = undefined,
  href = undefined,
  className = '',
  onClick = undefined,
  type = 'button',
  ...rest
}) {
  const base = 'btn inline-flex items-center justify-center rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variantClass = VARIANT_CLASSES[variant] || VARIANT_CLASSES.primary;
  const combined = `${base} ${variantClass} ${className}`.trim();

  if (href || as === 'a') {
    return (
      <a href={href} className={combined} onClick={onClick} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} className={combined} onClick={onClick} {...rest}>
      {children}
    </button>
  )
}
