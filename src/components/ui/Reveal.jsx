/**
 * Marks a block for the page-wide scroll reveal (see lib/useScrollReveal.js).
 *
 * Deliberately not a Motion component: this renders a plain element that is
 * visible on its own, and the reveal is layered on top by CSS. `delay` staggers
 * siblings through a custom property rather than JS timers.
 */
export default function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
  style,
  ...rest
}) {
  return (
    <Tag
      data-reveal=""
      className={className}
      style={delay ? { ...style, "--reveal-delay": `${delay}s` } : style}
      {...rest}
    >
      {children}
    </Tag>
  );
}
