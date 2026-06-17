import React from 'react'
import { useId } from 'react'

const Select = ({
    options,
    label,
    className,
    ...props
}, ref) => {
  const id = useId()

  return (
    <div className='w-full'>
      {label && 
        <label htmlFor={id} className='inline-block mb-2'></label>}
        <select
        {...props}
        id={id}
        ref={ref}
        className={`px-3 py-2 border rounded-lg w-full bg-White 
        text-black outline-none foucus:bg-gray-50 duration-200 ${className}`}>

        {options?.map((option) => (
            <option key={option} value={option}>
                {option}
            </option>
            ))}
        </select>
    </div>
  )
}

export default React.forwardRef(Select)
