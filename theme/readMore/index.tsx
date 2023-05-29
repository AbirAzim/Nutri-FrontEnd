import React, { useState, useRef, useEffect } from "react";
import s from "./ReadMore.module.scss";

interface Props {
  showReadMoreButton?: boolean;
}

const ReadMore: React.FC<Props> = ({ children, showReadMoreButton = true }) => {
  const [clamped, setClamped] = useState(true);
  const [showButton, setShowButton] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClick = () => setClamped(!clamped);

  useEffect(() => {
    const hasClamping = (el) => {
      const { clientHeight, scrollHeight } = el;
      return clientHeight !== scrollHeight;
    };

    const checkButtonAvailability = () => {
      if (containerRef.current) {
        // Save current state to reapply later if necessary.
        const hadClampClass = containerRef.current.classList.contains("clamp");
        // Make sure that CSS clamping is applied if aplicable.
        if (!hadClampClass) containerRef.current.classList.add("clamp");
        // Check for clamping and show or hide button accordingly.
        setShowButton(hasClamping(containerRef.current));
        // Sync clamping with local state.
        if (!hadClampClass) containerRef.current.classList.remove("clamp");
      }
    };

    checkButtonAvailability();
    window.addEventListener("resize", checkButtonAvailability);

    return () => {
      window.removeEventListener("resize", checkButtonAvailability);
    };
  }, [containerRef]);

  return (
    <>
      <div ref={containerRef} className={` ${clamped && s.clamp}`}>
        {children}
      </div>
      {showButton && showReadMoreButton && (
        <span className={s.showMoreText} onClick={handleClick}>
          Read {clamped ? "more" : "less"}
        </span>
      )}
    </>
  );
};

export default ReadMore;
