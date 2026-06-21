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
  { img: 'https://cdn.poehali.dev/projects/e26efa0e-ff06-4c5c-aeb7-cd3c5b6a21c0/bucket/dcac866a-0361-403c-b746-71f7b93119ed.png', bg: '#C9A8DA', label: 'Спокойно' },
  { img: 'https://cdn.poehali.dev/projects/e26efa0e-ff06-4c5c-aeb7-cd3c5b6a21c0/bucket/fc62ad77-0e69-4309-a1fe-7397548c8de5.png', bg: '#F4922B', label: 'Хорошо' },
  { img: 'https://cdn.poehali.dev/projects/e26efa0e-ff06-4c5c-aeb7-cd3c5b6a21c0/bucket/55f54fb9-01da-4808-8eb5-a32ed662fb91.png', bg: '#4FC3E8', label: 'Грустно' },
  { img: 'https://cdn.poehali.dev/projects/e26efa0e-ff06-4c5c-aeb7-cd3c5b6a21c0/bucket/91156170-b25c-46dd-a90d-49a75f5678f2.png', bg: '#E63946', label: 'Злюсь' },
];

const STATUSES = [
  { id: 'home',    label: 'Дома',        icon: 'House' },
  { id: 'work',    label: 'На работе',   icon: 'Briefcase' },
  { id: 'school',  label: 'В школе',     icon: 'GraduationCap' },
  { id: 'outside', label: 'На прогулке', icon: 'TreePine' },
];

/* Глеб=голубой, Мама=оранжевая, Соня=фиолетовая, Папа=красный */
const FAMILY = [
  { name: 'Глеб', img: 'https://cdn.poehali.dev/projects/e26efa0e-ff06-4c5c-aeb7-cd3c5b6a21c0/bucket/730da574-7b26-4e12-9a3c-64fb67a4b60b.png', status: 'home',   avatarColor: '#4FC3E8' },
  { name: 'Мама', img: 'https://cdn.poehali.dev/projects/e26efa0e-ff06-4c5c-aeb7-cd3c5b6a21c0/bucket/e6bc4399-bf4e-49e0-84c9-1a5eac07e3db.png', status: 'home',   avatarColor: '#F4922B' },
  { name: 'Соня', img: 'https://cdn.poehali.dev/projects/e26efa0e-ff06-4c5c-aeb7-cd3c5b6a21c0/bucket/138c1eb7-1eda-43c6-9790-173d1058ed63.png', status: 'school', avatarColor: '#C9A8DA' },
  { name: 'Папа', img: 'https://cdn.poehali.dev/projects/e26efa0e-ff06-4c5c-aeb7-cd3c5b6a21c0/bucket/7865ce3f-e2ae-4a60-b951-48f23dfe2292.png', status: 'work',   avatarColor: '#E63946' },
];

const EVENTS = [
  { id: 0, title: 'Вечер кино',         date: '22 мар', sub: 'сегодня',       daysLeft: 0,  color: '#4FC3E8', emoji: '🎬', participants: [0,1,2,3] },
  { id: 1, title: 'День рождения папы', date: '27 мар', sub: 'через 5 дней',  daysLeft: 5,  color: '#F4922B', emoji: '🎂', participants: [0,1,2,3] },
  { id: 2, title: 'Пикник на природе',  date: '5 апр',  sub: 'через 14 дней', daysLeft: 14, color: '#E63946', emoji: '🌿', participants: [0,1,2,3] },
  { id: 3, title: 'Поездка на море',    date: '12 апр', sub: 'через 20 дней', daysLeft: 20, color: '#C9A8DA', emoji: '🏖️', participants: [0,1,2,3] },
];

const CARDS = [
  { type: 'ОТГАДАЙКА', question: 'Переведите с английского слово «Skateboard»' },
  { type: 'СИТУАЦИЯ', question: 'Что бы вы сделали, если бы нашли 1000 рублей на улице?' },
  { type: 'ВОПРОС', question: 'Какой твой самый яркий семейный момент?' },
  { type: 'ЗАДАНИЕ', question: 'Изобрази любимое блюдо без слов — остальные угадывают!' },
  { type: 'ОТГАДАЙКА', question: 'Как называется страна, где родился Карлсон?' },
  { type: 'ВОПРОС', question: 'Если бы ты мог стать животным на один день — кем?' },
];

/* ─── составные аватары: контуры (PNG с прозрачным фоном) ── */
const AVATAR_FACES = [
  { id: 'smile',   img: 'https://cdn.poehali.dev/projects/e26efa0e-ff06-4c5c-aeb7-cd3c5b6a21c0/bucket/d26ff1fe-c835-4cc5-9e88-c0d6c01ee803.png', label: 'Радость' },
  { id: 'skate',   img: 'https://cdn.poehali.dev/projects/e26efa0e-ff06-4c5c-aeb7-cd3c5b6a21c0/bucket/872375e9-4ab1-489f-bde0-1e2a4a293d23.png', label: 'Скейт' },
  { id: 'wow',     img: 'https://cdn.poehali.dev/projects/e26efa0e-ff06-4c5c-aeb7-cd3c5b6a21c0/bucket/e353cf4a-6d50-4388-975b-8a3c2ba55275.png', label: 'Удивление' },
  { id: 'happy',   img: 'https://cdn.poehali.dev/projects/e26efa0e-ff06-4c5c-aeb7-cd3c5b6a21c0/bucket/48d1ef12-c3a6-4741-adda-8a5451e03dcc.png', label: 'Смех' },
  { id: 'angry',   img: 'https://cdn.poehali.dev/projects/e26efa0e-ff06-4c5c-aeb7-cd3c5b6a21c0/bucket/41aaac28-aee6-4f31-9b1e-8cce6d6354f8.png', label: 'Дерзость' },
];

