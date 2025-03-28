"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const MobileNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Animation variants
  const menuVariants = {
    open: {
      height: "auto",
      opacity: 1,
      transition: {
        height: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
        opacity: { duration: 0.3 },
      },
    },
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        height: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
        opacity: { duration: 0.2 },
      },
    },
  };

  const itemVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 20 },
        opacity: { duration: 0.4 },
      },
    },
    closed: {
      x: 30,
      opacity: 0,
      transition: {
        x: { duration: 0.2 },
        opacity: { duration: 0.15 },
      },
    },
  };

  return (
    <div className={cn("fixed top-8 right-8 z-[1000]", className)}>
      {/* Enhanced Hamburger Button */}
      <motion.button
        onClick={toggleMenu}
        className="group flex flex-col justify-center items-center w-12 h-12 rounded-xl focus:outline-none"
        whileHover={{
          backgroundColor: "rgba(39, 39, 42, 0.4)",
          transition: { duration: 0.2 },
        }}
        whileTap={{ scale: 0.95 }}
        style={{
          backgroundColor: "rgba(24, 24, 27, 0.6)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 2px 12px rgba(0, 0, 0, 0.2)",
        }}
        aria-label="Toggle menu"
      >
        <div className="relative w-6 h-6">
          <motion.span
            className="absolute block h-[2px] w-6 bg-gray-200 rounded-full"
            animate={{
              rotate: isOpen ? 45 : 0,
              y: isOpen ? 6 : 0,
              width: isOpen ? 24 : 24,
            }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.span
            className="absolute block h-[2px] w-6 bg-gray-200 rounded-full top-2.5"
            animate={{
              opacity: isOpen ? 0 : 1,
              x: isOpen ? 10 : 0,
            }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          />
          <motion.span
            className="absolute block h-[2px] w-6 bg-gray-200 rounded-full top-[18px]"
            animate={{
              rotate: isOpen ? -45 : 0,
              y: isOpen ? -6 : 0,
              width: isOpen ? 24 : 24,
            }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </motion.button>

      {/* Premium Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="absolute right-0 mt-3 w-80 origin-top rounded-xl overflow-hidden"
            style={{
              border: "1px solid rgba(255, 255, 255, 0.08)",
              backdropFilter: "blur(16px)",
              backgroundColor: "rgba(24, 24, 27, 0.5)",
              boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.4)",
            }}
          >
            <motion.ul className="py-2 px-1.5">
              {navItems.map((item, index) => (
                <motion.li
                  key={index}
                  variants={itemVariants}
                  whileHover={{
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    transition: { duration: 0.1 },
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="mx-1.5 rounded-lg active:scale-95"
                >
                  <Link
                    href={item.link}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center py-3 px-4 text-sm font-medium text-gray-200 hover:text-white transition-colors"
                  >
                    {item.icon && (
                      <span className="mr-3 text-gray-400">{item.icon}</span>
                    )}
                    <span>{item.name}</span>
                    <span className="ml-auto opacity-0 group-hover:opacity-100 text-xs text-gray-400 transition-opacity">
                      →
                    </span>
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
