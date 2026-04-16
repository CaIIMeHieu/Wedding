import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { config } from './config';
import EnvelopePage from './EnvelopePage';
import './index.css';

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

const calendarContainerVariant = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.2 } }
};

const dayItemVariant = {
  hidden: { opacity: 0, scale: 0.3 },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 350, damping: 18 } }
};

const Section = ({ children, bgImage, className = "" }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeUpVariant}
      className={`relative w-full overflow-hidden flex flex-col items-center py-10 ${className}`}
      style={bgImage ? {
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'top center'
      } : {}}
    >
      {children}
    </motion.section>
  );
};

// Music Player
const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio(config.music));

  useEffect(() => {
    const audio = audioRef.current;
    audio.loop = true;

    // Play on first interaction
    const handleInteraction = () => {
      audio.play().then(() => setIsPlaying(true)).catch(e => console.log('Audio auto-play prevented'));
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('scroll', handleInteraction);
    };

    window.addEventListener('click', handleInteraction);
    window.addEventListener('scroll', handleInteraction);

    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('scroll', handleInteraction);
      audio.pause();
    };
  }, []);

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className={`music-toggle ${isPlaying ? 'playing' : ''}`} onClick={toggleMusic}>
      {isPlaying ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="#2b2b2b" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="3 9 7 9 11 5 11 19 7 15 3 15"></polygon>
          <path d="M14 9.5a3 3 0 0 1 0 5"></path>
          <path d="M16.5 7a6 6 0 0 1 0 10"></path>
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="#2b2b2b" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="3 9 7 9 11 5 11 19 7 15 3 15"></polygon>
          <line x1="16" y1="8" x2="21" y2="13"></line>
          <line x1="21" y1="8" x2="16" y2="13"></line>
        </svg>
      )}
    </div>
  );
};


const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = React.useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  React.useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(targetDate).getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex justify-center items-center space-x-3 text-[#52613e] font-couple">
      <div className="text-[54px] leading-none">{timeLeft.days.toString().padStart(2, '0')}</div>
      <div className="text-[38px] opacity-60 mb-1">:</div>
      <div className="text-[54px] leading-none">{timeLeft.hours.toString().padStart(2, '0')}</div>
      <div className="text-[38px] opacity-60 mb-1">:</div>
      <div className="text-[54px] leading-none">{timeLeft.minutes.toString().padStart(2, '0')}</div>
      <div className="text-[38px] opacity-60 mb-1">:</div>
      <div className="text-[54px] leading-none">{timeLeft.seconds.toString().padStart(2, '0')}</div>
    </div>
  );
};

