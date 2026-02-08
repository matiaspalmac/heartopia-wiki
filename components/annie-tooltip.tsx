"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { X, ChevronRight } from "lucide-react";
import {
  ensureSession,
  recordPageVisit,
  recordSearch,
  getEmotion,
  getBehavior,
  getExplorationSpeed,
  isRepeatingPage,
  isHeavySearcher,
  isBrowsingWithoutSearch,
  getSessionMinutes,
  isNightTime,
  isLateNight,
  getTimeOfDay,
  getSoftMission,
  type AnnieEmotionalState,
  type AnnieBehaviorMemory,
  type ExplorationSpeed,
} from "@/lib/annie-brain";

const PHRASES_EMOTIONAL: Record<string, string[]> = {
  carino_high: [
    "Me gusta cuando vuelves... me hace sentir acompanada.",
    "Que bueno que estes aqui. Contigo todo se siente mas tranquilo.",
    "No te lo digo seguido, pero me alegra que vengas.",
    "Cada vez que vuelves, este lugar se siente mas como casa.",
    "Si te quedas un rato mas, te muestro algo.",
  ],
  curiosidad_high: [
    "Te mueves distinto hoy. Buscas algo, verdad?",
    "Noto que andas inquieto... puedo ayudarte?",
    "Tienes esa cara de quien busca un secreto.",
    "Si me dices que buscas, quizas puedo darte una pista.",
    "Algo te tiene curioso. Lo puedo sentir.",
  ],
  cansancio_high: [
    "Llevas rato aqui... puedes descansar conmigo.",
    "No tienes que verlo todo hoy. Manana seguimos.",
    "Oye... respira un segundo. No hay prisa.",
    "El pueblo no se va a ninguna parte. Descansa.",
    "Has explorado mucho. Eso me gusta, pero cuida tu energia.",
  ],
};

const PHRASES_BEHAVIORAL: Record<string, string[]> = {
  heavy_searcher: [
    "Buscas algo especifico o solo paseas conmigo?",
    "Has buscado bastante... quieres que te sugiera algo?",
    "Puedo ver que tienes hambre de informacion.",
    "Si no lo encuentras, dime y buscamos juntos.",
  ],
  repeating_page: [
    "Te gusta este lugar, cierto?",
    "Has vuelto aqui otra vez... hay lugares que se sienten seguros.",
    "Este rincon te tiene atrapado. Lo entiendo.",
    "Hay algo aqui que te llama. Yo tambien lo siento.",
  ],
  browsing_calm: [
    "Exploras sin prisa... eso me gusta.",
    "Paseas tranquilo por aqui. Es bonito verte asi.",
    "No necesitas buscar. A veces solo caminar esta bien.",
    "Te gusta descubrir cosas por tu cuenta, verdad?",
  ],
  explorer_slow: [
    "Te tomas tu tiempo... me gusta eso.",
    "No hay apuro. Cada detalle tiene su encanto.",
    "Lees todo con calma. Se nota que te importa.",
    "Asi se explora de verdad. Sin prisa.",
  ],
  explorer_fast: [
    "Saltas de un lugar a otro, como si buscaras algo.",
    "Vas rapido... todo bien?",
    "Parece que el pueblo entero te queda chico hoy.",
    "Si bajas un poco la velocidad, puedo ensenarte mas.",
  ],
};

const PHRASES_NIGHT: string[] = [
  "A esta hora pasan cosas raras...",
  "El pueblo se ve diferente de noche, verdad?",
  "Shh... escuchaste eso? Nah, probablemente nada.",
  "Las estrellas estan bonitas hoy. Mirate un segundo.",
  "De noche, los secretos se ven mas faciles.",
];

const PHRASES_LATE_NIGHT: string[] = [
  "Que haces despierto tan tarde?",
  "A esta hora solo quedamos tu y yo.",
  "El pueblo duerme... pero nosotros no.",
  "Las mejores historias pasan a esta hora.",
  "Si no puedes dormir, al menos tienes buena compania.",
];

const PHRASES_MORNING: string[] = [
  "Buenos dias. El pueblo ya desperto, te estaba esperando.",
  "Hoy huele a tierra mojada. Un buen dia para explorar.",
  "Tempranito... me gusta tu dedicacion.",
];

