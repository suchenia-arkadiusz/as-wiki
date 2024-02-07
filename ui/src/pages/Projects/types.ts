import { type ReactNode } from 'react';

export type Project = {
  id: string;
  name: string;
  description: string;
  color?: string;
  logo?: ReactNode;
  logoUrl?: string;
};
