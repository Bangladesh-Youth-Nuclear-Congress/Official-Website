import { Fragment } from "react";

/**
 * Renders `[[bracketed]]` runs with the site's highlight style, so an editor can
 * control the emphasis inside a headline from /admin without writing markup.
 *
 *   "Powering Bangladesh's [[Nuclear Future]]"
 */
export default function Marked({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\[\[[^\]]+\]\])/g).map((part, i) =>
        part.startsWith("[[") && part.endsWith("]]") ? (
          <span key={i} className="hl">
            {part.slice(2, -2)}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        )
      )}
    </>
  );
}
