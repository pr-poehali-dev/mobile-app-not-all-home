import { useState } from 'react';
import Icon from '@/components/ui/icon';

type Screen =
  | 'welcome' | 'home'
  | 'moodIntro' | 'moodMain'
  | 'eventsIntro' | 'eventsList' | 'eventDetail'
  | 'gameIntro' | 'gamePlay'
  | 'profile';

/* ─── данные ─────────────────────────────────────────── */
const MOODS = [
  { emoji: '😡', bg: '#E63946', label: 'Злюсь' },
  { emoji: '😢', bg: '#4FC3E8', label: 'Грущу' },
  { emoji: '😄', bg: '#F4922B', label: 'Радуюсь' },
  { emoji: '😐', bg: '#C9A8DA', label: 'Спокоен' },
];

const STATUSES = [
  { id: 'home', label: 'Дома', icon: 'House', color: '#4FC3E8' },
  { id: 'work', label: 'На работе', icon: 'Briefcase', color: '#F4922B' },
  { id: 'school', label: 'В школе', icon: 'GraduationCap', color: '#C9A8DA' },
];

const FAMILY = [
  { name: 'Мама', avatar: '👩', status: 'home' },
  { name: 'Папа', avatar: '👨', status: 'work' },
  { name: 'Соня', avatar: '👧', status: 'school' },
];

const EVENTS = [
  { id: 0, title: 'Вечер кино', date: '22 мар', sub: 'сегодня', daysLeft: 0, color: '#4FC3E8', emoji: '🎬', participants: ['😊','😄','😋','😡'] },
  { id: 1, title: 'День рождения папы', date: '27 мар', sub: 'через 5 дней', daysLeft: 5, color: '#F4922B', emoji: '🎂', participants: ['🤩','😮','😑','😤'] },
  { id: 2, title: 'Пикник на природе', date: '5 апр', sub: 'через 14 дней', daysLeft: 14, color: '#E63946', emoji: '🌿', participants: ['😊','😄','😋','😡'] },
  { id: 3, title: 'Поездка на море', date: '12 апр', sub: 'через 20 дней', daysLeft: 20, color: '#C9A8DA', emoji: '🏖️', participants: ['🤩','😮','😑','😤'] },
];

const CARDS = [
  { type: 'ОТГАДАЙКА', question: 'Переведите с английского слово «Skateboard»' },
  { type: 'СИТУАЦИЯ', question: 'Что бы вы сделали, если бы нашли 1000 рублей на улице?' },
  { type: 'ВОПРОС', question: 'Какой твой самый яркий семейный момент?' },
  { type: 'ЗАДАНИЕ', question: 'Изобрази любимое блюдо без слов — остальные угадывают!' },
  { type: 'ОТГАДАЙКА', question: 'Как называется страна, где родился Карлсон?' },
  { type: 'ВОПРОС', question: 'Если бы ты мог стать животным на один день — кем?' },
];

/* ─── обёртка телефона ───────────────────────────────── */
const Phone = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen w-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center p-4 font-body">
    <div className="relative w-full max-w-[380px] h-[780px] bg-white rounded-[44px] shadow-2xl overflow-hidden border-[6px] border-black/90">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black/90 rounded-b-2xl z-50" />
      <div className="w-full h-full overflow-y-auto">{children}</div>
    </div>
  </div>
);

/* ─── графика приветствия ────────────────────────────── */
const WelcomeArt = () => (
  <div className="relative w-full h-[230px] shrink-0 overflow-hidden">
    <div className="absolute -top-24 right-6 w-56 h-56 rounded-full bg-brand-red" />
    <div className="absolute top-16 right-3 w-[88px] h-[88px] rounded-full bg-brand-blue flex items-center justify-center animate-float shadow-lg z-10">
      <svg width="56" height="40" viewBox="0 0 56 40" fill="none">
        <circle cx="14" cy="11" r="5" fill="#0E1116" />
        <circle cx="42" cy="11" r="5" fill="#0E1116" />
        <path d="M8 20 Q28 42 48 20" stroke="#0E1116" strokeWidth="6" strokeLinecap="round" fill="none" />
      </svg>
    </div>
    <svg className="absolute top-2 left-6 w-[210px] h-[70px]" viewBox="0 0 210 70" fill="none">
      <path d="M2 6 Q70 34 140 14 T206 22" stroke="#0E1116" strokeWidth="3" fill="none" strokeLinecap="round" />
      <g fill="#0E1116">
        <path d="M30 13 l26 -2 l-10 20 z" />
        <path d="M68 14 l26 0 l-12 20 z" />
        <path d="M108 11 l26 2 l-14 19 z" />
        <path d="M150 15 l24 3 l-15 18 z" />
      </g>
    </svg>
  </div>
);

