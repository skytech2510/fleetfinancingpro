import React from 'react';
import { IconSystem, IconSystemProps } from './IconSystem';
import { CheckCircle, XCircle, AlertTriangle, Info, Clock } from 'lucide-react';

export function SuccessIcon(props: Omit<IconSystemProps, 'children' | 'category'>) {
  return (
    <IconSystem {...props} category="status">
      <CheckCircle />
    </IconSystem>
  );
}

export function ErrorIcon(props: Omit<IconSystemProps, 'children' | 'category'>) {
  return (
    <IconSystem {...props} category="status">
      <XCircle />
    </IconSystem>
  );
}

export function WarningIcon(props: Omit<IconSystemProps, 'children' | 'category'>) {
  return (
    <IconSystem {...props} category="status">
      <AlertTriangle />
    </IconSystem>
  );
}

export function InfoIcon(props: Omit<IconSystemProps, 'children' | 'category'>) {
  return (
    <IconSystem {...props} category="status">
      <Info />
    </IconSystem>
  );
}

export function PendingIcon(props: Omit<IconSystemProps, 'children' | 'category'>) {
  return (
    <IconSystem {...props} category="status">
      <Clock />
    </IconSystem>
  );
}