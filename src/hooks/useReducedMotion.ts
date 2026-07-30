import { useReducedMotion as fmUseReducedMotion } from 'framer-motion';

export function useReducedMotion(): boolean {
  return fmUseReducedMotion() ?? false;
}