/* ─── персонаж карточной игры ────────────────────────── */
const CardCharacter = () => (
  <svg width="160" height="160" viewBox="0 0 160 160" fill="none" className="animate-float">
    {/* скейт */}
    <rect x="10" y="128" width="110" height="18" rx="9" fill="#3a2a1a" />
    <circle cx="28" cy="148" r="8" fill="#555" />
    <circle cx="92" cy="148" r="8" fill="#555" />
    {/* тело — треугольник */}
    <polygon points="80,20 20,130 140,130" fill="#4FC3E8" />
    {/* лицо */}
    <circle cx="65" cy="85" r="7" fill="#0E1116" />
    <circle cx="95" cy="78" r="7" fill="#0E1116" />
    <path d="M60 100 Q80 118 100 100" stroke="#0E1116" strokeWidth="5" strokeLinecap="round" fill="none" />
    {/* кепка */}
    <rect x="52" y="14" width="56" height="14" rx="7" fill="#0E1116" />
    <rect x="44" y="22" width="72" height="8" rx="4" fill="#0E1116" />
    {/* рука со скейтом */}
    <line x1="35" y1="110" x2="18" y2="132" stroke="#4FC3E8" strokeWidth="10" strokeLinecap="round" />
  </svg>
);

/* ─── компонент главного экрана ──────────────────────── */
export default function Index() {
  const [screen, setScreen] = useState<Screen>('welcome');
  const [status, setStatus] = useState('home');
  const [todayMood, setTodayMood] = useState<number | null>(null);
  const [selectedEvent, setSelectedEvent] = useState(0);
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const go = (s: Screen) => { setScreen(s); setFlipped(false); };

  /* ── WELCOME ── */
  if (screen === 'welcome')
    return (
      <Phone>
        <div className="relative h-full flex flex-col">
          <div className="flex-1 overflow-hidden">
            <img
              src="https://cdn.poehali.dev/projects/e26efa0e-ff06-4c5c-aeb7-cd3c5b6a21c0/bucket/45445f0a-1d35-422f-9c4f-1e554226e97b.png"
              alt="Не все дома"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="px-7 pb-10 pt-4 bg-white">
            <button onClick={() => go('home')} className="w-full py-4 rounded-2xl bg-brand-blue text-white font-display font-bold text-lg shadow-lg active:scale-95 transition-transform">
              Привет, семья!
            </button>
          </div>
        </div>
      </Phone>
    );

  /* ── HOME ── */
  if (screen === 'home')
    return (
      <Phone>
        <div className="px-6 pt-16 pb-28">
          <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase">Добро пожаловать</p>
          <h1 className="font-display font-black text-5xl leading-[0.9] text-black mt-1">НЕ ВСЕ<br />ДОМА</h1>

          <div className="mt-6 bg-white rounded-3xl p-5 border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.06)] animate-scale-in">
            <p className="text-xs text-slate-400">Сегодня <span className="font-semibold text-slate-500">21 марта 2026</span></p>
            <p className="font-display font-black text-2xl text-black mt-1">Суббота!</p>
            <p className="text-sm text-slate-500">Отличный день для игры с семьёй</p>
            <button onClick={() => go('gameIntro')} className="mt-4 px-5 py-2.5 rounded-xl bg-brand-blue text-white font-semibold text-sm active:scale-95 transition-transform">
              Начать игру
            </button>
          </div>

          <p className="mt-7 text-xs font-bold tracking-widest text-slate-400 uppercase">Разделы</p>
          <div className="grid grid-cols-2 gap-3 mt-3">
            <Tile color="#4FC3E8" icon="Heart" title="Настроение" sub="История настроений" onClick={() => go('moodIntro')} />
            <Tile color="#C9A8DA" icon="Layers" title="Карточки" sub="Вопросы для семьи" onClick={() => go('gameIntro')} />
            <Tile color="#F4922B" icon="Calendar" title="События" sub="Планы и мероприятия" onClick={() => go('eventsIntro')} />
            <Tile color="#E63946" icon="Smile" title="Профиль" sub="Члена семьи" onClick={() => go('profile')} />
          </div>
        </div>
        <BottomNav active="home" onNav={go} />
      </Phone>
    );

  /* ── MOOD INTRO ── */
  if (screen === 'moodIntro')
    return (
      <Phone>
        <div className="relative h-full flex flex-col">
          <div className="flex-1 overflow-hidden">
            <img
              src="https://cdn.poehali.dev/projects/e26efa0e-ff06-4c5c-aeb7-cd3c5b6a21c0/bucket/a2828b0c-5e9c-4a76-a45f-6176ccfc269b.png"
              alt="Трекер настроений"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="px-7 pb-10 pt-4 bg-white">
            <button onClick={() => go('moodMain')} className="w-full py-4 rounded-2xl bg-brand-orange text-white font-display font-bold text-lg shadow-lg active:scale-95 transition-transform">
              Начать отслеживать
            </button>
          </div>
        </div>
      </Phone>
    );

  /* ── MOOD MAIN ── */
  if (screen === 'moodMain') {
    const days = Array.from({ length: 28 }, (_, i) => i + 1);
    return (
      <Phone>
        <div className="px-6 pt-16 pb-28">
          <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase">Семья</p>
          <h1 className="font-display font-black text-3xl leading-tight text-black mt-1">Календарь<br />настроений</h1>
          <div className="mt-5 bg-slate-100 rounded-3xl p-4">
            <div className="flex items-center justify-between mb-3">
              <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm active:scale-90 transition-transform"><Icon name="ChevronLeft" size={18} /></button>
              <span className="font-display font-semibold text-lg">Февраль 2026</span>
              <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm active:scale-90 transition-transform"><Icon name="ChevronRight" size={18} /></button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-slate-400 font-semibold mb-1">
              {['ПН','ВТ','СР','ЧТ','ПТ','СБ','ВС'].map(d => <span key={d}>{d}</span>)}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {days.map(d => {
                const m = MOODS[d % MOODS.length];
                return (
                  <div key={d} className="aspect-square rounded-full flex items-center justify-center text-sm relative" style={{ background: m.bg }}>
                    {m.emoji}
                    <span className="absolute top-0.5 left-1 text-[8px] font-bold text-white/80">{d}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mt-4 bg-slate-100 rounded-3xl p-5 text-center animate-scale-in">
            <p className="font-display font-black text-lg text-black">Сегодня</p>
            <p className="text-sm text-slate-500 mb-4">Как ты себя чувствуешь?</p>
            <div className="flex justify-between px-2">
              {MOODS.map((m, i) => (
                <button key={i} onClick={() => setTodayMood(i)}
                  className="w-14 h-14 rounded-full flex items-center justify-center text-2xl transition-all active:scale-90"
                  style={{ background: m.bg, outline: todayMood === i ? '3px solid #000' : 'none', outlineOffset: '2px', transform: todayMood === i ? 'scale(1.1)' : 'scale(1)' }}>
                  {m.emoji}
                </button>
              ))}
            </div>
          </div>
        </div>
        <BottomNav active="mood" onNav={go} />
      </Phone>
    );
  }

  /* ── EVENTS INTRO (вступительный экран событий) ── */
  if (screen === 'eventsIntro')
    return (
      <Phone>
        <div className="relative h-full flex flex-col">
          <div className="flex-1 overflow-hidden">
            <img
              src="https://cdn.poehali.dev/projects/e26efa0e-ff06-4c5c-aeb7-cd3c5b6a21c0/bucket/b73a94ac-cd41-44bd-b436-21036720a9f1.png"
              alt="События семьи"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="px-7 pb-10 pt-4 bg-white">
            <button onClick={() => go('eventsList')} className="w-full py-4 rounded-2xl font-display font-bold text-lg shadow-lg active:scale-95 transition-transform text-white" style={{ background: '#F4922B' }}>
              Спланировать
            </button>
          </div>
        </div>
      </Phone>
    );

  /* ── EVENTS LIST ── */
  if (screen === 'eventsList')
    return (
      <Phone>
        <div className="px-6 pt-16 pb-28">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase">Семья</p>
              <h1 className="font-display font-black text-3xl leading-tight text-black mt-0.5">Календарь<br />событий</h1>
            </div>
            <button className="w-11 h-11 rounded-2xl bg-brand-blue flex items-center justify-center shadow-md active:scale-90 transition-transform mt-1">
              <Icon name="Plus" size={22} className="text-white" />
            </button>
          </div>

          <div className="mt-8 relative">
            {/* вертикальная линия timeline */}
            <div className="absolute left-[52px] top-3 bottom-3 w-[2px] bg-slate-200" />

            <div className="space-y-5">
              {EVENTS.map((ev, idx) => (
                <button
                  key={ev.id}
                  onClick={() => { setSelectedEvent(idx); go('eventDetail'); }}
                  className="w-full flex items-center gap-4 active:scale-[0.98] transition-transform"
                >
                  {/* дата + точка */}
                  <div className="flex flex-col items-center w-[52px] shrink-0 relative z-10">
                    <div className="w-5 h-5 rounded-full border-2 mb-1" style={{ borderColor: ev.color, background: idx === 0 ? ev.color : 'white' }} />
                    <p className="font-black text-xl leading-none text-black">{ev.date.split(' ')[0]}</p>
                    <p className="text-[11px] text-slate-500 font-medium">{ev.date.split(' ')[1]}</p>
                    <p className="text-[10px] text-slate-400">{ev.sub}</p>
                  </div>
                  {/* карточка */}
                  <div className="flex-1 rounded-2xl px-4 py-4 text-left text-white font-display font-bold text-lg leading-tight shadow-md" style={{ background: ev.color }}>
                    {ev.title}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
        <BottomNav active="events" onNav={go} />
      </Phone>
    );

  /* ── EVENT DETAIL ── */
  if (screen === 'eventDetail') {
    const ev = EVENTS[selectedEvent];
    return (
      <Phone>
        <div className="relative h-full flex flex-col px-7 pt-16 pb-10">
          <BackBtn onClick={() => go('eventsList')} />
          <h1 className="font-display font-black text-3xl leading-[1.05] text-black mt-5">{ev.title}</h1>
          <p className="text-slate-400 text-sm mt-1">{ev.date}</p>

          <div className="mt-6">
            <p className="text-slate-500 text-sm font-medium">Осталось</p>
            <p className="font-display font-black text-5xl text-black">{ev.daysLeft === 0 ? 'Сегодня!' : `${ev.daysLeft} ${pluralDays(ev.daysLeft)}`}</p>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <div className="text-[130px] leading-none animate-float select-none">{ev.emoji}</div>
          </div>

          <div className="mb-6">
            <p className="text-sm text-slate-500 font-medium mb-3">Участники:</p>
            <div className="flex gap-2">
              {ev.participants.map((p, i) => (
                <div key={i} className="w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-sm border-2 border-white" style={{ background: EVENTS[i % EVENTS.length].color }}>
                  {p}
                </div>
              ))}
            </div>
          </div>

          <button className="w-full py-4 rounded-2xl text-white font-display font-bold text-lg shadow-lg active:scale-95 transition-transform" style={{ background: ev.color }}>
            Спланировать
          </button>
        </div>
      </Phone>
    );
  }

  /* ── GAME INTRO ── */
  if (screen === 'gameIntro')
    return (
      <Phone>
        <div className="relative h-full flex flex-col px-7 pt-14 pb-10">
          <BackBtn onClick={() => go('home')} />
          <div className="flex-1 flex flex-col">
            <img
              src="https://cdn.poehali.dev/projects/e26efa0e-ff06-4c5c-aeb7-cd3c5b6a21c0/bucket/f8763ba7-7557-4ec1-af52-be8a1cd30862.png"
              alt="Игра Не все дома"
              className="w-full flex-1 object-contain object-center mt-2"
            />
          </div>
          <button onClick={() => { setCardIndex(0); go('gamePlay'); }} className="w-full py-4 rounded-2xl bg-brand-blue text-white font-display font-bold text-lg shadow-lg active:scale-95 transition-transform mt-4">
            Собрать игроков
          </button>
        </div>
      </Phone>
    );

  /* ── GAME PLAY ── */
  if (screen === 'gamePlay') {
    const total = 120;

    return (
      <Phone>
        <div className="flex flex-col h-full bg-white">
          {/* шапка */}
          <div className="px-6 pt-14 pb-3">
            <p className="text-xs text-slate-400 font-medium">{cardIndex + 1} из {total}</p>
            <h1 className="font-display font-black text-2xl text-black mt-0.5">Карточная игра</h1>
            {/* прогресс-бар: тонкие сегменты */}
            <div className="flex gap-[3px] mt-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="h-[3px] flex-1 rounded-full transition-all"
                  style={{ background: i === 0 ? '#4FC3E8' : '#E2E8F0' }}
                />
              ))}
            </div>
          </div>

          {/* карточка */}
          <div className="flex-1 px-5 flex flex-col">
            <div className="flex-1 bg-slate-50 rounded-3xl overflow-hidden flex flex-col shadow-sm border border-slate-100">
              {/* картинка-карточка с персонажем */}
              <img
                src="https://cdn.poehali.dev/projects/e26efa0e-ff06-4c5c-aeb7-cd3c5b6a21c0/bucket/9fa3ff89-9964-4a30-ac84-cb4b4690058e.jpg"
                alt="Карточка"
                className="w-full flex-1 object-cover object-top"
              />
            </div>
            {/* подпись под карточкой */}
            <p className="text-center text-slate-500 text-base font-medium mt-4 mb-2">Подумай и ответь!</p>
          </div>

          {/* кнопки */}
          <div className="px-5 pb-6 pt-2">
            <div className="flex gap-3 items-center">
              <button
                onClick={() => setCardIndex(Math.max(0, cardIndex - 1))}
                className="flex-1 py-4 rounded-2xl bg-slate-100 text-slate-700 font-display font-bold text-base active:scale-95 transition-transform"
              >
                Назад
              </button>
              <button
                onClick={() => setFlipped(!flipped)}
                className="w-14 h-14 rounded-2xl flex items-center justify-center active:scale-90 transition-transform shadow-md shrink-0"
                style={{ background: '#4FC3E8' }}
              >
                <Icon name="RefreshCw" size={22} className="text-white" />
              </button>
              <button
                onClick={() => {
                  if (cardIndex < CARDS.length - 1) setCardIndex(cardIndex + 1);
                  else go('gameIntro');
                }}
                className="flex-1 py-4 rounded-2xl text-white font-display font-bold text-base active:scale-95 transition-transform shadow-md"
                style={{ background: '#E63946' }}
              >
                Далее
              </button>
            </div>
          </div>

          <BottomNav active="cards" onNav={go} />
        </div>
      </Phone>
    );
  }

  /* ── PROFILE ── */
  if (screen === 'profile')
    return (
      <Phone>
        <div className="px-6 pt-16 pb-28">
          <BackBtn onClick={() => go('home')} />
          <h1 className="font-display font-black text-4xl leading-[0.95] text-black mt-5">Профиль<br />семьи</h1>

          <p className="mt-6 text-xs font-bold tracking-widest text-slate-400 uppercase">Мой статус</p>
          <div className="grid grid-cols-3 gap-2 mt-3">
            {STATUSES.map(s => {
              const active = status === s.id;
              return (
                <button key={s.id} onClick={() => setStatus(s.id)}
                  className="rounded-2xl py-4 flex flex-col items-center gap-1.5 transition-all active:scale-95"
                  style={{ background: active ? s.color : '#F1F5F9', color: active ? '#fff' : '#64748B' }}>
                  <Icon name={s.icon} size={24} />
                  <span className="text-xs font-semibold">{s.label}</span>
                </button>
              );
            })}
          </div>

          <p className="mt-7 text-xs font-bold tracking-widest text-slate-400 uppercase">Кто где сейчас</p>
          <div className="mt-3 bg-slate-100 rounded-3xl p-4 space-y-3">
            {FAMILY.map(f => {
              const st = STATUSES.find(s => s.id === f.status)!;
              return (
                <div key={f.name} className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-xl shadow-sm">{f.avatar}</div>
                  <span className="font-semibold text-slate-700 flex-1">{f.name}</span>
                  <span className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full" style={{ background: st.color + '22', color: st.color }}>
                    <Icon name={st.icon} size={13} />
                    {st.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <BottomNav active="profile" onNav={go} />
      </Phone>
    );

  return null;
}

/* ─── вспомогательные компоненты ────────────────────── */
const Tile = ({ color, icon, title, sub, onClick }: { color: string; icon: string; title: string; sub: string; onClick?: () => void }) => (
  <button onClick={onClick} className="rounded-3xl p-4 h-32 flex flex-col justify-between text-left text-white active:scale-95 transition-transform shadow-md" style={{ background: color }}>
    <Icon name={icon} size={26} />
    <div>
      <p className="font-display font-bold text-lg leading-tight">{title}</p>
      <p className="text-xs text-white/80">{sub}</p>
    </div>
  </button>
);

const Feat = ({ color, text }: { color: string; text: string }) => (
  <div className="flex items-center gap-3 animate-fade-in" style={{ opacity: 0 }}>
    <div className="w-0 h-0 border-y-[7px] border-y-transparent border-l-[12px]" style={{ borderLeftColor: color }} />
    <span className="text-sm font-medium text-slate-700">{text}</span>
  </div>
);

const BackBtn = ({ onClick }: { onClick: () => void }) => (
  <button onClick={onClick} className="w-10 h-10 rounded-full border-2 border-slate-200 flex items-center justify-center active:scale-90 transition-transform">
    <Icon name="ChevronLeft" size={20} />
  </button>
);

const GameCard = ({ rot, x, bg, label, q }: { rot: number; x: number; bg: string; label?: string; q?: boolean }) => (
  <div className="absolute w-24 h-32 rounded-2xl shadow-xl flex items-center justify-center p-2 text-center" style={{ background: bg, transform: `translateX(${x}px) rotate(${rot}deg)` }}>
    {q ? <span className="text-white text-4xl font-display font-black">?</span>
       : <span className="text-white font-display font-black text-[11px] leading-tight">{label || 'НЕ ВСЕ ДОМА'}</span>}
  </div>
);

const BottomNav = ({ active, onNav }: { active: string; onNav: (s: Screen) => void }) => {
  const items = [
    { id: 'home', label: 'Главная', icon: 'House', screen: 'home' as Screen },
    { id: 'mood', label: 'Настроение', icon: 'Heart', screen: 'moodMain' as Screen },
    { id: 'cards', label: 'Карточки', icon: 'Layers', screen: 'gameIntro' as Screen },
    { id: 'events', label: 'События', icon: 'Calendar', screen: 'eventsList' as Screen },
    { id: 'profile', label: 'Профиль', icon: 'Smile', screen: 'profile' as Screen },
  ];
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t border-slate-100 px-2 pt-2 pb-4 flex justify-around">
      {items.map(it => {
        const on = active === it.id;
        return (
          <button key={it.id} onClick={() => onNav(it.screen)} className="flex flex-col items-center gap-0.5 px-1 transition-transform active:scale-90">
            <Icon name={it.icon} size={20} className={on ? 'text-black' : 'text-slate-400'} />
            <span className={`text-[10px] ${on ? 'text-black font-bold' : 'text-slate-400'}`}>{it.label}</span>
          </button>
        );
      })}
    </div>
  );
};

function pluralDays(n: number) {
  if (n === 0) return '';
  if (n % 10 === 1 && n % 100 !== 11) return 'день';
  if ([2,3,4].includes(n % 10) && ![12,13,14].includes(n % 100)) return 'дня';
  return 'дней';
}