import React from 'react'
import MasterLayout from './../masterLayout/MasterLayout';
import HeroSection from './../components/HeroSection';
import BlogCard from '../components/BlogCard';

const HomePage = () => {
  return (
    <MasterLayout>
      <HeroSection/>
      <BlogCard/>
    </MasterLayout>
  )
}

export default HomePage