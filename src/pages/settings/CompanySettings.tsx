import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

interface FormData {
  companyName: string;
  industry: string;
  businessAddress: string;
  taxId: string;
}

interface FormErrors {
  [key: string]: string;
}

export function CompanySettings() {
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    industry: '',
    businessAddress: '',
    taxId: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }
    if (!formData.industry.trim()) {
      newErrors.industry = 'Industry is required';
    }
    if (!formData.businessAddress.trim()) {
      newErrors.businessAddress = 'Business address is required';
    }
    if (!formData.taxId.trim()) {
      newErrors.taxId = 'Tax ID is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      alert('Company changes saved successfully!');
    }
  };

  return (
    <div className="bg-background-card rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-6">Company Information</h2>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Company Name"
            name="companyName"
            placeholder="Enter company name"
            value={formData.companyName}
            onChange={handleInputChange}
            error={errors.companyName}
          />
          <Input
            label="Industry"
            name="industry"
            placeholder="Enter industry"
            value={formData.industry}
            onChange={handleInputChange}
            error={errors.industry}
          />
          <Input
            label="Business Address"
            name="businessAddress"
            placeholder="Enter business address"
            value={formData.businessAddress}
            onChange={handleInputChange}
            error={errors.businessAddress}
          />
          <Input
            label="Tax ID"
            name="taxId"
            placeholder="Enter tax ID"
            value={formData.taxId}
            onChange={handleInputChange}
            error={errors.taxId}
          />
        </div>

        <div className="flex justify-end gap-4">
          <Button variant="ghost">Cancel</Button>
          <Button variant="primary" onClick={handleSave}>Save Changes</Button>
        </div>
      </div>
    </div>
  );
}