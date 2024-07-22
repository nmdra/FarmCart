import { Outlet } from 'react-router-dom'
import NavBar from '../Components/NavBar'

function MainLayout() {
  return (
    <>
        <NavBar />
        <Outlet />
    </>
    
  )
}

export default MainLayout