const AVATAR_COLORS = [
  { id: 'blue',   color: '#4FC3E8', label: 'Голубой' },
  { id: 'orange', color: '#F4922B', label: 'Оранжевый' },
  { id: 'purple', color: '#C9A8DA', label: 'Фиолетовый' },
  { id: 'red',    color: '#E63946', label: 'Красный' },
];

/* Составной аватар: цветной круг + контур поверх */
const CompositeAvatar = ({ faceIdx, colorIdx, size = 48 }: { faceIdx: number; colorIdx: number; size?: number }) => (
  <div style={{ width: size, height: size, borderRadius: '50%', background: AVATAR_COLORS[colorIdx].color, position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
    <img
      src={AVATAR_FACES[faceIdx].img}
      alt=""
      style={{ position: 'absolute', inset: '8%', width: '84%', height: '84%', objectFit: 'contain' }}
    />
  </div>
);

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

/* ─── фирменный аватар члена семьи ──────────────────── */
const FamilyAvatar = ({ idx, size = 44 }: { idx: number; size?: number }) => (
  <div style={{ width: size, height: size, borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
    <img src={FAMILY[idx].img} alt={FAMILY[idx].name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
  const [selectedEvent, setSelectedEvent] = useState(0);
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  // Редактируемые события
  const [events, setEvents] = useState(EVENTS);
  const [showEventForm, setShowEventForm] = useState(false);
  const [editingEventIdx, setEditingEventIdx] = useState<number | null>(null);
  const EVENT_COLORS = ['#4FC3E8','#F4922B','#E63946','#C9A8DA'];
  const [formTitle, setFormTitle] = useState('');
  const [formDate, setFormDate] = useState('');
  const [formColor, setFormColor] = useState(0);

  const [formParticipants, setFormParticipants] = useState<number[]>([0,1,2,3]);

  const toggleParticipant = (idx: number) =>
    setFormParticipants(prev => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]);

  const openNewEvent = () => {
    setFormTitle(''); setFormDate(''); setFormColor(0); setFormParticipants([0,1,2,3]);
    setEditingEventIdx(null); setShowEventForm(true);
  };
  const openEditEvent = (idx: number) => {
    const ev = events[idx];
    setFormTitle(ev.title); setFormDate(ev.date);
    setFormColor(EVENT_COLORS.indexOf(ev.color) >= 0 ? EVENT_COLORS.indexOf(ev.color) : 0);
    setFormParticipants([...ev.participants]);
    setEditingEventIdx(idx); setShowEventForm(true);
  };
  const saveEvent = () => {
    if (!formTitle.trim()) return;
    const color = EVENT_COLORS[formColor] ?? '#4FC3E8';
    if (editingEventIdx !== null) {
      setEvents(prev => prev.map((e,i) => i === editingEventIdx ? { ...e, title: formTitle, date: formDate || e.date, color, participants: formParticipants } : e));
    } else {
      setEvents(prev => [...prev, { id: prev.length, title: formTitle, date: formDate || 'скоро', sub: '', daysLeft: 0, color, emoji: '🎉', participants: formParticipants }]);
    }
    setShowEventForm(false);
  };
  const deleteEvent = (idx: number) => {
    setEvents(prev => prev.filter((_,i) => i !== idx));
    setShowEventForm(false);
  };

  // Профиль пользователя (Глеб)
  const [myName, setMyName] = useState('Глеб');
  const [myFaceIdx, setMyFaceIdx] = useState(0);
  const [myColorIdx, setMyColorIdx] = useState(0);
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState('Глеб');
  const [avatarStep, setAvatarStep] = useState<'face' | 'color' | null>(null);
  const [showInvite, setShowInvite] = useState(false);
  const INVITE_CODE = 'NVD-2026-СЕМЬЯ';
  const [showFamilyMoods, setShowFamilyMoods] = useState(false);

  // Демо-настроения других членов семьи за сегодня
  const FAMILY_MOODS_TODAY = [
    { memberIdx: 1, moodIdx: 1 }, // Мама — хорошо
    { memberIdx: 2, moodIdx: 0 }, // Соня — спокойно
    { memberIdx: 3, moodIdx: 3 }, // Папа — злится
  ];

  // Календарь настроений
  const [calMonth, setCalMonth] = useState(1); // 0=январь … 11=декабрь (начинаем с февраля=1)
  const [calYear, setCalYear] = useState(2026);
  // dayMoods: ключ "год-месяц-день" → индекс MOODS
  const [dayMoods, setDayMoods] = useState<Record<string, number>>(() => {
    // заполним февраль демо-данными
    const init: Record<string, number> = {};
    for (let d = 1; d <= 28; d++) init[`2026-1-${d}`] = d % 4;
    return init;
  });
  const [pickingDay, setPickingDay] = useState<number | null>(null); // день, для которого выбираем настроение

  const go = (s: Screen) => { setScreen(s); setFlipped(false); };

  const MONTHS = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
  const prevMonth = () => { if (calMonth === 0) { setCalMonth(11); setCalYear(y => y-1); } else setCalMonth(m => m-1); };
  const nextMonth = () => { if (calMonth === 11) { setCalMonth(0); setCalYear(y => y+1); } else setCalMonth(m => m+1); };
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  // день недели первого числа (пн=0)
  const firstDow = (new Date(calYear, calMonth, 1).getDay() + 6) % 7;
  const moodKey = (d: number) => `${calYear}-${calMonth}-${d}`;
  const setDayMood = (d: number, mIdx: number) => {
    setDayMoods(prev => ({ ...prev, [moodKey(d)]: mIdx }));
    setPickingDay(null);
  };
  const today = new Date();
  const isToday = (d: number) => today.getFullYear() === calYear && today.getMonth() === calMonth && today.getDate() === d;

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
        <div className="relative h-full flex flex-col px-7 pt-14 pb-10">
          <BackBtn onClick={() => go('home')} />

          <h1 className="font-display font-black text-[28px] leading-tight text-black mt-5 animate-fade-in">Трекер<br />настроений</h1>
          <p className="mt-2 text-slate-400 text-sm leading-snug animate-fade-in" style={{ animationDelay: '0.1s', opacity: 0 }}>
            Отмечайте настроение каждый день<br />и следите за эмоциональной<br />атмосферой в семье.
          </p>

          {/* Картинка по центру */}
          <div className="flex-1 flex items-center justify-center py-4 animate-scale-in" style={{ animationDelay: '0.15s', opacity: 0 }}>
            <img
              src="https://cdn.poehali.dev/projects/e26efa0e-ff06-4c5c-aeb7-cd3c5b6a21c0/bucket/1662741b-084a-407b-b57a-6709bfb9311c.png"
              alt="Настроения"
              className="w-full max-w-[300px] object-contain"
            />
          </div>

          {/* Три пункта */}
          <div className="space-y-4 mb-8">
            <Feat color="#4FC3E8" text="Статистика по дням и неделям" />
            <Feat color="#C9A8DA" text="Видно настроение каждого" />
            <Feat color="#F4922B" text="Поддержка близких" />
          </div>

          <button onClick={() => go('moodMain')} className="w-full py-4 rounded-2xl bg-brand-orange text-white font-display font-bold text-lg shadow-lg active:scale-95 transition-transform animate-fade-in" style={{ animationDelay: '0.3s', opacity: 0 }}>
            Начать отслеживать
          </button>
        </div>
      </Phone>
    );

  /* ── MOOD MAIN ── */
  if (screen === 'moodMain') {
    return (
      <Phone>
        <div className="px-5 pt-16 pb-28">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase animate-fade-in">Семья</p>
              <h1 className="font-display font-black text-3xl leading-tight text-black mt-1 animate-fade-in">Календарь<br />настроений</h1>
            </div>
            {/* Кнопка «Настроение семьи» */}
            <button
              onClick={() => setShowFamilyMoods(true)}
              className="flex flex-col items-center gap-1 mt-1 active:scale-90 transition-transform animate-fade-in"
            >
              <div className="flex -space-x-2">
                {FAMILY_MOODS_TODAY.map((fm, i) => (
                  <div key={i} className="w-8 h-8 rounded-full overflow-hidden border-2 border-white">
                    <FamilyAvatar idx={fm.memberIdx} size={32} />
                  </div>
                ))}
              </div>
              <span className="text-[10px] font-bold text-slate-400">Семья</span>
            </button>
          </div>

          {/* Календарь */}
          <div className="mt-4 bg-slate-100 rounded-3xl p-3 animate-scale-in">
            {/* Навигация по месяцам */}
            <div className="flex items-center justify-between mb-3 px-1">
              <button onClick={prevMonth} className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm active:scale-90 transition-transform">
                <Icon name="ChevronLeft" size={18} />
              </button>
              <span className="font-display font-bold text-base">{MONTHS[calMonth]} {calYear}</span>
              <button onClick={nextMonth} className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm active:scale-90 transition-transform">
                <Icon name="ChevronRight" size={18} />
              </button>
            </div>

            {/* Дни недели */}
            <div className="grid grid-cols-7 text-center text-[10px] text-slate-400 font-bold mb-1">
              {['ПН','ВТ','СР','ЧТ','ПТ','СБ','ВС'].map(d => <span key={d}>{d}</span>)}
            </div>

            {/* Дни */}
            <div className="grid grid-cols-7 gap-[3px]">
              {Array.from({ length: firstDow }).map((_, i) => <div key={`e${i}`} />)}
              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(d => {
                const mIdx = dayMoods[moodKey(d)];
                const mood = mIdx !== undefined ? MOODS[mIdx] : null;
                const isTod = isToday(d);
                const isPicking = pickingDay === d;
                return (
                  <button
                    key={d}
                    onClick={() => setPickingDay(isPicking ? null : d)}
                    onDoubleClick={() => {
                      setDayMoods(prev => { const n = { ...prev }; delete n[moodKey(d)]; return n; });
                      setPickingDay(null);
                    }}
                    className="flex flex-col items-center justify-center py-[3px] rounded-xl transition-transform active:scale-90"
                    style={{
                      background: isPicking ? '#1e293b' : isTod ? '#e0f2fe' : 'transparent',
                    }}
                  >
                    {/* число */}
                    <span className="text-[10px] font-bold leading-none" style={{ color: isPicking ? '#fff' : isTod ? '#0369a1' : '#475569' }}>
                      {d}
                    </span>
                    {/* иконка настроения или пустой кружок */}
                    <div className="w-[22px] h-[22px] mt-[2px] rounded-full overflow-hidden flex items-center justify-center" style={{ background: mood ? 'transparent' : '#cbd5e1' }}>
                      {mood && <img src={mood.img} alt={mood.label} className="w-full h-full object-cover" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Выбор настроения */}
          <div className="mt-3 bg-slate-100 rounded-3xl p-4 animate-fade-in" style={{ animationDelay: '0.15s', opacity: 0 }}>
            <p className="font-display font-bold text-base text-black text-center">
              {pickingDay ? `${pickingDay} ${MONTHS[calMonth].toLowerCase()}` : 'Сегодня'}
            </p>
            <p className="text-sm text-slate-500 text-center mb-3">Как ты себя чувствуешь?</p>
            <div className="flex justify-between gap-2">
              {MOODS.map((m, i) => {
                const currentMIdx = pickingDay ? dayMoods[moodKey(pickingDay)] : dayMoods[moodKey(today.getDate())];
                const isActive = currentMIdx === i;
                return (
                  <button
                    key={i}
                    onClick={() => setDayMood(pickingDay ?? today.getDate(), i)}
                    className="flex-1 aspect-square rounded-full overflow-hidden transition-all active:scale-90"
                    style={{
                      outline: isActive ? '3px solid #000' : 'none',
                      outlineOffset: '2px',
                      transform: isActive ? 'scale(1.08)' : 'scale(1)',
                    }}
                  >
                    <img src={m.img} alt={m.label} className="w-full h-full object-cover" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        {/* ── Всплывашка настроений семьи ── */}
        {showFamilyMoods && (
          <div className="absolute inset-0 bg-black/40 z-40 flex items-end" onClick={() => setShowFamilyMoods(false)}>
            <div className="w-full bg-white rounded-t-3xl px-6 pt-5 pb-10 animate-fade-in" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="font-display font-black text-xl text-black">Настроение семьи</p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {pickingDay ? `${pickingDay} ${MONTHS[calMonth].toLowerCase()}` : 'Сегодня'}
                  </p>
                </div>
                <button onClick={() => setShowFamilyMoods(false)} className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center active:scale-90">
                  <Icon name="X" size={18} className="text-slate-600" />
                </button>
              </div>

              <div className="space-y-4">
                {FAMILY_MOODS_TODAY.map((fm, i) => {
                  const member = FAMILY[fm.memberIdx];
                  const mood = MOODS[fm.moodIdx];
                  return (
                    <div key={i} className="flex items-center gap-4">
                      <FamilyAvatar idx={fm.memberIdx} size={44} />
                      <div className="flex-1">
                        <p className="font-bold text-slate-800 text-sm">{member.name}</p>
                        <p className="text-xs text-slate-400">{mood.label}</p>
                      </div>
                      <div className="w-12 h-12 rounded-full overflow-hidden" style={{ background: mood.bg }}>
                        <img src={mood.img} alt={mood.label} className="w-full h-full object-cover" />
                      </div>
                    </div>
                  );
                })}

                {/* Глеб (текущий пользователь) */}
                {(() => {
                  const myMoodIdx = dayMoods[moodKey(pickingDay ?? today.getDate())];
                  const myMood = myMoodIdx !== undefined ? MOODS[myMoodIdx] : null;
                  return (
                    <div className="flex items-center gap-4">
                      <CompositeAvatar faceIdx={myFaceIdx} colorIdx={myColorIdx} size={44} />
                      <div className="flex-1">
                        <p className="font-bold text-slate-800 text-sm">{myName} <span className="text-slate-400 font-normal">(я)</span></p>
                        <p className="text-xs text-slate-400">{myMood ? myMood.label : 'Не отмечено'}</p>
                      </div>
                      {myMood ? (
                        <div className="w-12 h-12 rounded-full overflow-hidden" style={{ background: myMood.bg }}>
                          <img src={myMood.img} alt={myMood.label} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                          <Icon name="Minus" size={18} className="text-slate-300" />
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        )}

        <BottomNav active="mood" onNav={go} />
      </Phone>
    );
  }

  /* ── EVENTS INTRO (вступительный экран событий) ── */
  if (screen === 'eventsIntro') {
    const nextEvent = EVENTS[1]; // ближайшее событие — День рождения папы
    return (
      <Phone>
        <div className="relative h-full flex flex-col px-7 pt-14 pb-10">
          <BackBtn onClick={() => go('home')} />

          {/* Заголовок — ближайшее событие */}
          <h1 className="font-display font-black text-[28px] leading-tight text-black mt-5">{nextEvent.title}</h1>
          <p className="mt-1 text-slate-400 text-sm">{nextEvent.date}</p>

          <div className="mt-4">
            <p className="text-slate-500 text-sm font-medium">Осталось</p>
            <p className="font-display font-black text-5xl text-black">{nextEvent.daysLeft} {pluralDays(nextEvent.daysLeft)}</p>
          </div>

          {/* Картинка по центру */}
          <div className="flex-1 flex items-center justify-center py-2">
            <img
              src="https://cdn.poehali.dev/projects/e26efa0e-ff06-4c5c-aeb7-cd3c5b6a21c0/bucket/022bebea-1d37-4424-8ef8-a93a0279fda5.png"
              alt="День рождения"
              className="w-full max-w-[240px] object-contain"
            />
          </div>

          {/* Участники */}
          <div className="mb-6">
            <p className="text-sm text-slate-500 font-medium mb-3">Участники:</p>
            <div className="flex gap-2">
              {[0,1,2,3].map(idx => (
                <FamilyAvatar key={idx} idx={idx} size={48} />
              ))}
            </div>
          </div>

          <button onClick={() => go('eventsList')} className="w-full py-4 rounded-2xl font-display font-bold text-lg shadow-lg active:scale-95 transition-transform text-white" style={{ background: nextEvent.color }}>
            Спланировать
          </button>
        </div>
      </Phone>
    );
  }

  /* ── EVENTS LIST ── */
  if (screen === 'eventsList')
    return (
      <Phone>
        <div className="px-5 pt-16 pb-28 overflow-y-auto">
          {/* Шапка */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase">Семья</p>
              <h1 className="font-display font-black text-3xl leading-tight text-black mt-0.5">Календарь<br />событий</h1>
            </div>
            <button onClick={openNewEvent} className="w-11 h-11 rounded-2xl bg-brand-blue flex items-center justify-center shadow-md active:scale-90 transition-transform mt-1">
              <Icon name="Plus" size={22} className="text-white" />
            </button>
          </div>

          {/* Timeline */}
          <div className="relative">

            <div className="space-y-3">
              {events.map((ev, idx) => (
                <div key={ev.id} className="flex gap-0">
                  {/* Левая колонка: кружок + дата */}
                  <div className="flex flex-col items-center shrink-0 w-[58px] relative z-10 pt-3">
                    <div className="w-[18px] h-[18px] rounded-full border-[3px] bg-white mb-1" style={{ borderColor: ev.color }} />
                    <span className="font-display font-black text-[17px] leading-none text-black">{ev.date.split(' ')[0]}</span>
                    <span className="text-[11px] text-slate-500 font-medium leading-tight">{ev.date.split(' ')[1]}</span>
                    <span className="text-[10px] text-slate-400 leading-tight text-center mt-0.5">{ev.sub}</span>
                  </div>

                  {/* Правая колонка: карточка */}
                  <div className="flex-1 flex items-start gap-2 pt-1">
                    <button
                      onClick={() => { setSelectedEvent(idx); go('eventDetail'); }}
                      className="flex-1 rounded-2xl px-4 py-[14px] text-left text-white font-display font-bold text-[16px] leading-snug shadow-sm active:scale-[0.98] transition-transform"
                      style={{ background: ev.color, minHeight: 64 }}
                    >
                      {ev.title}
                    </button>
                    <button
                      onClick={() => openEditEvent(idx)}
                      className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center active:scale-90 transition-transform mt-1 shrink-0"
                    >
                      <Icon name="Pencil" size={13} className="text-slate-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Всплывашка создания/редактирования ── */}
        {showEventForm && (
          <div className="absolute inset-0 bg-black/40 z-40 flex items-end" onClick={() => setShowEventForm(false)}>
            <div className="w-full bg-white rounded-t-3xl px-6 pt-5 pb-10 animate-fade-in overflow-y-auto max-h-[90%]" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <p className="font-display font-black text-xl text-black">
                  {editingEventIdx !== null ? 'Редактировать' : 'Новое событие'}
                </p>
                <button onClick={() => setShowEventForm(false)} className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center active:scale-90">
                  <Icon name="X" size={18} className="text-slate-600" />
                </button>
              </div>

              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Название</p>
              <input value={formTitle} onChange={e => setFormTitle(e.target.value)} placeholder="Например: Пикник в парке"
                className="w-full border-2 border-slate-200 rounded-2xl px-4 py-3 font-body text-base text-black outline-none focus:border-brand-blue mb-3" maxLength={40} />

              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Дата</p>
              <input value={formDate} onChange={e => setFormDate(e.target.value)} placeholder="Например: 15 мая"
                className="w-full border-2 border-slate-200 rounded-2xl px-4 py-3 font-body text-base text-black outline-none focus:border-brand-blue mb-3" />

              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Цвет</p>
              <div className="flex gap-3 mb-4">
                {EVENT_COLORS.map((c, i) => (
                  <button key={c} onClick={() => setFormColor(i)} className="w-10 h-10 rounded-full active:scale-90 transition-all"
                    style={{ background: c, outline: formColor === i ? '3px solid #1e293b' : '3px solid transparent', outlineOffset: '2px' }} />
                ))}
              </div>

              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Участники</p>
              <div className="flex gap-3 mb-5">
                {FAMILY.map((f, i) => {
                  const selected = formParticipants.includes(i);
                  return (
                    <button key={f.name} onClick={() => toggleParticipant(i)}
                      className="relative active:scale-90 transition-all"
                      style={{ opacity: selected ? 1 : 0.35 }}>
                      <FamilyAvatar idx={i} size={44} />
                      {selected && (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-brand-blue border-2 border-white flex items-center justify-center">
                          <Icon name="Check" size={10} className="text-white" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              <button onClick={saveEvent} className="w-full py-4 rounded-2xl text-white font-display font-bold text-lg active:scale-95 transition-transform mb-3"
                style={{ background: EVENT_COLORS[formColor] }}>
                {editingEventIdx !== null ? 'Сохранить' : 'Создать событие'}
              </button>
              {editingEventIdx !== null && (
                <button onClick={() => deleteEvent(editingEventIdx)}
                  className="w-full py-3 rounded-2xl bg-slate-100 text-slate-500 font-display font-bold text-base active:scale-95 transition-transform">
                  Удалить событие
                </button>
              )}
            </div>
          </div>
        )}

        <BottomNav active="events" onNav={go} />
      </Phone>
    );

  /* ── EVENT DETAIL ── */
  if (screen === 'eventDetail') {
    const ev = events[selectedEvent] ?? events[0];
    return (
      <Phone>
        <div className="relative h-full flex flex-col px-7 pt-16 pb-10">
          <div className="flex items-center justify-between">
            <BackBtn onClick={() => go('eventsList')} />
            <button onClick={() => openEditEvent(selectedEvent)} className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center active:scale-90 transition-transform">
              <Icon name="Pencil" size={16} className="text-slate-500" />
            </button>
          </div>
          <h1 className="font-display font-black text-3xl leading-[1.05] text-black mt-4">{ev.title}</h1>
          <p className="text-slate-400 text-sm mt-1">{ev.date}</p>

          {/* всплывашка формы внутри детали */}
          {showEventForm && (
            <div className="absolute inset-0 bg-black/40 z-40 flex items-end rounded-[38px] overflow-hidden" onClick={() => setShowEventForm(false)}>
              <div className="w-full bg-white rounded-t-3xl p-6 pb-10 animate-fade-in" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-4">
                  <p className="font-display font-black text-xl text-black">Редактировать</p>
                  <button onClick={() => setShowEventForm(false)} className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center active:scale-90"><Icon name="X" size={18} className="text-slate-600" /></button>
                </div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Название</p>
                <input value={formTitle} onChange={e => setFormTitle(e.target.value)} className="w-full border-2 border-slate-200 rounded-2xl px-4 py-3 font-body text-base text-black outline-none focus:border-brand-blue mb-4" maxLength={40} />
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Дата</p>
                <input value={formDate} onChange={e => setFormDate(e.target.value)} placeholder="Например: 15 мая" className="w-full border-2 border-slate-200 rounded-2xl px-4 py-3 font-body text-base text-black outline-none focus:border-brand-blue mb-4" />
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Цвет</p>
                <div className="flex gap-3 mb-6">{EVENT_COLORS.map((c,i) => <button key={c} onClick={() => setFormColor(i)} className="w-10 h-10 rounded-full active:scale-90" style={{ background: c, outline: formColor===i?'3px solid #1e293b':'3px solid transparent', outlineOffset:'2px' }} />)}</div>
                <button onClick={saveEvent} className="w-full py-4 rounded-2xl text-white font-display font-bold text-lg active:scale-95 mb-3" style={{ background: EVENT_COLORS[formColor] }}>Сохранить</button>
                <button onClick={() => { deleteEvent(selectedEvent); go('eventsList'); }} className="w-full py-3 rounded-2xl bg-slate-100 text-slate-500 font-display font-bold text-base active:scale-95">Удалить событие</button>
              </div>
            </div>
          )}

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
              {ev.participants.map((memberIdx, i) => (
                <FamilyAvatar key={i} idx={memberIdx} size={48} />
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

          <h1 className="font-display font-black text-[28px] leading-tight text-black mt-5 animate-fade-in">Игра<br />«Не все дома»</h1>
          <p className="mt-2 text-slate-400 text-sm leading-snug animate-fade-in" style={{ animationDelay: '0.1s', opacity: 0 }}>
            Игра для семьи, которая сближает,<br />веселит и помогает узнать друг друга<br />ещё лучше.
          </p>

          {/* Картинка по центру */}
          <div className="flex-1 flex items-center justify-center py-4 animate-scale-in" style={{ animationDelay: '0.15s', opacity: 0 }}>
            <img
              src="https://cdn.poehali.dev/projects/e26efa0e-ff06-4c5c-aeb7-cd3c5b6a21c0/bucket/16187e64-1865-4873-a59f-3722dec9aeec.png"
              alt="Карточки игры"
              className="w-full max-w-[300px] object-contain"
            />
          </div>

          {/* Три пункта */}
          <div className="space-y-4 mb-8">
            <Feat color="#4FC3E8" text="Более 120 обновляющихся карточек" />
            <Feat color="#C9A8DA" text="От 11 лет" />
            <Feat color="#F4922B" text="Смех и яркие моменты" />
          </div>

          <button onClick={() => { setCardIndex(0); go('gamePlay'); }} className="w-full py-4 rounded-2xl bg-brand-blue text-white font-display font-bold text-lg shadow-lg active:scale-95 transition-transform">
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
        <div className="px-6 pt-14 pb-28 overflow-y-auto">
          <BackBtn onClick={() => go('home')} />
          <h1 className="font-display font-black text-3xl leading-tight text-black mt-4">Мой профиль</h1>

          {/* ── Превью аватара + имя ── */}
          <div className="mt-4 flex items-center gap-4">
            {/* аватар — клик открывает всплывашку */}
            <button onClick={() => setAvatarStep('face')}
              className="relative active:scale-90 transition-transform shrink-0">
              <CompositeAvatar faceIdx={myFaceIdx} colorIdx={myColorIdx} size={72} />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full border border-slate-200 shadow flex items-center justify-center">
                <Icon name="Pencil" size={11} className="text-slate-500" />
              </div>
            </button>
            <div className="flex-1">
              {editingName ? (
                <div className="flex gap-2 items-center">
                  <input
                    autoFocus
                    value={nameInput}
                    onChange={e => setNameInput(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') { setMyName(nameInput.trim() || myName); setEditingName(false); } }}
                    className="flex-1 border-2 border-brand-blue rounded-xl px-3 py-2 font-display font-bold text-xl text-black outline-none"
                    maxLength={14}
                  />
                  <button onClick={() => { setMyName(nameInput.trim() || myName); setEditingName(false); }}
                    className="w-9 h-9 rounded-xl bg-brand-blue flex items-center justify-center active:scale-90 transition-transform shrink-0">
                    <Icon name="Check" size={16} className="text-white" />
                  </button>
                </div>
              ) : (
                <button onClick={() => { setNameInput(myName); setEditingName(true); }}
                  className="flex items-center gap-2">
                  <span className="font-display font-black text-2xl text-black">{myName}</span>
                  <Icon name="Pencil" size={15} className="text-slate-400" />
                </button>
              )}
              <p className="text-xs text-slate-400 mt-0.5">Нажми на аватар или имя, чтобы изменить</p>
            </div>
          </div>

          {/* ── Мой статус ── */}
          <p className="mt-6 text-xs font-bold tracking-widest text-slate-400 uppercase">Мой статус</p>
          <div className="grid grid-cols-2 gap-2 mt-3">
            {STATUSES.map(s => {
              const active = status === s.id;
              const myColor = AVATAR_COLORS[myColorIdx].color;
              return (
                <button key={s.id} onClick={() => setStatus(s.id)}
                  className="rounded-2xl py-3.5 flex flex-col items-center gap-1.5 transition-all active:scale-95"
                  style={{ background: active ? myColor : '#F1F5F9', color: active ? '#fff' : '#64748B' }}>
                  <Icon name={s.icon} size={22} />
                  <span className="text-xs font-semibold">{s.label}</span>
                </button>
              );
            })}
          </div>

          {/* ── Семья (Глеб первый с составным аватаром, остальные — просмотр) ── */}
          <div className="mt-6 flex items-center justify-between">
            <p className="text-xs font-bold tracking-widest text-slate-400 uppercase">Семья</p>
            <button onClick={() => setShowInvite(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 active:scale-90 transition-transform">
              <Icon name="UserPlus" size={14} className="text-slate-600" />
              <span className="text-xs text-slate-600 font-semibold">Добавить</span>
            </button>
          </div>
          <div className="mt-3 bg-slate-100 rounded-3xl p-4 space-y-3">
            {/* Глеб — текущий пользователь, цвет плашки = цвет его аватара */}
            {(() => {
              const myColor = AVATAR_COLORS[myColorIdx].color;
              const st = STATUSES.find(s => s.id === status)!;
              return (
                <div className="flex items-center gap-3">
                  <CompositeAvatar faceIdx={myFaceIdx} colorIdx={myColorIdx} size={44} />
                  <span className="font-semibold text-slate-700 flex-1">{myName}</span>
                  <span className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full"
                    style={{ background: myColor + '33', color: myColor }}>
                    <Icon name={st?.icon ?? 'House'} size={13} />
                    {st?.label}
                  </span>
                </div>
              );
            })()}
            {/* Остальные — только просмотр, цвет плашки = avatarColor */}
            {FAMILY.slice(1).map((f, i) => {
              const idx = i + 1;
              const st = STATUSES.find(s => s.id === f.status)!;
              return (
                <div key={f.name} className="flex items-center gap-3">
                  <FamilyAvatar idx={idx} size={44} />
                  <span className="font-semibold text-slate-700 flex-1">{f.name}</span>
                  <span className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full"
                    style={{ background: f.avatarColor + '33', color: f.avatarColor }}>
                    <Icon name={st.icon} size={13} />
                    {st.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Всплывашка приглашения ── */}
        {showInvite && (
          <div className="absolute inset-0 bg-black/40 z-40 flex items-end" onClick={() => setShowInvite(false)}>
            <div className="w-full bg-white rounded-t-3xl p-6 pb-10 animate-fade-in" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="font-display font-black text-xl text-black">Пригласи в семью</p>
                  <p className="text-xs text-slate-400 mt-0.5">Покажи QR или поделись кодом</p>
                </div>
                <button onClick={() => setShowInvite(false)} className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center active:scale-90 shrink-0">
                  <Icon name="X" size={18} className="text-slate-600" />
                </button>
              </div>

              {/* QR-код */}
              <div className="flex justify-center mb-5">
                <div className="p-3 bg-white rounded-2xl border-2 border-slate-100 shadow-sm">
                  <img
                    src="https://cdn.poehali.dev/projects/e26efa0e-ff06-4c5c-aeb7-cd3c5b6a21c0/bucket/bc0b948f-ae6f-4d1b-8800-8f057474320b.png"
                    alt="QR-код приглашения"
                    width={160}
                    height={160}
                    className="rounded-lg"
                  />
                </div>
              </div>

              {/* Код */}
              <p className="text-center text-xs text-slate-400 font-medium mb-2">или поделись кодом</p>
              <div className="flex items-center gap-3 bg-slate-100 rounded-2xl px-4 py-3">
                <span className="font-display font-black text-lg text-black tracking-widest flex-1 text-center">{INVITE_CODE}</span>
                <button
                  onClick={() => navigator.clipboard?.writeText(INVITE_CODE)}
                  className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shadow-sm active:scale-90 transition-transform shrink-0">
                  <Icon name="Copy" size={16} className="text-slate-600" />
                </button>
              </div>
              <p className="text-center text-xs text-slate-400 mt-3">Код действует 7 дней</p>
            </div>
          </div>
        )}

        {/* ── Всплывашка редактора аватара ── */}
        {avatarStep !== null && (
          <div className="absolute inset-0 bg-black/40 z-40 flex items-end" onClick={() => setAvatarStep(null)}>
            <div className="w-full bg-white rounded-t-3xl p-5 pb-8 animate-fade-in" onClick={e => e.stopPropagation()}>
              {/* Превью + закрыть */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <CompositeAvatar faceIdx={myFaceIdx} colorIdx={myColorIdx} size={52} />
                  <span className="font-display font-black text-lg text-black">{myName}</span>
                </div>
                <button onClick={() => setAvatarStep(null)} className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center active:scale-90">
                  <Icon name="X" size={18} className="text-slate-600" />
                </button>
              </div>

              {/* Табы */}
              <div className="flex gap-2 mb-4">
                {(['face', 'color'] as const).map(step => (
                  <button key={step} onClick={() => setAvatarStep(step)}
                    className="flex-1 py-2.5 rounded-xl text-sm font-bold transition-all"
                    style={{ background: avatarStep === step ? '#1e293b' : '#F1F5F9', color: avatarStep === step ? '#fff' : '#64748B' }}>
                    {step === 'face' ? 'Эмоция' : 'Цвет'}
                  </button>
                ))}
              </div>

              {avatarStep === 'face' ? (
                <div className="grid grid-cols-5 gap-2">
                  {AVATAR_FACES.map((f, i) => (
                    <button key={f.id} onClick={() => setMyFaceIdx(i)}
                      className="aspect-square rounded-2xl flex items-center justify-center transition-all active:scale-90 overflow-hidden"
                      style={{
                        background: AVATAR_COLORS[myColorIdx].color,
                        outline: myFaceIdx === i ? '3px solid #1e293b' : '3px solid transparent',
                        outlineOffset: '2px',
                      }}>
                      <img src={f.img} alt={f.label} style={{ width: '75%', height: '75%', objectFit: 'contain' }} />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-4 gap-3">
                  {AVATAR_COLORS.map((c, i) => (
                    <button key={c.id} onClick={() => setMyColorIdx(i)}
                      className="aspect-square rounded-2xl flex items-center justify-center transition-all active:scale-90 overflow-hidden"
                      style={{
                        background: c.color,
                        outline: myColorIdx === i ? '3px solid #1e293b' : '3px solid transparent',
                        outlineOffset: '2px',
                      }}>
                      <img src={AVATAR_FACES[myFaceIdx].img} alt="" style={{ width: '75%', height: '75%', objectFit: 'contain' }} />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

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
    { id: 'home',    label: 'Главная',    icon: 'House',     screen: 'home' as Screen },
    { id: 'mood',    label: 'Настроение', icon: 'Heart',     screen: 'moodIntro' as Screen },
    { id: 'cards',   label: 'Карточки',   icon: 'Layers',    screen: 'gameIntro' as Screen },
    { id: 'events',  label: 'События',    icon: 'Calendar',  screen: 'eventsIntro' as Screen },
    { id: 'profile', label: 'Профиль',    icon: 'Smile',     screen: 'profile' as Screen },
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