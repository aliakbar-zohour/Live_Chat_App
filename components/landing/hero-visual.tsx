"use client";

import { motion } from "framer-motion";

export function HeroVisual() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="ds-aurora absolute -left-[10%] top-[-20%] h-[70%] w-[55%] rounded-full bg-[radial-gradient(circle,rgba(76,154,255,0.45),transparent_68%)] blur-3xl" />
      <div className="absolute -right-[5%] bottom-[-10%] h-[55%] w-[50%] rounded-full bg-[radial-gradient(circle,rgba(99,208,255,0.28),transparent_70%)] blur-3xl" />

      <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(11,21,40,0.2),rgba(5,10,20,0.85))]" />

      <motion.div
        className="ds-float absolute left-[6%] top-[14%] w-[min(52%,22rem)] border border-line bg-ink-elevated/80 p-4 backdrop-blur-md md:p-5"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center bg-signal/20 font-display text-xs text-signal-bright">
            JR
          </div>
          <div>
            <p className="text-sm font-semibold text-bone">Jordan Lee</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-mist">
              Direct · live
            </p>
          </div>
        </div>
        <div className="space-y-3">
          <div className="max-w-[90%] border border-line bg-ink-soft px-3 py-2 text-sm text-bone-muted">
            Ready to pressure-test the realtime layer?
          </div>
          <div className="ml-auto max-w-[85%] bg-signal px-3 py-2 text-sm font-medium text-onsignal">
            Already in. SSE feels snappy.
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-[12%] right-[6%] w-[min(48%,19rem)] border border-signal/35 bg-signal/10 p-4 backdrop-blur-md md:p-5"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{ animationDelay: "1.2s" }}
      >
        <p className="ds-kicker mb-3">Room · Design Critique</p>
        <p className="font-display text-xl tracking-tight text-bone md:text-2xl">
          Motion on the composer feels ready.
        </p>
        <p className="mt-3 text-sm text-bone-muted">Sam · 3 members online</p>
      </motion.div>

      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink to-transparent" />
    </div>
  );
}
