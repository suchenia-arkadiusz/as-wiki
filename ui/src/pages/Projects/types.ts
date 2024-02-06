import { type ReactNode } from 'react';

export interface Project {
  id: string
  name: string
  description: string
  color?: string
  logo?: ReactNode
  logoUrl?: string
}
