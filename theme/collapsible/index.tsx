import React, {
  useRef,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import s from "./Collapsible.module.scss";

interface Props {
  label: string | React.ReactNode;
  extraLabel?: string | React.ReactNode;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  positionLabel?: "top" | "bottom";
}

const Collapsible: React.FC<Props> = ({
  children,
  label,
  open,
  setOpen,
  positionLabel = "top",
  extraLabel,
}) => {
  //const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(
    open ? undefined : 0,
  );

  const toggle = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!height || !open || !contentRef.current) return undefined;
    // @ts-ignore
    const resizeObserver = new ResizeObserver((el) => {
      setHeight(el[0].contentRect.height);
    });
    resizeObserver.observe(contentRef.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, [height, open]);

  useEffect(() => {
    if (open) setHeight(contentRef.current?.getBoundingClientRect().height);
    else setHeight(0);
  }, [open]);

  return (
    <>
      {positionLabel === "top" && (
        <div style={{ display: "flex", alignItems: "center" }}>
          <div onClick={toggle}>{label}</div>
          {extraLabel && extraLabel}
        </div>
      )}

      <div
        className={s.contentParent}
        style={{ height }}
        // style={
        //   open
        //     ? { height: contentRef?.current?.scrollHeight + "px" }
        //     : { height: "0px" }
        // }
      >
        <div ref={contentRef}>
          <div className={s.content}>{children}</div>
        </div>
      </div>
      {positionLabel === "bottom" && (
        <div style={{ display: "flex", alignItems: "center" }}>
          <div onClick={toggle}>{label}</div>
          {extraLabel && extraLabel}
        </div>
      )}
    </>
  );
};

export default Collapsible;
