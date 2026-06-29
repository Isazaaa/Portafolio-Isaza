import { motion } from "motion/react";
import { blurUp, inView } from "../lib/motion.js";

/**
 * Scroll-triggered reveal wrapper. Defaults to the signature blur-up entrance.
 * Pass `delay` to offset siblings asymmetrically (one a touch after the other).
 */
export default function Reveal({
  children,
  delay = 0,
  variants = blurUp,
  as = "div",
  className = "",
  ...rest
}) {
  const MotionTag = motion[as] ?? motion.div;
  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      transition={{ delay }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
