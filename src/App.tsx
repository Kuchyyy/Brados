import './App.css'
import Navbar from './components/Navbar'
import Page from './components/Page'
import Hero from './components/Hero'
import Trusted  from './components/Trusted'
import Offer from './components/Offer'
import Team1 from './components/Team1'
import About from './components/About'
import Layout from './components/Layout'

function App() {

  return (
    <>
      <Layout />
      <Navbar />
      <Hero />
      <Trusted />
      <Offer />
      <Team1 />
      <About />
      <Page />
      <Page />
    </>
  )
}

export default App
