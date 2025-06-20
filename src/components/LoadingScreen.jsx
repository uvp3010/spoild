// src/components/LoadingScreen.js
import { motion } from 'framer-motion';

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

export default LoadingScreen;