"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import {
  useLocale,
  usePendingLocaleLabel,
} from "@/components/i18n/locale-provider";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { locale, dir, transitioning, pendingLocale } = useLocale();
  const pendingLabel = usePendingLocaleLabel();
  const fromRight = (pendingLocale ?? locale) === "fa";

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={`${locale}-${pathname}`}
          initial={{
            opacity: 0,
            x: fromRight ? 36 : -36,
            filter: "blur(10px)",
          }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          exit={{
            opacity: 0,
            x: fromRight ? -24 : 24,
            filter: "blur(8px)",
          }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="min-h-full"
        >
          {children}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {transitioning ? (
          <motion.div
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
