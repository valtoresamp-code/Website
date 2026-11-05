import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, Heart, Sparkles, X } from 'lucide-react'
import Cat from './Cat'

const screens = ['welcome', 'letter', 'question', 'invite', 'final'] as const
type Screen = typeof screens[number]
const transition = { duration: 0.48, ease: [0.22, 1, 0.36, 1] as const }

function Envelope({ onOpen }: { onOpen: () => void }) {
  return <motion.button className="envelope" onClick={onOpen} aria-label="Открыть письмо" whileTap={{ scale: .96 }}>
    <motion.div className="letter-peek" initial={{ y: 34 }} animate={{ y: 0 }} transition={{ delay: .24, ...transition }} />
    <div className="envelope-back" />
    <motion.div className="envelope-flap" initial={{ rotateX: 0 }} animate={{ rotateX: 180 }} transition={{ delay: .1, duration: .6 }} />
    <div className="envelope-front" />
    <motion.div className="seal" animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 2, repeat: Infinity }}><Heart size={21} fill="currentColor" /></motion.div>
  </motion.button>
}

function Button({ children, onClick, secondary = false }: { children: React.ReactNode; onClick: () => void; secondary?: boolean }) {
  return <motion.button className={`button ${secondary ? 'button-secondary' : ''}`} onClick={onClick} whileHover={{ y: -2 }} whileTap={{ scale: .97 }}>{children}</motion.button>
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('welcome')
  const [accepted, setAccepted] = useState(false)
  const [noPosition, setNoPosition] = useState(0)
  const reduceMotion = useReducedMotion()
  const motionProps = reduceMotion ? {} : { initial: { opacity: 0, y: 18, scale: .985 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: -12, scale: .99 }, transition }
  const go = (next: Screen) => setScreen(next)
  const close = () => window.Telegram?.WebApp ? window.Telegram.WebApp.close?.() : go('welcome')
  const dodgeNo = () => setNoPosition((current) => current === 0 ? (Math.random() > .5 ? 1 : 2) : current === 1 ? 2 : 1)

  return <main className="app-shell">
    <div className="ambient ambient-one"/><div className="ambient ambient-two"/>
    <div className="sparkle sparkle-a">✦</div><div className="sparkle sparkle-b">✧</div><div className="sparkle sparkle-c">♡</div>
    <div className="floating-hearts" aria-hidden="true">{['♡','♥','♡','✦','♡'].map((h,i)=><span key={i} style={{'--i':i} as React.CSSProperties}>{h}</span>)}</div>
    <header className="topline"><span className="brand-mark"><Heart size={13} fill="currentColor"/> a little thing for you</span><span className="tiny-note">made with love ♡</span></header>
    {screen !== 'welcome' && screen !== 'final' && <button className="back-button" aria-label="Назад" onClick={() => go(screens[Math.max(0, screens.indexOf(screen)-1)])}><ArrowLeft size={17}/></button>}
    <div className="progress" aria-label={`Экран ${screens.indexOf(screen)+1} из ${screens.length}`}>{screens.map((s,i)=><span key={s} className={i <= screens.indexOf(screen) ? 'active' : ''}/>)}</div>
    <AnimatePresence mode="wait">
      {screen === 'welcome' && <motion.section key="welcome" className="screen welcome" {...motionProps}>
        <p className="eyebrow">Only for Nastya <span>♡</span></p>
        <div className="welcome-art"><Envelope onOpen={() => go('letter')}/><Cat className="welcome-cat"/></div>
        <h1>Для тебя<br/><em>есть кое-что</em></h1>
        <p className="body-copy">Я приготовил кое-что<br className="mobile-break"/> специально для тебя</p>
        <Button onClick={() => go('letter')}>Открыть письмо <Heart size={16} fill="currentColor"/></Button>
        <div className="footnote"><Sparkles size={13}/> небольшое письмо для тебя</div>
      </motion.section>}
      {screen === 'letter' && <motion.section key="letter" className="screen" {...motionProps}>
        <div className="letter-card"><span className="card-stamp">♡</span><p className="eyebrow">небольшое письмо</p>
          <h2>Привет, Насть <span>♡</span></h2>
          <div className="letter-copy">
            {['Я хотел сделать для тебя что-то необычное.','Не просто сообщение.','А небольшое приглашение на вечер вместе.','Поэтому появилось это мини-приложение.','Оно только для тебя.'].map((line,i)=><motion.p key={line} initial={reduceMotion?false:{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:.2+i*.32,...transition}}>{line}</motion.p>)}
          </div><Cat className="letter-cat"/><Button onClick={() => go('question')}>Продолжить <span>♡</span></Button>
        </div>
      </motion.section>}
      {screen === 'question' && <motion.section key="question" className="screen question-screen" {...motionProps}>
        <div className="question-card">
          <Cat className="question-cat"/>
          <p className="eyebrow">пятница · 6 ноября</p>
          <h2 className="screen-title">Ты ведь<br/>не передумала?</h2>
          <p className="question-hint">Выбери правильный ответ</p>
          {!accepted && <div className="yes-no-area">
            <Button onClick={() => setAccepted(true)}>Не передумала</Button>
            <motion.button className={`no-button no-position-${noPosition}`} onPointerEnter={dodgeNo} onPointerDown={(event) => { event.preventDefault(); dodgeNo() }} onClick={dodgeNo} layout transition={{ type: 'spring', stiffness: 420, damping: 25 }}>Передумала</motion.button>
          </div>}
          <AnimatePresence>{accepted && <motion.div className="question-answer" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0}}><p>Отлично. В пятницу зайду за тобой в 17:00.</p><Button onClick={() => go('invite')}>Смотреть приглашение</Button></motion.div>}</AnimatePresence>
        </div>
      </motion.section>}
      {screen === 'invite' && <motion.section key="invite" className="screen invite-screen" {...motionProps}>
        <article className="invite-card"><div className="invite-border"><div className="invite-top"><span>✧</span><span className="eyebrow">A special evening for you</span><span>✧</span></div>
          <div className="invite-flower">✦</div><h2>Нась,<br/><em>увидимся завтра</em></h2>
          <div className="divider"><i/>♡<i/></div>
          <p className="date-label">ЗАВТРА · 17:00</p><p className="date">В 17:00 зайду за тобой.<br/>Будь готова.</p>
          <Cat mood="happy" className="invite-cat"/>
          <div className="invite-actions"><Button onClick={() => {localStorage.setItem('nastya-answer','буду готова');go('final')}}>Хорошо, буду готова</Button><Button secondary onClick={() => {localStorage.setItem('nastya-answer','жду тебя');go('final')}}>Жду тебя</Button></div>
        </div></article>
      </motion.section>}
      {screen === 'final' && <motion.section key="final" className="screen final-screen" {...motionProps}>
        <div className="final-hearts">♡　✦　♡</div><Cat mood="happy" className="final-cat"/><p className="eyebrow">до встречи</p><h2><em>Увидимся</em><br/>завтра, Нась</h2>
        <p className="final-copy">Надеюсь, тебе понравилось это письмо. Теперь осталось дождаться нашей встречи ♡</p>
        <Button onClick={() => go('invite')}>Посмотреть ещё раз <Heart size={15}/></Button><button className="text-button" onClick={close}><X size={15}/> Закрыть</button>
        <p className="signature">с теплом, для тебя <span>♡</span></p>
      </motion.section>}
    </AnimatePresence>
    <footer className="bottom-mark"><span>♡</span> just for you <span>♡</span></footer>
  </main>
}

