import React from 'react'
import DashboardMenu from '../components/dashboardComponents/DashboardMenu'

const DashboardLayout = ({children}) => {
  return (
    <>
      {/* MenuBar */}
      <DashboardMenu/>

      <div>{children}</div>
    </>
  )
}

export default DashboardLayout