import React from 'react'
import DashboardLayout from './../masterLayout/DashboardLayout';
import MenuBar from '../components/MenuBar';
import TeamSetting from '../components/dashboardComponents/TeamSetting';

const TeamSettingPage = () => {
  return (
    <>
    <MenuBar/>
    <DashboardLayout>
      <TeamSetting/>
    </DashboardLayout>
    </>
  )
}

export default TeamSettingPage