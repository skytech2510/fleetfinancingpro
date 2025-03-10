import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';
import { Brand } from '../Brand';
import { AnimatedArrowIcon, MenuToggleIcon } from '../icons/AnimatedIcons';

export function HeroSection() {
  const navigate = useNavigate();
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setIsVideoLoaded(true)}
          className="object-cover w-full h-full"
          src="/fleet-video.mp4"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-background/80 backdrop-blur-lg py-4' : 'py-6'
      }`}>
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center space-x-8"
            >
              <Brand variant="full" size="md" />
              
              <div className="hidden md:flex items-center space-x-6">
                {['Features', 'About', 'Testimonials'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-300 relative group"
                  >
                    {item}
                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </a>
                ))}
              </div>
            </motion.div>
            
            <div className="hidden md:flex items-center gap-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/login')}
                className="text-sm font-medium"
                align="center"
              >
                Sign In
              </Button>
              <Button 
                variant="primary"
                onClick={() => navigate('/register')}
                align="center"
              >
                Get Started
              </Button>
            </div>

            <button
              className="md:hidden p-2 hover:bg-white/5 rounded-lg transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <MenuToggleIcon isOpen={isMobileMenuOpen} size="md" />
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden py-6 space-y-6 border-t border-white/5 mt-4"
            >
              {['Features', 'About', 'Testimonials'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block py-2 text-foreground/80 hover:text-primary transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <div className="flex flex-col gap-3 pt-4">
                <Button 
                  variant="ghost" 
                  onClick={() => {
                    navigate('/login');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full"
                  align="center"
                >
                  Sign In
                </Button>
                <Button 
                  variant="primary"
                  onClick={() => {
                    navigate('/register');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full"
                  align="center"
                >
                  Get Started
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative container mx-auto px-6 h-full flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVideoLoaded ? 1 : 0, y: isVideoLoaded ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center space-y-8"
        >
          <div className="relative z-10">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl blur-3xl opacity-50" />
            <div className="relative">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
                Fleet Financing
                <span className="block gradient-text">Made Simple</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 lg:px-12 max-w-3xl mx-auto">
                Streamline your fleet financing with our intelligent platform. Get better rates, faster approvals, and complete transparency.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => navigate('/register')}
                  className="min-w-[200px] group"
                  align="center"
                >
                  Start Your Journey
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                  className="min-w-[200px] group"
                  align="center"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.8,
          delay: 1,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60"
      >
        <ChevronDown className="w-8 h-8 animate-bounce" />
      </motion.div>
    </div>
  );
}