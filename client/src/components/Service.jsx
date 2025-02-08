import React from 'react'
import TeamMemberCard from './TeamMemberCard'
import ServiceCard from './ServiceCard';

const Service = () => {
  return (
    <div className='container mx-auto'>
        <div className="container mx-auto p-4 md:p-0">
      <section className="py-12 md:py-20">
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-6">Our Services</h1>
        <div className="md:flex md:items-center md:space-x-12">
        </div>
      </section>
      <section className="py-12 md:py-20 bg-gray-100"> 
        <div>
        <ServiceCard/>
          {/* Repeat the above card for other team members */}
        </div>
      </section>
    </div>
    </div>
  )
}

export default Service