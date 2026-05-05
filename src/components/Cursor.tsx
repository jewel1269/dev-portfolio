"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorX = useSpring(x, springConfig);
  const cursorY = useSpring(y, springConfig);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const leave = () => setVisible(false);
    const enter = () => setVisible(true);

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest("a, button, input, textarea, [data-cursor='hover']");
      setHovering(!!interactive);
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);
    document.addEventListener("mouseover", onMouseOver);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
      document.removeEventListener("mouseover", onMouseOver);
    };
  }, [x, y, visible]);

  return (
    <>
      <motion.div
        style={{ translateX: cursorX, translateY: cursorY }}
        animate={{
          width: hovering ? 56 : 12,
          height: hovering ? 56 : 12,
          opacity: visible ? 1 : 0,
          backgroundColor: hovering ? "rgba(197, 255, 77, 0.15)" : "rgba(197, 255, 77, 1)",
          borderColor: hovering ? "rgba(197, 255, 77, 0.6)" : "rgba(197, 255, 77, 0)",
        }}
        transition={{ duration: 0.2 }}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border pointer-events-none z-[80] mix-blend-difference hidden md:block"
      />
      <motion.div
        style={{ translateX: x, translateY: y }}
        animate={{ opacity: visible && !hovering ? 0.4 : 0 }}
        transition={{ duration: 0.15 }}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-accent pointer-events-none z-[80] hidden md:block"
      />
    </>
  );
}
