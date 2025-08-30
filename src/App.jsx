import React from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Services from './components/Services'
import About from './components/About'
import Tips from './components/Tips'
import BookAppointment from './components/BookAppointment'
import WhatsAppButton from './components/WhatsAppButton'
import Testimonial from './components/Testimonial'
import Footer from './components/Footer'

const App = () => {
  return (
    <div>
      <Header />
      <Hero />
      <Services />
      <About />
      <Tips />
      <BookAppointment />
      <WhatsAppButton />
      <Testimonial />
      <Footer />
    </div>
  )
}

export default App
