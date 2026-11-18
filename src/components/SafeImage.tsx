import { useState } from 'react';
import { Utensils } from 'lucide-react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'eager' | 'lazy';
  fetchPriority?: 'high' | 'low' | 'auto';
}

export function SafeImage({
  src,
  alt,
  className = '',
  loading = 'lazy',
  fetchPriority = 'auto',
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#F2ECE1] to-[#E5DDD0] text-[#5A534A] p-6 text-center ${className}`}
      >
        <Utensils className="w-7 h-7 text-[#C83E2B]/70 mb-2" aria-hidden="true" />
        <span className="text-xs font-medium max-w-[18ch] leading-snug">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      decoding="async"
      fetchPriority={fetchPriority}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
