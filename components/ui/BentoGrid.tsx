"use client";
import { JSX, useEffect, useState } from "react";
import { IoCopyOutline } from "react-icons/io5";

// Also install this npm i --save-dev @types/react-lottie

import { cn } from "@/lib/utils";

import { BackgroundGradientAnimation } from "./GradientBg";
import GridGlobe from "./GridGlobe";
import animationData from "@/data/confetti.json";
import MagicButton from "../MagicButton";
import dynamic from "next/dynamic";
import Lottie, { LottieProps } from "react-lottie";
import { leftLists, rightLists } from "@/data";

// Create a wrapper for Lottie that handles the lifecycle properly
const LottieWrapper = dynamic(
  () =>
    import("react-lottie").then((mod) => {
      // Create a wrapper component that handles the unmounting issue
      const WrappedLottie = (
        props: JSX.IntrinsicAttributes &
          JSX.IntrinsicClassAttributes<Lottie> &
          Readonly<LottieProps>
      ) => {
        const [isMounted, setIsMounted] = useState(true);

        useEffect(() => {
          return () => {
            // Set mounted to false before unmounting to prevent the error
            setIsMounted(false);
          };
        }, []);

        if (!isMounted) return null;

        // Use a try-catch to handle any potential errors
        try {
          const Lottie = mod.default;
          return <Lottie {...props} />;
        } catch (error) {
          console.error("Error rendering Lottie:", error);
          return null;
        }
      };

      return WrappedLottie;
    }),
  { ssr: false }
);

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 md:grid-row-7 gap-4 lg:gap-8 mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  id,
  title,
  description,
  img,
  imgClassName,
  titleClassName,
  spareImg,
}: {
  className?: string;
  id: number;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  img?: string;
  imgClassName?: string;
  titleClassName?: string;
  spareImg?: string;
}) => {
  const [copied, setCopied] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [showLottie, setShowLottie] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensuring client-side rendering
  }, []);

  // Handle showing and hiding the Lottie animation
  useEffect(() => {
    if (copied) {
      setShowLottie(true);

      // Automatically hide the animation after 2.5 seconds
      const timer = setTimeout(() => {
        setShowLottie(false);
        setCopied(false);
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [copied]);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleCopy = () => {
    const text = "+977 9849819476";
    navigator.clipboard.writeText(text);
    setCopied(true);
  };

  return (
    <div
      className={cn(
        "row-span-1 relative overflow-hidden rounded-3xl border border-white/[0.1] group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none justify-between flex flex-col space-y-4",
        className
      )}
      style={{
        background: "rgb(4,7,29)",
        backgroundColor:
          "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
      }}
    >
      <div className={`${id === 6 && "flex justify-center"} h-full`}>
        <div className="w-full h-full absolute">
          {img && (
            <img
              src={img}
              alt={img}
              className={cn(imgClassName, "object-cover object-center ")}
            />
          )}
        </div>
        <div
          className={`absolute right-0 -bottom-5 ${
            id === 5 && "w-full opacity-80"
          } `}
        >
          {spareImg && (
            <img
              src={spareImg}
              alt={spareImg}
              className="object-cover object-center w-full h-full"
            />
          )}
        </div>
        {id === 6 && (
          <BackgroundGradientAnimation>
            <div className="absolute z-50 inset-0 flex items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl"></div>
          </BackgroundGradientAnimation>
        )}

        <div
          className={cn(
            titleClassName,
            "group-hover/bento:translate-x-2 transition duration-200 relative md:h-full min-h-52 flex flex-col px-5 p-5 lg:p-10"
          )}
        >
          <div className="font-sans font-extralight md:max-w-32 md:text-xs lg:text-base text-sm text-[#C1C2D3] z-10">
            {description}
          </div>
          <div
            className={`font-sans sm:text-lg lg:text-2xl sm:max-w-[20rem] font-bold z-10 text-lg max-w-[26rem]`}
          >
            {title}
          </div>

          {id === 2 && <GridGlobe />}

          {id === 3 && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {/* Decorative floating circles */}
              <div className="absolute top-1/2 left-1/2 w-36 h-36 rounded-full bg-blue-500/20 blur-xl animate-float"></div>
              <div className="absolute bottom-1/5 right-1/2 w-36 h-36 rounded-full bg-purple-500/20 blur-xl animate-float-delay"></div>
              <div className="absolute top-1/3 right-1/5 w-36 h-36 rounded-full bg-cyan-500/20 blur-xl animate-float"></div>
              <div className="absolute bottom-1/5 left-1/3 w-36 h-36 rounded-full bg-indigo-500/20 blur-xl animate-float-delay"></div>

              {/* Decorative grid pattern */}
              <div className="absolute inset-0 opacity-10">
                <svg
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <pattern
                      id="grid"
                      width="40"
                      height="40"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M 40 0 L 0 0 0 40"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="0.5"
                      />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>
            </div>
          )}
          {id === 6 && isClient && (
            <div className="mt-5 relative">
              <div className="absolute -bottom-5 right-0">
                {showLottie && (
                  <LottieWrapper
                    options={defaultOptions}
                    height={200}
                    width={400}
                  />
                )}
              </div>

              <MagicButton
                title={copied ? "Contact is Copied!" : "Copy our contact"}
                icon={<IoCopyOutline />}
                position="left"
                handleClick={handleCopy}
                otherClasses="!bg-[#161A31]"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
