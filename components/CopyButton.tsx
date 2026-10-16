"use client";

import { useState } from "react";

export default function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked: the value is still visible on screen to copy by hand
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-live="polite"
      className="rounded-full border border-iris px-6 py-2.5 text-xs uppercase tracking-widest text-iris transition-colors hover:bg-iris/90 hover:text-white hover:border-white"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}