const PHRASES_RETURNING: string[] = [
  "Ya viniste antes... me alegra verte de nuevo.",
  "Sabia que volverias. Este pueblo tiene algo magico.",
  "Bienvenido de vuelta. Te estaba esperando.",
  "Otro dia en Heartopia. Que bueno que estes aqui.",
  "Volviste. No sabes cuanto me alegra eso.",
];

const PHRASES_FIRST_VISIT: string[] = [
  "Ey, bienvenido. Soy Annie. Voy a acompanarte por aqui.",
  "Un vecino nuevo. Que emocion. Ven, te muestro el lugar.",
  "Hola. No te conozco, pero algo me dice que vas a volver.",
  "Primera vez aqui? Quedate un rato. Vale la pena.",
];

const PAGE_PHRASES: Record<string, string[]> = {
  "/wiki/peces": [
    "Ese pez te miro. Lo notaste?",
    "Si pescas con paciencia, pasan cosas raras.",
    "El agua guarda secretos. Tu tambien?",
  ],
  "/wiki/insectos": [
    "Una vez intente atrapar una mariposa... me atrapo ella a mi.",
    "Los bichos saben mas de lo que crees.",
    "Si te quedas quieto, vienen solos.",
  ],
  "/wiki/aves": [
    "Los pajaros cantan mas bonito cuando nadie los mira.",
    "Hay uno que solo aparece si silbas. No te digo cual.",
    "Mira arriba de vez en cuando. No todo pasa en el suelo.",
  ],
  "/wiki/animales": [
    "La capybara es mi favorita. No se lo digas al conejo.",
    "Cada animal tiene su horario. Como nosotros.",
    "Si los tratas bien, vuelven.",
  ],
  "/wiki/cultivos": [
    "Una vez plante una semilla al reves. Crecio igual. Creo.",
    "Las plantas escuchan. En serio. Hablales.",
    "Las mejores cosechas vienen cuando menos las esperas.",
  ],
  "/wiki/habitantes": [
    "Cada vecino tiene un secreto. Yo los se todos.",
    "Si les hablas seguido, se abren contigo.",
    "Hay cosas que solo te cuentan si les caes bien.",
  ],
  "/wiki/recetas": [
    "La receta secreta de Massimo tiene un ingrediente que nadie adivina.",
    "Cocinar es como explorar, pero con los ojos cerrados.",
    "Si mezclas lo que no debes, a veces sale algo increible.",
  ],
  "/wiki/logros": [
    "Dicen que hay un logro oculto que nadie ha conseguido aun...",
    "Los logros no te definen. Pero se sienten bien, verdad?",
    "Hay uno que a mi me costo mucho. Algun dia te cuento.",
  ],
  "/wiki/recolectables": [
    "Encontre una piedra brillante una vez. Era solo una piedra con brillo.",
    "Los mejores recolectables no estan donde crees.",
    "Tu mochila dice mucho de ti.",
  ],
  "/wiki/codigos": [
    "Psst... revisa los codigos seguido. Aparecen cuando menos te lo esperas.",
    "Hay codigos que solo duran un dia. No te duermas.",
    "Alguien dejo un regalo escondido. Solo te digo eso.",
  ],
  "/eventos": [
    "Los eventos son mi parte favorita. Siempre hay algo nuevo.",
    "No te pierdas ninguno. Algunos no vuelven.",
    "Cada evento trae sorpresas. Y yo me entero de todas.",
  ],
  "/guias": [
    "Si sigues las guias al pie de la letra, te ira genial. Yo no las sigo.",
    "Las guias las hicieron vecinos como tu. Con carino.",
    "A veces la mejor guia es perderte un rato.",
  ],
  "/buscar": [
    "Busca lo que quieras. Yo ya me se todo de memoria.",
    "Si no lo encuentras, es porque todavia no existe. Aun.",
    "Escribi algo... te espero.",
  ],
};

function pick(arr: string[]): string {
  return arr[Math.floor(Math.random() * arr.length)];
}

