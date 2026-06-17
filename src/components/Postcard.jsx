import React from 'react'
import { Link } from 'react-router-dom'
import appwrtieService from '../appwrite/config'

const Postcard = ({ $id, title, featuredImage }) => {
    return (
        <Link to={`/post/${$id}`} >
            <div className='w-full bg-gray-100 rounded-xl p-4'>
                <div className='w-full justify-center mb-4'>
                    <img src={appwrtieService.getFilePreview(featuredImage)} alt={title}  />
                </div>

                <h2 className='text-lg font-semibold'>{title}</h2>

            </div>
        </Link>
    )
}

export default Postcard