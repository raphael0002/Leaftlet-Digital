import { teamMembers } from "@/data";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

export default function ModernTeamSection() {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // For navigation buttons
  const scrollAmount = 400; // Adjust scroll amount as needed

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Track scroll position for button visibility
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        setScrollPosition(scrollRef.current.scrollLeft);
        setMaxScroll(
          scrollRef.current.scrollWidth - scrollRef.current.clientWidth
        );
      }
    };

    const container = scrollRef.current;
    if (container) {
      setMaxScroll(container.scrollWidth - container.clientWidth);
      container.addEventListener("scroll", handleScroll);
    }

    // Initial check
    handleScroll();

    // Update maxScroll on window resize
    const handleResize = () => {
      if (container) {
        setMaxScroll(container.scrollWidth - container.clientWidth);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section
      className="relative bg-transparent w-full scroll-smooth py-20"
      id="team"
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 px-4"
      >
        <h2 className="heading">
          Our <span className="text-orange-500">Innovative Team</span>
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Passionate experts driving transformative solutions across industries
        </p>
      </motion.div>

      {/* Scroll Container with Nav Buttons */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Left Navigation Button */}
        <NavButton
          direction="left"
          onClick={scrollLeft}
          disabled={scrollPosition <= 10}
        />

        {/* Scrollable Team Grid */}
        <div
          ref={scrollRef}
          className="flex w-full sm:space-x-8 py-10 overflow-x-auto scrollbar-hide snap-x snap-mandatory space-x-8 pb-8overflow-y-hidden scrollbar-hide touch-pan-x px-4 md:px-8 pt-10"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
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
                flex-shrink-0 w-[280px] sm:w-[320px] md:w-[340px] lg:w-[380px] cursor-pointer 
                transform transition-all duration-300 snap-center
                ${
                  activeCard === index
                    ? "scale-105 shadow-2xl"
                    : "hover:scale-105"
                }
                bg-white/70 dark:bg-gray-800/20
                backdrop-blur-lg rounded-xl overflow-hidden border border-white/20
                dark:border-gray-700/20 shadow-lg hover:shadow-2xl p-6
              `}
              style={{
                background: "rgb(4,7,29)",
                backgroundImage:
                  "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
              }}
            >
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 mx-auto mb-4 sm:mb-6 rounded-full overflow-hidden border-4 border-white/50 dark:border-gray-700/50 shadow-md">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-orange-500 dark:text-orange-400 font-medium mb-2">
                  {member.role}
                </p>
                <p className="text-gray-400 text-sm sm:text-base mb-4">
                  {member.company}
                </p>
                <div className="bg-white/10 dark:bg-gray-700/30 backdrop-blur-sm p-3 sm:p-5 rounded-2xl">
                  <p className="text-gray-200 italic text-sm sm:text-base">
                    &ldquo;{member.testimonial}&rdquo;
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right Navigation Button */}
        <NavButton
          direction="right"
          onClick={scrollRight}
          disabled={scrollPosition >= maxScroll - 10}
        />
      </div>
    </section>
  );
}

// Navigation Button Component
const NavButton = ({
  direction,
  onClick,
  disabled,
}: {
  direction: "left" | "right";
  onClick: () => void;
  disabled: boolean;
}) => {
  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: disabled ? 0.5 : 1 }}
      whileHover={disabled ? {} : { scale: 1.1 }}
      onClick={onClick}
      disabled={disabled}
      className={`
        absolute ${
          direction === "left" ? "left-2 sm:left-0" : "right-2 sm:right-0"
        } top-1/2 -translate-y-1/2 z-10
        w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center
        rounded-full transition-all duration-300
        ${disabled ? "cursor-not-allowed" : "cursor-pointer hover:shadow-lg"}
      `}
      style={{
        background: "rgba(4,7,29,0.8)",
        backgroundImage:
          "linear-gradient(90deg, rgba(4,7,29,0.8) 0%, rgba(12,14,35,0.8) 100%)",
        border: "1px solid rgba(255,255,255,0.1)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
      }}
      aria-label={`Scroll ${direction}`}
    >
      {direction === "left" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-orange-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-orange-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M9 5l7 7-7 7"
          />
        </svg>
      )}
    </motion.button>
  );
};
