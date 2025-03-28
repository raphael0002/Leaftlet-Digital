import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">(
    "idle"
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitState("idle");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitState("success");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setSubmitState("error");
      }
    } catch (error) {
      setSubmitState("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="relative w-full max-w-7xl mx-auto px-4 sm:px-8 py-20"
      id="contact"
    >
      {/* Modern card with orange accent */}
      <div className="absolute inset-0 bg-white/95 dark:bg-gray-900/95 rounded-[2rem] shadow-2xl -z-10 border border-orange-200/30 dark:border-orange-900/20" />

      <div className="flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-16">
        {/* Left side - Visual appeal with logo (visible on all devices) */}
        <div className="relative w-full lg:w-1/2 min-h-[350px] md:min-h-[500px] rounded-2xl overflow-hidden bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-800 dark:to-gray-800 order-1 lg:order-none">
          {/* Logo - Responsive sizing */}
          <div className="absolute top-0 left-0 right-0 flex justify-center w-full h-full">
            <div className="relative w-[250px] h-[250px] md:w-[350px] md:h-[350px] lg:w-[450px] lg:h-[450px] mt-8 md:mt-12 z-10">
              <Image
                src="/leaflet-logo.png"
                alt="Leaflet Digital Solutions"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/4 right-1/4 w-24 h-24 md:w-32 md:h-32 rounded-full bg-orange-400 blur-2xl"></div>
            <div className="absolute bottom-1/3 left-1/4 w-28 h-28 md:w-40 md:h-40 rounded-full bg-amber-500 blur-3xl"></div>
          </div>
          {/* Info card - Responsive positioning */}
          <div className="flex flex-col items-center justify-center absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 p-4 md:p-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl border border-orange-200/30 dark:border-orange-900/20">
            <h3 className="text-lg md:text-xl font-bold text-orange-600 dark:text-orange-400 mb-1 md:mb-2">
              24/7 Digital Support
            </h3>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
              Call us:{" "}
              <span className="font-medium text-orange-600 dark:text-orange-400">
                +977 9810382123
              </span>
            </p>
          </div>
        </div>

        {/* Right side - Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full lg:w-1/2 space-y-4 md:space-y-6 order-0 lg:order-none"
        >
          <div className="text-center lg:text-left">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3"
            >
              Ready to{" "}
              <span className="text-orange-600 dark:text-orange-400">
                ignite
              </span>{" "}
              your project?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-gray-600 dark:text-gray-400 text-lg"
            >
              Get in touch and we'll respond within 24 hours.
            </motion.p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 pl-1"
                >
                  Your Name*
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white"
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 pl-1"
                >
                  Email Address*
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 pl-1"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-5 py-3.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 pl-1"
              >
                Your Message*
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-5 py-3.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white"
                placeholder="Tell us about your project needs..."
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-6 py-4 rounded-xl font-medium text-white transition-all duration-300 ${
                  isSubmitting
                    ? "bg-orange-400 dark:bg-orange-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 shadow-lg hover:shadow-orange-500/30"
                } flex items-center justify-center gap-2 group`}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      Send Message
                    </span>
                    <svg
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Status messages */}
          {submitState === "success" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-green-50/80 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-xl border border-green-200 dark:border-green-800/30 flex items-center gap-3"
            >
              <svg
                className="w-5 h-5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Your message has been sent successfully!</span>
            </motion.div>
          )}

          {submitState === "error" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-red-50/80 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-xl border border-red-200 dark:border-red-800/30 flex items-center gap-3"
            >
              <svg
                className="w-5 h-5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Failed to send message. Please try again.</span>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
