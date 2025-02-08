import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import { Toaster } from 'react-hot-toast';
import RegisterPage from './pages/RegisterPage';
import DashboardLoginPage from './pages/DashboardLoginPage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import ServicePage from './pages/ServicePage';
import ContactPage from './pages/ContactPage';
import DashboardPage from './pages/DashboardPage';
import PrivateRoute from './components/PrivateRoute';
import BlogSettingPage from './pages/BlogSettingPage';
import ServiceSettingPage from './pages/ServiceSettingPage';
import TeamSettingPage from './pages/TeamSettingPage';
import ContactSettingPage from './pages/ContactSettingPage';
function App() {
  return (
    <BrowserRouter>
    <Toaster position='bottom-center' reverseOrder={false} />
          <Routes>
          <Route exact path='/' element={<HomePage/>} />
          <Route exact path='/register' element={<RegisterPage/>} />
          <Route exact path='/dashboard-login' element={<DashboardLoginPage/>} />  
          <Route exact path='/dashboard' element={
            <PrivateRoute>
            <DashboardPage/>
            </PrivateRoute>
            } />  
          <Route exact path='/dashboard/blog-setting' element={
            <PrivateRoute>
            <BlogSettingPage/>
            </PrivateRoute>
            } />  
          <Route exact path='/dashboard/service-setting' element={
            <PrivateRoute>
            <ServiceSettingPage/>
            </PrivateRoute>
            } />  
          <Route exact path='/dashboard/team-setting' element={
            <PrivateRoute>
            <TeamSettingPage/>
            </PrivateRoute>
            } />  
          <Route exact path='/dashboard/contact-setting' element={
            <PrivateRoute>
            <ContactSettingPage/>
            </PrivateRoute>
            } />  
          <Route exact path='/about' element={<AboutPage/>} />  
          <Route exact path='/blog' element={<BlogPage/>} />  
          <Route exact path='/service' element={<ServicePage/>} />  
          <Route exact path='/contact' element={<ContactPage/>} />  
          </Routes>
    </BrowserRouter>
  );
}

export default App;
