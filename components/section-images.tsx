interface SectionImagesProps {
  images?: string[];
  altPrefix: string;
  variant?: 'section' | 'cover';
  className?: string;
}

export function SectionImages({
  images,
  altPrefix,
  variant = 'section',
  className = '',
}: SectionImagesProps) {
  if (!images || images.length === 0) {
    return null;
  }

  const frameClassName =
    variant === 'cover'
      ? 'rounded-xl border border-border/30 bg-surface/50 p-4 sm:p-6'
      : 'rounded-xl border border-border/20 bg-surface/5';

  const imageClassName =
    variant === 'cover'
      ? 'w-full h-auto max-h-[70vh] object-contain'
      : 'w-full h-auto max-h-[75vh] object-contain';

  return (
    <div
      className={`w-full ${variant === 'cover' ? 'mb-12' : 'mt-8'} flex flex-col gap-6 sm:gap-8 ${className}`.trim()}
    >
      {images.map((url, index) => (
        <div
          key={`${url}-${index}`}
          className={`relative w-full overflow-hidden ${frameClassName}`}
        >
          <img
            src={url}
            alt={`${altPrefix} - Image ${index + 1}`}
            className={imageClassName}
            loading="lazy"
            decoding="async"
          />
        </div>
      ))}
    </div>
  );
}
