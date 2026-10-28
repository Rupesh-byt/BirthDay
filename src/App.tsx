import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import confetti from "canvas-confetti";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  CakeSlice,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Gift,
  Heart,
  Menu,
  Music2,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Sparkles,
  Volume2,
  X,
} from "lucide-react";
import { albums, config } from "./config";

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

function burst() {
  confetti({
    particleCount: 110,
    spread: 78,
    origin: { y: 0.65 },
    colors: ["#ff6f91", "#ffd6e7", "#c8b6ff", "#f5d58a", "#fff8f3"],
  });
}

function SectionTitle({ eyebrow, title, copy }: { eyebrow: string; title: ReactNode; copy?: string }) {
  return (
    <motion.div className="section-title" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
      <span className="eyebrow"><span />{eyebrow}</span>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </motion.div>
  );
}

function BirthdayClock() {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const recurringDate = /^(\d{1,2})-(\d{1,2})$/.exec(config.birthdayDate);
  const today = new Date(now);
  const sameBirthday =
    recurringDate !== null &&
    today.getMonth() + 1 === Number(recurringDate[1]) &&
    today.getDate() === Number(recurringDate[2]);
  let birthday: number;
  if (recurringDate) {
    const month = Number(recurringDate[1]) - 1;
    const day = Number(recurringDate[2]);
    const thisYear = new Date(today.getFullYear(), month, day);
    birthday = thisYear.getTime() > now
      ? thisYear.getTime()
      : new Date(today.getFullYear() + 1, month, day).getTime();
  } else {
    birthday = config.birthdayDate ? new Date(config.birthdayDate).getTime() : NaN;
  }
  const validDate = Number.isFinite(birthday) || sameBirthday;
  const passed = sameBirthday || (validDate && !recurringDate && now >= birthday);
  const distance = validDate && !passed ? birthday - now : 0;
  const units = [
    { label: "Days", value: Math.floor(distance / 86_400_000) },
    { label: "Hours", value: Math.floor((distance % 86_400_000) / 3_600_000) },
    { label: "Minutes", value: Math.floor((distance % 3_600_000) / 60_000) },
    { label: "Seconds", value: Math.floor((distance % 60_000) / 1000) },
  ];

  return (
    <section className="countdown-wrap" aria-label="Birthday countdown">
      <div className="countdown-card glass">
        <div className="countdown-heading"><Sparkles size={17} />{passed ? "The celebration is here" : "Counting down to your day"}</div>
        {validDate ? passed ? (
          <div className="birthday-now"><h3>It’s your day, Shivani! 🎂</h3><p>Make a wish. The whole day is yours.</p><button className="button button-pink" onClick={burst}>Celebrate <Sparkles size={16} /></button></div>
        ) : (
          <div className="clock-grid">{units.map((unit) => <div className="clock-unit" key={unit.label}><strong>{String(unit.value).padStart(2, "0")}</strong><span>{unit.label}</span></div>)}</div>
        ) : (
          <div className="date-placeholder"><h3>Your special day is on its way ✨</h3><p>Saving up all the birthday wishes until then.</p></div>
        )}
      </div>
    </section>
  );
}

