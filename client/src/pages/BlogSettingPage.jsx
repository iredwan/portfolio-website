import React from 'react'
import MenuBar from '../components/MenuBar'
import DashboardLayout from '../masterLayout/DashboardLayout'
import BlogSetting from '../components/dashboardComponents/BlogSetting'

const BlogSettingPage = () => {
  return (
    <>
    <MenuBar/>
    <DashboardLayout>
      <BlogSetting/>
    </DashboardLayout>
    </>
  )
}

export default BlogSettingPage