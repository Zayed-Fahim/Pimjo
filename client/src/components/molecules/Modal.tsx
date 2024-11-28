"use client";
import { ReactNode } from "react";
import { Button } from "@/components/atoms";

type ModalProps = {
  isOpen: boolean;
  title: string | ReactNode;
  message?: string | ReactNode;
  onClose: () => void;
  children: ReactNode;
};

const Modal = ({ isOpen, title, onClose, children, message }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-black border border-zinc-700 rounded-lg shadow-lg p-6">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-baseline mb-4">
            <h2 className="text-xl font-semibold">{title}</h2>
            <Button
              onClick={onClose}
              className="text-gray-500 hover:text-white flex justify-end items-center"
            >
              ✕
            </Button>
          </div>
          <div>{message}</div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
