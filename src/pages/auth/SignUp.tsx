import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';
import { Checkbox } from '../../components/ui/Checkbox';

export function SignUp() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
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

    if (!formData.email || !formData.password || !formData.fullName) {
      setError('All fields are required');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);

    try {
      await signUp(formData.email, formData.password, formData.fullName);
      navigate('/dashboard');
    } catch (err: any) {
      if (err.message === 'User already registered') {
        setError('This email is already registered. Please sign in instead.');
      } else {
        setError('Failed to create account. Please try again.');
      }
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
                <UserPlus className="w-8 h-8 text-primary" />
              </motion.div>
            </div>
            
            <h1 className="text-2xl font-bold text-center mb-2">Create Account</h1>
            <p className="text-muted-foreground text-center mb-8">
              Sign up to get started with FleetFinancingPro
            </p>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-destructive/10 border border-destructive/20 text-destructive rounded-lg p-4 mb-6"
              >
                {error}
                {error.includes('already registered') && (
                  <div className="mt-2">
                    <button
                      onClick={() => navigate('/login')}
                      className="text-primary hover:text-primary/80 transition-colors duration-200"
                    >
                      Go to Sign In
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Full Name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Enter your full name"
                required
              />

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
                placeholder="Create a password"
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
                className="w-full"
                type="submit"
                disabled={isLoading}
              >
                <span className="relative z-10">
                  {isLoading ? 'Creating account...' : 'Sign Up'}
                </span>
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <button
                  onClick={() => navigate('/login')}
                  className="text-primary hover:text-primary/80 transition-colors duration-200"
                >
                  Sign in
                </button>
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}