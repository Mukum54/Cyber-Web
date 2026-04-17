"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  Underline,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Link,
  Code,
  Eye,
  EyeOff,
  Undo,
  Redo,
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeight?: string;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Start writing your content...",
  minHeight = "320px",
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [showLinkInput, setShowLinkInput] = useState(false);
  const savedSelection = useRef<Range | null>(null);

  // Sync external value changes into the editor
  useEffect(() => {
    if (editorRef.current && !showPreview) {
      // Only update if the content differs to avoid cursor reset
      if (editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value;
      }
    }
  }, [value, showPreview]);

  const execCommand = useCallback(
    (command: string, val?: string) => {
      editorRef.current?.focus();
      document.execCommand(command, false, val);
      if (editorRef.current) {
        onChange(editorRef.current.innerHTML);
      }
    },
    [onChange]
  );

  const handleInput = useCallback(() => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  }, [onChange]);

  const handleSaveSelection = useCallback(() => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      savedSelection.current = sel.getRangeAt(0);
    }
  }, []);

  const handleInsertLink = useCallback(() => {
    if (linkUrl.trim()) {
      if (savedSelection.current) {
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(savedSelection.current);
      }
      execCommand("createLink", linkUrl.trim());
      setLinkUrl("");
      setShowLinkInput(false);
    }
  }, [linkUrl, execCommand]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        handleSaveSelection();
        setShowLinkInput(true);
      }
    },
    [handleSaveSelection]
  );

  const toolbarButtons = [
    { icon: Bold, label: "Bold", command: "bold" },
    { icon: Italic, label: "Italic", command: "italic" },
    { icon: Underline, label: "Underline", command: "underline" },
    { separator: true },
    { icon: Heading2, label: "Heading 2", command: "formatBlock", value: "H2" },
    { icon: Heading3, label: "Heading 3", command: "formatBlock", value: "H3" },
    { separator: true },
    { icon: List, label: "Bullet List", command: "insertUnorderedList" },
    { icon: ListOrdered, label: "Numbered List", command: "insertOrderedList" },
    { separator: true },
    {
      icon: Link,
      label: "Link",
      action: () => {
        handleSaveSelection();
        setShowLinkInput(true);
      },
    },
    { icon: Code, label: "Code Block", command: "formatBlock", value: "PRE" },
    { separator: true },
    { icon: Undo, label: "Undo", command: "undo" },
    { icon: Redo, label: "Redo", command: "redo" },
  ];

  return (
    <div className="border rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 p-2 bg-muted/50 border-b">
        {toolbarButtons.map((btn, i) => {
          if ("separator" in btn && btn.separator) {
            return (
              <div
                key={`sep-${i}`}
                className="w-px h-5 bg-border mx-1"
              />
            );
          }
          const Icon = btn.icon!;
          return (
            <Button
              key={btn.label}
              type="button"
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => {
                if ("action" in btn && btn.action) {
                  btn.action();
                } else {
                  execCommand(btn.command!, btn.value);
                }
              }}
              title={btn.label}
            >
              <Icon className="h-3.5 w-3.5" />
            </Button>
          );
        })}
        <div className="w-px h-5 bg-border mx-1" />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={() => setShowPreview(!showPreview)}
          title={showPreview ? "Edit" : "Preview"}
        >
          {showPreview ? (
            <EyeOff className="h-3.5 w-3.5" />
          ) : (
            <Eye className="h-3.5 w-3.5" />
          )}
        </Button>
      </div>

      {/* Link input */}
      {showLinkInput && (
        <div className="flex items-center gap-2 px-3 py-2 bg-muted/30 border-b">
          <Link className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
          <input
            type="url"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleInsertLink();
              if (e.key === "Escape") {
                setShowLinkInput(false);
                setLinkUrl("");
              }
            }}
            placeholder="Paste URL and press Enter..."
            className="flex-1 bg-transparent text-sm outline-none min-w-0"
            autoFocus
          />
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="h-6 text-xs px-2"
            onClick={handleInsertLink}
          >
            Apply
          </Button>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            className="h-6 text-xs px-2"
            onClick={() => {
              setShowLinkInput(false);
              setLinkUrl("");
            }}
          >
            Cancel
          </Button>
        </div>
      )}

      {/* Editor / Preview */}
      {showPreview ? (
        <div
          className="p-4 prose prose-sm dark:prose-invert max-w-none overflow-y-auto"
          style={{ minHeight }}
          dangerouslySetInnerHTML={{ __html: value || "<p class='text-muted-foreground italic'>Nothing to preview</p>" }}
        />
      ) : (
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          className="p-4 text-sm outline-none overflow-y-auto focus:bg-muted/10 transition-colors"
          style={{ minHeight }}
          dangerouslySetInnerHTML={{
            __html: value || `<p class="text-muted-foreground">${placeholder}</p>`,
          }}
        />
      )}

      {/* Word count */}
      <div className="flex items-center justify-between px-3 py-1.5 border-t bg-muted/30 text-xs text-muted-foreground">
        <span>
          {showPreview ? "Preview mode" : "Editor mode"}
        </span>
        <span>
          {value.replace(/<[^>]*>/g, "").split(/\s+/).filter(Boolean).length}{" "}
          words
        </span>
      </div>
    </div>
  );
}
