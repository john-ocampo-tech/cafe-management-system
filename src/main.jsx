import React from 'react'
import ReactDOM from 'react-dom/client'

// This hooks React directly into your index.html <div id="root"></div>
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div style={{ 
      fontFamily: 'sans-serif', 
      padding: '40px', 
      textAlign: 'center',
      backgroundColor: '#f9f6f0',
      minHeight: '100vh'
    }}>
      <h1 style={{ color: '#4a3728' }}>☕ Cafe Management System</h1>
      <p style={{ color: '#7c6046' }}>Your enterprise-grade React architecture is officially live.</p>
    </div>
  </React.StrictMode>,
)