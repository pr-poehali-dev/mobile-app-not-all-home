import { useState } from 'react';
import Icon from '@/components/ui/icon';

type Screen = 'welcome' | 'home' | 'moodIntro' | 'moodMain' | 'gameIntro' | 'profile';

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

const Phone = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen w-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center p-4 font-body">
    <div className="relative w-full max-w-[380px] h-[780px] bg-white rounded-[44px] shadow-2xl overflow-hidden border-[6px] border-black/90">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black/90 rounded-b-2xl z-50" />
      <div className="w-full h-full overflow-y-auto">{children}</div>
    </div>
  </div>
);

const Blob = ({ color, className }: { color: string; className: string }) => (
  <div className={`absolute rounded-full blur-[1px] ${className}`} style={{ background: color }} />
);

/* Графика приветственного экрана: красный полукруг, гирлянда флажков, синий персонаж */
const WelcomeArt = () => (
  <div className="relative w-full h-[230px] shrink-0 overflow-hidden">
    {/* красный полукруг */}
    <div className="absolute -top-24 right-6 w-56 h-56 rounded-full bg-brand-red" />
    {/* синий персонаж */}
    <div className="absolute top-16 right-3 w-[88px] h-[88px] rounded-full bg-brand-blue flex items-center justify-center animate-float shadow-lg z-10">
      <svg width="56" height="40" viewBox="0 0 56 40" fill="none">
        <circle cx="14" cy="11" r="5" fill="#0E1116" />
        <circle cx="42" cy="11" r="5" fill="#0E1116" />
        <path d="M8 20 Q28 42 48 20" stroke="#0E1116" strokeWidth="6" strokeLinecap="round" fill="none" />
      </svg>
    </div>
    {/* гирлянда из чёрных флажков */}
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

export default function Index() {
  const [screen, setScreen] = useState<Screen>('welcome');
  const [status, setStatus] = useState('home');
  const [todayMood, setTodayMood] = useState<number | null>(null);

  const go = (s: Screen) => setScreen(s);

  /* ---------- WELCOME ---------- */
  if (screen === 'welcome')
    return (
      <Phone>
        <div className="relative h-full flex flex-col">
          <WelcomeArt />

          <div className="relative z-10 flex-1 flex flex-col justify-center px-9 -mt-4">
            <h1 className="font-display font-bold text-[68px] leading-[0.9] tracking-tight text-black animate-fade-in">
              НЕ<br />ВСЕ<br />ДОМА
            </h1>
            <p className="mt-5 text-slate-500 text-base leading-snug animate-fade-in" style={{ animationDelay: '0.15s', opacity: 0 }}>
              место, где семья<br />всегда на одной волне
            </p>
          </div>

          <div className="relative z-10 px-7 pb-10">
            <button
              onClick={() => go('home')}
              className="w-full py-4 rounded-2xl bg-brand-blue text-white font-display font-semibold text-lg tracking-wide shadow-lg active:scale-95 transition-transform"
            >
              Привет, семья!
            </button>
          </div>
        </div>
      </Phone>
    );

  /* ---------- HOME ---------- */
  if (screen === 'home')
    return (
      <Phone>
        <div className="px-6 pt-16 pb-28">
          <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase">Добро пожаловать</p>
          <h1 className="font-display font-bold text-5xl leading-[0.9] text-black mt-1">НЕ ВСЕ<br />ДОМА</h1>

          <div className="mt-6 bg-white rounded-3xl p-5 border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.06)] animate-scale-in">
            <p className="text-xs text-slate-400">Сегодня <span className="font-semibold text-slate-500">21 марта 2026</span></p>
            <p className="font-display font-bold text-2xl text-black mt-1">Суббота!</p>
            <p className="text-sm text-slate-500">Отличный день для игры с семьёй</p>
            <button
              onClick={() => go('gameIntro')}
              className="mt-4 px-5 py-2.5 rounded-xl bg-brand-blue text-white font-semibold text-sm active:scale-95 transition-transform"
            >
              Начать игру
            </button>
          </div>

          {/* Разделы */}
          <p className="mt-7 text-xs font-bold tracking-widest text-slate-400 uppercase">Разделы</p>
          <div className="grid grid-cols-2 gap-3 mt-3">
            <Tile color="#4FC3E8" icon="Heart" title="Настроение" sub="История настроений" onClick={() => go('moodIntro')} />
            <Tile color="#C9A8DA" icon="Layers" title="Карточки" sub="Вопросы для семьи" onClick={() => go('gameIntro')} />
            <Tile color="#F4922B" icon="Calendar" title="События" sub="Планы и мероприятия" />
            <Tile color="#E63946" icon="Smile" title="Профиль" sub="Члена семьи" onClick={() => go('profile')} />
          </div>
        </div>
        <BottomNav active="home" onNav={go} />
      </Phone>
    );

  /* ---------- MOOD INTRO ---------- */
  if (screen === 'moodIntro')
    return (
      <Phone>
        <div className="relative h-full flex flex-col px-7 pt-16 pb-10">
          <BackBtn onClick={() => go('home')} />
          <h1 className="font-display font-bold text-4xl leading-[0.95] text-black mt-6">Трекер<br />настроений</h1>
          <p className="mt-3 text-slate-400 text-sm leading-snug">
            Отмечайте настроение каждый день и следите за эмоциональной атмосферой в семье.
          </p>

          <div className="relative flex justify-center items-center my-8 h-52">
            <div className="absolute w-28 h-28 rounded-full bg-brand-red flex items-center justify-center text-5xl left-4 animate-float">😡</div>
            <div className="absolute w-28 h-28 rounded-full bg-brand-orange flex items-center justify-center text-5xl right-4 top-2 animate-float" style={{ animationDelay: '1s' }}>😄</div>
            <div className="relative w-36 h-36 rounded-full bg-brand-blue flex items-center justify-center text-7xl shadow-xl animate-pop">😢
              <span className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full bg-brand-blue border-4 border-white flex items-center justify-center text-white">
                <Icon name="Check" size={16} />
              </span>
            </div>
          </div>

          <div className="space-y-3 flex-1">
            <Feat color="#4FC3E8" text="Статистика по дням и неделям" />
            <Feat color="#C9A8DA" text="Видно настроение каждого" />
            <Feat color="#F4922B" text="Поддержка близких" />
          </div>

          <button
            onClick={() => go('moodMain')}
            className="w-full py-4 rounded-2xl bg-brand-orange text-white font-display font-semibold text-lg shadow-lg active:scale-95 transition-transform"
          >
            Начать отслеживать
          </button>
        </div>
      </Phone>
    );

  /* ---------- MOOD MAIN ---------- */
  if (screen === 'moodMain') {
    const days = Array.from({ length: 28 }, (_, i) => i + 1);
    return (
      <Phone>
        <div className="px-6 pt-16 pb-28">
          <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase">Семья</p>
          <h1 className="font-display font-bold text-3xl leading-tight text-black mt-1">Календарь<br />настроений</h1>

          <div className="mt-5 bg-slate-100 rounded-3xl p-4">
            <div className="flex items-center justify-between mb-3">
              <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm active:scale-90 transition-transform"><Icon name="ChevronLeft" size={18} /></button>
              <span className="font-display font-semibold text-lg">Февраль 2026</span>
              <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm active:scale-90 transition-transform"><Icon name="ChevronRight" size={18} /></button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-slate-400 font-semibold mb-1">
              {['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'].map((d) => <span key={d}>{d}</span>)}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {days.map((d) => {
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
            <p className="font-display font-bold text-lg text-black">Сегодня</p>
            <p className="text-sm text-slate-500 mb-4">Как ты себя чувствуешь?</p>
            <div className="flex justify-between px-2">
              {MOODS.map((m, i) => (
                <button
                  key={i}
                  onClick={() => setTodayMood(i)}
                  className="w-14 h-14 rounded-full flex items-center justify-center text-2xl transition-all active:scale-90"
                  style={{
                    background: m.bg,
                    outline: todayMood === i ? '3px solid #000' : 'none',
                    outlineOffset: '2px',
                    transform: todayMood === i ? 'scale(1.1)' : 'scale(1)',
                  }}
                >
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

  /* ---------- PROFILE (статусы присутствия) ---------- */
  if (screen === 'profile')
    return (
      <Phone>
        <div className="px-6 pt-16 pb-28">
          <BackBtn onClick={() => go('home')} />
          <h1 className="font-display font-bold text-4xl leading-[0.95] text-black mt-5">Профиль<br />семьи</h1>

          <p className="mt-6 text-xs font-bold tracking-widest text-slate-400 uppercase">Мой статус</p>
          <div className="grid grid-cols-3 gap-2 mt-3">
            {STATUSES.map((s) => {
              const active = status === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setStatus(s.id)}
                  className="rounded-2xl py-4 flex flex-col items-center gap-1.5 transition-all active:scale-95"
                  style={{ background: active ? s.color : '#F1F5F9', color: active ? '#fff' : '#64748B' }}
                >
                  <Icon name={s.icon} size={24} />
                  <span className="text-xs font-semibold">{s.label}</span>
                </button>
              );
            })}
          </div>

          <p className="mt-7 text-xs font-bold tracking-widest text-slate-400 uppercase">Кто где сейчас</p>
          <div className="mt-3 bg-slate-100 rounded-3xl p-4 space-y-3">
            {FAMILY.map((f) => {
              const st = STATUSES.find((s) => s.id === f.status)!;
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

  /* ---------- GAME INTRO ---------- */
  return (
    <Phone>
      <div className="relative h-full flex flex-col px-7 pt-16 pb-10">
        <BackBtn onClick={() => go('home')} />
        <h1 className="font-display font-bold text-4xl leading-[0.95] text-black mt-6">Игра<br />«Не все дома»</h1>
        <p className="mt-3 text-slate-400 text-sm leading-snug">
          Игра для семьи, которая сближает, веселит и помогает узнать друг друга ещё лучше.
        </p>

        <div className="relative flex justify-center items-center my-10 h-56">
          <Card rot={-18} x={-70} bg="#F4922B" />
          <Card rot={-6} x={-22} bg="#E63946" label="НЕ ВСЕ ДОМА" />
          <Card rot={8} x={30} bg="#4FC3E8" q />
          <Card rot={20} x={78} bg="#C9A8DA" />
        </div>

        <div className="space-y-3 flex-1">
          <Feat color="#4FC3E8" text="Более 120 обновляющихся карточек" />
          <Feat color="#C9A8DA" text="От 11 лет" />
          <Feat color="#F4922B" text="Смех и яркие моменты" />
        </div>

        <button
          onClick={() => go('home')}
          className="w-full py-4 rounded-2xl bg-brand-blue text-white font-display font-semibold text-lg shadow-lg active:scale-95 transition-transform"
        >
          Собрать игроков
        </button>
      </div>
    </Phone>
  );
}

/* ---------- helpers ---------- */
const Tile = ({ color, icon, title, sub, onClick }: { color: string; icon: string; title: string; sub: string; onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="rounded-3xl p-4 h-32 flex flex-col justify-between text-left text-white active:scale-95 transition-transform shadow-md"
    style={{ background: color }}
  >
    <Icon name={icon} size={26} />
    <div>
      <p className="font-display font-semibold text-lg leading-tight">{title}</p>
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

const Card = ({ rot, x, bg, label, q }: { rot: number; x: number; bg: string; label?: string; q?: boolean }) => (
  <div
    className="absolute w-24 h-32 rounded-2xl shadow-xl flex items-center justify-center p-2 text-center"
    style={{ background: bg, transform: `translateX(${x}px) rotate(${rot}deg)` }}
  >
    {q ? (
      <span className="text-white text-4xl font-display font-bold">?</span>
    ) : (
      <span className="text-white font-display font-bold text-[11px] leading-tight">{label || 'НЕ ВСЕ ДОМА'}</span>
    )}
  </div>
);

const BottomNav = ({ active, onNav }: { active: string; onNav: (s: Screen) => void }) => {
  const items = [
    { id: 'home', label: 'Главная', icon: 'House', screen: 'home' as Screen },
    { id: 'mood', label: 'Настроение', icon: 'Heart', screen: 'moodMain' as Screen },
    { id: 'cards', label: 'Карточки', icon: 'Layers', screen: 'gameIntro' as Screen },
    { id: 'events', label: 'События', icon: 'Calendar', screen: 'home' as Screen },
    { id: 'profile', label: 'Профиль', icon: 'Smile', screen: 'profile' as Screen },
  ];
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t border-slate-100 px-2 pt-2 pb-4 flex justify-around">
      {items.map((it) => {
        const on = active === it.id;
        return (
          <button key={it.id} onClick={() => onNav(it.screen)} className="flex flex-col items-center gap-0.5 px-1 transition-transform active:scale-90">
            <Icon name={it.icon} size={20} className={on ? 'text-black' : 'text-slate-400'} />
            <span className={`text-[10px] ${on ? 'text-black font-semibold' : 'text-slate-400'}`}>{it.label}</span>
          </button>
        );
      })}
    </div>
  );
};