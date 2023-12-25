"use strict";

import { useState } from "react";

export function useCopyToClipboard({ timeout = 2000 }) {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = (value) => {
    if (typeof window === "undefined" || !navigator.clipboard?.writeText) {
      return;
    }

    if (!value) {
      return;
    }
    
    navigator.clipboard.writeText(value).then(() => {
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, timeout);
    });
  };

  return { isCopied, copyToClipboard };
}
