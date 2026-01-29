"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Pause, X } from "lucide-react";

interface BreathingWidgetProps {
  onComplete: () => void;
  onCancel: () => void;
  demoMode?: boolean; // Si true, dure 60s. Sinon 3 min.
}

export function BreathingWidget({
  onComplete,
  onCancel,
  demoMode = true
}: BreathingWidgetProps) {
  // Config
  const TOTAL_TIME = demoMode ? 60 : 180; // 60s pour la démo, 3m pour la prod
  const BREATH_CYCLE = 10; // 5s inspire, 5s expire

  // State
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [isActive, setIsActive] = useState(true);
  const [phase, setPhase] = useState<"INSPIRE" | "EXPIRE">("INSPIRE");

  // Timer Logic
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = prev - 1;

          // Calcul de la phase (cycle de 10s)
          const timeInCycle = newTime % BREATH_CYCLE;
          setPhase(timeInCycle >= 5 ? "INSPIRE" : "EXPIRE");

          return newTime;
        });
      }, 1000);
    } else if (timeLeft === 0) {
      // FIN DU TIMER -> Trigger automatique
      onComplete();
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, onComplete]);

  // Format MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const currentCycle = Math.ceil((TOTAL_TIME - timeLeft) / BREATH_CYCLE);
  const totalCycles = TOTAL_TIME / BREATH_CYCLE;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4">
      <Card className="w-full max-w-md bg-white border-indigo-100 shadow-2xl p-8 flex flex-col items-center relative overflow-hidden">

        {/* Header */}
        <div className="absolute top-4 right-4">
          <Button variant="ghost" size="icon" onClick={onCancel} className="text-slate-400 hover:text-slate-600">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="mb-8 text-center space-y-1">
          <h3 className="text-xl font-semibold text-slate-800">Recalibrage Système</h3>
          <p className="text-sm text-indigo-600 font-medium">
            Cycle {currentCycle}/{totalCycles} • {formatTime(timeLeft)}
          </p>
        </div>

        {/* Animation Cercle */}
        <div className="relative w-64 h-64 flex items-center justify-center mb-8">
          {/* Cercle d'arrière plan (fixe) */}
          <div className="absolute w-32 h-32 rounded-full border-4 border-indigo-50" />

          {/* Cercle animé (Le Poumon) */}
          <AnimatePresence mode="wait">
             <motion.div
              key={isActive ? "active" : "paused"}
              animate={isActive ? {
                scale: [1, 2.5, 1], // Petit -> Grand -> Petit
                opacity: [0.5, 0.8, 0.5],
              } : {
                scale: 1,
                opacity: 0.5
              }}
              transition={isActive ? {
                duration: 10, // 5s inspire + 5s expire
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.5, 1] // 0% début, 50% max (5s), 100% fin
              } : {}}
              className="w-32 h-32 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 blur-xl opacity-50"
            />
          </AnimatePresence>

          {/* Texte Central */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.span
              key={phase}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-2xl font-bold text-slate-700 tracking-widest uppercase"
            >
              {phase === "INSPIRE" ? "Inspire" : "Expire"}
            </motion.span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-4">
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-slate-200 hover:bg-slate-50 w-32"
            onClick={() => setIsActive(!isActive)}
          >
            {isActive ? (
              <><Pause className="mr-2 h-4 w-4" /> Pause</>
            ) : (
              <><Play className="mr-2 h-4 w-4" /> Reprendre</>
            )}
          </Button>

          <Button
            variant="ghost"
            size="lg"
            onClick={onCancel}
            className="text-slate-500 hover:text-red-500 hover:bg-red-50"
          >
            Arrêter
          </Button>
        </div>

      </Card>
    </div>
  );
}
