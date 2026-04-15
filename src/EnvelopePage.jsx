import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { config } from './config';

export default function EnvelopePage({ onOpen }) {
  const [searchParams] = useSearchParams();
  const guestName = searchParams.get('name') || '';
  const [isOpening, setIsOpening] = useState(false);

  const weddingDate = `${config.events.weddingCeremony.dateDay}.${config.events.weddingCeremony.dateMonth.padStart(2, '0')}.${config.events.weddingCeremony.dateYear}`;

  const handleClick = () => {
    if (isOpening) return;
    setIsOpening(true);
    setTimeout(onOpen, 900);
  };

  return (
    <motion.div
      className="relative w-full overflow-hidden cursor-pointer select-none"
      style={{ height: '772px', background: '#fdfaf5' }}
      onClick={handleClick}
      animate={isOpening ? { opacity: 0, scale: 1.05, y: -30 } : { opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      {/* Inner 420px container — centered on any screen width */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2"
        style={{ width: '420px', height: '772px' }}
      >

        {/* Background card */}
        <img
          src={config.envelope.cardBg}
          className="absolute object-cover pointer-events-none"
          style={{ top: '108px', left: '0px', width: '420px', height: '669px' }}
          alt=""
          draggable={false}
        />

        {/* "trân trọng kính mời:" */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="absolute font-primary text-center uppercase"
          style={{
            top: '85px', left: '43px', width: '335px',
            fontSize: '18px', color: 'rgb(82,97,62)',
            letterSpacing: '0.05em', margin: 0
          }}
        >
          trân trọng kính mời:
        </motion.p>

        {/* Guest name */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="absolute font-secondary text-center"
          style={{
            top: '113px', left: '20px', width: '381px',
            fontSize: '35px', color: 'rgb(82,97,62)',
            lineHeight: 1.4, margin: 0
          }}
        >
          {guestName}
        </motion.p>

        {/* Horizontal divider line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute"
          style={{
            top: '149px', left: '20px', width: '381px',
            borderTop: '1px solid rgb(82,97,62)'
          }}
        />

        {/* Top flower decoration */}
        <motion.img
          src={config.envelope.topFlowers}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute object-contain pointer-events-none"
          style={{ top: '279px', left: '67px', width: '286px', height: '201px' }}
          alt=""
          draggable={false}
        />

        {/* Left flowers */}
        <motion.img
          src={config.envelope.leftFlowers}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 2 }}
          className="absolute object-contain pointer-events-none"
          style={{ top: '217px', left: '36px', width: '101px', height: '186px' }}
          alt=""
          draggable={false}
        />

        {/* Right flowers */}
        <motion.img
          src={config.envelope.rightFlowers}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 2 }}
          className="absolute object-contain pointer-events-none"
          style={{ top: '331px', left: '254px', width: '153px', height: '302px' }}
          alt=""
          draggable={false}
        />

        {/* Wax seal — pulsing */}
        <motion.img
          src={config.envelope.waxSeal}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute object-contain pointer-events-none"
          style={{ top: '393px', left: '180px', width: '62px', height: '72px' }}
          alt=""
          draggable={false}
        />

        {/* Date */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="absolute font-couple text-center uppercase"
          style={{
            top: '553px', left: '113px', width: '194px',
            fontSize: '34px', color: 'rgb(82,97,62)',
            letterSpacing: '3px', margin: 0
          }}
        >
          {weddingDate}
        </motion.p>

        {/* Click hint — fades in and out */}
        {!isOpening && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0] }}
            transition={{ delay: 2.5, duration: 2, repeat: Infinity }}
            className="absolute font-primary text-center"
            style={{
              bottom: '12px', left: 0, right: 0,
              fontSize: '12px', color: 'rgb(82,97,62)', margin: 0
            }}
          >
            Nhấn để mở thiệp
          </motion.p>
        )}

      </div>
    </motion.div>
  );
}
