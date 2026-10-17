import React, { useState, useEffect, useRef, useCallback } from "react";
import { Calculator, MessageSquare } from "lucide-react";
import { CONTACT_INFO } from "../data";

interface FloatingActionsProps {
  onOpenSimulator: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ onOpenSimulator }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOverText, setIsOverText] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Check whether the floating buttons overlap any rendered text or interactive elements
  const detectTextOverlap = useCallback(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();

    if (rect.width === 0 || rect.height === 0) return;

    // Sample coordinates across the floating buttons bounding area
    const samplePoints = [
      { x: rect.left + 12, y: rect.top + 14 },
      { x: rect.right - 14, y: rect.top + 14 },
      { x: rect.left + rect.width / 2, y: rect.top + 14 },
      { x: rect.left + 12, y: rect.bottom - 16 },
      { x: rect.right - 14, y: rect.bottom - 16 },
      { x: rect.left + rect.width / 2, y: rect.bottom - 16 },
      { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 },
    ];

    let textDetected = false;

    for (const pt of samplePoints) {
      if (
        pt.x < 0 ||
        pt.x > window.innerWidth ||
        pt.y < 0 ||
        pt.y > window.innerHeight
      ) {
        continue;
      }

      const elements = document.elementsFromPoint(pt.x, pt.y);

      for (const el of elements) {
        // Skip self and descendants
        if (container.contains(el)) continue;

        const tagName = el.tagName.toUpperCase();

        // Skip root/layout/background containers
        if (
          tagName === "HTML" ||
          tagName === "BODY" ||
          tagName === "MAIN" ||
          tagName === "CANVAS" ||
          tagName === "HEADER" ||
          el.id === "root"
        ) {
          continue;
        }

        // 1. Interactive controls and semantic blocks that shouldn't be covered
        if (
          ["BUTTON", "A", "INPUT", "TEXTAREA", "SELECT", "TABLE", "TH", "TD", "BLOCKQUOTE"].includes(
            tagName
          )
        ) {
          textDetected = true;
          break;
        }

        // 2. Text tags: Paragraphs, Headings, Lists, Spans, Labels, Strong, etc.
        const textTags = [
          "P",
          "H1",
          "H2",
          "H3",
          "H4",
          "H5",
          "H6",
          "LI",
          "SPAN",
          "STRONG",
          "B",
          "EM",
          "LABEL",
          "CODE",
        ];

        if (textTags.includes(tagName)) {
          const content = el.textContent?.trim();
          if (content && content.length > 0) {
            // Check exact text line rects using Range to verify real text glyphs are here
            try {
              const range = document.createRange();
              range.selectNodeContents(el);
              const clientRects = range.getClientRects();
              for (let i = 0; i < clientRects.length; i++) {
                const cr = clientRects[i];
                // Include an 8px reading safety buffer around rendered text
                if (
                  pt.x >= cr.left - 8 &&
                  pt.x <= cr.right + 8 &&
                  pt.y >= cr.top - 6 &&
                  pt.y <= cr.bottom + 6
                ) {
                  textDetected = true;
                  break;
                }
              }
            } catch {
              // Fallback to bounding client rect
              const cr = el.getBoundingClientRect();
              if (
                pt.x >= cr.left &&
                pt.x <= cr.right &&
                pt.y >= cr.top &&
                pt.y <= cr.bottom
              ) {
                textDetected = true;
                break;
              }
            }
          }
        }

        if (textDetected) break;
      }

      if (textDetected) break;
    }

    setIsOverText(textDetected);
  }, []);

  // Listen to scroll, resize and DOM changes with requestAnimationFrame throttling
  useEffect(() => {
    let animId: number;

    const handleUpdate = () => {
      cancelAnimationFrame(animId);
      animId = requestAnimationFrame(() => {
        detectTextOverlap();
      });
    };

    window.addEventListener("scroll", handleUpdate, { passive: true });
    window.addEventListener("resize", handleUpdate, { passive: true });

    // Initial check after paint
    const t1 = setTimeout(detectTextOverlap, 100);
    const t2 = setTimeout(detectTextOverlap, 500);

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("scroll", handleUpdate);
      window.removeEventListener("resize", handleUpdate);
    };
  }, [detectTextOverlap]);

  // The 2 buttons only appear in areas where there is NO text/writing (unless user hovers over them to click)
  const isVisible = !isOverText || isHovered;

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`fixed bottom-20 sm:bottom-24 right-4 sm:right-6 z-40 flex flex-col items-end gap-2.5 sm:gap-3 transition-all duration-300 ease-out ${
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none scale-95"
      }`}
      aria-hidden={!isVisible}
    >
      {/* 1. Simulateur Quick Jump */}
      <button
        onClick={onOpenSimulator}
        tabIndex={isVisible ? 0 : -1}
        className="flex items-center gap-2 bg-[#84cc16] hover:bg-[#65a30d] text-slate-950 hover:text-white px-3.5 py-2.5 rounded-full font-black text-xs shadow-xl shadow-lime-950/25 transition-all hover:scale-105 cursor-pointer border border-lime-300 backdrop-blur-xs"
        title="Lancer le simulateur de devis personnalisé"
      >
        <Calculator className="w-4 h-4 shrink-0" />
        <span className="hidden sm:inline">Simuler Devis</span>
      </button>

      {/* 2. WhatsApp Direct Contact */}
      <a
        href={CONTACT_INFO.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={isVisible ? 0 : -1}
        className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-3 rounded-full font-bold text-xs shadow-xl shadow-emerald-950/40 transition-all hover:scale-105 border border-emerald-400/40 backdrop-blur-xs"
        title="Contacter 242Agro par WhatsApp (+242 06 874 22 77)"
      >
        <MessageSquare className="w-4 h-4 shrink-0" />
        <span className="hidden sm:inline">WhatsApp (+242 06 874 22 77)</span>
      </a>
    </div>
  );
};
