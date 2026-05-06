import * as React from 'react';
import { motion, useReducedMotion, type HTMLMotionProps, type Variants } from 'motion/react';

type MotionInViewElement = 'div' | 'section' | 'article' | 'ul' | 'ol' | 'li' | 'header' | 'footer';

type MotionInViewProps = Omit<
  HTMLMotionProps<'div'>,
  'animate' | 'children' | 'initial' | 'transition' | 'variants' | 'viewport' | 'whileInView'
> & {
  as?: MotionInViewElement;
  amount?: number;
  children: React.ReactNode;
  delay?: number;
  staggerChildren?: number;
  y?: number;
};

const motionElements = {
  article: motion.article,
  div: motion.div,
  footer: motion.footer,
  header: motion.header,
  li: motion.li,
  ol: motion.ol,
  section: motion.section,
  ul: motion.ul,
} as const;

function getContainerVariants(delay: number, staggerChildren: number, y: number): Variants {
  return {
    hidden: {
      opacity: 0,
      y,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay,
        duration: 0.5,
        ease: [0.65, 0, 0.35, 1],
        staggerChildren,
        when: 'beforeChildren',
      },
    },
  };
}

export function MotionInView({
  amount = 0.2,
  as = 'section',
  children,
  delay = 0,
  staggerChildren = 0,
  y = 16,
  ...props
}: MotionInViewProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return React.createElement(as, props, children);
  }

  const Component = motionElements[as] as React.ComponentType<HTMLMotionProps<'div'>>;

  return (
    <Component
      initial='hidden'
      viewport={{ once: true, amount }}
      whileInView='visible'
      variants={getContainerVariants(delay, staggerChildren, y)}
      {...props}
    >
      {children}
    </Component>
  );
}
