import { useState } from 'react'
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import TopPromptsCard from '../components/TopPromptsCard';
import Footer from '../components/Footer';

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
            <div className="navbar bg-primary text-primary-content">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
     
            <li><a>Explore</a></li>
            <li><a>Create</a></li>
            <li><a>Liked</a></li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">
          <b >Promptopia</b>
        </a>
    
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
     
          <li><a>Explore</a></li>
          <li><a>Create</a></li>
          <li><a>Liked</a></li>
        </ul>
      </div>
      <div className="navbar-end">
      <SignedOut>
        <SignInButton className="btn"/>
        
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
     
      </div>
      </div>

      <div className="hero  min-h-screen ">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <img
      src="/logo-removebg-preview.png"
      className="max-w-sm rounded-lg shadow-2xl"
    />
    <div>
      <h1 className="text-5xl font-bold text-primary " style={{fontSize: 30}}> Discover and Share Prompts ✨</h1>
      <p className="py-6" style={{fontSize: 19, marginTop: 20}}>
        Promptopia is an open-source AI prompting tool for modern world to discover, create and share creative prompts.
      </p>
    </div>
  </div>
</div>

      <TopPromptsCard />
      <Footer />
    </>
  )
}

export default App

