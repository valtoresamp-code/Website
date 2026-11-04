import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, Heart, Sparkles, X } from 'lucide-react'
import Cat from './Cat'

const screens = ['welcome', 'letter', 'question', 'secret', 'invite', 'final'] as const
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
  const [choice, setChoice] = useState('')
  const [answer, setAnswer] = useState<string | null>(null)
  const reduceMotion = useReducedMotion()
  const motionProps = reduceMotion ? {} : { initial: { opacity: 0, y: 18, scale: .985 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: -12, scale: .99 }, transition }
  const go = (next: Screen) => setScreen(next)
  const close = () => window.Telegram?.WebApp ? window.Telegram.WebApp.close?.() : go('welcome')

  return <main className="app-shell">
    <div className="ambient ambient-one"/><div className="ambient ambient-two"/>
    <div className="sparkle sparkle-a">✦</div><div className="sparkle sparkle-b">✧</div><div className="sparkle sparkle-c">♡</div>
    <div className="floating-hearts" aria-hidden="true">{['♡','♥','♡','✦','♡'].map((h,i)=><span key={i} style={{'--i':i} as React.CSSProperties}>{h}</span>)}</div>
    <header className="topline"><span className="brand-mark"><Heart size={13} fill="currentColor"/> a little thing for you</span><span className="tiny-note">made with love ♡</span></header>
    {screen !== 'welcome' && screen !== 'final' && <button className="back-button" aria-label="Назад" onClick={() => go(screens[Math.max(0, screens.indexOf(screen)-1)])}><ArrowLeft size={17}/></button>}
    <div className="progress" aria-label={`Экран ${screens.indexOf(screen)+1} из 6`}>{screens.map((s,i)=><span key={s} className={i <= screens.indexOf(screen) ? 'active' : ''}/>)}</div>
    <AnimatePresence mode="wait">
      {screen === 'welcome' && <motion.section key="welcome" className="screen welcome" {...motionProps}>
        <p className="eyebrow">Only for Nastya <span>♡</span></p>
        <div className="welcome-art"><Envelope onOpen={() => go('letter')}/><Cat className="welcome-cat"/></div>
        <h1>Для тебя<br/><em>есть кое-что</em></h1>
        <p className="body-copy">Я приготовил кое-что<br className="mobile-break"/> специально для тебя</p>
        <Button onClick={() => go('letter')}>Открыть письмо <Heart size={16} fill="currentColor"/></Button>
        <div className="footnote"><Sparkles size={13}/> маленький сюрприз, только для тебя</div>
      </motion.section>}
      {screen === 'letter' && <motion.section key="letter" className="screen" {...motionProps}>
        <div className="letter-card"><span className="card-stamp">♡</span><p className="eyebrow">небольшое письмо</p>
          <h2>Привет, Насть <span>♡</span></h2>
          <div className="letter-copy">
            {['Я хотел сделать для тебя что-то необычное.','Не просто сообщение.','А маленький, милый и особенный сюрприз.','Поэтому появилось это мини-приложение.','Оно только для тебя.'].map((line,i)=><motion.p key={line} initial={reduceMotion?false:{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:.2+i*.32,...transition}}>{line}</motion.p>)}
          </div><Cat className="letter-cat"/><Button onClick={() => go('question')}>Продолжить <span>♡</span></Button>
        </div>
      </motion.section>}
      {screen === 'question' && <motion.section key="question" className="screen" {...motionProps}>
        <p className="eyebrow">маленький вопрос</p><h2 className="screen-title">Как думаешь, что делает<br/>вечер особенным?</h2>
        <div className="choices">{['Атмосфера ✨','Человек рядом ♡','Немного магии 🌙'].map((item,i)=><motion.button key={item} className={`choice ${choice===item?'selected':''}`} onClick={() => {setChoice(item);setAnswer(item)}} initial={reduceMotion?false:{opacity:0,x:-12}} animate={{opacity:1,x:0}} transition={{delay:.12+i*.1,...transition}}>{item}<span>{choice===item?'♥':'♡'}</span></motion.button>)}</div>
        <AnimatePresence>{answer && <motion.div className="answer" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0}}><p>Мне кажется, всё становится особенным, если рядом нужный человек.</p><p>Именно поэтому я хочу провести этот вечер с тобой <b>♡</b></p></motion.div>}</AnimatePresence>
        <Button onClick={() => go('secret')} >Дальше <span>♡</span></Button>
        <Cat className="small-cat"/>
      </motion.section>}
      {screen === 'secret' && <motion.section key="secret" className="screen secret-screen" {...motionProps}>
        <div className="glow-heart"><Heart size={32} fill="currentColor"/></div><p className="eyebrow">psst…</p><h2 className="screen-title">Небольшой секрет<span>...</span></h2>
        <div className="secret-card"><p>В пятницу нас ждёт один красивый вечер.</p><p>Часть ты уже знаешь.<br/>Но кое-что я оставлю сюрпризом.</p><p>Потому что приятные вещи не всегда нужно раскрывать заранее <b>♡</b></p></div>
        <Cat mood="happy" className="secret-cat"/><Button onClick={() => go('invite')}>Хочу увидеть приглашение <Heart size={15}/></Button>
      </motion.section>}
      {screen === 'invite' && <motion.section key="invite" className="screen invite-screen" {...motionProps}>
        <article className="invite-card"><div className="invite-border"><div className="invite-top"><span>✧</span><span className="eyebrow">A special evening for you</span><span>✧</span></div>
          <div className="invite-flower">❀</div><h2>Настя, приглашаю<br/>тебя на <em>особенный<br/>вечер</em> <span>♡</span></h2>
          <div className="divider"><i/>♡<i/></div>
          <p className="date-label">НАША ВСТРЕЧА</p><p className="date">Пятница, 6 ноября<br/>2026</p>
          <div className="format-pill"><Sparkles size={15}/> Кино и ещё немного приятной магии</div>
          <p className="invite-copy">Мне хочется, чтобы этот вечер был для тебя тёплым, милым и запоминающимся.</p>
          <Cat mood="happy" className="invite-cat"/>
          <div className="invite-actions"><Button onClick={() => {localStorage.setItem('nastya-answer','буду ждать пятницы');go('final')}}>Буду ждать пятницы ♡</Button><Button secondary onClick={() => {localStorage.setItem('nastya-answer','это очень мило');go('final')}}>Это очень мило</Button></div>
        </div></article>
      </motion.section>}
      {screen === 'final' && <motion.section key="final" className="screen final-screen" {...motionProps}>
        <div className="final-hearts">♡　✦　♡</div><Cat mood="happy" className="final-cat"/><p className="eyebrow">уже совсем скоро</p><h2>До пятницы,<br/><em>Насть</em> ♡</h2>
        <p className="final-copy">Надеюсь, этот маленький сюрприз подарил тебе улыбку. Теперь осталось дождаться нашей встречи ♡</p>
        <Button onClick={() => go('invite')}>Посмотреть ещё раз <Heart size={15}/></Button><button className="text-button" onClick={close}><X size={15}/> Закрыть</button>
        <p className="signature">с теплом, для тебя <span>♡</span></p>
      </motion.section>}
    </AnimatePresence>
    <footer className="bottom-mark"><span>♡</span> just for you <span>♡</span></footer>
  </main>
}

