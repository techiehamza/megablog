import React, { useId } from 'react'

const Input = React.forwardRef(function Input({
    label,
    type = 'text',
    className = '',
    ...props
}, ref) {
    const id = useId()
    return (
        <div className='w-full'>
            {label && 
            <label htmlFor={id}
                className='inline-block mb-2'>
                {label}
            </label>
            }
            <input
                type={type} 
                className={`px-3 py-2 border rounded-lg w-full bg-White 
                    text-black outline-none 
                    foucus:bg-gray-50 duration-200 
                    border border-gray-300 ${className}`
                }
                ref={ref}
                {...props}
                id={id}
            />
        </div>
    )
})

export default Input