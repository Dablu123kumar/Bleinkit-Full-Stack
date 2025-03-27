import React from 'react'
import {FaFacebook} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className=' border-t h-5'>
        <div className=' container mx-auto p-4 text-center flex flex-col lg:flex-row lg:justify-between gap-2'>
              <p> © All Rights Resevred 2024.</p>
              <div className=' flex items-center gap-4 justify-center text-2xl'>
                <Link to='' className=' hover:text-primary-100'> <FaFacebook/> </Link>
                <Link to='' className=' hover:text-primary-100'> <FaInstagram /> </Link>
                <Link to='' className=' hover:text-primary-100'> <FaLinkedin /> </Link>
              
              </div>
        </div>
        
    </footer>
  )
}

export default Footer