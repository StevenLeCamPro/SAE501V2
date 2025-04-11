
import Header from "./components/Header.jsx"
import Footer from "./components/Footer.jsx"
import { Outlet } from 'react-router-dom'
import { FlashMessageProvider } from './context/FlashMessageContext';

function App() {


  return (
    <>
      <FlashMessageProvider>
      <Header />
      <Outlet />
      <Footer />
      </FlashMessageProvider>
    </>
  )
}

export default App
