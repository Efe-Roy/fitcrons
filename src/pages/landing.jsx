import React from 'react'
// import imgHeaderF from '../assets/hero/1.jpeg'
import Layout from '../components/Layout'
import About from '../components/organs/About'
import Membership from '../components/organs/Membership'
import Offers from '../components/organs/Offers'
import Calculator from '../components/organs/Calculator'
import Blogs from '../components/organs/Blogs'
import Contact from '../components/organs/Contact'
import HeroHeader from '../components/organs/HeroHeader'

const imgHeaderF = '/static/general/hero/1.jpeg'

const Landing = () => {
  return (
    <Layout>
      
      <HeroHeader />
      <About />
      <Offers />
      <Membership />
      <Calculator />
      <Blogs />
      <Contact />

    </Layout>
  )
}

export default Landing