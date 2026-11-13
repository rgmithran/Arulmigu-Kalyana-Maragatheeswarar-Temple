import { Image as ImageIcon } from 'lucide-react';

/**
 * Temple-themed image placeholder with gradient background and decorative accents.
 *
 * @param {import('lucide-react').LucideIcon} [icon]       — Lucide icon component
 * @param {string}  [label]       — Text label below the icon
 * @param {string}  [aspectRatio] — Tailwind aspect class (e.g. 'aspect-video') or CSS value
 * @param {number}  [iconSize=48] — Icon pixel size
 * @param {string}  [className]   — Additional wrapper classes
 */
export default function ImagePlaceholder({
  icon: Icon = ImageIcon,
  label = '',
  aspectRatio = 'aspect-video',
  iconSize = 48,
  className = '',
}) {
  // Support both Tailwind aspect classes and raw CSS aspect-ratio values
  const isAspectClass = aspectRatio.startsWith('aspect-');
  const wrapperClass = isAspectClass ? aspectRatio : '';
  const wrapperStyle = !isAspectClass ? { aspectRatio } : undefined;

  return (
    <div
      className={`
        image-placeholder relative overflow-hidden rounded-lg
        ${wrapperClass} ${className}
      `}
      style={wrapperStyle}
    >
      {/* Gradient background */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-cream-dark via-cream to-cream-dark"
        aria-hidden="true"
      />

      {/* Subtle decorative dot pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'radial-gradient(circle, #6B0F1A 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
        aria-hidden="true"
      />

      {/* Icon & Label */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full gap-3 p-4">
        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-maroon/8 border border-maroon/10">
          <Icon size={iconSize} className="text-maroon/40" strokeWidth={1.2} />
        </div>
        {label && (
          <span className="font-tamil-serif text-sm text-maroon/60 text-center leading-relaxed">
            {label}
          </span>
        )}
      </div>

      {/* Gold corner accents */}
      <span className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-gold/20 rounded-tl-sm" aria-hidden="true" />
      <span className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-gold/20 rounded-tr-sm" aria-hidden="true" />
      <span className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-gold/20 rounded-bl-sm" aria-hidden="true" />
      <span className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-gold/20 rounded-br-sm" aria-hidden="true" />
    </div>
  );
}
