import React from 'react'
// import imgHeaderF from '../assets/hero/1.jpeg'
import Layout from '../components/Layout'
import About from '../components/organs/About'
import Membership from '../components/organs/Membership'
import Offers from '../components/organs/Offers'
import Calculator from '../components/organs/Calculator'
import Blogs from '../components/organs/Blogs'
import Contact from '../components/organs/Contact'

const imgHeaderF = '/static/general/hero/1.jpeg'

const Landing = () => {
  return (
    <Layout>
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
            <img className="object-cover object-center rounded" alt="hero" src={imgHeaderF} />
          </div>
          <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <h4 className='text-base font-semibold mb-4 text-brightRed'>BEST FITNESS IN THE TOWN</h4>
            <h1 className='text-7xl font-extrabold text-white mb-4'><span className='text-stroke-1'>MAKE</span> YOUR BODY SHAPE</h1>

            <p className="mb-8 leading-relaxed">Copper mug try-hard pitchfork pour-over freegan heirloom neutra air plant cold-pressed tacos poke beard tote bag. Heirloom echo park mlkshk tote bag selvage hot chicken authentic tumeric truffaut hexagon try-hard chambray.</p>
            <div className="flex justify-center">
              <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Button</button>
              <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">Button</button>
            </div>
          </div>
        </div>
      </section>
      
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