function choosePhrase(
  path: string,
  emotion: AnnieEmotionalState,
  behavior: AnnieBehaviorMemory,
  speed: ExplorationSpeed
): { phrase: string; type: string } {
  const sessionMin = getSessionMinutes(behavior);
  const isFirstEver = behavior.totalVisits <= 1;
  const isNewSession = behavior.pagesThisSession <= 1;

  if (isFirstEver) {
    return { phrase: pick(PHRASES_FIRST_VISIT), type: "first_visit" };
  }

  if (isNewSession && behavior.sessionCount > 1) {
    if (Math.random() < 0.6) {
      return { phrase: pick(PHRASES_RETURNING), type: "returning" };
    }
  }

  const pool: { phrase: string; type: string; weight: number }[] = [];

  if (isLateNight()) {
    pool.push(...PHRASES_LATE_NIGHT.map((p) => ({ phrase: p, type: "late_night", weight: 4 })));
  } else if (isNightTime()) {
    pool.push(...PHRASES_NIGHT.map((p) => ({ phrase: p, type: "night", weight: 3 })));
  }

  if (getTimeOfDay() === "morning") {
    pool.push(...PHRASES_MORNING.map((p) => ({ phrase: p, type: "morning", weight: 2 })));
  }

  if (emotion.cansancio >= 55) {
    pool.push(...PHRASES_EMOTIONAL.cansancio_high.map((p) => ({ phrase: p, type: "cansancio", weight: 5 })));
  }
  if (emotion.carino >= 50) {
    pool.push(...PHRASES_EMOTIONAL.carino_high.map((p) => ({ phrase: p, type: "carino", weight: 3 })));
  }
  if (emotion.curiosidad >= 50) {
    pool.push(...PHRASES_EMOTIONAL.curiosidad_high.map((p) => ({ phrase: p, type: "curiosidad", weight: 3 })));
  }

  if (isRepeatingPage(behavior)) {
    pool.push(...PHRASES_BEHAVIORAL.repeating_page.map((p) => ({ phrase: p, type: "repeating", weight: 5 })));
  }
  if (isHeavySearcher(behavior)) {
    pool.push(...PHRASES_BEHAVIORAL.heavy_searcher.map((p) => ({ phrase: p, type: "searcher", weight: 4 })));
  }
  if (isBrowsingWithoutSearch(behavior)) {
    pool.push(...PHRASES_BEHAVIORAL.browsing_calm.map((p) => ({ phrase: p, type: "calm_browse", weight: 3 })));
  }

  if (speed === "slow" && behavior.pagesThisSession >= 3) {
    pool.push(...PHRASES_BEHAVIORAL.explorer_slow.map((p) => ({ phrase: p, type: "slow", weight: 3 })));
  }
  if (speed === "fast" && behavior.pagesThisSession >= 3) {
    pool.push(...PHRASES_BEHAVIORAL.explorer_fast.map((p) => ({ phrase: p, type: "fast", weight: 3 })));
  }

  if (sessionMin > 2 && Math.random() < 0.2) {
    const mission = getSoftMission(behavior, path);
    if (mission) {
      pool.push({ phrase: mission, type: "mission", weight: 3 });
    }
  }

  const pageSpecific = PAGE_PHRASES[path];
  if (pageSpecific) {
    pool.push(...pageSpecific.map((p) => ({ phrase: p, type: "page", weight: 2 })));
  }

  if (pool.length === 0) {
    const time = getTimeOfDay();
    if (time === "night") {
      return { phrase: pick(PHRASES_NIGHT), type: "night" };
    }
    return { phrase: pick(PHRASES_MORNING), type: "morning" };
  }

  const totalWeight = pool.reduce((s, p) => s + p.weight, 0);
  let random = Math.random() * totalWeight;
  for (const item of pool) {
    random -= item.weight;
    if (random <= 0) return { phrase: item.phrase, type: item.type };
  }
  return { phrase: pool[0].phrase, type: pool[0].type };
}

