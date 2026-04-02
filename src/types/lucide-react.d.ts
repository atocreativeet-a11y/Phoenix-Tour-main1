// src/types/lucide-react.d.ts

declare module 'lucide-react' {
  import * as React from 'react';

  export interface LucideProps extends React.SVGProps<SVGSVGElement> {
    size?: number | string;
    strokeWidth?: number | string;
  }

  export type LucideIcon = React.FC<LucideProps>;

  export const Compass: LucideIcon;
  export const Map: LucideIcon;
  export const Info: LucideIcon;
  export const Phone: LucideIcon;
  export const Menu: LucideIcon;
  export const X: LucideIcon;
  export interface LucideProps extends React.SVGProps<SVGSVGElement> {
    size?: number | string;
    strokeWidth?: number | string;
  }

  export type LucideIcon = React.FC<LucideProps>;
}