// src/App.js
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css'
// SVG Icons Component
const SvgIcons = () => (
  <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
    <symbol id="search-icon" viewBox="0 0 24 24">
      <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
    </symbol>
    <symbol id="cart-icon" viewBox="0 0 24 24">
      <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
    </symbol>
    <symbol id="menu-icon" viewBox="0 0 24 24">
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
    </symbol>
    <symbol id="close-icon" viewBox="0 0 24 24">
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
    </symbol>
  </svg>
);

// Navbar Component with fixed icons
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed w-full z-50 bg-white/90 backdrop-blur-sm py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-2xl font-serif tracking-widest"
          >
            ÉTHER
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-10">
            {['New Arrivals', 'Collections', 'About', 'Journal'].map((item) => (
              <motion.a
                key={item}
                href="#"
                className="text-sm uppercase tracking-wider hover:text-gray-600 transition-colors"
                whileHover={{ y: -2 }}
              >
                {item}
              </motion.a>
            ))}
          </nav>

          {/* Icons - Using SVG symbols */}
          <div className="flex items-center space-x-6">
            <button className="p-1 hover:opacity-70 transition-opacity">
              <svg className="w-6 h-6 text-gray-800">
                <use href="#search-icon" />
              </svg>
            </button>
            <button className="p-1 hover:opacity-70 transition-opacity">
              <svg className="w-6 h-6 text-gray-800">
                <use href="#cart-icon" />
              </svg>
            </button>
            <button 
              className="p-1 md:hidden hover:opacity-70 transition-opacity" 
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <svg className="w-6 h-6 text-gray-800">
                  <use href="#close-icon" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-gray-800">
                  <use href="#menu-icon" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t mt-4"
          >
            <div className="px-4 py-5 space-y-4">
              {['New Arrivals', 'Collections', 'About', 'Journal'].map((item) => (
                <a 
                  key={`mobile-${item}`} 
                  href="#" 
                  className="block text-lg uppercase tracking-wide py-2 border-b border-gray-100"
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

// Hero Section
const Hero = () => {
  return (
    <section className="min-h-screen flex items-center pt-20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h1 className="text-5xl md:text-7xl font-serif tracking-tight leading-tight">
            Modern Elegance <br />
            <span className="text-gray-500">Reimagined</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-md">
            Sustainable luxury clothing designed for the contemporary spirit. 
            Crafted with intention, worn with purpose.
          </p>
          <div className="flex space-x-4 pt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-black text-white px-8 py-3 text-sm uppercase tracking-widest"
            >
              Shop Collection
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="border border-black px-8 py-3 text-sm uppercase tracking-widest"
            >
              Lookbook
            </motion.button>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl w-full h-[500px] overflow-hidden relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-gray-100 border-2 border-dashed rounded-xl w-[80%] h-[80%]" />
            </div>
          </div>
          <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gray-50 border rounded-lg"></div>
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-gray-900 rounded-lg"></div>
        </motion.div>
      </div>
    </section>
  );
};

// Product Showcase
const ProductShowcase = () => {
  const products = [
    { id: 1, name: 'Organic Cotton Tee', price: '$78', category: 'Tops' },
    { id: 2, name: 'Linen Wide Pants', price: '$145', category: 'Bottoms' },
    { id: 3, name: 'Recycled Wool Coat', price: '$320', category: 'Outerwear' },
  ];

  return (
    <section className="py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-serif"
          >
            Featured Pieces
          </motion.h2>
          <p className="text-gray-600 max-w-lg mx-auto mt-4">
            Our signature collection showcasing exceptional craftsmanship and sustainable materials
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden mb-4 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="bg-white py-3 px-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm uppercase tracking-widest shadow-lg">
                    Quick View
                  </button>
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-medium">{product.name}</h3>
                <p className="text-gray-600">{product.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Collections Section
const Collections = () => {
  const collections = [
    { id: 1, name: 'Spring Collection', description: 'Lightweight fabrics for warmer days' },
    { id: 2, name: 'Essentials', description: 'Timeless pieces for everyday wear' },
    { id: 3, name: 'Sustainable Line', description: 'Eco-friendly materials and processes' },
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-serif"
          >
            Our Collections
          </motion.h2>
          <p className="text-gray-600 max-w-lg mx-auto mt-4">
            Explore our curated selections for every season and occasion
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative overflow-hidden rounded-xl group"
            >
              <div className="bg-gradient-to-br from-gray-200 to-gray-300 h-96 rounded-xl" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-2xl font-serif text-white">{collection.name}</h3>
                <p className="text-gray-200 mt-2">{collection.description}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="mt-4 border border-white text-white py-2 px-6 text-sm uppercase tracking-widest self-start"
                >
                  View Collection
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Sustainability Section
const Sustainability = () => {
  return (
    <section className="py-28 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-gradient-to-br from-gray-800 to-gray-700 h-[500px] rounded-xl" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h2 className="text-4xl font-serif">Ethical Craftsmanship</h2>
            <p className="text-gray-300">
              At ÉTHER, sustainability is woven into every thread. We believe in creating clothing 
              that respects both people and planet, without compromising on style or quality.
            </p>
            <div className="space-y-4 pt-4">
              <div className="flex items-start space-x-4">
                <div className="bg-gray-700 rounded-full p-2 mt-1">
                  <div className="w-6 h-6 bg-gray-300 rounded-full" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Organic Materials</h3>
                  <p className="text-gray-400">Sourced from certified ethical suppliers</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-gray-700 rounded-full p-2 mt-1">
                  <div className="w-6 h-6 bg-gray-300 rounded-full" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Fair Wages</h3>
                  <p className="text-gray-400">Ensuring living wages for all artisans</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-gray-700 rounded-full p-2 mt-1">
                  <div className="w-6 h-6 bg-gray-300 rounded-full" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Low Impact</h3>
                  <p className="text-gray-400">Minimizing water and energy consumption</p>
                </div>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="mt-6 border border-white text-white px-8 py-3 text-sm uppercase tracking-widest"
            >
              Our Sustainability Promise
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Newsletter Section
const Newsletter = () => {
  const [email, setEmail] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for subscribing with: ${email}`);
    setEmail('');
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-serif">Join Our Community</h2>
          <p className="text-gray-600">
            Subscribe to receive updates on new collections, exclusive offers, and style inspiration
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="px-4 py-3 border border-gray-300 flex-grow rounded focus:outline-none focus:ring-1 focus:ring-black"
              required
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-black text-white px-6 py-3 text-sm uppercase tracking-widest rounded"
            >
              Subscribe
            </motion.button>
          </form>
          <p className="text-xs text-gray-500 pt-2">
            By subscribing, you agree to our Privacy Policy and consent to receive updates.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-black text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <h3 className="text-2xl font-serif tracking-widest mb-4">ÉTHER</h3>
            <p className="text-gray-400 max-w-xs">
              Modern sustainable clothing for the conscious individual.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm uppercase tracking-widest mb-4">Shop</h4>
            <ul className="space-y-2 text-gray-400">
              {['New Arrivals', 'All Clothing', 'Accessories', 'Lookbook'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm uppercase tracking-widest mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              {['About Us', 'Sustainability', 'Careers', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm uppercase tracking-widest mb-4">Contact</h4>
            <address className="text-gray-400 not-italic">
              <p>123 Fashion Avenue</p>
              <p>New York, NY 10001</p>
              <p className="mt-2">hello@ether-fashion.com</p>
              <p>+1 (555) 123-4567</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-16 pt-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} ÉTHER. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Loading Screen
const LoadingScreen = () => {
  return (
    <motion.div 
      className="fixed inset-0 bg-white flex items-center justify-center z-50"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        animate={{ 
          rotate: 360,
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="w-16 h-16 border-t-2 border-black rounded-full"
      />
    </motion.div>
  );
};

// Main App Component
const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="font-sans bg-white text-gray-900">
      <SvgIcons />
      
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <Navbar />
          <Hero />
          <ProductShowcase />
          <Collections />
          <Sustainability />
          <Newsletter />
          <Footer />
        </>
      )}
    </div>
  );
};

export default App;