function App() {
  const prefersReducedMotion = useReducedMotion();
  const revealLetter = useCallback((opened: boolean) => {
    if (!opened) return;
    if (prefersReducedMotion) {
      setTypedLetter(config.letter);
      return;
    }
    setTypedLetter("");
    let index = 0;
    const timer = window.setInterval(() => {
      index += 2;
      setTypedLetter(config.letter.slice(0, index));
      if (index >= config.letter.length) window.clearInterval(timer);
    }, 17);
    return () => window.clearInterval(timer);
  }, [prefersReducedMotion]);
  const [entered, setEntered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeAlbum, setActiveAlbum] = useState("All memories");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [slideshow, setSlideshow] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);
  const [typedLetter, setTypedLetter] = useState("");
  const [extraLetterOpen, setExtraLetterOpen] = useState(false);
  const [revealedReasons, setRevealedReasons] = useState<number[]>([]);
  const [giftOpen, setGiftOpen] = useState(false);
  const [candlesOut, setCandlesOut] = useState(false);
  const [finalMessage, setFinalMessage] = useState(false);
  const [activeTrack, setActiveTrack] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [trackTime, setTrackTime] = useState(0);
  const [trackDuration, setTrackDuration] = useState(0);
  const [audioError, setAudioError] = useState("");
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const track = config.songs[activeTrack];
  const displayedPhotos = useMemo(() => {
    const album = albums.find((item) => item.name === activeAlbum);
    return album?.photos ?? [];
  }, [activeAlbum]);
  const currentPhoto = lightboxIndex === null ? null : displayedPhotos[lightboxIndex];

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => revealLetter(letterOpen), [letterOpen, revealLetter]);

  useEffect(() => {
    if (!slideshow || lightboxIndex === null || displayedPhotos.length < 2) return;
    const timer = window.setInterval(() => {
      setLightboxIndex((index) => (index === null ? null : (index + 1) % displayedPhotos.length));
    }, 3500);
    return () => window.clearInterval(timer);
  }, [slideshow, lightboxIndex, displayedPhotos.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightboxIndex(null);
      if (event.key === "ArrowRight") setLightboxIndex((index) => index === null ? null : (index + 1) % displayedPhotos.length);
      if (event.key === "ArrowLeft") setLightboxIndex((index) => index === null ? null : (index - 1 + displayedPhotos.length) % displayedPhotos.length);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex, displayedPhotos.length]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const updateTime = () => setTrackTime(audio.currentTime);
    const updateDuration = () => setTrackDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
    const failed = () => {
      setPlaying(false);
      setAudioError("This song couldn't be played. Try another track.");
    };
    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", nextTrack);
    audio.addEventListener("error", failed);
    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", nextTrack);
      audio.removeEventListener("error", failed);
    };
  }, [activeTrack]);

  const nextTrack = useCallback(() => {
    if (config.songs.length === 0) return;
    setPlaying(false);
    setActiveTrack((index) => (index + 1) % config.songs.length);
    setTrackTime(0);
    setTrackDuration(0);
    setAudioError("");
  }, []);
  const previousTrack = () => {
    if (config.songs.length === 0) return;
    audioRef.current?.pause();
    setPlaying(false);
    setActiveTrack((index) => (index - 1 + config.songs.length) % config.songs.length);
    setTrackTime(0);
    setTrackDuration(0);
    setAudioError("");
  };
  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!track) {
      setAudioError("Your playlist is waiting for a song.");
      return;
    }
    if (!audio || !track?.src) {
      setAudioError("This song isn't available to play yet.");
      return;
    }
    setAudioError("");
    try {
      if (playing) {
        audio.pause();
        setPlaying(false);
      } else {
        await audio.play();
        setPlaying(true);
      }
    } catch {
      setPlaying(false);
      setAudioError("This song couldn't be played. Try another track.");
    }
  };
  const skipToNextTrack = () => {
    audioRef.current?.pause();
    setPlaying(false);
    nextTrack();
  };
  const navigate = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
  };
  const formattedTime = (time: number) => `${Math.floor(time / 60)}:${String(Math.floor(time % 60)).padStart(2, "0")}`;

  return (
    <main className="site theme-midnight">
      <div className="scroll-progress" style={{ width: `${progress}%` }} />
      <div className="ambient ambient-one" /><div className="ambient ambient-two" />

      <AnimatePresence>
        {!entered && (
          <motion.div className="intro-screen" initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.8 } }}>
            <div className="intro-stars" aria-hidden="true"><i>✦</i><i>✧</i><i>✦</i><i>·</i><i>✧</i></div>
            <motion.div className="intro-content" initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
              <span className="intro-kicker">A little world made just for you</span>
              <h1>Hey {config.displayName} <span>♥</span></h1>
              <p>I made something special just for you...</p>
              <motion.div className="intro-envelope" animate={prefersReducedMotion ? {} : { y: [0, -9, 0], rotate: [-1, 1, -1] }} transition={{ duration: 4, repeat: Infinity }}>
                <div className="envelope-flap" /><div className="envelope-heart">♥</div><Sparkles className="envelope-sparkle" />
              </motion.div>
              <button className="button button-pink intro-button" onClick={() => { setEntered(true); window.setTimeout(() => navigate("home"), 250); }}>
                OPEN YOUR SURPRISE, SHIVANI <Heart size={16} fill="currentColor" />
              </button>
              <small>Sound is always optional — nothing plays automatically.</small>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="topbar">
        <a className="brand" href="#home" onClick={(event) => { event.preventDefault(); navigate("home"); }} aria-label="Go to home">
          <span className="brand-heart">♥</span><span>for <b>Shivani</b></span>
        </a>
        <nav className={menuOpen ? "nav-links nav-open" : "nav-links"} aria-label="Main navigation">
          {[["Home", "home"], ["Our Story", "story"], ["Gallery", "gallery"], ["Music", "music"], ["Love Letter", "letter"], ["Surprises", "surprises"]].map(([label, id]) => (
            <button key={id} onClick={() => navigate(id)}>{label}</button>
          ))}
        </nav>
        <div className="nav-actions">
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </header>

      <section id="home" className="hero">
        <div className="hero-copy">
          <motion.span className="eyebrow hero-eyebrow" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}><span />THE WORLD IS A LITTLE MORE MAGICAL TODAY</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            Happy Birthday,<br /><em>my beautiful</em><br /><span className="script-name">{config.name}</span> <span className="hero-heart">♥</span>
          </motion.h1>
          <motion.p className="hero-subtitle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}>{config.heroMessage}</motion.p>
          <motion.div className="hero-buttons" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}>
            <button className="button button-pink" onClick={() => navigate("gallery")}>Explore our memories <ArrowDown size={16} /></button>
            <button className="button button-outline" onClick={() => navigate("letter")}><Heart size={15} /> A little message for you</button>
          </motion.div>
          <div className="hero-note"><span className="note-line" />Scroll a little, there’s a whole world for you<span className="note-line" /></div>
        </div>
        <motion.div className="hero-visual" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.2 }}>
          <div className="portrait-orbit orbit-a" /><div className="portrait-orbit orbit-b" />
          <div className="portrait-frame">
            <img src={config.heroPhoto} alt="A place for Shivani's favorite photograph" onError={(event) => { event.currentTarget.src = "/photos/placeholder.svg"; }} />
            <div className="portrait-caption"><span className="caption-heart">♥</span><span>my favorite view<br /><b>always you</b></span></div>
          </div>
          <span className="float-heart heart-a">♥</span><span className="float-heart heart-b">♥</span><span className="float-sparkle sparkle-a">✦</span><span className="float-sparkle sparkle-b">✧</span>
          <div className="photo-sticker">made<br />with love <Heart size={12} fill="currentColor" /></div>
        </motion.div>
        <div className="hero-bottom-label"><span>01</span><span className="label-rule" />A CELEBRATION OF YOU</div>
      </section>

      <BirthdayClock />

      <section id="story" className="section story-section">
        <SectionTitle eyebrow="OUR STORY, IN LITTLE MOMENTS" title={<>A story still <em>unfolding</em></>} copy="A few days and little moments that will always mean something to us." />
        <div className="timeline">
          {config.timeline.map((item, index) => (
            <motion.article className={`timeline-item ${index % 2 ? "timeline-right" : ""}`} key={item.title} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }}>
              <div className="timeline-dot"><Heart size={13} fill="currentColor" /></div>
              <div className="timeline-card glass">
                <span className="timeline-date">{item.date}</span><h3>{item.title}</h3><p>{item.message}</p>
                <span className="timeline-number">0{index + 1}</span>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="gallery" className="section gallery-section">
        <SectionTitle eyebrow="LITTLE SNAPSHOTS, BIG FEELINGS" title={<>Our favorite <em>memories</em></>} copy="A little gallery for the moments worth keeping close. Swap in your own photos whenever you're ready." />
        <div className="album-tabs" role="tablist" aria-label="Photo albums">
          {albums.map((album) => <button key={album.name} role="tab" aria-selected={activeAlbum === album.name} className={activeAlbum === album.name ? "album-tab active" : "album-tab"} onClick={() => { setActiveAlbum(album.name); setLightboxIndex(null); }}>{album.emoji} {album.name}</button>)}
        </div>
        <div className="photo-grid">
          {displayedPhotos.map((photo, index) => (
            <motion.button className={`photo-card photo-card-${index % 4}`} key={`${activeAlbum}-${index}`} onClick={() => { setLightboxIndex(index); setSlideshow(false); }} aria-label={`Open photo: ${photo.caption}`} whileHover={prefersReducedMotion ? {} : { y: -7, rotate: index % 2 ? 1 : -1 }} layout>
              <div className="photo-image"><img src={photo.src} loading="lazy" alt={photo.caption} onError={(event) => { event.currentTarget.src = "/photos/placeholder.svg"; }} /><span className="photo-open"><Sparkles size={17} /></span></div>
              <span className="photo-caption">{photo.caption}</span><span className="photo-date">{photo.date}</span>
            </motion.button>
          ))}
        </div>
      </section>

      <section id="music" className="section music-section">
        <div className="music-layout">
          <div className="music-copy">
            <SectionTitle eyebrow="A LITTLE SOUNDTRACK FOR YOU" title={<>Songs that remind<br />me of <em>you</em></>} copy="A little soundtrack for the moments that feel like you." />
            <div className="music-quote">“Some songs feel like a place you want to stay.”</div>
          </div>
          <div className="player-card glass">
            <div className="player-top"><span className="player-label"><Music2 size={15} /> NOW PLAYING FOR YOU</span><span className="player-eq"><i /><i /><i /><i /></span></div>
            <div className="vinyl-wrap"><div className={`vinyl ${playing ? "vinyl-playing" : ""}`}><div className="vinyl-center"><Heart size={20} fill="currentColor" /></div></div>{track && <div className="album-cover"><img src={track.cover} alt="" /></div>}</div>
            <h3 className="track-title">{track?.title ?? "A song for Shivani"}</h3><p className="track-artist">{track?.artist ?? "Your playlist is waiting"}</p>
            <div className="audio-progress"><input aria-label="Song position" type="range" min="0" max={trackDuration || 100} value={trackDuration ? trackTime : 0} disabled={!track} onChange={(event) => { if (audioRef.current) audioRef.current.currentTime = Number(event.target.value); }} /><div className="time-labels"><span>{formattedTime(trackTime)}</span><span>{trackDuration ? formattedTime(trackDuration) : "—:—"}</span></div></div>
            <div className="player-controls">
              <button aria-label="Previous song" onClick={previousTrack} disabled={!track}><SkipBack size={19} fill="currentColor" /></button>
              <button className="play-button" aria-label={playing ? "Pause song" : "Play song"} onClick={togglePlayback} disabled={!track}>{playing ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}</button>
              <button aria-label="Next song" onClick={skipToNextTrack} disabled={!track}><SkipForward size={19} fill="currentColor" /></button>
            </div>
            <div className="player-footer"><Volume2 size={15} /><input type="range" aria-label="Volume" min="0" max="1" step="0.01" defaultValue="0.8" disabled={!track} onChange={(event) => { if (audioRef.current) audioRef.current.volume = Number(event.target.value); }} /><span>{track ? `${activeTrack + 1} / ${config.songs.length}` : "0 / 0"}</span></div>
            {audioError && <p className="audio-error" role="status">{audioError}</p>}
            <audio ref={audioRef} src={track?.src || undefined} preload="metadata" />
            <div className="playlist">{config.songs.length ? config.songs.map((song, index) => <button key={song.title} className={index === activeTrack ? "playlist-item selected" : "playlist-item"} onClick={() => { setActiveTrack(index); setPlaying(false); setAudioError(""); if (audioRef.current) audioRef.current.pause(); }}><span className="playlist-index">{index === activeTrack && playing ? "♫" : `0${index + 1}`}</span><span>{song.title}<small>{song.artist}</small></span><Play size={13} /></button>) : <p className="playlist-empty">Your favorite songs will be right here.</p>}</div>
          </div>
        </div>
      </section>

      <section id="letter" className="section letter-section">
        <SectionTitle eyebrow="SOME WORDS, JUST FOR YOU" title={<>A little letter from <em>the heart</em></>} copy="An envelope, a few heartfelt words, and a reminder that you are so loved." />
        <div className="letter-stage">
          {!letterOpen ? (
            <motion.button className="letter-envelope" onClick={() => setLetterOpen(true)} whileHover={prefersReducedMotion ? {} : { y: -6, rotate: -1 }} aria-label="Open your birthday letter">
              <span className="letter-envelope-flap" /><span className="letter-seal">♥</span><span className="letter-envelope-label">A letter for Shivani</span><span className="letter-envelope-open">Tap to open <Heart size={14} /></span>
            </motion.button>
          ) : (
            <motion.article className="letter-paper" initial={{ opacity: 0, y: 15, rotate: 1 }} animate={{ opacity: 1, y: 0, rotate: 0 }}>
              <span className="paper-flower">✿</span><span className="paper-corner">♥</span>
              <p className="letter-text">{typedLetter}<span className="typing-cursor">▍</span></p>
              <div className="letter-footer"><span>sealed with love</span><span className="wax-seal">♥</span></div>
              <button className="text-button" onClick={() => setExtraLetterOpen(!extraLetterOpen)}>{extraLetterOpen ? "Hide this little note" : "There’s more I want to tell you"} <Heart size={14} /></button>
              <AnimatePresence>{extraLetterOpen && <motion.p className="extra-note" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>{config.extraLetter}</motion.p>}</AnimatePresence>
            </motion.article>
          )}
        </div>
      </section>

      <section className="section reasons-section">
        <SectionTitle eyebrow="ONE HUNDRED LITTLE REMINDERS" title={<>Little things that make you <em>special</em></>} copy="A hundred tiny reasons to celebrate the person you are. One little reminder at a time." />
        <div className="reasons-panel glass">
          <div className="reason-counter"><span>{String(revealedReasons.length).padStart(2, "0")}</span><i>/</i> 100 reasons revealed</div>
          <AnimatePresence mode="wait">
            {revealedReasons.length > 0 ? (
              <motion.div className="reason-card" key={revealedReasons[revealedReasons.length - 1]} initial={{ opacity: 0, y: 12, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10 }}>
                <span className="reason-number">{String(revealedReasons[revealedReasons.length - 1] + 1).padStart(2, "0")}</span>
                <p>{config.reasons[revealedReasons[revealedReasons.length - 1]]}</p><Heart className="reason-heart" fill="currentColor" />
              </motion.div>
            ) : <div className="reason-empty"><span>♥</span><p>A little reason is waiting for you.</p></div>}
          </AnimatePresence>
          <div className="reason-actions">
            <button className="button button-pink" onClick={() => { const next = config.reasons.findIndex((_, index) => !revealedReasons.includes(index)); if (next >= 0) setRevealedReasons([...revealedReasons, next]); else burst(); }} disabled={revealedReasons.length >= config.reasons.length}>
              <Heart size={15} fill="currentColor" /> {revealedReasons.length >= 100 ? "All 100 are yours" : "Reveal a little reason"}
            </button>
            <button className="button button-outline" onClick={() => { const remaining = config.reasons.map((_, index) => index).filter((index) => !revealedReasons.includes(index)); if (remaining.length) { const choice = remaining[Math.floor(Math.random() * remaining.length)]; setRevealedReasons([...revealedReasons, choice]); } else burst(); }}>
              Tell me one more thing <Sparkles size={15} />
            </button>
          </div>
          <div className="reason-dots" aria-label={`${revealedReasons.length} of 100 reasons revealed`}>{config.reasons.map((_, index) => <span key={index} className={revealedReasons.includes(index) ? "revealed" : ""} />)}</div>
        </div>
      </section>

      <section id="surprises" className="section surprises-section">
        <SectionTitle eyebrow="A TINY SURPRISE, WRAPPED WITH LOVE" title={<>A little something <em>for you</em></>} copy="There might be something lovely inside. Go on, open it." />
        <div className="gift-area">
          <motion.button className={`gift-box ${giftOpen ? "gift-open" : ""}`} onClick={() => { if (!giftOpen) { setGiftOpen(true); burst(); } }} whileHover={prefersReducedMotion || giftOpen ? {} : { y: -7, rotate: 2 }} aria-label={giftOpen ? "Birthday gift opened" : "Open your birthday gift"}>
            <span className="gift-bow"><i /><b /></span><span className="gift-lid" /><span className="gift-body"><span className="gift-ribbon" /></span>
            {!giftOpen && <span className="gift-click"><Gift size={16} /> Tap to unwrap</span>}
          </motion.button>
          <h3>{giftOpen ? "Surprise, birthday girl! ✨" : "A little something just for you, Shivani"}</h3>
          <AnimatePresence>{giftOpen && <motion.div className="gift-reveal glass" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}><img src={config.giftPhoto} alt="Your chosen birthday surprise" onError={(event) => { event.currentTarget.src = "/photos/placeholder.svg"; }} /><p>{config.giftMessage}</p></motion.div>}</AnimatePresence>
        </div>
        <div className="cake-card glass">
          <div className={`cake-art ${candlesOut ? "cake-blown" : ""}`} aria-label="Animated birthday cake">
            <span className="candle candle-one"><i /></span><span className="candle candle-two"><i /></span><span className="candle candle-three"><i /></span>
            <span className="cake-top" /><span className="cake-layer layer-one" /><span className="cake-layer layer-two" /><span className="cake-plate" />
          </div>
          <div className="cake-copy"><span className="eyebrow"><span />MAKE A LITTLE WISH</span><h3>{candlesOut ? "May all your wishes come true, Shivani! ✨" : "Make a wish, birthday girl!"}</h3><p>Take a breath, make your wish, and tap to blow out the candles.</p><button className="button button-pink" onClick={() => { setCandlesOut(!candlesOut); if (!candlesOut) burst(); }}><CakeSlice size={16} />{candlesOut ? "Light the candles again" : "Blow out the candles"}</button></div>
        </div>
      </section>

      <footer className="finale">
        <div className="finale-stars" aria-hidden="true"><span>✦</span><span>✧</span><span>·</span><span>✦</span><span>✧</span><span>·</span><span>✦</span></div>
        <motion.div className="finale-content" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal}>
          <span className="eyebrow"><span />AND ONE LAST THING</span>
          <div className="finale-heart">♥</div>
          <h2>Happy Birthday,<br /><em>{config.name}</em> <span>♥</span></h2>
          <p>{config.birthdayMessage}</p>
          <div className="finale-collage">{config.finalPhotos.map((photo, index) => <img key={`${photo}-${index}`} src={photo} alt={`A birthday memory ${index + 1}`} onError={(event) => { event.currentTarget.src = "/photos/placeholder.svg"; }} />)}</div>
          <button className="final-heart-button" onClick={() => setFinalMessage(!finalMessage)} aria-label="Reveal the final birthday message"><Heart size={22} fill="currentColor" /></button>
          <AnimatePresence>{finalMessage && <motion.p className="final-hidden-message" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>{config.extraLetter}</motion.p>}</AnimatePresence>
          <button className="button button-gold" onClick={() => { setEntered(false); setLetterOpen(false); window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" }); }}>Relive your birthday surprise <ArrowRight size={16} /></button>
          <button className="back-top" onClick={() => navigate("home")}>Back to the beginning <ChevronDown size={14} className="back-top-arrow" /></button>
        </motion.div>
        <div className="footer-note">Made with <Heart size={12} fill="currentColor" /> just for {config.displayName}</div>
      </footer>

      <AnimatePresence>
        {currentPhoto && lightboxIndex !== null && (
          <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setLightboxIndex(null)} role="dialog" aria-modal="true" aria-label="Photo viewer">
            <button className="lightbox-close" onClick={() => setLightboxIndex(null)} aria-label="Close photo viewer"><X /></button>
            <button className="lightbox-arrow lightbox-prev" aria-label="Previous photo" onClick={(event) => { event.stopPropagation(); setLightboxIndex((lightboxIndex - 1 + displayedPhotos.length) % displayedPhotos.length); }}><ChevronLeft /></button>
            <motion.div className="lightbox-content" key={currentPhoto.src + currentPhoto.caption} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} onClick={(event) => event.stopPropagation()}>
              <img src={currentPhoto.src} alt={currentPhoto.caption} onError={(event) => { event.currentTarget.src = "/photos/placeholder.svg"; }} />
              <div className="lightbox-caption"><span>{currentPhoto.date}</span><h3>{currentPhoto.caption}</h3><span>{lightboxIndex + 1} / {displayedPhotos.length}</span></div>
            </motion.div>
            <button className="lightbox-arrow lightbox-next" aria-label="Next photo" onClick={(event) => { event.stopPropagation(); setLightboxIndex((lightboxIndex + 1) % displayedPhotos.length); }}><ChevronRight /></button>
            <button className={slideshow ? "slideshow-button active" : "slideshow-button"} onClick={(event) => { event.stopPropagation(); setSlideshow(!slideshow); }}>{slideshow ? <Pause size={14} /> : <Play size={14} />}{slideshow ? " Pause slideshow" : " Slideshow"}</button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default App;
