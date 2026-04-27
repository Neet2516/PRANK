import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import backgroundImage from "./background.jpeg";
import loveSong from "./assets/LOVE.mp3";

const steps = [
  {
    gif: "https://tenor.com/embed/22885016",
    title: "Do you love me? \u{1F917}",
    subtitle: "I am all yours",
    yes: "Yes",
    no: "No",
  },
  {
    gif: "https://tenor.com/embed/22050818",
    title: "Please think again! \u{1F644}",
    subtitle: "Itni jaldi na matt bolo \u{1F625}",
    yes: "Yes",
    no: "No",
  },
  {
    gif: "https://tenor.com/embed/15195810",
    title: "Ek aur baar soch lo! \u{1F623}",
    subtitle: "Kyu aisa kar rahi ho? Please maan jao \u{1F623}",
    yes: "Yes",
    no: "No",
  },
  {
    gif: "https://tenor.com/embed/15974530976611222074",
    title: "Hey my dear, please maan jao na! \u{1F62D}",
    subtitle: "Kitna code likhwaogi? Bahut galat baat hai yrr \u{1F62D}",
    yes: "Yes",
    no: "No",
    runaway: true,
  },
];

const success = {
  gif: "https://tenor.com/embed/253027946666209433",
  title: "I knew it! You love me a lot \u{1F618}",
  subtitle: "This page officially belongs to us now.",
};

const decisionLocked = {
  gif: "https://tenor.com/embed/253027946666209433",
  title: "Ab decision mat badlo na \u{1F97A}",
  subtitle: "You already said yes once. Bas, ab pyaar confirmed hai.",
};

const sparkles = [
  "top-[8%] left-[18%]",
  "top-[18%] right-[18%]",
  "top-[28%] left-[8%]",
  "top-[42%] right-[9%]",
  "bottom-[14%] left-[14%]",
  "bottom-[20%] right-[18%]",
  "top-[12%] left-[52%]",
  "bottom-[8%] left-[48%]",
  "top-[62%] left-[7%]",
  "top-[66%] right-[6%]",
  "top-[7%] right-[38%]",
  "bottom-[31%] left-[28%]",
  "bottom-[29%] right-[29%]",
  "top-[33%] left-[30%]",
  "top-[36%] right-[28%]",
  "bottom-[11%] right-[42%]",
];

const floatingHearts = [
  { className: "left-[6%] top-[18%]", size: 34, delay: 0 },
  { className: "right-[7%] top-[16%]", size: 46, delay: 0.35 },
  { className: "left-[12%] bottom-[18%]", size: 52, delay: 0.7 },
  { className: "right-[12%] bottom-[20%]", size: 30, delay: 0.2 },
  { className: "left-[24%] top-[8%]", size: 24, delay: 0.9 },
  { className: "right-[25%] bottom-[8%]", size: 38, delay: 0.55 },
  { className: "left-[42%] top-[4%]", size: 28, delay: 1.1 },
  { className: "right-[41%] bottom-[4%]", size: 26, delay: 1.4 },
];

const orbitHearts = ["\u{1F496}", "\u{1F497}", "\u{1F49E}", "\u{1F498}"];

const cardVariants = {
  initial: { opacity: 0, y: 40, rotateX: 12, scale: 0.94 },
  animate: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 120, damping: 16 },
  },
};

const contentVariants = {
  initial: { opacity: 0, y: 18, filter: "blur(8px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.42, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -18,
    filter: "blur(8px)",
    transition: { duration: 0.22, ease: "easeIn" },
  },
};

