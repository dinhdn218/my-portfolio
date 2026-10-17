"use client";

import { useRef, useState } from "react";

/** Shows a value as selectable text with a copy button; falls back to selecting the text if the clipboard is blocked. */
export function CopyChip({ value, display, label = "Copy" }: { value: string; display?: string; label?: string }) {
  const [state, setState] = useState<"idle" | "copied" | "selected">("idle");
  const textRef = useRef<HTMLSpanElement>(null);

  function selectText() {
    const node = textRef.current;
    if (!node) return;
    const range = document.createRange();
    range.selectNodeContents(node);
    const sel = window.getSelection();
    sel?.removeAllRanges();
    sel?.addRange(range);
    setState("selected");
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setState("copied");
    } catch {
      selectText();
    }
    window.setTimeout(() => setState("idle"), 1800);
  }

  return (
    <span className="inline-flex max-w-full items-stretch overflow-hidden rounded-[9px] border border-line bg-surface">
      <span ref={textRef} className="min-w-0 truncate px-3 py-[9px] font-mono text-sm text-ink select-all">
        {display ?? value}
      </span>
      <button
        type="button"
        onClick={copy}
        className="cursor-pointer border-l border-line px-3 text-[13px] font-semibold whitespace-nowrap text-ink-2 hover:bg-accent-soft hover:text-ink"
        aria-live="polite"
      >
        {state === "copied" ? "Copied" : state === "selected" ? "Press Ctrl+C" : label}
      </button>
    </span>
  );
}
