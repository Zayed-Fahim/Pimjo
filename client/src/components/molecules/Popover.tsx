"use client";
import { useEffect, useRef, useState, ReactNode } from "react";

type PopoverProps = {
  children: ReactNode;
  trigger: ReactNode;
  className?: string;
  triggerClassName?: string;
};

const Popover = ({
  children,
  trigger,
  className,
  triggerClassName,
}: PopoverProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const togglePopover = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={popoverRef}>
      <div onClick={togglePopover} className={triggerClassName}>
        {trigger}
      </div>
      {isOpen && (
        <div
          className={`absolute z-10 bg-black rounded shadow-md ${className}`}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Popover;
