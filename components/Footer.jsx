import React from 'react'

const Footer = () => {
  return (
    <div style={{marginTop:20}}>
    <footer className="footer sm:footer-horizontal footer-center bg-primary-300 text-base-content p-4">
    <aside>
      <p>Copyright © {new Date().getFullYear()} - All right reserved by Promptopia</p>
    </aside>
  </footer>
    </div>
  )
}

export default Footer