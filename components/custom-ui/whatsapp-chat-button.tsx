"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { BsWhatsapp } from "react-icons/bs";

interface WhatsAppChatButtonProps {
  phoneNumber: string;
  message?: string;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  showTooltip?: boolean;
  tooltipText?: string;
  size?: "sm" | "md" | "lg";
}

export function WhatsAppChatButton({
  phoneNumber,
  position = "bottom-right",
  showTooltip = true,
  tooltipText = "Chat with us on WhatsApp",
  size = "md",
}: WhatsAppChatButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Create WhatsApp URL
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  // Determine position classes
  const positionClasses = {
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
  };

  // Determine tooltip position based on button position
  const tooltipPositionClasses = {
    "bottom-right": "right-0 bottom-full mb-2",
    "bottom-left": "left-0 bottom-full mb-2",
    "top-right": "right-0 top-full mt-2",
    "top-left": "left-0 top-full mt-2",
  };

  // Determine arrow position based on button position
  const arrowPositionClasses = {
    "bottom-right": "-bottom-1 right-4 rotate-45",
    "bottom-left": "-bottom-1 left-4 rotate-45",
    "top-right": "-top-1 right-4 -rotate-135",
    "top-left": "-top-1 left-4 -rotate-135",
  };

  // Determine size classes
  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-14 h-14",
    lg: "w-16 h-16",
  };

  const iconSizes = {
    sm: "w-5 h-5",
    md: "w-7 h-7",
    lg: "w-8 h-8",
  };

  return (
    <div
      className={cn("fixed z-50", positionClasses[position])}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        {showTooltip && isHovered && (
          <div
            className={cn(
              "absolute min-w-max rounded bg-white px-3 py-1.5 text-sm font-medium text-gray-900 shadow-lg dark:bg-gray-800 dark:text-gray-100",
              tooltipPositionClasses[position]
            )}
          >
            {tooltipText}
            <div
              className={cn(
                "absolute h-2 w-2 bg-white dark:bg-gray-800",
                arrowPositionClasses[position]
              )}
            ></div>
          </div>
        )}

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "flex items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2",
            sizeClasses[size]
          )}
          aria-label="Chat on WhatsApp"
        >
          <BsWhatsapp className={cn("fill-white", iconSizes[size])} />
        </a>
      </div>
    </div>
  );
}
