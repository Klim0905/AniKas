import { Route, Routes } from "react-router-dom"
import { HomePage, ProfilePage, SchedulePage, AnimePage, RegisterPage, LoginPage } from "./pages"
import { Layout } from "./components"

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout /> }>
          <Route path="/" element={<HomePage />} index/> 
          <Route path="/schedule" element={<SchedulePage />}/> 
          <Route path="/profile" element={<ProfilePage />}/>  
          <Route path="/login" element={<LoginPage />}/>  
          <Route path="/register" element={<RegisterPage />}/>  
          <Route path="/anime/:code" element={<AnimePage />}/>
        </Route>
      </Routes>
    </>
  )
}

