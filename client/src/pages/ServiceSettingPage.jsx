import React from 'react'
import MenuBar from '../components/MenuBar'
import DashboardLayout from '../masterLayout/DashboardLayout'
import ServiceSetting from '../components/dashboardComponents/ServiceSetting'

const ServiceSettingPage = () => {
  return (
    <>
    <MenuBar/>
    <DashboardLayout>
      <ServiceSetting/>
    </DashboardLayout>
    </>
  )
}

export default ServiceSettingPage