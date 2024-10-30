"use client";
import "@/app/_styles/globals.css";
import Sidebar from "./components/sidebar.js";
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';

export default function RootLayout({ children }) {
  const [isOpen, setIsOpen] = useState(true); 

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen">
          <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
          <main className={`flex-1 p-6 bg-gray-100 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-0'}`}>
            {!isOpen && (
              <IconButton 
                onClick={toggleSidebar} 
                sx={{
                  position: 'fixed', 
                  top: 20, 
                  left: 20, 
                  backgroundColor: '#37474F', 
                  color: 'black', 
                  zIndex: 1300,
                }}
              >
                <MenuIcon />
              </IconButton>
            )}
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
