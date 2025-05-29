// components/ui/blurred-image.tsx
import React, { useState } from "react";
import TagManager from "react-gtm-module";

interface BlurredImageProps {
  src: string;
  alt: string;
  className?: string; // Optional prop to allow additional styling
  allowToggle?: boolean; // New prop to control whether blur can be toggled
  initiallyBlurred?: boolean; // New prop to control initial blur state
}

export function BlurredImage({
  src,
  alt,
  className = "",
  allowToggle = true,
  initiallyBlurred = true,
}: BlurredImageProps) {
  const [isBlurred, setIsBlurred] = useState(initiallyBlurred);

  const handleClick = () => {
    TagManager.dataLayer({
      dataLayer: {
        event: "image_click",
        click_label: alt,
      },
    });

    if (allowToggle) {
      setIsBlurred((prev) => !prev); // Toggle blur state only if allowToggle is true
    }
  };

  return (
    <div className="relative">
      <img
        src={src}
        alt={alt}
        className={`rounded-xl shadow-2xl w-full h-auto transition-all duration-300 ${isBlurred ? "blur-sm" : ""
          } ${className}`}
        onClick={handleClick}
        role={allowToggle ? "button" : "img"} // Role changes based on interactivity
        aria-label={
          allowToggle
            ? isBlurred
              ? `Click to reveal ${alt}`
              : `Click to blur ${alt}`
            : alt
        }
        tabIndex={allowToggle ? 0 : undefined} // Only focusable if toggle is allowed
        onKeyDown={
          allowToggle
            ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleClick();
              }
            }
            : undefined
        }
      />
      {isBlurred && (
        <div
          className="absolute inset-0 rounded-xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-gray-700/20 transition-all duration-300"
          style={{ backdropFilter: "blur(4px)" }}
          onClick={handleClick}
          role="presentation"
        />
      )}
    </div>
  );
}