export default function App() {
  const [opened, setOpened] = useState(false);
  const [currentGalleryIndex, setCurrentGalleryIndex] = React.useState(0);
  const [calRef, calInView] = useInView({ triggerOnce: true, threshold: 0.15 });

  React.useEffect(() => {
    if (!opened) return;
    const slideTimer = setInterval(() => {
      setCurrentGalleryIndex((prev) => (prev + 1) % config.gallery.length);
    }, 5000);
    return () => clearInterval(slideTimer);
  }, [opened]);

  if (!opened) {
    return <EnvelopePage onOpen={() => setOpened(true)} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: 'easeOut' }}
    >
    <div className="w-full relative mx-auto overflow-hidden bg-white min-h-screen shadow-lg">

      {/* SECTION 1 - Hero Cover */}
      <section className="relative w-full flex justify-center overflow-hidden" style={{ height: '700px' }}>
        <img src="https://w.ladicdn.com/s750x950/6322a62f2dad980013bb5005/thiep-thanh-dat-element_0033_1-20251010160355-v6bgi.png" className="absolute top-0 left-0 w-full h-[901px] object-cover" alt="bg" />

        {/* Container cố định độ rộng gốc 392px, căn giữa bằng flex */}
        <div className="relative w-[392px] h-full flex-shrink-0">

          <img src="https://w.ladicdn.com/s650x700/6322a62f2dad980013bb5005/thiep-thanh-dat-element_0025_9-20251010160529-oa95t.png" className="absolute top-[206px] left-1/2 transform -translate-x-1/2 w-[337px] object-contain" alt="frame" />

          {/* Save Our Date Title - Centered */}
          <motion.img initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} src="https://w.ladicdn.com/s650x400/6322a62f2dad980013bb5005/thiep-thanh-dat-element_0027_7-20251010160529-7tq4r.png" className="absolute top-[50px] left-1/2 transform -translate-x-1/2 w-[318px] z-50 pointer-events-none" alt="Save our date" />

          {/* Right Photo (Ảnh đằng sau) */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1.5 }} className="absolute top-[183px] left-[131px] w-[223px] h-[262px] z-40">
            <img src="https://w.ladicdn.com/s550x600/6322a62f2dad980013bb5005/thiep-thanh-dat-element_0023_11-20251010160529-l3kgn.png" className="w-full h-full object-cover z-20 absolute pointer-events-none" alt="flower border" />
            <div className="absolute top-[23px] left-[22px] w-[179px] h-[181px] border-[2px] border-[#edecec] hover:rotate-0 transition-transform duration-300 shadow-sm" style={{ backgroundImage: `url(${config.images.heroPolaroidRight})`, backgroundSize: 'cover', transform: 'rotate(4deg)' }}></div>
            <p className="font-primary text-[21px] uppercase tracking-[1px] text-[#32526e] absolute w-[135px] text-center" style={{ top: '210px', left: '21px', transform: 'rotate(5deg)', zIndex: 25 }}>{config.events.weddingCeremony.dateDay}.{config.events.weddingCeremony.dateMonth}.{config.events.weddingCeremony.dateYear}</p>
          </motion.div>

          {/* Left Photo (Ảnh đằng trước có ghi ngày tháng) */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1.5 }} className="absolute top-[226px] left-[47px] w-[224px] h-[260px] z-30">
            <img src="https://w.ladicdn.com/s550x600/6322a62f2dad980013bb5005/thiep-thanh-dat-element_0024_10-20251010160529-dfqbw.png" className="w-full h-full object-cover absolute pointer-events-none" style={{ zIndex: 22 }} alt="flower border" />
            <div className="absolute top-[23px] left-[24px] w-[175px] h-[181px] border-[2px] border-[#edecec] hover:rotate-0 transition-transform duration-300 shadow-sm" style={{ backgroundImage: `url(${config.images.heroPolaroidLeft})`, backgroundSize: 'cover', transform: 'rotate(-6deg)', zIndex: 21 }}></div>
            {/* Chữ ngày tháng đặt chính xác trên khung polaroid */}
          </motion.div>

          {/* Envelope Bottom */}
          <motion.img initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 1 }} src="https://w.ladicdn.com/s650x550/6322a62f2dad980013bb5005/thiep-thanh-dat-element_0021_13-20251010160528-wcnlv.png" className="absolute top-[362px] left-1/2 transform -translate-x-1/2 w-[342px] z-40 pointer-events-none drop-shadow-md" alt="envelope" />

          {/* Wax Seal */}
          <motion.img initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }} src="https://w.ladicdn.com/s400x400/6322a62f2dad980013bb5005/thiep-thanh-dat-element_0020_14-20251010160528-z-man.png" className="absolute top-[426px] left-1/2 transform -translate-x-1/2 w-[57px] z-50 pointer-events-none drop-shadow-sm rounded-full" alt="seal" />

          {/* Scatter Flowers */}
          <motion.img initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }} src="https://w.ladicdn.com/s400x400/6322a62f2dad980013bb5005/thiep-thanh-dat-element_0018_16-20251010160531-qmshd.png" className="absolute top-[601px] right-[50px] w-[51px] z-50 pointer-events-none" alt="flower" />
          <motion.img initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5, duration: 1 }} src="https://w.ladicdn.com/s450x550/6322a62f2dad980013bb5005/thiep-thanh-dat-element_0017_17-20251010160529-gulgj.png" className="absolute top-[457px] left-[-10px] w-[131px] z-40 pointer-events-none" alt="flower" />
          <motion.img initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5, duration: 1 }} src="https://w.ladicdn.com/s450x600/6322a62f2dad980013bb5005/thiep-thanh-dat-element_0019_15-20251010160529-kgwqz.png" className="absolute top-[267px] right-[-10px] w-[126px] z-50 pointer-events-none" alt="flower" />
        </div>
      </section>

      {/* SECTION 2 - Small transition */}
      <section className="relative w-full h-[252px]">
        <div className="absolute top-0 left-0 w-full h-[252px]" style={{ backgroundImage: `url(${config.images.transitionBg})`, backgroundSize: 'cover', backgroundPosition: 'center 43%' }}></div>
      </section>

      {/* SECTION 3 - Invitation & Event Details */}
      <Section bgImage="https://w.ladicdn.com/s750x1500/6322a62f2dad980013bb5005/thiep-thanh-dat-element_0033_1-20251010160355-v6bgi.png" className="min-h-[1400px] relative">

        {/* Flower Image (IMAGE16) */}
        <div className="absolute top-[230px] left-[268px] w-[151px] h-[88px] z-10 pointer-events-none">
          <img src="https://w.ladicdn.com/s500x400/6322a62f2dad980013bb5005/thiep-thanh-dat-element_0016_18-20251010162634-r9rqi.png" className="w-full h-full object-contain" alt="flower decoration" />
        </div>

        {/* Bottom Flower (IMAGE22) */}
        <div className="absolute top-[1325px] left-0 w-[122px] h-[68px] z-10 pointer-events-none">
          <img src="https://w.ladicdn.com/s450x400/6322a62f2dad980013bb5005/thiep-thanh-dat-element_0015_19-20251010162634-ietkt.png" className="w-full h-full object-contain" alt="bottom flower" />
        </div>

        <div className="flex justify-between w-full px-8 mt-2 text-[var(--primary)] text-center relative z-20">
          <div className="flex-1">
            <p className="font-primary font-bold text-[14px] uppercase mb-2">nhà trai</p>
            <p className="font-primary text-[13px] leading-relaxed">{config.parents.groom.father}<br />{config.parents.groom.mother}</p>
          </div>
          <div className="flex-1">
            <p className="font-primary font-bold text-[14px] uppercase mb-2">nhà gái</p>
            <p className="font-primary text-[13px] leading-relaxed">{config.parents.bride.father}<br />{config.parents.bride.mother}</p>
          </div>
        </div>
        <div className="text-center w-full mt-7 relative z-20">
          <p className="font-primary text-[18px] uppercase text-[var(--primary)] leading-tight">
            Kính mời tham dự tiệc chung vui<br />của gia đình chúng tôi
          </p>
        </div>
        <div className="text-center mt-35 relative z-20">
          <h1 className="font-couple text-[55px] text-[var(--primary)] uppercase leading-[45px]">
            {config.couple.groom}<br />
            <span className="text-[37px] block">&</span>
            {config.couple.bride}
          </h1>
        </div>

        {/* EVENTS SECTION */}
        <div className="w-full flex justify-center mt-20 relative px-4">
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="border-2 border-[var(--primary)] rounded-xl w-full max-w-[360px] p-6 mb-16 text-center shadow-sm bg-white/70 backdrop-blur-sm">
            <h3 className="font-primary font-bold text-[21px] uppercase text-[var(--primary)] mb-2">{config.events.intimateParty.title}</h3>
            <p className="font-primary text-[14px] leading-relaxed text-[var(--primary)] font-bold">{config.events.intimateParty.location}</p>
            <p className="font-primary text-[14px] leading-relaxed text-[var(--primary)] mb-4">{config.events.intimateParty.address}</p>

            <a href={config.events.intimateParty.mapLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 mb-6">
              <span className="font-primary font-bold text-[16px] uppercase text-[var(--primary)] underline">chỉ đường</span>
            </a>

            <p className="font-primary text-[17px] text-[var(--primary)] mb-4">Được tổ chức vào lúc <br /> <strong>{config.events.intimateParty.time}, {config.events.intimateParty.dayOfWeek}</strong></p>

            <div className="flex justify-center items-center font-primary text-[var(--primary)] mb-4">
              <span className="text-[19px] uppercase border-y border-[var(--primary)] px-2 py-1 mr-4">tháng {config.events.intimateParty.dateMonth}</span>
              <span className="font-couple text-[82px] mx-2 leading-none">{config.events.intimateParty.dateDay}</span>
              <span className="text-[19px] uppercase border-y border-[var(--primary)] px-2 py-1 ml-4">năm {config.events.intimateParty.dateYear}</span>
            </div>

            <p className="font-primary text-[15px] italic text-[var(--primary)]">( Tức ngày {config.events.intimateParty.dateLunar})</p>
          </motion.div>
        </div>

        <div className="w-full flex justify-center relative px-4">
          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="border-2 border-[var(--primary)] rounded-xl w-full max-w-[360px] p-6 text-center shadow-sm bg-white/70 backdrop-blur-sm">
            <div className="bg-[var(--primary)] text-white font-primary font-bold uppercase py-2 px-6 rounded-full inline-block mb-4 text-[21px] -mt-12">
              {config.events.weddingCeremony.title}
            </div>
            <p className="font-primary text-[14px] leading-relaxed text-[var(--primary)] font-bold mt-2">{config.events.weddingCeremony.location}</p>
            <p className="font-primary text-[14px] leading-relaxed text-[var(--primary)] mb-4">{config.events.weddingCeremony.address}</p>

            <a href={config.events.weddingCeremony.mapLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 mb-6">
              <span className="font-primary font-bold text-[16px] uppercase text-[var(--primary)] underline">chỉ đường</span>
            </a>

            <p className="font-primary text-[17px] text-[var(--primary)] mb-4">Được tổ chức vào lúc <br /> <strong>{config.events.weddingCeremony.time}, {config.events.weddingCeremony.dayOfWeek}</strong></p>

            <div className="flex justify-center items-center font-primary text-[var(--primary)] mb-4">
              <span className="text-[19px] uppercase border-y border-[var(--primary)] px-2 py-1 mr-4">tháng {config.events.weddingCeremony.dateMonth}</span>
              <span className="font-couple text-[82px] mx-2 leading-none">{config.events.weddingCeremony.dateDay}</span>
              <span className="text-[19px] uppercase border-y border-[var(--primary)] px-2 py-1 ml-4">năm {config.events.weddingCeremony.dateYear}</span>
            </div>

            <p className="font-primary text-[15px] italic text-[var(--primary)]">( Tức ngày {config.events.weddingCeremony.dateLunar})</p>
          </motion.div>
        </div>
      </Section>

      {/* SECTION 4 - All of me loves all of you */}
      <motion.section
        className="relative w-full h-[637px] overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <motion.img
          src={config.images.allOfMeBg}
          className="w-full h-full object-cover"
          initial={{ scale: 1.12 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, ease: 'easeOut' }}
        />
        <div className="absolute bottom-0 w-full h-[326px] bg-gradient-to-t from-black/60 to-transparent flex items-center justify-center">
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="font-script text-[36px] text-white text-center leading-normal"
          >
            All of me loves<br />&nbsp;&nbsp;all of you
          </motion.h2>
        </div>
      </motion.section>

      {/* SECTION 5 - Couple Intro & Our Story */}
      <Section bgImage="https://w.ladicdn.com/s750x1500/6322a62f2dad980013bb5005/thiep-thanh-dat-element_0033_1-20251010160355-v6bgi.png" className="min-h-[1200px] py-10 overflow-hidden relative">

        {/* Main centered container for the couple part to match LadiPage 420px width */}
        <div className="relative w-[420px] mx-auto h-[600px] mt-10 flex-shrink-0">

          {/* Flower top-left — IMAGE27 */}
          <img src="https://w.ladicdn.com/s450x600/6322a62f2dad980013bb5005/thiep-thanh-dat-element_0013_21-20251010163910-jjqab.png" className="absolute pointer-events-none z-10" style={{ top: '0px', left: '0px', width: '111px', height: '251px' }} alt="" />

          {/* Flower center between — IMAGE28 */}
          <img src="https://w.ladicdn.com/s450x450/6322a62f2dad980013bb5005/thiep-thanh-dat-element_0012_22-20251010163910-utg6i.png" className="absolute top-[183px] right-[127px] w-[140px] z-50 pointer-events-none" alt="" />

          {/* Flower bottom-right bride side — IMAGE29 */}
          <img src="https://w.ladicdn.com/s450x550/6322a62f2dad980013bb5005/thiep-thanh-dat-element_0011_23-20251010163910-afce_.png" className="absolute pointer-events-none z-100" style={{ top: '494px', left: '287px', width: '132px', height: '210px' }} alt="" />

          {/* GROOM BLOCK */}
          <div className="absolute top-[40px] left-[15px] w-full h-[300px] z-20">
            {/* Profile Photo with Border */}
            <div className="absolute top-0 left-0 w-[200px] h-[230px] transform rotate-[3deg] shadow-lg bg-white p-2">
              <div className="w-full h-full relative bg-gray-200 overflow-hidden">
                <img src={config.images.groomPhoto} className="w-full h-full object-cover" alt="groom" />
                {/* Decoration Frame Overlay */}
                <img src="https://w.ladicdn.com/s550x600/6322a62f2dad980013bb5005/thiep-phuong-anh-element_0014_rectangle-5-20250930175230-j01-r.png" className="absolute inset-0 w-full h-full object-contain pointer-events-none mix-blend-multiply opacity-90" alt="frame" />
              </div>
            </div>
            {/* Names - Placed to the right of photo */}
            <div className="absolute top-[45px] left-[207px] w-[180px] text-left">
              <p className="font-secondary text-[42px] text-[#52613e] leading-none mb-1">Chú rể</p>
              <h3 className="font-primary text-[28px] font-bold text-[#52613e] uppercase lg:tracking-wider leading-tight">{config.couple.groom}</h3>
            </div>
          </div>

          {/* GREEN WAX SEAL (Centered between) */}

          {/* BRIDE BLOCK */}
          <div className="absolute top-[310px] left-0 w-full h-[300px] z-30">
            {/* Profile Photo - Placed bottom right */}
            <div className="absolute top-0 right-[25px] w-[200px] h-[230px] transform rotate-[-4deg] shadow-lg bg-white p-2">
              <div className="w-full h-full relative bg-gray-200 overflow-hidden">
                <img src={config.images.bridePhoto} className="w-full h-full object-cover" alt="bride" />
                {/* Decoration Frame Overlay */}
                <img src="https://w.ladicdn.com/s550x600/6322a62f2dad980013bb5005/thiep-phuong-anh-element_0015_rectangle-5-20250930175230-zqngc.png" className="absolute inset-0 w-full h-full object-contain pointer-events-none mix-blend-multiply opacity-90" alt="frame" />
              </div>
            </div>
            {/* Names - Placed left of photo */}
            <div className="absolute top-[57px] left-[-14px] w-[200px] text-right">
              <p className="font-secondary text-[42px] text-[#52613e] leading-none mb-1">Cô dâu</p>
              <h3 className="font-primary text-[28px] font-bold text-[#52613e] uppercase lg:tracking-wider leading-tight">{config.couple.bride}</h3>
            </div>
          </div>

        </div>

        {/* OUR STORY */}
        <div className="mt-5 w-full flex flex-col items-center relative z-40 px-6 pb-24">
          <motion.img
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            src="https://w.ladicdn.com/s600x400/6322a62f2dad980013bb5005/thiep-thanh-dat-element_0010_24-20251010163910-ff7iz.png"
            className="w-[280px] mb-10"
            alt="Our story"
          />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="max-w-[380px] text-center"
          >
            <p className="font-primary text-[15.5px] leading-[1.7] text-[#52613e] italic">
              "Tình yêu của anh và em là một hành trình kỳ diệu, vượt qua bao thử thách để cùng nhau bước đến ngày trọng đại – đám cưới của chúng mình.<br /><br />
              Đám cưới này là lời cam kết chân thành, là sự bắt đầu của một chương mới – nơi chúng ta cùng vun đắp tổ ấm, cùng sẻ chia mọi vui buồn và cùng nắm tay nhau đi đến cuối con đường mang tên hạnh phúc."
            </p>
          </motion.div>
        </div>
      </Section>

      {/* SECTION 6 - Calendar Timeline */}
      <section className="relative w-full min-h-[520px]">
        <img src="https://w.ladicdn.com/s750x700/6322a62f2dad980013bb5005/thiep-thanh-dat-element_0009_25-20251010165309-zhafr.png" className="absolute top-0 left-0 w-full h-[520px] object-cover" alt="bg" />

        <div className="relative z-10 w-full flex flex-col items-center pt-8 text-white">
          <motion.h3
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-script text-[40px] text-center mb-6"
          >April</motion.h3>

          <div className="w-full max-w-[340px] bg-transparent text-center font-primary text-[14px] mt-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-7 gap-y-6 text-[14px] uppercase mb-4 opacity-80"
            >
              <div>mon</div><div>tue</div><div>wed</div><div>thur</div><div>fri</div><div>sat</div><div>sun</div>
            </motion.div>

            {/* April 2026: ngày 1 = Thứ Tư (col 3) */}
            <motion.div
              ref={calRef}
              className="grid grid-cols-7 gap-y-8 text-[13px] relative font-bold items-center"
              variants={calendarContainerVariant}
              initial="hidden"
              animate={calInView ? 'visible' : 'hidden'}
            >
              {[null, null, 1, 2, 3, 4, 5,
                6, 7, 8, 9, 10, 11, 12,
                13, 14, 15, 16, 17, 18, 19,
                20, 21, 22, 23, 24, 25, 26,
                27, 28, 29, 30
              ].map((day, i) => {
                if (day === 25) return (
                  <motion.div key={i} variants={dayItemVariant} className="flex flex-col items-center">
                    <div className="flex items-center justify-center w-[34px] h-[34px] rounded-full bg-white/20 border-[1.5px] border-white">
                      <span className="text-[17px] font-black">25</span>
                    </div>
                    <span className="text-[8px] text-white/80 mt-[2px] font-normal tracking-wide">Tiệc</span>
                  </motion.div>
                );
                if (day === 26) return (
                  <motion.div key={i} variants={dayItemVariant} className="flex flex-col items-center">
                    <motion.div
                      animate={{ scale: [1, 1.18, 1] }}
                      transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                      className="flex items-center justify-center w-[38px] h-[38px] rounded-full bg-white border-2 border-white shadow-lg"
                    >
                      <span className="text-[18px] font-black text-[#52613e]">26</span>
                    </motion.div>
                    <span className="text-[9px] text-white mt-[2px] font-semibold tracking-wide">Lễ cưới</span>
                  </motion.div>
                );
                return (
                  <motion.div key={i} variants={dayItemVariant}>
                    {day ?? ''}
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>


      {/* SECTION 7 - Horizontal Timeline */}
      <Section className="min-h-[400px] py-16 bg-[#fdfaf5]">
        <h2 className="font-secondary text-[45px] text-[#52613e] text-center mb-12">Timeline</h2>

        <div className="relative w-full max-w-[420px] mx-auto px-6">
          <div className="flex items-start justify-around relative">
            {/* Event 1 */}
            <div className="flex flex-col items-center w-[140px]">
              <img src="https://w.ladicdn.com/s400x400/6322a62f2dad980013bb5005/thiep-thanh-dat-element_0005_29-20251010165559-b9jp9.png" className="w-[85px] h-[85px] mb-4 object-contain" alt="icon1" />
              <div className="text-center">
                <p className="font-primary text-[22px] font-bold text-[#52613e]">{config.events.intimateParty.time}</p>
                <p className="font-primary text-[18px] text-[#52613e] uppercase">{config.events.intimateParty.title}</p>
              </div>
            </div>

            {/* Connecting Line */}
            <div className="absolute left-1/2 -translate-x-1/2 top-[42px] w-[70px] border-t-2 border-[#52613e] z-10"></div>

            {/* Event 2 */}
            <div className="flex flex-col items-center w-[140px]">
              <img src="https://w.ladicdn.com/s400x400/6322a62f2dad980013bb5005/thiep-thanh-dat-element_0006_28-20251010165559-ejurh.png" className="w-[85px] h-[85px] mb-4 object-contain" alt="icon2" />
              <div className="text-center">
                <p className="font-primary text-[22px] font-bold text-[#52613e]">{config.events.weddingCeremony.time}</p>
                <p className="font-primary text-[18px] text-[#52613e] uppercase">{config.events.weddingCeremony.title}</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* SECTION 8 - Countdown Timer Section */}
      <div className="w-full relative bg-[#fdfaf5]">
        {/* Paper Texture Background */}
        <img src="https://w.ladicdn.com/s750x1500/6322a62f2dad980013bb5005/thiep-thanh-dat-element_0033_1-20251010160355-v6bgi.png" className="absolute inset-0 w-full h-full object-cover opacity-60" alt="bg" />

        <div className="relative z-10 w-full">
          {/* Split Section: Image & Green Box */}
          <div className="flex w-full h-[236px]">
            <div className="w-1/2 h-full">
              <img src="https://w.ladicdn.com/s550x550/6322a62f2dad980013bb5005/thiep-thanh-dat-element_0003_31-20251010170120-xdyii.png" className="w-full h-full object-cover" alt="side-img" />
            </div>
            <div className="w-1/2 h-full bg-[#52613e] flex items-center justify-center px-6">
              <p className="font-secondary text-[26px] text-white text-center leading-relaxed">
                Every moment with you feels painted in gentle light.
              </p>
            </div>
          </div>

          {/* Countdown Area */}
          <div className="relative w-full flex flex-col items-center pt-6 pb-10 overflow-hidden">
            {/* Flower decoration — right side */}
            <img
              src="https://w.ladicdn.com/s450x500/6322a62f2dad980013bb5005/thiep-thanh-dat-element_0002_32-20251010170122-ijn7k.png"
              className="absolute right-0 top-0 w-[190px] pointer-events-none"
              style={{ zIndex: 1 }}
              alt=""
            />

            {/* Countdown title */}
            <motion.h3
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-script text-[42px] text-[#52613e] text-center mb-2 relative z-10"
            >
              Countdown
            </motion.h3>

            {/* Timer numbers */}
            <div className="relative z-10 w-full">
              <CountdownTimer
                targetDate={`${config.events.weddingCeremony.dateYear}-${config.events.weddingCeremony.dateMonth.padStart(2, '0')}-${config.events.weddingCeremony.dateDay}T${config.events.weddingCeremony.time}:00`}
              />
            </div>

            {/* Labels */}
            <div className="relative z-10 flex justify-center font-primary text-[11px] uppercase text-[#52613e] opacity-60 mt-2 tracking-widest" style={{ gap: '52px' }}>
              <span>ngày</span><span>giờ</span><span>phút</span><span>giây</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 8 - Premium Gallery */}
      <section className="w-full relative bg-[#fdfaf5] py-20">
        <div className="w-full max-w-[420px] mx-auto px-4">
          <div className="relative group">
            <div className="w-full h-[600px] overflow-hidden rounded-xl shadow-2xl relative">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentGalleryIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  src={config.gallery[currentGalleryIndex]}
                  className="w-full h-full object-cover"
                  alt="Gallery"
                />
              </AnimatePresence>

              {/* Navigation Arrows */}
              <button
                onClick={() => setCurrentGalleryIndex((prev) => (prev - 1 + config.gallery.length) % config.gallery.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md p-2 rounded-full transition-all opacity-0 group-hover:opacity-100 flex items-center justify-center z-50 text-white"
              >
              </button>
              <button
                onClick={() => setCurrentGalleryIndex((prev) => (prev + 1) % config.gallery.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md p-2 rounded-full transition-all opacity-0 group-hover:opacity-100 flex items-center justify-center z-50 text-white"
              >
              </button>
            </div>

            {/* Thumbnails */}
            <div className="flex justify-center space-x-2 mt-6 overflow-x-auto pb-4 no-scrollbar">
              {config.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentGalleryIndex(idx)}
                  className={`w-16 h-20 flex-shrink-0 rounded-md overflow-hidden border-2 transition-all ${currentGalleryIndex === idx ? 'border-[#52613e] scale-110' : 'border-transparent opacity-60'
                    }`}
                >
                  <img src={img} className="w-full h-full object-cover" alt="thumb" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 10 - RSVP and Giving */}
      <Section bgImage="https://w.ladicdn.com/s750x1000/6322a62f2dad980013bb5005/thiep-thanh-dat-element_0033_1-20251010160355-v6bgi.png" className="py-16 relative overflow-hidden">
        <div className="flex flex-col items-center w-full relative z-20">
          <button className="mt-4 px-8 py-3 bg-[#e8deca] text-[#52613e] font-primary uppercase tracking-wide rounded-full text-[19px] border hover:bg-opacity-80 shadow-md mb-8">
            GỬI QUÀ MỪNG CƯỚI
          </button>

          {/* Giving Box */}
          <div className="w-full max-w-[340px] bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-16">
            {/* Photo on top */}
            <div className="w-full h-[200px]">
              <img src={config.images.transitionBg} alt="Wedding" className="w-full h-full object-cover object-center" />
            </div>
            {/* Bottom: QR left, text right */}
            <div className="flex items-center px-4 py-4 gap-4">
              <div className="w-[110px] h-[110px] flex-shrink-0 bg-white border border-gray-100 rounded-lg p-1">
                <img src={config.bank.groom.qrCode} alt="QR Code" className="w-full h-full object-contain" />
              </div>
              <div className="flex-1">
                <p className="font-secondary text-[26px] text-[#52613e] leading-none mb-1">Chú rể</p>
                <h3 className="font-primary text-[14px] font-bold uppercase text-[#52613e] leading-tight mb-2 tracking-wide">{config.bank.groom.name}</h3>
                <p className="font-primary text-[13px] text-[#52613e] leading-none">{config.bank.groom.bankName}</p>
                <p className="font-primary text-[13px] text-[#52613e] mt-1 tracking-wider">{config.bank.groom.accountNumber}</p>
              </div>
            </div>
          </div>

          <div className="text-center font-primary text-[15px] text-[#52613e] px-6">
            <h2 className="font-secondary text-[32px] text-[#52613e] mb-4">Thank you!</h2>
            Cảm ơn bạn đã dành tình cảm cho chúng mình!<br />Sự hiện diện của bạn chính là món quà ý nghĩa nhất, và chúng mình vô cùng trân quý khi được cùng bạn chia sẻ niềm hạnh phúc trong ngày trọng đại này.
          </div>
        </div>
      </Section>
      <MusicPlayer />
    </div>
    </motion.div>
  );
}
