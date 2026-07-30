import { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ScrollProgressBar from './components/ScrollProgressBar';
import ConfettiOverlay from './components/ConfettiOverlay';
import FloatingHearts from './components/FloatingHearts';
import Hero from './components/Hero';
import OpeningIntro from './components/OpeningIntro';
import LoveLetter from './components/LoveLetter';
import RawrClosing from './components/RawrClosing';
import MusicToggle from './components/MusicToggle';
import Envelope from './components/Envelope';
import Preloader from './components/Preloader';
import { useMusic } from './hooks/useMusic';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { siteConfig } from './content/site.config';

function App() {
  const [showLetter, setShowLetter] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isPreloading, setIsPreloading] = useState(false);
  const [preloadProgress, setPreloadProgress] = useState(0);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [openingStep, setOpeningStep] = useState(0);
  const [loveLetterStep, setLoveLetterStep] = useState(0);

  const bgmStarted = useRef(false);

  const totalSlides = 4;
  const totalOpeningSteps = siteConfig.openingMessages.length;
  const totalLoveLetterSteps = siteConfig.loveLetterParagraphs.length;

  // Engine smooth scroll mandiri (wheel desktop dihaluskan, selebihnya native)
  const { scrollTo: smoothScrollTo } = useSmoothScroll(showLetter);

  const { isPlaying, isLoaded, toggle } = useMusic(
    siteConfig.music.trackUrl || 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    siteConfig.music.volume
  );

  const handleOpenEnvelope = () => {
    setIsPreloading(true);
    setPreloadProgress(0);

    const assets = [
      '/images/2d2ab1155b783a9474e82ce2b14e182c.jpg',
      '/images/hero_char.png',
      '/images/hero_char2.png',
      '/images/hero_char3.png',
      '/images/hero_char4.png',
      '/images/bg_teks_hero.png',
      '/images/salsa1.jpeg',
      '/images/salsa2.jpeg',
      '/images/salsa3.jpeg',
      '/audio/bgm.mp3',
      '/audio/congrats.mp3'
    ];

    let loadedCount = 0;
    const totalAssets = assets.length;

    const updateProgress = () => {
      loadedCount++;
      const progress = (loadedCount / totalAssets) * 100;
      setPreloadProgress(progress);
    };

    const promises = assets.map((url) => {
      return new Promise<void>((resolve) => {
        const isAudio = url.endsWith('.mp3');
        if (isAudio) {
          const audio = new Audio(url);
          audio.preload = 'auto';

          const onCanPlay = () => {
            audio.removeEventListener('canplaythrough', onCanPlay);
            audio.removeEventListener('error', onError);
            updateProgress();
            resolve();
          };

          const onError = () => {
            audio.removeEventListener('canplaythrough', onCanPlay);
            audio.removeEventListener('error', onError);
            updateProgress();
            resolve();
          };

          audio.addEventListener('canplaythrough', onCanPlay);
          audio.addEventListener('error', onError);
          audio.load();
        } else {
          const img = new Image();
          img.onload = () => {
            updateProgress();
            resolve();
          };
          img.onerror = () => {
            updateProgress();
            resolve();
          };
          img.src = url;
        }
      });
    });

    const timeoutPromise = new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 6000); // 6s safety timeout
    });

    Promise.race([Promise.all(promises), timeoutPromise]).then(() => {
      setPreloadProgress(100);
      setTimeout(() => {
        setIsPreloading(false);
        setShowLetter(true);
        // Audio: bunyi pas hero mulai muncul
        const audio = new Audio('/audio/congrats.mp3');
        audio.play().catch(() => {});
        // Konfeti muncul 500ms setelah hero (pas teks sudah terbaca)
        setTimeout(() => {
          setShowConfetti(true);
          setTimeout(() => { setShowConfetti(false); }, 3000);
        }, 500);
      }, 400); // Mulus transisi setelah 100%
    });
  };

  // ─── Navigation via engine (target tersinkron, tanpa pull-back) ───
  const handleGoToSlide = useCallback((index: number) => {
    // Slide-1 diwakili opening-track, slide-2 diwakili loveletter-track
    const id = index === 1 ? 'opening-track'
             : index === 2 ? 'loveletter-track'
             : `slide-${index}`;
    const el = document.getElementById(id);
    if (!el) return;
    smoothScrollTo(el.getBoundingClientRect().top + window.scrollY);
  }, [smoothScrollTo]);

  // Dots click → engine scroll ke posisi step yang sesuai di dalam track
  const handleGoToOpeningStep = useCallback((step: number) => {
    const track = document.getElementById('opening-track');
    if (!track) return;
    const trackTop = track.getBoundingClientRect().top + window.scrollY;
    const scrollable = track.offsetHeight - window.innerHeight;
    const last = Math.max(totalOpeningSteps - 1, 1);
    const clamped = Math.min(Math.max(step, 0), last);
    smoothScrollTo(trackTop + (scrollable * clamped) / last);
  }, [totalOpeningSteps, smoothScrollTo]);

  const handleGoToLoveLetterStep = useCallback((step: number) => {
    const track = document.getElementById('loveletter-track');
    if (!track) return;
    const trackTop = track.getBoundingClientRect().top + window.scrollY;
    const scrollable = track.offsetHeight - window.innerHeight;
    const last = Math.max(totalLoveLetterSteps - 1, 1);
    const clamped = Math.min(Math.max(step, 0), last);
    smoothScrollTo(trackTop + (scrollable * clamped) / last);
  }, [totalLoveLetterSteps, smoothScrollTo]);

  // Keyboard slide navigation (ArrowLeft/Right)
  useEffect(() => {
    if (!showLetter) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        if (activeSlideIndex > 0) handleGoToSlide(activeSlideIndex - 1);
      } else if (e.key === 'ArrowRight') {
        if (activeSlideIndex < totalSlides - 1) handleGoToSlide(activeSlideIndex + 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showLetter, activeSlideIndex, totalSlides, handleGoToSlide]);

  // ─── Native scroll: progress bar + opening step dari posisi track ───
  useEffect(() => {
    if (!showLetter) return;

    let ticking = false;

    const update = () => {
      ticking = false;

      // Progress bar
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0);

      // Opening step dihitung deterministik dari posisi track
      const track = document.getElementById('opening-track');
      if (track) {
        const rect = track.getBoundingClientRect();
        
        // Auto-play BGM jika user mulai scroll masuk ke track pembuka
        if (rect.top <= window.innerHeight * 0.8 && !bgmStarted.current) {
          bgmStarted.current = true;
          toggle();
        }

        const scrollable = track.offsetHeight - window.innerHeight;
        const raw = scrollable > 0 ? -rect.top / scrollable : 0;
        const progress = Math.min(Math.max(raw, 0), 1);
        const step = Math.round(progress * (totalOpeningSteps - 1));
        setOpeningStep(step);
      }

      // LoveLetter step — identik dengan opening step
      const llTrack = document.getElementById('loveletter-track');
      if (llTrack) {
        const rect = llTrack.getBoundingClientRect();
        const scrollable = llTrack.offsetHeight - window.innerHeight;
        const raw = scrollable > 0 ? -rect.top / scrollable : 0;
        const progress = Math.min(Math.max(raw, 0), 1);
        const step = Math.round(progress * (totalLoveLetterSteps - 1));
        setLoveLetterStep(step);
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [showLetter, totalOpeningSteps, totalLoveLetterSteps, toggle]);

  // ─── Active slide observer (panel sticky slide-1 tetap terlihat penuh selama di track) ───
  useEffect(() => {
    if (!showLetter) return;

    const slides = document.querySelectorAll('[id^="slide-"]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.id.replace('slide-', ''), 10);
            if (!isNaN(index)) setActiveSlideIndex(index);
          }
        });
      },
      { root: null, rootMargin: '0px', threshold: 0.5 }
    );

    slides.forEach((slide) => observer.observe(slide));
    return () => observer.disconnect();
  }, [showLetter]);

  return (
    <>
      <AnimatePresence>
        {isPreloading && <Preloader progress={preloadProgress} />}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {!showLetter ? (
        <motion.div
          key="envelope-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <Envelope onOpen={handleOpenEnvelope} />
        </motion.div>
      ) : (
        <motion.div
          key="website-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="relative min-h-[100vh] gradient-romantic selection:bg-romantic-primary/30 selection:text-romantic-text flex flex-col justify-between"
        >
          <ScrollProgressBar progress={scrollProgress} />
          <ConfettiOverlay isActive={showConfetti} />
          <FloatingHearts />

          <main className="relative z-10 w-full flex-grow">
            <div id="slide-0" className="w-full h-[100dvh] flex items-center justify-center sticky top-0 z-0 overflow-hidden shrink-0">
              <Hero />
            </div>

            {/* ─── PINNED OPENING TRACK ───
                Track tinggi = N pesan × 100dvh. Panel sticky diam memenuhi viewport
                selama track dilewati; step pesan murni fungsi posisi scroll. */}
            <div
              id="opening-track"
              className="relative w-full z-10 bg-[url('/images/2d2ab1155b783a9474e82ce2b14e182c.jpg')] bg-cover bg-center shadow-[0_-20px_50px_rgba(0,0,0,0.15)] shrink-0"
              style={{ height: `${totalOpeningSteps * 200}dvh` }}
            >
              <div
                id="slide-1"
                className="sticky top-0 w-full h-[100dvh] flex items-center justify-center overflow-hidden"
              >
                <OpeningIntro step={openingStep} onStepChange={handleGoToOpeningStep} />
              </div>
            </div>

            {/* ─── PINNED LOVELETTER TRACK ───
                Track tinggi = N paragraf × 200dvh. Panel sticky diam memenuhi viewport
                selama track dilewati; step paragraf murni fungsi posisi scroll. */}
            <div
              id="loveletter-track"
              className="relative w-full z-10 bg-[url('/images/2d2ab1155b783a9474e82ce2b14e182c.jpg')] bg-cover bg-center shadow-[0_-20px_50px_rgba(0,0,0,0.15)] shrink-0"
              style={{ height: `${totalLoveLetterSteps * 200}dvh` }}
            >
              <div
                id="slide-2"
                className="sticky top-0 w-full h-[100dvh] flex items-center justify-center overflow-hidden"
              >
                <LoveLetter step={loveLetterStep} onStepChange={handleGoToLoveLetterStep} />
              </div>
            </div>

            {/* ─── RAWR CLOSING ─── */}
            <RawrClosing />

          </main>

          <MusicToggle isPlaying={isPlaying} isLoaded={isLoaded} onToggle={toggle} labelPlay={siteConfig.labels.musicPlay} labelStop={siteConfig.labels.musicStop} />
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}

export default App;
