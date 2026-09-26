import { motion } from 'framer-motion'

export default function AdaptXLogo({ size = 'md' }) {
  const sizes = {
    sm: { height: 32, text: 'text-lg' },
    md: { height: 42, text: 'text-2xl' },
    lg: { height: 64, text: 'text-4xl' },
  }

  const s = sizes[size] || sizes.md

  return (
    <div className="flex items-center gap-2.5 select-none">
      <svg
        width={s.height}
        height={s.height}
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Gray road */}
        <path
          d="M62 10 L18 70"
          stroke="#3f3f46"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <path
          d="M62 10 L18 70"
          stroke="#71717a"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="4 6"
        />

        {/* Green road */}
        <path
          d="M18 10 L62 70"
          stroke="#22c55e"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <motion.path
          d="M18 10 L62 70"
          stroke="rgba(255,255,255,0.7)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="4 6"
          initial={{ strokeDashoffset: 0 }}
          animate={{ strokeDashoffset: -40 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
      </svg>

      <span className={`${s.text} font-black tracking-tight text-white leading-none`}>
        ADAPT<span className="text-emerald-500">-X</span>
      </span>
    </div>
  )
}
