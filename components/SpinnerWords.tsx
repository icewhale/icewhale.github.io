"use client";

import { useEffect, useState, useCallback, useRef } from "react";

const words = [
  "Thinking",
  "Reasoning",
  "Analyzing",
  "Contemplating",
  "Pondering",
  "Reflecting",
  "Considering",
  "Synthesizing",
  "Evaluating",
  "Processing",
];

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#@$%&*!?<>~^";
const SCRAMBLE_FPS = 30;
const REVEAL_DURATION = 800;
const HOLD_DURATION = 2400;
const DOT_INTERVAL = 400;

function randomChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

function useScrambleText(words: string[]) {
  const [display, setDisplay] = useState(words[0]);
  const [wordIndex, setWordIndex] = useState(0);
  const frameRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const phaseRef = useRef<"revealing" | "holding">("holding");

  const scramble = useCallback((target: string, progress: number) => {
    const revealed = Math.floor(progress * target.length);
    return target
      .split("")
      .map((ch, i) => (i < revealed ? ch : randomChar()))
      .join("");
  }, []);

  useEffect(() => {
    let elapsed = 0;
    const step = 1000 / SCRAMBLE_FPS;

    function tick() {
      if (phaseRef.current === "holding") {
        elapsed += step;
        if (elapsed >= HOLD_DURATION) {
          elapsed = 0;
          phaseRef.current = "revealing";
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      } else {
        elapsed += step;
        const progress = Math.min(elapsed / REVEAL_DURATION, 1);
        setDisplay(scramble(words[wordIndex], progress));
        if (progress >= 1) {
          elapsed = 0;
          phaseRef.current = "holding";
        }
      }
      frameRef.current = setTimeout(tick, step);
    }

    frameRef.current = setTimeout(tick, step);
    return () => {
      if (frameRef.current) clearTimeout(frameRef.current);
    };
  }, [wordIndex, words, scramble]);

  return display;
}

function LoadingDots() {
  const [count, setCount] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => (prev % 3) + 1);
    }, DOT_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  return (
    <span className="inline-block w-[1.5ch] text-left">
      {".".repeat(count)}
    </span>
  );
}

export default function SpinnerWords() {
  const display = useScrambleText(words);

  return (
    <span className="inline-flex items-baseline font-mono">
      <span>{display}</span>
      <LoadingDots />
    </span>
  );
}
