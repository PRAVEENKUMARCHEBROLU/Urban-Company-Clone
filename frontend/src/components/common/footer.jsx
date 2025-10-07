import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-10">
      <div className="container mx-auto px-4 text-center">
        <p className="mb-2">© {new Date().getFullYear()} YourAppName. All rights reserved.</p>
        <div className="flex justify-center space-x-4">
          <a href="/privacy" className="hover:text-gray-400">Privacy Policy</a>
          <a href="/terms" className="hover:text-gray-400">Terms of Service</a>
          <a href="/contact" className="hover:text-gray-400">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

