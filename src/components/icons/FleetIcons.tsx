import React from 'react';
import { IconSystem, IconSystemProps } from './IconSystem';
import { Truck, TruckIcon, Car, Package, Fuel, Wrench, BoxIcon } from 'lucide-react';

// Simple wrapping of Lucide icons with our IconSystem component
export function TruckFleetIcon(props: Omit<IconSystemProps, 'children' | 'category'>) {
  return (
    <IconSystem {...props} category="fleet">
      <Truck />
    </IconSystem>
  );
}

export function SemiTruckIcon(props: Omit<IconSystemProps, 'children' | 'category'>) {
  return (
    <IconSystem {...props} category="fleet">
      <TruckIcon />
    </IconSystem>
  );
}

export function VanIcon(props: Omit<IconSystemProps, 'children' | 'category'>) {
  return (
    <IconSystem {...props} category="fleet">
      <Car />
    </IconSystem>
  );
}

export function TrailerIcon(props: Omit<IconSystemProps, 'children' | 'category'>) {
  return (
    <IconSystem {...props} category="fleet">
      <Package />
    </IconSystem>
  );
}

export function FuelIcon(props: Omit<IconSystemProps, 'children' | 'category'>) {
  return (
    <IconSystem {...props} category="fleet">
      <Fuel />
    </IconSystem>
  );
}

export function MaintenanceIcon(props: Omit<IconSystemProps, 'children' | 'category'>) {
  return (
    <IconSystem {...props} category="fleet">
      <Wrench />
    </IconSystem>
  );
}

export function BoxTruckIcon(props: Omit<IconSystemProps, 'children' | 'category'>) {
  return (
    <IconSystem {...props} category="fleet">
      <BoxIcon />
    </IconSystem>
  );
}