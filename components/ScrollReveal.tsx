"use client";

import {
  motion,
  TargetAndTransition,
  Transition,
  useAnimation,
} from "framer-motion";
import { ReactNode, useEffect } from "react";
import { useInView } from "react-intersection-observer";

type ScrollRevealProps = {
  children: ReactNode;
  initial?: TargetAndTransition;
  animate?: TargetAndTransition;
  transition?: Transition;
};

const ScrollReveal = ({
  children,
  initial = { opacity: 0, y: 50 },
  animate = { opacity: 1, y: 0 },
  transition = { duration: 0.6, ease: "easeOut" },
}: ScrollRevealProps) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    if (inView && animate) {
      controls.start(animate);
    }
  }, [controls, inView, animate]);

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={controls}
      transition={transition}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
