import React from 'react';

interface SectionImagesProps {
  images?: string[];
  altPrefix: string;
}

export function SectionImages({ images, altPrefix }: SectionImagesProps) {
  // Do not render anything if the array is missing or empty
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 flex flex-col gap-8 w-full">
      {images.map((url, index) => (
        <div 
          key={index} 
          className="relative w-full flex justify-center bg-surface/5 rounded-xl overflow-hidden border border-border/20"
        >
          <img
            src={url}
            alt={`${altPrefix} - Image ${index + 1}`}
            // w-full, h-auto, and max-h constraint ensure it fits perfectly without layout breaking
            className="w-full h-auto max-h-[75vh] object-contain"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
}
