import React, { useEffect } from "react";
import TagManager from "react-gtm-module";

const LinkTracker: React.FC = () => {
  useEffect(() => {
    const handleLinkClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // Check if the clicked element is an <a> tag or a child of an <a> tag
      const link = target.closest("a");
      if (link) {
        const href = link.getAttribute("href") || "unknown";
        const label =
          link.getAttribute("data-track-label") || // Use a custom data attribute if present
          link.textContent?.trim() || // Use the link's text content
          href; // Fallback to href

        // Send click event to GTM
        TagManager.dataLayer({
          dataLayer: {
            event: "click",
            click_label: label,
            click_href: href,
          },
        });
      }
    };

    // Add event listener to the document
    document.addEventListener("click", handleLinkClick);

    // Cleanup on component unmount
    return () => {
      document.removeEventListener("click", handleLinkClick);
    };
  }, []);

  return null;
};

export default LinkTracker;