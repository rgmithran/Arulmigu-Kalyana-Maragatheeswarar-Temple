/**
 * Decorative temple border strip.
 *
 * @param {'gold' | 'maroon' | 'pattern'} [variant='gold'] — Visual style
 * @param {string} [className] — Additional classes
 */
export default function TempleBorder({ variant = 'gold', className = '' }) {
  const variants = {
    gold: 'temple-border-top',       // smooth gold gradient line
    pattern: 'temple-border-pattern', // repeating dash pattern
    maroon: '',                       // custom maroon gradient below
  };

  if (variant === 'maroon') {
    return (
      <div
        className={`h-[3px] ${className}`}
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, #6B0F1A 10%, #4A0A12 30%, #6B0F1A 50%, #4A0A12 70%, #6B0F1A 90%, transparent 100%)',
        }}
        role="presentation"
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      className={`${variants[variant] || variants.gold} ${className}`}
      role="presentation"
      aria-hidden="true"
    />
  );
}
