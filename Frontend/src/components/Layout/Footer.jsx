import React from 'react'
import { Link } from 'react-router-dom'
import "./layout.css";

const Footer = () => {
  return (
    <div className='footer'>
        <h6 className='text-center'>
            All Right Reserved &copy;EcommreceApp
        </h6>
        <p className='text-center mt-3'>
            <Link to="/about">About me</Link> &nbsp;|&nbsp;
            <Link to="/contact">contact Us</Link>&nbsp;|&nbsp;
            <Link to="/privacy">Privacy & policy</Link>
        </p>
    </div>
  )
}

export default Footer