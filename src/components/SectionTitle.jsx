/**
 * A reusable section title with decorative temple-themed ornaments.
 *
 * @param {string}  title        — Primary heading text (also accepts children for backward compat)
 * @param {string}  [subtitle]   — Optional secondary text
 * @param {boolean} [centered=true] — Center-align the title block
 * @param {boolean} [light=false]   — Light-on-dark colour scheme
 * @param {string}  [className]     — Additional wrapper classes
 */
export default function SectionTitle({
  title,
  children,
  subtitle = '',
  centered = true,
  light = false,
  className = '',
}) {
  const heading = title || children;
  const textColor = light ? 'text-cream' : 'text-maroon-dark';
  const subtitleColor = light ? 'text-cream/80' : 'text-gold-dark';
  const ornamentColor = light ? 'text-gold-light' : 'text-gold';
  const alignment = centered ? 'text-center' : 'text-left';

  return (
    <div className={`mb-10 lg:mb-14 ${alignment} ${className}`}>
      {/* Top ornament */}
      <div
        className={`section-ornament ${ornamentColor} mb-4 ${centered ? '' : 'justify-start'}`}
        aria-hidden="true"
      >
        <span className="text-lg select-none">✦</span>
      </div>

      {/* Title */}
      <h2
        className={`
          font-tamil-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl
          font-bold leading-snug tracking-wide
          ${textColor}
        `}
      >
        {heading}
      </h2>

      {/* Optional subtitle */}
      {subtitle && (
        <p
          className={`
            font-tamil-sans text-base md:text-lg mt-3
            max-w-2xl leading-relaxed
            ${centered ? 'mx-auto' : ''}
            ${subtitleColor}
          `}
        >
          {subtitle}
        </p>
      )}

      {/* Bottom decorative kolam divider */}
      <div className={`kolam-divider mt-5 ${centered ? '' : 'justify-start'}`} aria-hidden="true" />
    </div>
  );
}
