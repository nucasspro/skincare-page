"use client";

import Image from 'next/image';

interface ImagePopupModalProps {
  isOpen: boolean;
  imageSrc: string;
  imageAlt: string;
  onClose: () => void;
}

export default function ImagePopupModal({ isOpen, imageSrc, imageAlt, onClose }: ImagePopupModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-[90vw] max-h-[90vh] w-auto h-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute -top-10 right-0 text-white text-3xl font-bold hover:text-gray-300 transition-colors"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={1200}
          height={1600}
          className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
          quality={100}
          unoptimized
        />
      </div>
    </div>
  );
}
