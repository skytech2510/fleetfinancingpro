import React from 'react';
import { motion } from 'framer-motion';

const firstRowLogos = [
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Bosch-logo.svg",
    alt: "Bosch"
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg",
    alt: "Mastercard"
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/2/24/Airbus_logo_2017.svg",
    alt: "Airbus"
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/1/16/Continental_AG_logo.svg",
    alt: "Continental"
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/e/e1/NTT-logo.svg",
    alt: "NTT"
  }
];

const secondRowLogos = [
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Siemens-logo.svg",
    alt: "Siemens"
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg",
    alt: "Visa"
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Boeing_logo.svg",
    alt: "Boeing"
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg",
    alt: "BMW"
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/6/64/Cisco_logo.svg",
    alt: "Cisco"
  }
];

export function LogoCarousel() {
  return (
    <div className="logo-showcase space-y-10">
      {/* First row - left to right */}
      <div className="logo-carousel relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
        <motion.div
          className="flex gap-16 items-center"
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear"
          }}
        >
          {[...firstRowLogos, ...firstRowLogos].map((logo, index) => (
            <div
              key={`${logo.alt}-${index}`}
              className="flex-shrink-0 px-8 py-6 group"
            >
              <img
                src={logo.src}
                alt={`${logo.alt} logo`}
                className="h-8 w-auto opacity-50 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-110"
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Second row - right to left */}
      <div className="logo-carousel relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
        <motion.div
          className="flex gap-16 items-center"
          initial={{ x: "-50%" }}
          animate={{ x: 0 }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear"
          }}
        >
          {[...secondRowLogos, ...secondRowLogos].map((logo, index) => (
            <div
              key={`${logo.alt}-${index}`}
              className="flex-shrink-0 px-8 py-6 group"
            >
              <img
                src={logo.src}
                alt={`${logo.alt} logo`}
                className="h-8 w-auto opacity-50 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-110"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}