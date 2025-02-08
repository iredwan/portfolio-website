import React from 'react'
import MenuBar from '../components/MenuBar'
import DashboardLayout from '../masterLayout/DashboardLayout'
import ContactSetting from '../components/dashboardComponents/ContactSetting'

const ContactSettingPage = () => {
  return (
    <>
      <MenuBar/>
      <DashboardLayout>
        <ContactSetting/>
      </DashboardLayout>
    </>
  )
}

export default ContactSettingPage