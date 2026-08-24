import type { ComponentType } from 'react';

export type ActiveTab = 'fleet' | 'shipments' | 'inventory' | 'incidents' | 'optimizer' | 'analytics';

export interface NavItemConfig {
  id: ActiveTab;
  label: string;
  icon: ComponentType<{ className?: string }>;
}
