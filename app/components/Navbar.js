'use client';

import Link from 'next/link';
import { useState } from 'react';
import LoginModal from './LoginModal';
import { useAuth } from '@/app/lib/authContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { user } = useAuth();

  return (
    <nav className="bg-purple-700 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Name */}
          <Link href="/" className="text-lg md:text-2xl font-bold hover:text-pink-400 transition-colors duration-300 truncate">
            Jaylen Marshall
          </Link>
          
          {/* Desktop Navigation links */}
          <div className="hidden md:flex gap-8 items-center">
            <Link href="/" className="text-base font-medium hover:text-pink-400 transition-all duration-300 hover:scale-110">
              Home
            </Link>
            <Link href="/about" className="text-base font-medium hover:text-pink-400 transition-all duration-300 hover:scale-110">
              About
            </Link>
            <Link href="/projects" className="text-base font-medium hover:text-pink-400 transition-all duration-300 hover:scale-110">
              Projects
            </Link>
            <Link href="/contact" className="text-base font-medium hover:text-pink-400 transition-all duration-300 hover:scale-110">
              Contact
            </Link>
            <button
              onClick={() => setShowLoginModal(true)}
              className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105"
            >
              {user ? '✓ Logged In' : 'Login'}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-purple-800 rounded transition-colors duration-300"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link 
              href="/" 
              className="block px-4 py-2 hover:bg-purple-800 rounded transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className="block px-4 py-2 hover:bg-purple-800 rounded transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/projects" 
              className="block px-4 py-2 hover:bg-purple-800 rounded transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              Projects
            </Link>
            <Link 
              href="/contact" 
              className="block px-4 py-2 hover:bg-purple-800 rounded transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <button
              onClick={() => {
                setShowLoginModal(true);
                setIsOpen(false);
              }}
              className="w-full text-left bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded transition-colors duration-300"
            >
              {user ? '✓ Logged In' : 'Login'}
            </button>
          </div>
        )}
      </div>

      {/* Login Modal */}
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
    </nav>
  );
}