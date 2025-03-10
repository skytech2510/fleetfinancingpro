import React, { useState } from 'react';

const industries = [
  'All Industries',
  'Manufacturing',
  'Financial Services',
  'Aerospace',
  'Technology',
  'Automotive'
];

export function IndustryTags() {
  const [activeIndustry, setActiveIndustry] = useState('All Industries');

  return (
    <div className="flex flex-wrap justify-center gap-3 mb-8">
      {industries.map((industry) => (
        <button
          key={industry}
          onClick={() => setActiveIndustry(industry)}
          className={`
            px-4 py-1.5 text-sm rounded-full transition-all duration-300
            ${activeIndustry === industry
              ? 'bg-primary/20 text-primary border border-primary/20'
              : 'bg-white/5 text-muted-foreground hover:bg-white/10 border border-white/10'
            }
          `}
        >
          {industry}
        </button>
      ))}
    </div>
  );
}