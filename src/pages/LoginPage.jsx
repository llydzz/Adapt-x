import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, CheckCircle2, AlertCircle, X, Lock, Mail, ShieldCheck } from 'lucide-react'

export default function LoginPage({ onLogin }) {
    // Login Form States (Started empty)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [keepSignedIn, setKeepSignedIn] = useState(true)
    const [errorMsg, setErrorMsg] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    // Forgot password & flow states ('login' | 'forgot-1' | 'forgot-2' | 'forgot-3' | 'forgot-4')
    const [view, setView] = useState('login')
    const [resetEmail, setResetEmail] = useState('')
    const [code, setCode] = useState(['', '', '', '', '', ''])
    const [newPassword, setNewPassword] = useState('')

    // Auto-disappear error toast timer
    useEffect(() => {
        if (errorMsg) {
            const timer = setTimeout(() => setErrorMsg(''), 4000)
            return () => clearTimeout(timer)
        }
    }, [errorMsg])

    // Mock Submit Handler with proper test validations & triggers
    const handleSubmit = (e) => {
        e.preventDefault()

        // Required fields validation trigger
        if (!email.trim() || !password.trim()) {
            setErrorMsg('Please fill in all required fields to continue.')
            return
        }

        setIsLoading(true)

        setTimeout(() => {
            setIsLoading(false)
            // Correct test mock check (operator@gmail.com / password123)
            if (email.trim() === 'operator@gmail.com' && password === 'password123') {
                setErrorMsg('')
                onLogin()
            } else {
                // Incorrect error toast trigger
                setErrorMsg('Invalid credentials. Use operator@gmail.com / password123')
            }
        }, 600)
    }

    return (
        <div className="relative w-screen h-screen overflow-hidden flex flex-col justify-between bg-[#0d0d0f] font-sans select-none">

            {/* ==========================================================
          RESTORED GLASSMORPHISM TOAST (Auto-disappears / Dismissible)
         ========================================================== */}
            <div className="absolute top-5 left-0 right-0 flex justify-center z-50 pointer-events-none px-4">
                <AnimatePresence>
                    {errorMsg && (
                        <motion.div
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            transition={{ duration: 0.25, ease: 'easeOut' }}
                            className="pointer-events-auto flex items-center justify-between gap-3 bg-white/10 backdrop-blur-xl border border-white/20 text-white px-4 py-3 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] max-w-sm w-full"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-7 h-7 rounded-full bg-red-500/30 border border-red-500/40 text-red-400 flex items-center justify-center shrink-0">
                                    <AlertCircle size={15} />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-white tracking-wide">Action Required</p>
                                    <p className="text-[11px] text-zinc-300 font-normal">{errorMsg}</p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setErrorMsg('')}
                                className="text-zinc-400 hover:text-white p-1 transition-colors cursor-pointer rounded-lg hover:bg-white/10"
                            >
                                <X size={14} />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* ==========================================================
          TOP HERO SECTION (Roads & Navigation Graphics)
         ========================================================== */}
            <div className="relative w-full h-[40vh] bg-[#0d0d0f] overflow-hidden shrink-0">

                {/* Background Gray Road */}
                <svg
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    style={{ zIndex: 1 }}
                    viewBox="0 0 400 400"
                    preserveAspectRatio="none"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M -20 290 C 220 320, 320 80, 420 90"
                        stroke="#3B3B3B"
                        strokeWidth="38"
                        strokeLinecap="round"
                    />
                    <path
                        d="M -20 290 C 220 320, 320 80, 420 90"
                        stroke="#4A4A4A"
                        strokeWidth="30"
                        strokeLinecap="round"
                    />
                    <path
                        d="M -20 290 C 220 320, 320 80, 420 90"
                        stroke="#FFFFFF"
                        strokeWidth="1.5"
                        strokeDasharray="10 14"
                        opacity="0.6"
                    />
                </svg>

                {/* Foreground Green Road (Synced S-curve intersection) */}
                <svg
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    style={{ zIndex: 2 }}
                    viewBox="0 0 400 400"
                    preserveAspectRatio="none"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <filter id="greenRoadShadow" x="-20%" y="-20%" width="140%" height="140%">
                            <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#000000" floodOpacity="0.65" />
                        </filter>
                    </defs>
                    <g filter="url(#greenRoadShadow)">
                        <path
                            d="M -20 -20 C 180 20, 320 400, 420 400"
                            stroke="#197A3C"
                            strokeWidth="38"
                            strokeLinecap="round"
                        />
                    </g>
                    <path
                        d="M -20 -20 C 180 20, 320 400, 420 400"
                        stroke="#1F9D4C"
                        strokeWidth="30"
                        strokeLinecap="round"
                    />
                    <motion.path
                        d="M -20 -20 C 180 20, 320 400, 420 400"
                        stroke="#FFFFFF"
                        strokeWidth="1.5"
                        strokeDasharray="10 14"
                        initial={{ strokeDashoffset: 0 }}
                        animate={{ strokeDashoffset: -100 }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                    />
                </svg>

                {/* Branding Logo Text */}
                <div
                    className="absolute z-10"
                    style={{ top: '48%', left: '28px', transform: 'translateY(-50%)' }}
                >
                    <h1
                        style={{
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 800,
                            fontSize: '36px',
                            color: '#ffffff',
                            letterSpacing: '-0.03em',
                            lineHeight: 1,
                            textShadow: '0 2px 8px rgba(0,0,0,0.8)'
                        }}
                    >
                        ADAPT -
                    </h1>
                </div>

                {/* Copyright badge */}
                <div
                    className="absolute text-zinc-500 text-[10px] font-semibold tracking-wider z-10"
                    style={{ bottom: '10px', left: '28px' }}
                >
                    ® ADAPT-X
                </div>
            </div>

            {/* ==========================================================
          MODERN WEB-APP CARD CONTAINER (Clean White, Rounded Top)
         ========================================================== */}
            <div
                className="w-full flex-1 bg-white relative flex items-center justify-center px-6 sm:px-10 z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.2)] overflow-hidden"
                style={{ borderTopLeftRadius: '32px', borderTopRightRadius: '32px', marginTop: '-26px' }}
            >
                <div className="w-full max-w-[380px] py-5 z-20 overflow-y-auto">
                    <AnimatePresence mode="wait">

                        {/* ====================================================
                VIEW 1: MODERN OPERATOR SIGN IN FORM
               ==================================================== */}
                        {view === 'login' && (
                            <motion.div
                                key="login-form"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="mb-4">
                                    <h1 className="text-[22px] font-extrabold text-zinc-900 tracking-tight">
                                        Operator sign in
                                    </h1>
                                    <p className="text-zinc-500 text-[12px] mt-0.5 leading-normal">
                                        Sign in to manage live intersection operations & metrics.
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-3.5">
                                    <div>
                                        <label className="block text-[11px] font-bold text-zinc-700 uppercase tracking-wider mb-1">
                                            Operator Email
                                        </label>
                                        <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-400">
                        <Mail size={16} />
                      </span>
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="operator@gmail.com"
                                                className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 text-zinc-900 text-[13px] rounded-xl border border-zinc-200 focus:bg-white focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10 transition-all outline-none font-medium"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-between mb-1">
                                            <label className="block text-[11px] font-bold text-zinc-700 uppercase tracking-wider">
                                                Password
                                            </label>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setErrorMsg('')
                                                    setView('forgot-1')
                                                }}
                                                className="text-[12px] text-emerald-600 hover:text-emerald-700 font-semibold transition-colors cursor-pointer"
                                            >
                                                Forgot password?
                                            </button>
                                        </div>
                                        <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-400">
                        <Lock size={16} />
                      </span>
                                            <input
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder="••••••••••••"
                                                className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 text-zinc-900 text-[13px] rounded-xl border border-zinc-200 focus:bg-white focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10 transition-all outline-none font-medium"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center pt-0.5">
                                        <label className="flex items-center gap-2.5 cursor-pointer select-none">
                                            <input
                                                type="checkbox"
                                                checked={keepSignedIn}
                                                onChange={(e) => setKeepSignedIn(e.target.checked)}
                                                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-zinc-300 cursor-pointer accent-emerald-600"
                                            />
                                            <span className="text-[13px] text-zinc-600 font-medium">Keep me signed in</span>
                                        </label>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full mt-1.5 py-3 px-4 bg-zinc-900 hover:bg-zinc-800 text-white font-semibold text-[13px] rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg active:scale-[0.99] cursor-pointer disabled:opacity-70"
                                    >
                                        {isLoading ? (
                                            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                <span>Sign in to Dashboard</span>
                                                <ArrowRight size={16} />
                                            </>
                                        )}
                                    </button>
                                </form>

                                <div className="mt-4 pt-4 border-t border-zinc-100 text-center">
                                    <p className="text-[12px] text-zinc-500">
                                        Need system permissions?{' '}
                                        <a
                                            href="#admin"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                alert('Mock: Please reach out to your regional ADAPT-X system administrator.')
                                            }}
                                            className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors"
                                        >
                                            Contact support
                                        </a>
                                    </p>
                                </div>
                            </motion.div>
                        )}

                        {/* ====================================================
                VIEW 2: PASSWORD RESET - STEP 1 (Email Entry)
               ==================================================== */}
                        {view === 'forgot-1' && (
                            <motion.div
                                key="forgot-1"
                                initial={{ opacity: 0, x: 15 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -15 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="flex gap-1.5 mb-5">
                                    <div className="h-[3px] flex-1 bg-emerald-600 rounded-full" />
                                    <div className="h-[3px] flex-1 bg-zinc-200 rounded-full" />
                                    <div className="h-[3px] flex-1 bg-zinc-200 rounded-full" />
                                    <div className="h-[3px] flex-1 bg-zinc-200 rounded-full" />
                                </div>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setErrorMsg('')
                                        setView('login')
                                    }}
                                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-900 mb-3 transition-colors cursor-pointer"
                                >
                                    <ArrowLeft size={14} /> Back to sign in
                                </button>

                                <h1 className="text-[22px] font-bold text-zinc-900 tracking-tight">Reset password</h1>
                                <p className="text-zinc-500 text-[12px] mt-1 mb-5">
                                    Enter your registered operator email to receive a secure recovery code.
                                </p>

                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault()
                                        if (!resetEmail.trim()) {
                                            setErrorMsg('Please enter your recovery email address.')
                                            return
                                        }
                                        setErrorMsg('')
                                        setView('forgot-2')
                                    }}
                                    className="space-y-3.5"
                                >
                                    <div>
                                        <label className="block text-[11px] font-bold text-zinc-700 uppercase tracking-wider mb-1">
                                            Operator Email
                                        </label>
                                        <input
                                            type="email"
                                            value={resetEmail}
                                            onChange={(e) => setResetEmail(e.target.value)}
                                            placeholder="operator@gmail.com"
                                            className="w-full px-4 py-2.5 bg-zinc-50 text-zinc-900 text-[13px] rounded-xl border border-zinc-200 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none font-medium"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full py-3 px-4 bg-zinc-900 hover:bg-zinc-800 text-white font-semibold text-[13px] rounded-xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.99] cursor-pointer"
                                    >
                                        <span>Send recovery code</span>
                                        <ArrowRight size={16} />
                                    </button>
                                </form>
                            </motion.div>
                        )}

                        {/* ====================================================
                VIEW 3: PASSWORD RESET - STEP 2 (Check Email Mock)
               ==================================================== */}
                        {view === 'forgot-2' && (
                            <motion.div
                                key="forgot-2"
                                initial={{ opacity: 0, x: 15 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -15 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="flex gap-1.5 mb-5">
                                    <div className="h-[3px] flex-1 bg-emerald-600 rounded-full" />
                                    <div className="h-[3px] flex-1 bg-emerald-600 rounded-full" />
                                    <div className="h-[3px] flex-1 bg-zinc-200 rounded-full" />
                                    <div className="h-[3px] flex-1 bg-zinc-200 rounded-full" />
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setView('forgot-1')}
                                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-900 mb-3 transition-colors cursor-pointer"
                                >
                                    <ArrowLeft size={14} /> Back
                                </button>

                                <h1 className="text-[22px] font-bold text-zinc-900 tracking-tight">Check your email</h1>
                                <p className="text-zinc-500 text-[12px] mt-1.5 mb-5">
                                    We've sent a 6-digit confirmation code to <strong className="text-zinc-800 font-semibold">{resetEmail || 'your email'}</strong>.
                                </p>

                                <button
                                    type="button"
                                    onClick={() => setView('forgot-3')}
                                    className="w-full py-3 px-4 bg-zinc-900 hover:bg-zinc-800 text-white font-semibold text-[13px] rounded-xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.99] cursor-pointer"
                                >
                                    <span>Enter verification code</span>
                                    <ArrowRight size={16} />
                                </button>

                                <p className="mt-4 text-center text-[12px] text-zinc-500">
                                    Didn't receive it?{' '}
                                    <button
                                        type="button"
                                        onClick={() => alert(`Mock: A fresh code has been dispatched to ${resetEmail}`)}
                                        className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors cursor-pointer"
                                    >
                                        Resend code
                                    </button>
                                </p>
                            </motion.div>
                        )}

                        {/* ====================================================
                VIEW 4: PASSWORD RESET - STEP 3 (OTP Code & New Password)
               ==================================================== */}
                        {view === 'forgot-3' && (
                            <motion.div
                                key="forgot-3"
                                initial={{ opacity: 0, x: 15 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -15 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="flex gap-1.5 mb-5">
                                    <div className="h-[3px] flex-1 bg-emerald-600 rounded-full" />
                                    <div className="h-[3px] flex-1 bg-emerald-600 rounded-full" />
                                    <div className="h-[3px] flex-1 bg-emerald-600 rounded-full" />
                                    <div className="h-[3px] flex-1 bg-zinc-200 rounded-full" />
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setView('forgot-2')}
                                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-900 mb-3 transition-colors cursor-pointer"
                                >
                                    <ArrowLeft size={14} /> Back
                                </button>

                                <h1 className="text-[22px] font-bold text-zinc-900 tracking-tight">Security check</h1>
                                <p className="text-zinc-500 text-[12px] mt-1.5 mb-4">
                                    Enter the 6-digit code and set your new secure password.
                                </p>

                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault()
                                        if (!newPassword.trim()) {
                                            setErrorMsg('Please enter a new password.')
                                            return
                                        }
                                        setErrorMsg('')
                                        setView('forgot-4')
                                    }}
                                    className="space-y-3.5"
                                >
                                    <div className="flex justify-between gap-1.5">
                                        {[0, 1, 2, 3, 4, 5].map((i) => (
                                            <input
                                                key={i}
                                                id={`code-${i}`}
                                                type="text"
                                                maxLength="1"
                                                value={code[i]}
                                                onChange={(e) => {
                                                    const val = e.target.value
                                                    const nextCode = [...code]
                                                    nextCode[i] = val
                                                    setCode(nextCode)
                                                    if (val && i < 5) {
                                                        document.getElementById(`code-${i + 1}`)?.focus()
                                                    }
                                                }}
                                                className="w-10 h-11 text-center text-base font-bold text-zinc-900 bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none"
                                            />
                                        ))}
                                    </div>

                                    <div>
                                        <label className="block text-[11px] font-bold text-zinc-700 uppercase tracking-wider mb-1">
                                            New Password
                                        </label>
                                        <input
                                            type="password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            placeholder="••••••••••••"
                                            className="w-full px-4 py-2.5 bg-zinc-50 text-zinc-900 text-[13px] rounded-xl border border-zinc-200 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none font-medium"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full py-3 px-4 bg-zinc-900 hover:bg-zinc-800 text-white font-semibold text-[13px] rounded-xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.99] cursor-pointer"
                                    >
                                        <span>Update credentials</span>
                                        <ArrowRight size={16} />
                                    </button>
                                </form>
                            </motion.div>
                        )}

                        {/* ====================================================
                VIEW 5: PASSWORD RESET - STEP 4 (Success Confirmation)
               ==================================================== */}
                        {view === 'forgot-4' && (
                            <motion.div
                                key="forgot-4"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="text-center py-2"
                            >
                                <div className="flex gap-1.5 mb-5">
                                    <div className="h-[3px] flex-1 bg-emerald-600 rounded-full" />
                                    <div className="h-[3px] flex-1 bg-emerald-600 rounded-full" />
                                    <div className="h-[3px] flex-1 bg-emerald-600 rounded-full" />
                                    <div className="h-[3px] flex-1 bg-emerald-600 rounded-full" />
                                </div>

                                <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center mb-3 shadow-sm">
                                    <ShieldCheck size={32} />
                                </div>

                                <h1 className="text-[20px] font-bold text-zinc-900 tracking-tight">Password updated</h1>
                                <p className="text-zinc-500 text-[12px] mt-1.5 mb-5 max-w-xs mx-auto">
                                    Your operator account security credentials have been successfully updated. You may now sign in.
                                </p>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setErrorMsg('')
                                        setView('login')
                                    }}
                                    className="w-full py-3 px-4 bg-zinc-900 hover:bg-zinc-800 text-white font-semibold text-[13px] rounded-xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.99] cursor-pointer"
                                >
                                    <span>Proceed to sign in</span>
                                    <ArrowRight size={16} />
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* ==========================================================
          BOTTOM FOOTER COPYRIGHT BADGE
         ========================================================== */}
            <div className="w-full bg-[#111111] py-2.5 text-center z-30 shrink-0">
        <span className="text-zinc-400 text-[10px] font-semibold tracking-wider">
          ® ADAPT - <span className="text-emerald-500 font-bold">X</span>
        </span>
            </div>

        </div>
    )
}