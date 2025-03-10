import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';
import { Checkbox } from '../../components/ui/Checkbox';

export function Login() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [acceptPolicy, setAcceptPolicy] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!acceptPolicy) {
      setError('Please accept our Terms of Service and Privacy Policy to continue');
      return;
    }

    setIsLoading(true);

    try {
      await signIn(formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Modern Animated Background */}
      <div className="fixed inset-0 overflow-hidden">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />
        
        {/* Animated gradient orbs */}
        <motion.div
          className="absolute inset-0"
          initial={{ backgroundPosition: "0% 0%" }}
          animate={{ 
            backgroundPosition: ["0% 0%", "100% 100%", "0% 100%", "100% 0%", "0% 0%"]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundImage: `
              radial-gradient(circle at 0% 0%, rgba(255, 16, 240, 0.15) 0%, transparent 30%),
              radial-gradient(circle at 100% 0%, rgba(0, 255, 240, 0.15) 0%, transparent 30%),
              radial-gradient(circle at 100% 100%, rgba(255, 16, 240, 0.15) 0%, transparent 30%),
              radial-gradient(circle at 0% 100%, rgba(0, 255, 240, 0.15) 0%, transparent 30%)
            `,
            backgroundSize: "200% 200%",
          }}
        />

        {/* Subtle animated overlay */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                -45deg,
                rgba(255, 255, 255, 0.025) 0px,
                rgba(255, 255, 255, 0.025) 1px,
                transparent 1px,
                transparent 10px
              )
            `,
            backgroundSize: "20px 20px",
          }}
        />
      </div>

      {/* Content */}
      <motion.div 
        className="w-full max-w-md relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1]
        }}
      >
        <div className="bg-black/40 backdrop-blur-2xl rounded-2xl border border-white/5 p-8 shadow-2xl">
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: 0.2,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            <div className="flex justify-center mb-8">
              <motion.div 
                className="p-3 bg-primary/10 rounded-xl"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <LogIn className="w-8 h-8 text-primary" />
              </motion.div>
            </div>
            
            <h1 className="text-2xl font-bold text-center mb-2">Welcome Back</h1>
            <p className="text-muted-foreground text-center mb-8">
              Sign in to access your account
            </p>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-destructive/10 border border-destructive/20 text-destructive rounded-lg p-4 mb-6"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter your email"
                required
              />

              <Input
                label="Password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Enter your password"
                required
              />

              <Checkbox
                id="acceptPolicy"
                checked={acceptPolicy}
                onChange={setAcceptPolicy}
                label={
                  <>
                    I agree to the{' '}
                    <a href="#" className="text-primary hover:text-primary/80 transition-colors">Terms of Service</a>
                    {' '}and{' '}
                    <a href="#" className="text-primary hover:text-primary/80 transition-colors">Privacy Policy</a>
                  </>
                }
              />

              <Button
                variant="primary"
                className="w-full group relative overflow-hidden"
                type="submit"
                disabled={isLoading}
                align="center"
              >
                <span className="relative z-10">
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </span>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{' '}
                <button
                  onClick={() => navigate('/register')}
                  className="text-primary hover:text-primary/80 transition-colors duration-200"
                >
                  Sign up
                </button>
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}