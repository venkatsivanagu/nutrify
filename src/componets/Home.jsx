import React from 'react'
import Header from './Header'
import img2 from  '../images/image2.png'

const Home = () => {
  return (
    <>
    <div className='container home-container'>
      <Header/>
        <div className='home-header'>
            <div className='home-title'>
            <p className='tit'>bulid a <span style={{color:"red",fontWeight:"bold",fontStyle:"italic"}}>healthy</span></p>
            <p className='tit'>relationship</p>
            <p className='tit'>with food.</p>
            </div>
        {/* <iframe  width="560" height="315" src="https://www.youtube.com/embed/bwSJE7UqZf4?si=uI0AExWyS6a55Av0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> */}

        </div>
    
    </div>
    </>
  )
}

export default Home
