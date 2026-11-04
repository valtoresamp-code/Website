import { motion } from 'framer-motion'

type CatProps = { mood?: 'calm' | 'happy'; className?: string }

export default function Cat({ mood = 'calm', className = '' }: CatProps) {
  return <motion.svg
    className={`cat ${className}`} viewBox="0 0 180 170" role="img" aria-label="Милый кремовый котик"
    animate={{ y: [0, -4, 0], rotate: mood === 'happy' ? [-2, 2, -2] : [-1, 1, -1] }}
    transition={{ duration: mood === 'happy' ? 1.8 : 3.4, repeat: Infinity, ease: 'easeInOut' }}
  >
    <defs>
      <linearGradient id="fur" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#fffefa"/><stop offset="1" stopColor="#f8e9e3"/></linearGradient>
      <filter id="soft"><feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#c9899e" floodOpacity=".16"/></filter>
    </defs>
    <g filter="url(#soft)" stroke="#80636a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M45 67 42 25q0-5 5-2l31 25M104 48l30-25q5-4 5 2l-3 44" fill="url(#fur)"/>
      <path d="m50 39 21 17M125 39l-19 17" fill="none" stroke="#efb7c5" strokeWidth="7"/>
      <ellipse cx="89" cy="101" rx="58" ry="49" fill="url(#fur)"/>
      <path d="M49 113c-16 1-24 11-22 23 2 9 14 14 27 7" fill="none" stroke="#ead7d2" strokeWidth="8"/>
      <ellipse cx="69" cy="97" rx="3.5" ry={mood === 'happy' ? '1' : '4.5'} fill="#664c54" stroke="none"/>
      <ellipse cx="108" cy="97" rx="3.5" ry={mood === 'happy' ? '1' : '4.5'} fill="#664c54" stroke="none"/>
      <path d="M86 107q3-4 6 0-3 4-6 0Z" fill="#e9a3b6" stroke="none"/>
      <path d="M89 111q-5 8-10 2m10-2q5 8 10 2" fill="none" strokeWidth="1.7"/>
      <path d="M67 109 46 106m22 10-22 3m68-10 21-3m-21 13 22 2" fill="none" stroke="#bd9b9f" strokeWidth="1.3"/>
      <path d="M64 133q25 13 50 0" fill="none" stroke="#ead7d2" strokeWidth="5"/>
      {mood === 'happy' && <path d="m143 61 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1Z" fill="#f4afc1" stroke="none"/>}
    </g>
    <motion.path d="M55 60q-7-8-13-3" fill="none" stroke="#80636a" strokeWidth="2" strokeLinecap="round" animate={{ rotate: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }} />
    {mood === 'happy' && <path d="M84 27c-7-8-16 2 0 12 16-10 7-20 0-12Z" fill="#f29ab5"/>}
  </motion.svg>
}

