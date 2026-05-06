import type { Variants } from 'motion/react';

export const motionInViewChildVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.65, 0, 0.35, 1],
    },
  },
};
