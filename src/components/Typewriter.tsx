import { useEffect, useState } from "react";

interface TypewriterProps {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

export default function Typewriter({
  phrases,
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseDuration = 2000,
}: TypewriterProps) {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const phrase = phrases[currentPhraseIndex];

    if (isDeleting) {
      // Deleting phase
      timer = setTimeout(() => {
        setCurrentText((prev) => prev.slice(0, -1));
      }, deletingSpeed);
    } else {
      // Typing phase
      timer = setTimeout(() => {
        setCurrentText((prev) => phrase.slice(0, prev.length + 1));
      }, typingSpeed);
    }

    // Check transition criteria
    if (!isDeleting && currentText === phrase) {
      // Completed typing, pause before deleting
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, pauseDuration);
    } else if (isDeleting && currentText === "") {
      // Completed deleting, move to next phrase
      setIsDeleting(false);
      setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentPhraseIndex, phrases, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span className="inline-block font-mono font-semibold tracking-wide text-purple-400 glow-purple md:text-xl text-md">
      {currentText}
      <span className="inline-block w-1.5 h-5 ml-1 bg-purple-500 animate-pulse" />
    </span>
  );
}
