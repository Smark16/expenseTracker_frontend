import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import tracker from '../images/tracker.png'
import './Landing.css'

function Expense() {
  return (
    <div className="landing-container">
    <header className="landing-header">
      <h1>Welcome to RECEPTO Pro</h1>
      <p>Track your expenses effortlessly on the go.</p>
    </header>
    <main className="landing-main">
      <div className="row">
        <div className="col-md-6 col-sm-12">
        <section className="feature">
        <h2>Real-Time Tracking</h2>
        <p>Update and monitor your expenses in real-time.</p>
      </section>
      <section className="feature">
        <h2>Insights & Reports</h2>
        <p>Get insights into your spending habits with detailed reports.</p>
      </section>
      <section className="feature">
        <h2>Secure & Private</h2>
        <p>Your financial data is encrypted and kept private.</p>
      </section>
        </div>

        <div className="col-md-6 col-sm-12">
          <img src={tracker}></img>
        </div>
      </div>
     
    </main>

    <footer className="bg-gray-200 text-center lg:text-left">
      <div className="text-gray-700 text-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © {new Date().getFullYear()} Expense Tracker, Inc. All rights reserved.
      </div>
      <div className="flex justify-center items-center lg:justify-between p-6 border-b border-gray-300">
        <div className="mr-12 hidden lg:block">
          <span>Get connected with us on social networks:</span>
        </div>
        <div className="flex justify-center">
          <a href="#!" className="mr-6 text-gray-600">
            <FaFacebook />
          </a>
          <a href="#!" className="mr-6 text-gray-600">
            <FaTwitter />
          </a>
          <a href="#!" className="mr-6 text-gray-600">
            <FaInstagram />
          </a>
          <a href="#!" className="mr-6 text-gray-600">
            <FaLinkedin />
          </a>
        </div>
      </div>
      <div className="text-gray-700 p-4 text-center">
        <div className="flex justify-center items-center lg:justify-between">
          <div className="mr-12 hidden lg:block">
            <h6 className="uppercase font-semibold mb-4 flex justify-center lg:justify-start">
              Useful Links
            </h6>
            <p className="mb-4">
              <a href="#!" className="text-gray-600">About Us</a>
            </p>
            <p>
              <a href="#!" className="text-gray-600">Contact</a>
            </p>
          </div>
          <div className="mx-auto lg:mx-0">
            <h6 className="uppercase font-semibold mb-4 flex justify-center lg:justify-start">
              Legal
            </h6>
            <p className="mb-4">
              <a href="#!" className="text-gray-600">Terms of Use</a>
            </p>
            <p>
              <a href="#!" className="text-gray-600">Privacy Policy</a>
            </p>

            <p>
              <a href="#!" className="text-gray-600">Smark Products</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  </div>
  )
}

export default Expense
