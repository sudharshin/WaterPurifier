import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const FadeOnRouteChange = ({ children, duration = 400 }) => {
  const location = useLocation();
  const [displayedChildren, setDisplayedChildren] = useState(children);
  const [fadeState, setFadeState] = useState("visible"); // "visible" | "fading-out" | "fading-in"
  const scrollListenerAdded = useRef(false);

  useEffect(() => {
    setFadeState("fading-out");

    // After fade-out duration, start scrolling to top smoothly
    const fadeOutTimeout = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });

      if (!scrollListenerAdded.current) {
        scrollListenerAdded.current = true;

        const onScroll = () => {
          if (window.scrollY === 0) {
            window.removeEventListener("scroll", onScroll);
            scrollListenerAdded.current = false;

            setDisplayedChildren(children);

            requestAnimationFrame(() => {
              setFadeState("fading-in");
              setTimeout(() => setFadeState("visible"), duration);
            });
          }
        };

        window.addEventListener("scroll", onScroll);
        onScroll(); // check if already at top
      }
    }, duration);

    return () => {
      clearTimeout(fadeOutTimeout);
      if (scrollListenerAdded.current) {
        window.removeEventListener("scroll", onScroll);
        scrollListenerAdded.current = false;
      }
    };
  }, [location.pathname, children, duration]);

  useEffect(() => {
    document.body.style.overflow = fadeState === "visible" ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [fadeState]);

  const opacity =
    fadeState === "fading-out"
      ? 0
      : fadeState === "fading-in"
      ? 1
      : 1;

  const isLoading = fadeState !== "visible";

  return (
    <>
      <div
        style={{
          opacity,
          transition: `opacity ${duration}ms ease-in-out`,
          pointerEvents: fadeState === "visible" ? "auto" : "none",
          minHeight: "100vh",
        }}
      >
        {displayedChildren}
      </div>

      {isLoading && (
        <div style={styles.loadingOverlay}>
          <div style={styles.spinner} />
        </div>
      )}

      <style>{`
        @keyframes spinner {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
      `}</style>
    </>
  );
};

const styles = {
  loadingOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    zIndex: 9999,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  spinner: {
    width: 48,
    height: 48,
    border: "5px solid #ccc",
    borderTop: "5px solid #0d6efd", // Bootstrap blue-ish color
    borderRadius: "50%",
    animation: "spinner 1s linear infinite",
  },
};

export default FadeOnRouteChange;
