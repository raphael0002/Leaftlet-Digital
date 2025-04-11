import React from "react";
import { AnimatePresence, motion } from "framer-motion";

import { CanvasRevealEffect } from "./ui/CanvasRevealEffect";

const Approach = () => {
  return (
    <section className="w-full py-20" id="approach">
      <h1 className="heading">
        Our <span className="text-orange-500">approach</span>
      </h1>
      <div className="my-20 flex flex-col lg:flex-row items-center justify-center w-full gap-4">
        <Card
          title="Planning & Strategy"
          icon={<AceternityIcon order="Phase 1" />}
          des="We start by understanding your business goals, target audience, and technical needs to create a customized project blueprint with clear milestones."
          bgColor="bg-emerald-900"
          canvasProps={{
            animationSpeed: 5.1,
            colors: [[13, 148, 136]],
          }}
        />
        <Card
          title="Development & Progress Update"
          icon={<AceternityIcon order="Phase 2" />}
          des="Our team builds your solution through iterative sprints, providing regular updates and incorporating your feedback at every stage to ensure perfect alignment."
          bgColor="bg-orange-500"
          canvasProps={{
            animationSpeed: 3,
            colors: [
              [255, 166, 158],
              [221, 255, 247],
            ],
            dotSize: 2,
          }}
        />
        <Card
          title="Development & Launch"
          icon={<AceternityIcon order="Phase 3" />}
          des="We conduct thorough testing and fine-tuning before deployment, delivering a high-performance solution complete with post-launch support."
          bgColor="bg-sky-600"
          canvasProps={{
            animationSpeed: 3,
            colors: [[125, 211, 252]],
          }}
        />
      </div>
    </section>
  );
};

export default Approach;

const Card = ({
  title,
  icon,
  des,
  bgColor,
  canvasProps,
}: {
  title: string;
  icon: React.ReactNode;
  des: string;
  bgColor: string;
  canvasProps: {
    animationSpeed: number;
    colors: number[][];
    dotSize?: number;
  };
}) => {
  const [hovered, setHovered] = React.useState(false);

  // Add function to check if we're on mobile
  const isMobile = () => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 1024; // lg breakpoint is typically 1024px
    }
    return false;
  };

  // State to track if we're on mobile
  const [isOnMobile, setIsOnMobile] = React.useState(false);

  // Set up event listener for resize events
  React.useEffect(() => {
    // Set initial state
    setIsOnMobile(isMobile());

    const handleResize = () => {
      setIsOnMobile(isMobile());
    };

    window.addEventListener("resize", handleResize);

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      onMouseEnter={() => !isOnMobile && setHovered(true)}
      onMouseLeave={() => !isOnMobile && setHovered(false)}
      className="border border-black/[0.2] group/canvas-card flex items-center justify-center
       dark:border-white/[0.2] max-w-md lg:max-w-sm w-full mx-auto p-4 relative h-[400px] sm:h-[450px] md:h-[500px] lg:h-[35rem] rounded-3xl overflow-hidden"
      style={{
        background: "rgb(4,7,29)",
        backgroundColor:
          "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
      }}
    >
      {/* Corner Icons */}
      <Icon className="absolute h-10 w-10 -top-3 -left-3 dark:text-white text-black opacity-30 z-10" />
      <Icon className="absolute h-10 w-10 -bottom-3 -left-3 dark:text-white text-black opacity-30 z-10" />
      <Icon className="absolute h-10 w-10 -top-3 -right-3 dark:text-white text-black opacity-30 z-10" />
      <Icon className="absolute h-10 w-10 -bottom-3 -right-3 dark:text-white text-black opacity-30 z-10" />

      {/* Canvas for desktop on hover */}
      <AnimatePresence>
        {!isOnMobile && hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full w-full absolute inset-0 z-0"
          >
            <CanvasRevealEffect
              containerClassName={`${bgColor} rounded-3xl overflow-hidden`}
              {...canvasProps}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Always-visible canvas for mobile */}
      {isOnMobile && (
        <div className="h-full w-full absolute inset-0 z-0 opacity-40">
          <CanvasRevealEffect
            containerClassName={`${bgColor} rounded-3xl overflow-hidden`}
            {...canvasProps}
          />
        </div>
      )}

      {/* Content */}
      <div className="relative z-20 px-4 md:px-8 py-8">
        <div
          className={`text-center ${
            !isOnMobile
              ? "group-hover/canvas-card:-translate-y-4 group-hover/canvas-card:opacity-0"
              : ""
          } 
          ${
            isOnMobile
              ? "static mb-6"
              : "absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
          } 
          transition duration-200 min-w-40 mx-auto flex items-center justify-center`}
        >
          {icon}
        </div>
        <h2
          className={`dark:text-white text-center mb-4 text-2xl md:text-3xl 
          ${
            isOnMobile
              ? "mt-4"
              : "opacity-0 group-hover/canvas-card:opacity-100 group-hover/canvas-card:-translate-y-2"
          } 
          relative z-10 font-bold ${
            !isOnMobile ? "group-hover/canvas-card:text-white" : "text-white"
          } 
          transition duration-200`}
        >
          {title}
        </h2>
        <p
          className={`text-sm md:text-base ${
            isOnMobile
              ? "mt-4"
              : "opacity-0 group-hover/canvas-card:opacity-100 group-hover/canvas-card:-translate-y-2"
          } 
          relative z-10 ${
            !isOnMobile ? "group-hover/canvas-card:text-white" : ""
          } text-center 
          transition duration-200`}
          style={{ color: "#E4ECFF" }}
        >
          {des}
        </p>
      </div>
    </div>
  );
};

const AceternityIcon = ({ order }: { order: string }) => {
  return (
    <div>
      <button className="relative inline-flex overflow-hidden rounded-full p-[1px]">
        <span
          className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite]
         bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]"
        />
        <span
          className="inline-flex h-full w-full cursor-pointer items-center 
        justify-center rounded-full bg-slate-950 px-5 py-2 text-purple backdrop-blur-3xl font-bold text-2xl"
        >
          {order}
        </span>
      </button>
    </div>
  );
};

export const Icon = ({ className, ...rest }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};
