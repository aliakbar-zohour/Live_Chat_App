"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  useLocale,
  usePendingLocaleLabel,
} from "@/components/i18n/locale-provider";

/**
 * Locale overlay transition only.
 * Route children must NOT be keyed/AnimatePresence-wrapped here —
 * that remounts different page trees in one fiber and blows up hooks.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const { transitioning, pendingLocale } = useLocale();
  const pendingLabel = usePendingLocaleLabel();

  return (
    <>
      <div className="min-h-full">{children}</div>

      <AnimatePresence>
        {transitioning ? (
          <motion.div
            key="locale-overlay"
            className="pointer-events-none fixed inset-0 z-[80] flex items-center justify-center bg-ink/85 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 1.05, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="min-w-[16rem] border border-line bg-ink-elevated px-8 py-7 text-center shadow-[var(--ds-shadow-soft)]"
              dir={pendingLocale === "fa" ? "rtl" : "ltr"}
            >
              <p className="ds-kicker mb-2">
                {pendingLocale === "fa" ? "سوییچ زبان" : "Language"}
              </p>
              <p className="font-display text-2xl tracking-tight text-bone">
                {pendingLocale === "fa"
                  ? `رفتن به ${pendingLabel}`
                  : `Switching to ${pendingLabel}`}
              </p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
