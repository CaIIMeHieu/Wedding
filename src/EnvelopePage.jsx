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

      {/* Background card */}
      <img
        src={config.envelope.cardBg}
        className="absolute object-cover pointer-events-none"
        style={{ top: '108px', left: '0.156px', width: '419.688px', height: '669.178px' }}
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
          top: '85.444px', left: '43.795px', width: '335px',
          fontSize: '18.33px', color: 'rgb(82,97,62)',
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
          top: '113.5px', left: '19.795px', width: '383px',
          fontSize: '35.57px', color: 'rgb(82,97,62)',
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
          top: '149.444px', left: '19.795px', width: '383px',
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
        style={{ top: '279.077px', left: '67.4px', width: '285.2px', height: '200.845px' }}
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
        style={{ top: '217.5px', left: '36px', width: '101.087px', height: '186px' }}
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
        style={{ top: '331.411px', left: '254.476px', width: '152.525px', height: '302px' }}
        alt=""
        draggable={false}
      />

      {/* Wax seal — pulsing */}
      <motion.img
        src={config.envelope.waxSeal}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute object-contain pointer-events-none"
        style={{ top: '392.922px', left: '180.403px', width: '61.7831px', height: '71.578px' }}
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
          top: '552.5px', left: '114.295px', width: '194px',
          fontSize: '34.38px', color: 'rgb(82,97,62)',
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
    </motion.div>
  );
}
