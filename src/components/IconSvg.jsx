import React from 'react'

const IconSvg = ({ children, className = "h-9 w-9" }) => {
  return (
     <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

export default IconSvg;