function FloatingHeart({ heart, index }) {
  return (
    <motion.span
      className={`heart-3d fixed -z-10 ${heart.className}`}
      aria-hidden="true"
      style={{ "--heart-size": `${heart.size}px` }}
      initial={{ opacity: 0, y: 34, rotate: -45, scale: 0.75 }}
      animate={{
        opacity: [0.65, 1, 0.72],
        y: [0, -42, 0],
        x: [0, index % 2 ? 18 : -18, 0],
        rotateY: [0, 34, 0],
        scale: [1, 1.14, 1],
      }}
      transition={{
        duration: 7 + index * 0.35,
        delay: heart.delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

function App() {
  const [stepIndex, setStepIndex] = useState(0);
  const [accepted, setAccepted] = useState(false);
  const [hasAcceptedBefore, setHasAcceptedBefore] = useState(() => {
    try {
      return localStorage.getItem("proposalAccepted") === "yes";
    } catch {
      return false;
    }
  });
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [noPosition, setNoPosition] = useState({ top: "50%", left: "62%" });
  const audioRef = useRef(null);

  const showDecisionLocked = hasAcceptedBefore && !accepted;
  const current = accepted ? success : showDecisionLocked ? decisionLocked : steps[stepIndex];
  const sparkleItems = useMemo(() => sparkles, []);

  const moveNoButton = () => {
    if (!current.runaway) return;

    setNoPosition({
      top: `${Math.floor(Math.random() * 58) + 20}%`,
      left: `${Math.floor(Math.random() * 64) + 8}%`,
    });
  };

  const playMusic = async () => {
    if (!audioRef.current) return false;

    try {
      audioRef.current.volume = 0.42;
      await audioRef.current.play();
      setIsMusicPlaying(true);
      return true;
    } catch {
      setIsMusicPlaying(false);
      return false;
    }
  };

  const toggleMusic = async () => {
    if (!audioRef.current) return;

    if (isMusicPlaying) {
      audioRef.current.pause();
      setIsMusicPlaying(false);
      return;
    }

    await playMusic();
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return undefined;

    const startFromBeginning = () => {
      audio.currentTime = 0;
      playMusic();
    };

    const startAfterFirstGesture = () => {
      audio.currentTime = 0;
      playMusic();
      window.removeEventListener("pointerdown", startAfterFirstGesture);
      window.removeEventListener("keydown", startAfterFirstGesture);
      window.removeEventListener("touchstart", startAfterFirstGesture);
    };

    audio.addEventListener("loadedmetadata", startFromBeginning);
    window.addEventListener("pointerdown", startAfterFirstGesture, { once: true });
    window.addEventListener("keydown", startAfterFirstGesture, { once: true });
    window.addEventListener("touchstart", startAfterFirstGesture, { once: true });
    playMusic();

    return () => {
      audio.removeEventListener("loadedmetadata", startFromBeginning);
      window.removeEventListener("pointerdown", startAfterFirstGesture);
      window.removeEventListener("keydown", startAfterFirstGesture);
      window.removeEventListener("touchstart", startAfterFirstGesture);
    };
  }, []);

  const handleNo = () => {
    playMusic();

    if (showDecisionLocked) return;

    if (current.runaway) {
      moveNoButton();
      return;
    }

    setStepIndex((index) => Math.min(index + 1, steps.length - 1));
    setNoPosition({ top: "50%", left: "62%" });
  };

  const restart = () => {
    playMusic();
    setAccepted(false);
    setStepIndex(0);
    setNoPosition({ top: "50%", left: "62%" });
  };

  const acceptLove = () => {
    playMusic();
    setAccepted(true);
    setHasAcceptedBefore(true);

    try {
      localStorage.setItem("proposalAccepted", "yes");
    } catch {
      // The app still works if storage is unavailable.
    }
  };

  return (
    <main className="romance-stage relative grid min-h-dvh place-items-center overflow-x-hidden overflow-y-auto px-4 py-5 text-[#241b2f] sm:px-6 sm:py-8">
      <audio
        ref={audioRef}
        src={loveSong}
        preload="auto"
        onPause={() => setIsMusicPlaying(false)}
        onPlay={() => setIsMusicPlaying(true)}
        onEnded={() => {
          if (!audioRef.current) return;
          audioRef.current.currentTime = 0;
          playMusic();
        }}
      />

      <motion.div
        className="pointer-events-none fixed inset-0 -z-40 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1.02, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
      <motion.div
        className="pointer-events-none fixed inset-0 -z-30 bg-[linear-gradient(135deg,rgba(63,18,41,.72),rgba(255,92,143,.36)_48%,rgba(16,78,73,.56))]"
        animate={{ opacity: [0.92, 1, 0.92] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="pointer-events-none fixed inset-0 -z-30 bg-[linear-gradient(90deg,rgba(255,255,255,.16)_1px,transparent_1px),linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px)] bg-[length:54px_54px] opacity-30" />

      <motion.div
        className="photo-depth photo-depth-left"
        aria-hidden="true"
        initial={{ y: "-50%", rotateY: 28, rotateZ: -10 }}
        animate={{ y: ["-50%", "calc(-50% - 22px)", "-50%"], rotateY: 28, rotateZ: [-10, -6, -10] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="photo-depth photo-depth-right"
        aria-hidden="true"
        initial={{ y: "-50%", rotateY: -28, rotateZ: 10 }}
        animate={{ y: ["-50%", "calc(-50% + 18px)", "-50%"], rotateY: -28, rotateZ: [10, 6, 10] }}
        transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="love-orbit"
        aria-hidden="true"
        initial={{ rotateX: 64, rotateZ: -14 }}
        animate={{ rotateX: 64, rotateZ: 346 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        {orbitHearts.map((heart, index) => (
          <span key={heart} style={{ "--orbit-index": index }}>
            {heart}
          </span>
        ))}
      </motion.div>

      {floatingHearts.map((heart, index) => (
        <FloatingHeart key={`${heart.className}-${index}`} heart={heart} index={index} />
      ))}

      {sparkleItems.map((position, index) => (
        <motion.span
          key={position}
          className={`fixed -z-10 h-[9px] w-[9px] rounded-full bg-white opacity-70 shadow-[0_0_18px_rgba(255,255,255,.95)] ${position}`}
          aria-hidden="true"
          animate={{ opacity: [0.25, 0.95, 0.25], scale: [0.8, 1.45, 0.8], y: [0, -16, 0] }}
          transition={{ duration: 4.8, delay: index * 0.18, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      <motion.button
        className="music-toggle fixed bottom-4 right-4 z-50 grid h-12 w-12 place-items-center rounded-full border border-white/70 bg-white/70 text-xl text-[#b71953] shadow-[0_16px_42px_rgba(76,23,55,.28)] backdrop-blur-2xl sm:bottom-6 sm:right-6 sm:h-14 sm:w-14 sm:text-2xl"
        initial={{ opacity: 0, scale: 0.78, y: 18 }}
        animate={{
          opacity: 1,
          scale: isMusicPlaying ? [1, 1.08, 1] : 1,
          y: 0,
        }}
        transition={{
          opacity: { delay: 0.7 },
          y: { delay: 0.7 },
          scale: { duration: 1.25, repeat: isMusicPlaying ? Infinity : 0, ease: "easeInOut" },
        }}
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.94 }}
        onClick={toggleMusic}
        aria-label={isMusicPlaying ? "Pause background music" : "Play background music"}
        aria-pressed={isMusicPlaying}
        title={isMusicPlaying ? "Pause music" : "Play music"}
      >
        <span aria-hidden="true">{isMusicPlaying ? "\u{266B}" : "\u{2665}"}</span>
      </motion.button>

      <div className="grid w-full max-w-[520px] items-center">
        <motion.section
          className="proposal-card-3d relative mx-auto flex w-full flex-col items-center gap-4 overflow-hidden rounded-[24px] border border-white/75 bg-white/82 p-4 text-center shadow-soft backdrop-blur-2xl before:absolute before:inset-0 before:bg-[linear-gradient(145deg,rgba(255,255,255,.78),rgba(255,255,255,.18)_60%)] before:content-[''] sm:gap-5 sm:rounded-[28px] sm:p-6"
          variants={cardVariants}
          initial="initial"
          animate="animate"
          whileHover={{ rotateX: 1.4, rotateY: -1.6, y: -4 }}
          transition={{ type: "spring", stiffness: 130, damping: 18 }}
        >
          <motion.div
            className="absolute left-4 top-4 z-10 rounded-full border border-white/70 bg-white/70 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[.16em] text-[#b71953] shadow-[0_10px_26px_rgba(126,48,89,.14)] backdrop-blur-md sm:left-5 sm:top-5 sm:text-[11px]"
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 }}
          >
            Always us
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={accepted ? "accepted-gif" : `gif-${stepIndex}`}
              variants={contentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className={`${accepted ? "aspect-[1.2] w-[min(100%,320px)]" : "aspect-square w-[min(100%,280px)]"} gif-capsule relative z-10 mt-8 grid place-items-center rounded-[22px] bg-white/92 p-2.5 shadow-[inset_0_0_0_1px_rgba(255,71,126,.12),0_22px_44px_rgba(83,39,68,.2)] sm:mt-9 sm:p-3`}
            >
              <motion.span
                className="absolute -left-4 top-7 text-3xl drop-shadow-[0_10px_18px_rgba(255,71,126,.32)] sm:-left-5 sm:text-4xl"
                aria-hidden="true"
                animate={{ rotate: [-8, 8, -8], scale: [1, 1.08, 1] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
              >
                {"\u{1F49D}"}
              </motion.span>
              <motion.span
                className="absolute -right-4 bottom-7 text-3xl drop-shadow-[0_10px_18px_rgba(255,71,126,.32)] sm:-right-5 sm:text-4xl"
                aria-hidden="true"
                animate={{ rotate: [8, -8, 8], y: [0, -8, 0] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
              >
                {"\u{1F48C}"}
              </motion.span>
              <iframe
                title={current.title}
                src={current.gif}
                allowFullScreen
                loading="lazy"
                className="h-full w-full rounded-2xl border-0"
              />
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={accepted ? "accepted-copy" : `copy-${stepIndex}`}
              className="relative z-10 grid w-full gap-2.5 px-1 sm:gap-3"
              variants={contentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <p className="m-0 text-[11px] font-extrabold uppercase tracking-[.12em] text-[#d91f60] sm:text-xs sm:tracking-[.14em]">
                {accepted ? "Finally" : showDecisionLocked ? "Decision saved" : `Question ${stepIndex + 1} of ${steps.length}`}
              </p>
              <h1 className="m-0 text-[clamp(1.8rem,7vw,3rem)] font-extrabold leading-[1.04] text-[#271026] drop-shadow-[0_10px_22px_rgba(255,255,255,.65)]">
                {current.title}
              </h1>
              <p className="mx-auto my-0 max-w-[34ch] text-[0.95rem] leading-relaxed text-[#6c566b] sm:text-base">
                {current.subtitle}
              </p>
            </motion.div>
          </AnimatePresence>

          {!accepted && !showDecisionLocked ? (
            <>
              <div className="relative z-10 flex min-h-[14px] items-center justify-center gap-2" aria-label="Question progress">
                {steps.map((_, index) => (
                  <motion.span
                    key={index}
                    className={`h-2 rounded-full ${index <= stepIndex ? "bg-[#ff477e]" : "bg-[#241b2f]/20"}`}
                    animate={{ width: index <= stepIndex ? 24 : 8, scale: index === stepIndex ? 1.12 : 1 }}
                    transition={{ type: "spring", stiffness: 420, damping: 24 }}
                  />
                ))}
              </div>

              <div className={`relative z-10 flex w-full items-center justify-center gap-3 ${current.runaway ? "min-h-[142px] sm:min-h-[112px]" : "min-h-[118px] flex-col sm:min-h-[78px] sm:flex-row"}`}>
                <motion.button
                  className="button-3d min-h-[50px] w-[min(100%,230px)] min-w-32 rounded-full border-0 bg-[linear-gradient(135deg,#ff2e75,#ff8a5c)] px-6 py-3 font-extrabold text-white shadow-button sm:w-auto"
                  whileHover={{ y: -4, scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={acceptLove}
                >
                  {current.yes}
                </motion.button>
                <motion.button
                  className={`${current.runaway ? "absolute z-20 min-w-28" : "w-[min(100%,230px)] sm:w-auto"} button-3d min-h-[50px] min-w-32 rounded-full border-0 bg-white px-6 py-3 font-extrabold text-[#241b2f] shadow-[0_16px_28px_rgba(36,27,47,.12)]`}
                  style={current.runaway ? noPosition : undefined}
                  animate={current.runaway ? { rotate: [0, -5, 5, 0] } : { rotate: 0 }}
                  transition={{ duration: 0.45 }}
                  whileHover={{ y: -4, scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleNo}
                  onMouseEnter={moveNoButton}
                  onFocus={moveNoButton}
                >
                  {current.no}
                </motion.button>
              </div>
            </>
          ) : showDecisionLocked ? (
            <motion.button
              className="button-3d relative z-10 min-h-[52px] min-w-32 rounded-full border-0 bg-[linear-gradient(135deg,#ff2e75,#ff8a5c)] px-6 py-3 font-extrabold text-white shadow-button"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4, scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={acceptLove}
            >
              Theek hai, yes forever
            </motion.button>
          ) : (
            <motion.button
              className="button-3d relative z-10 min-h-[52px] min-w-32 rounded-full border-0 bg-[linear-gradient(135deg,#ff2e75,#ff8a5c)] px-6 py-3 font-extrabold text-white shadow-button"
              whileHover={{ y: -4, scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={restart}
            >
              Ask again
            </motion.button>
          )}
        </motion.section>
      </div>
    </main>
  );
}

export default App;
