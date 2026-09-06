import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Scan, ShieldAlert } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [officerId, setOfficerId] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsAuthenticating(true);
    
    // Simulate a secure network check delay before routing
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };

  const textContainer = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const letter = {
    hidden: { opacity: 0, y: 5 },
    visible: { opacity: 1, y: 0 }
  };

  const titleText = "NETRA-i INTELLIGENCE";
  const subText = "Secure Criminal Network Analysis Platform";

  return (
    <div className="min-h-screen bg-dark-900 flex flex-col items-center justify-center relative overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-dark-800 via-dark-900 to-black p-4">
      
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md z-10"
      >
        <div className="flex flex-col items-center mb-8">
          <motion.div
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="p-4 bg-dark-800 rounded-2xl border border-dark-700 shadow-[0_0_30px_rgba(37,99,235,0.15)] mb-6"
          >
            <Scan size={48} className="text-accent-blue" />
          </motion.div>

          <motion.div 
            variants={textContainer}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <h1 className="text-3xl font-bold tracking-widest text-white mb-2 flex justify-center">
              {titleText.split('').map((char, index) => (
                <motion.span key={index} variants={letter}>
                  {char}
                </motion.span>
              ))}
            </h1>
            <p className="text-gray-400 font-mono text-xs uppercase tracking-widest">
              {subText}
            </p>
          </motion.div>
        </div>

        <form onSubmit={handleLogin} className="bg-dark-800 border border-dark-700 rounded-lg p-6 shadow-2xl relative overflow-hidden">
          
          {isAuthenticating && (
            <div className="absolute inset-0 bg-dark-800/90 backdrop-blur-sm z-20 flex flex-col items-center justify-center">
              <ShieldAlert className="animate-pulse text-accent-blue mb-3" size={32} />
              <p className="font-mono text-sm text-accent-blue tracking-widest">DECRYPTING...</p>
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label className="block text-xs font-mono text-gray-400 mb-1">OFFICER ID</label>
              <input 
                type="text" 
                required
                placeholder="e.g., NCRB-9921"
                className="w-full bg-dark-900 border border-dark-700 rounded p-3 text-white focus:outline-none focus:border-accent-blue font-mono transition-colors"
                value={officerId}
                onChange={(e) => setOfficerId(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-xs font-mono text-gray-400 mb-1">ACCESS KEY</label>
              <input 
                type="password" 
                required
                placeholder="••••••••"
                className="w-full bg-dark-900 border border-dark-700 rounded p-3 text-white focus:outline-none focus:border-accent-blue font-mono transition-colors"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-accent-blue hover:bg-blue-700 text-white font-mono font-bold py-3 px-4 rounded transition-colors uppercase tracking-widest mt-4"
            >
              Initialize Session
            </button>
          </div>
        </form>

        <div className="text-center mt-6">
          <p className="text-xs font-mono text-gray-600">
            MINISTRY OF HOME AFFAIRS • CLASSIFIED SYSTEM <br/>
            UNAUTHORIZED ACCESS IS STRICTLY PROHIBITED
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;