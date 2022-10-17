import React from 'react';

export interface Link {
  title: string,
  to?: string,
  icon?: React.ReactNode,
  isActive?: boolean,
  options?: Link[]
}
