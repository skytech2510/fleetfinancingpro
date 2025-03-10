import React from 'react';
import { Clock, DollarSign, Shield } from 'lucide-react';
import { FeatureCard } from '../../components/features/FeatureCard';

export function Features() {
  const features = [
    {
      icon: Clock,
      title: "Quick Application",
      description: "Complete your fleet financing application in minutes with our streamlined digital process.",
      isPremium: false
    },
    {
      icon: DollarSign,
      title: "Best Rates Guaranteed",
      description: "Access our network of trusted lenders offering competitive rates tailored to your needs.",
      isPremium: true
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description: "State-of-the-art security ensuring your data is protected at every step.",
      isPremium: false
    }
  ];

  return (
    <section id="features" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Why Choose FleetFinancingPro</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience the future of fleet financing with our comprehensive platform designed for modern businesses.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              isPremium={feature.isPremium}
              delay={index * 0.2}
            />
          ))}
        </div>
      </div>
    </section>
  );
}