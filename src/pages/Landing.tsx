import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Truck, DollarSign, Shield, ChevronRight, Clock, 
  CheckCircle, Star, ArrowRight, Facebook, Twitter, 
  Linkedin, Instagram, Menu, X, ArrowUpRight,
  Mail, MapPin, Phone
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { motion } from 'framer-motion';
import { HeroSection } from '../components/hero/HeroSection';
import { Features } from './features/Features';
import { Card3D } from '../components/ui/Card3D';
import { IconSystem } from '../components/icons/IconSystem';
import { GradientBorder } from '../components/ui/GradientBorder';
import { TrustedBySection } from '../components/social-proof/TrustedBySection';
import { StatsSection } from '../components/dashboard/StatsSection';

const stats = [
  { value: "$2B+", label: "Total Financing" },
  { value: "15K+", label: "Fleet Vehicles" },
  { value: "98%", label: "Approval Rate" },
  { value: "24/7", label: "Support" }
];

export function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-background to-black overflow-hidden">
      <HeroSection />
      <TrustedBySection />
      <StatsSection />

      <Features />

      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <GradientBorder type="primary" level="dramatic" animated={true} className="rounded-2xl overflow-hidden">
            <Card3D depth="high" interactive={false} className="p-12 md:p-20" isPremium={true}>
              <div className="max-w-2xl">
                <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Fleet Financing?</h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Join thousands of businesses who have already simplified their fleet financing process with FleetFinancingPro.
                </p>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => navigate('/register')}
                  className="group"
                  align="center"
                >
                  <span className="flex items-center">
                    Get Started Now
                    <IconSystem size="sm" category="action" className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                      <ArrowUpRight />
                    </IconSystem>
                  </span>
                </Button>
              </div>
            </Card3D>
          </GradientBorder>
        </div>
      </section>

      <footer className="relative bg-black/40 backdrop-blur-xl border-t border-primary/10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-primary/10 opacity-20" />
        
        <div className="relative container mx-auto px-6 pt-16 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
            <div className="md:col-span-4 space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <IconSystem category="fleet">
                    <Truck />
                  </IconSystem>
                </div>
                <span className="text-2xl font-bold gradient-text">FleetFinancingPro</span>
              </div>
              <p className="text-muted-foreground">
                Revolutionizing fleet financing for the modern era with innovative solutions and unmatched service.
              </p>
              <div className="flex items-center gap-4">
                <Card3D depth="low" className="w-10 h-10 flex items-center justify-center">
                  <IconSystem category="ui" size="sm">
                    <Facebook />
                  </IconSystem>
                </Card3D>
                <Card3D depth="low" className="w-10 h-10 flex items-center justify-center">
                  <IconSystem category="ui" size="sm">
                    <Twitter />
                  </IconSystem>
                </Card3D>
                <Card3D depth="low" className="w-10 h-10 flex items-center justify-center">
                  <IconSystem category="ui" size="sm">
                    <Linkedin />
                  </IconSystem>
                </Card3D>
              </div>
            </div>

            <div className="md:col-span-2">
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-3">
                {['Features', 'Pricing', 'Security'].map((item) => (
                  <li key={item}>
                    <a 
                      href="#" 
                      className="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-2">
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-3">
                {['About', 'Careers', 'Contact'].map((item) => (
                  <li key={item}>
                    <a 
                      href="#" 
                      className="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-2">
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-3">
                {['Privacy', 'Terms', 'Cookie Policy'].map((item) => (
                  <li key={item}>
                    <a 
                      href="#" 
                      className="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-2">
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-3">
                <li>
                  <a href="mailto:contact@fleetfinancingpro.com" className="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Us
                  </a>
                </li>
                <li>
                  <a href="tel:+1234567890" className="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Call Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Find Us
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-primary/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-muted-foreground text-sm">
                © 2024 FleetFinancingPro. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                  Privacy Policy
                </a>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                  Terms of Service
                </a>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                  Cookie Settings
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}