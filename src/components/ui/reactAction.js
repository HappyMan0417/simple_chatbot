"use client";

// import { Button } from "@/components/ui/button";
// import { IconCheck, IconCopy } from "@/components/ui/icons";
import { useCopyToClipboard } from "./use-copy-to-clipboard";
// import { cn } from "@/lib/utils";

export function ChatMessageActions({ message }) {
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 });

  const onCopy = () => {
    if (isCopied) return;
    copyToClipboard(message.text);
  };

  return (
    <div className="flex items-center justify-end transition-opacity group-hover:opacity-100 md:absolute md:-right-10 md:-top-2 md:opacity-0">
      <button variant="ghost" size="icon" onClick={onCopy}>
        {isCopied ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 256"
            fill="currentColor"
            className="h-4 w-4"
          >
            <path d="m229.66 77.66-128 128a8 8 0 0 1-11.32 0l-56-56a8 8 0 0 1 11.32-11.32L96 188.69 218.34 66.34a8 8 0 0 1 11.32 11.32Z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 256"
            fill="currentColor"
            className="h-4 w-4"
          >
            <path d="M216 32H88a8 8 0 0 0-8 8v40H40a8 8 0 0 0-8 8v128a8 8 0 0 0 8 8h128a8 8 0 0 0 8-8v-40h40a8 8 0 0 0 8-8V40a8 8 0 0 0-8-8Zm-56 176H48V96h112Zm48-48h-32V88a8 8 0 0 0-8-8H96V48h112Z" />
          </svg>
        )}
        <span className="sr-only">Copy message</span>
      </button>
    </div>
  );
}
