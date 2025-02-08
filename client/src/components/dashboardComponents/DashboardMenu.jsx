import React from 'react'
import { Link } from 'react-router-dom'

const DashboardMenu = () => {
  return (
    <>
      <div className="container mx-auto mt-3">
      <div>
      <div className='grid grid-cols-12 gap-[50px] text-center'>
        <div className='col-span-3'>
          <Link to='/dashboard/blog-setting'>
            <button className='p-2 bg-blue-500 text-white rounded-md'>Blog setting</button>
          </Link>
        </div>
        <div className='col-span-3'>
          <Link to='/dashboard/service-setting'>
            <button className='p-2 bg-blue-500 text-white rounded-md'>Service  setting</button>
          </Link>
        </div>
        <div className='col-span-3'>
          <Link to='/dashboard/contact-setting'>
            <button className='p-2 bg-blue-500 text-white rounded-md'>Contact setting</button>
          </Link>
        </div>
        <div className='col-span-3'>
          <Link to='/dashboard/team-setting'>
            <button className='p-2 bg-blue-500 text-white rounded-md'>Team setting</button>
          </Link>
        </div>
      </div>
      </div>
      </div>
    </>

  )
}

export default DashboardMenu