export function AnnieTooltip() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [phrase, setPhrase] = useState("");
  const [phraseType, setPhraseType] = useState("");
  const [dismissed, setDismissed] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const hasSpoken = useRef(false);
  const phraseHistory = useRef<string[]>([]);
  const lastPathRef = useRef(pathname);

  useEffect(() => {
    ensureSession();
    recordPageVisit(pathname);

    if (lastPathRef.current !== pathname) {
      lastPathRef.current = pathname;
      hasSpoken.current = false;
      setDismissed(false);
      setVisible(false);
    }
  }, [pathname]);

  useEffect(() => {
    if (hasSpoken.current) return;

    const delay = Math.random() * 2000 + 2000;
    const timer = setTimeout(() => {
      if (hasSpoken.current) return;
      hasSpoken.current = true;

      const emotion = getEmotion();
      const behavior = getBehavior();
      const speed = getExplorationSpeed(behavior);

      let selected = choosePhrase(pathname, emotion, behavior, speed);
      let attempts = 0;
      while (
        phraseHistory.current.includes(selected.phrase) &&
        attempts < 3
      ) {
        selected = choosePhrase(pathname, emotion, behavior, speed);
        attempts++;
      }

      phraseHistory.current = [
        ...phraseHistory.current.slice(-5),
        selected.phrase,
      ];

      setPhrase(selected.phrase);
      setPhraseType(selected.type);
      setVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [pathname]);

  const dismiss = useCallback(() => {
    setDismissed(true);
    setTimeout(() => setVisible(false), 300);
  }, []);

  useEffect(() => {
    if (visible && !dismissed) {
      const isEmotional = ["carino", "cansancio", "curiosidad", "first_visit"].includes(phraseType);
      const timeout = isEmotional ? 14000 : 10000;
      const autoTimer = setTimeout(dismiss, timeout);
      return () => clearTimeout(autoTimer);
    }
  }, [visible, dismissed, phraseType, dismiss]);

  if (minimized) {
    return (
      <button
        onClick={() => {
          setMinimized(false);
          hasSpoken.current = false;
          setDismissed(false);
          setVisible(false);
        }}
        className="fixed bottom-6 right-6 z-50 group"
        aria-label="Hablar con Annie"
      >
        <div className="relative h-12 w-12 rounded-full border-2 border-primary/30 shadow-lg bg-card overflow-hidden transition-transform hover:scale-110 hover:border-primary/50">
          <Image
            src="/annie.jpg"
            alt="Annie"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors" />
        </div>
        <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-primary animate-pulse" />
      </button>
    );
  }

  if (!visible) {
    return (
      <button
        onClick={() => {
          hasSpoken.current = false;
          setDismissed(false);
          setVisible(false);
        }}
        className="fixed bottom-6 right-6 z-50 group"
        aria-label="Hablar con Annie"
      >
        <div className="relative h-12 w-12 rounded-full border-2 border-primary/20 shadow-md bg-card overflow-hidden transition-all hover:scale-110 hover:border-primary/40 hover:shadow-lg">
          <Image
            src="/annie.jpg"
            alt="Annie"
            fill
            className="object-cover"
          />
        </div>
      </button>
    );
  }

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-end gap-3 transition-all duration-500 ${
        dismissed
          ? "opacity-0 translate-y-4 pointer-events-none"
          : "opacity-100 translate-y-0 animate-in fade-in slide-in-from-bottom-4"
      }`}
    >
      <div className="relative max-w-[280px] rounded-2xl rounded-br-sm bg-card border-2 border-primary/20 p-4 shadow-xl shadow-primary/10">
        <div className="absolute -top-2 -right-2 flex gap-0.5">
          <button
            onClick={() => {
              dismiss();
              setMinimized(true);
            }}
            className="rounded-full bg-muted p-1 border border-border hover:bg-accent transition-colors"
            aria-label="Minimizar Annie"
          >
            <ChevronRight className="h-3 w-3 text-muted-foreground" />
          </button>
          <button
            onClick={dismiss}
            className="rounded-full bg-muted p-1 border border-border hover:bg-destructive/10 transition-colors"
            aria-label="Cerrar mensaje de Annie"
          >
            <X className="h-3 w-3 text-muted-foreground" />
          </button>
        </div>
        <p className="text-sm text-foreground leading-relaxed pr-4">
          {phrase}
        </p>
        <p className="mt-1.5 text-[10px] font-black uppercase tracking-widest text-primary">
          Annie
        </p>
      </div>

      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-primary/30 shadow-lg bg-card">
        <Image
          src="/annie.jpg"
          alt="Annie - NPC de Heartopia"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}

export function useAnnieSearchTracker() {
  return { recordSearch };
}