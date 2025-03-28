import { teamMembers } from "@/data";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

export default function ModernTeamSection() {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleWheelScroll = (e: WheelEvent) => {
      if (scrollRef.current) {
        e.preventDefault();
        scrollRef.current.scrollLeft += e.deltaY;
      }
    };

    const container = scrollRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheelScroll, {
        passive: false,
      });
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheelScroll);
      }
    };
  }, []);

  return (
    <section className="relative bg-transparent overflow-hidden w-full scroll-smooth py-20">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-amber-600 mb-4">
          Our Innovative Team
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Passionate experts driving transformative solutions across industries
        </p>
      </motion.div>

      {/* Scrollable Team Grid */}
      <div
        ref={scrollRef}
        className="flex w-full space-x-8 pb-8 overflow-x-auto overflow-y-hidden scrollbar-hide touch-pan-x px-4 md:px-8 pt-10"
      >
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => setActiveCard(activeCard === index ? null : index)}
            className={`
              flex-shrink-0 w-96 md:w-80 lg:w-96 xl:w-96 cursor-pointer transform transition-all duration-300 
              ${
                activeCard === index
                  ? "scale-110 shadow-2xl"
                  : "hover:scale-105"
              }
              bg-white/70 dark:bg-gray-800/70 
              backdrop-blur-lg rounded-xl overflow-hidden border border-white/20 
              dark:border-gray-700/20 shadow-lg hover:shadow-2xl p-6
            `}
          >
            <div className="relative w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white/50 dark:border-gray-700/50 shadow-md">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {member.name}
              </h3>
              <p className="text-orange-500 dark:text-orange-400 font-medium mb-2">
                {member.role}
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-base mb-4">
                {member.company}
              </p>
              <div className="bg-gray-100/50 dark:bg-gray-700/50 backdrop-blur-sm p-5 rounded-2xl">
                <p className="text-gray-700 dark:text-gray-200 italic text-base">
                  "{member.testimonial}"
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
