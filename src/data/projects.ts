export type Shot = { src: string; alt: string };

export type Project = {
  slug: string;
  title: string;
  kind: string;
  /** Image used on the home bento card. */
  card: string;
  summary: string;
  context: string;
  company: string;
  role: string;
  stack: string[];
  timeline: string;
  link?: string;
  linkLabel?: string;
  github?: string;
  desktop: Shot[];
  mobile: Shot[];
  sections: { heading: string; body?: string; points?: string[] }[];
};

const shots = (slug: string, kind: "desktop" | "mobile", alts: string[]): Shot[] =>
  alts.map((alt, i) => ({ src: `/projects/${slug}/shots/${kind}-${i + 1}.webp`, alt }));

export const projects: Project[] = [
  {
    slug: "outpost",
    title: "Outpost",
    kind: "Self-hosted chess coach",
    card: "/projects/outpost/card.jpg",
    summary:
      "A chess coach that replaces chess.com's paid game review, and the coach is a cat.",
    context:
      "Enter a chess.com username and Outpost reviews every game you played that day, finds what keeps costing you points, and turns your own mistakes into puzzles. Two LangGraph agents do the talking; Stockfish and a Neo4j graph supply every fact.",
    company: "Personal project",
    role: "Solo: design, frontend, agents, infra",
    stack: ["Next.js", "LangGraph", "Neo4j", "Stockfish (WASM)", "Claude / Ollama", "SSE"],
    timeline: "2026",
    link: "https://chess-outpost.vercel.app",
    linkLabel: "Open Outpost",
    github: "https://github.com/MubashirTanwar/outpost",
    desktop: shots("outpost", "desktop", [
      "Outpost home: board with Kittu the cat coach and the day-review entry",
      "Analysis board with Stockfish lines",
      "Endgame Academy: staged checkmate and pawn-ending drills",
      "Opening Courses with spaced-repetition progress",
    ]),
    mobile: shots("outpost", "mobile", [
      "Outpost home on mobile",
      "Analysis board on mobile",
      "Endgame Academy on mobile",
      "Opening Courses on mobile",
    ]),
    sections: [
      {
        heading: "Problem",
        body: "Game review is the most useful thing a chess site offers, and it sits behind a paywall. The free alternatives give you an engine line and nothing else: no sense of which mistakes keep repeating, and no way to practise them.",
      },
      {
        heading: "Approach",
        points: [
          "Two LangGraph agents: a day-review pipeline, and a coach that routes each question by intent and streams answers token by token over SSE using LangGraph's custom stream writer.",
          "The engine and the graph supply every fact (eval swings, rating changes, recurring motifs). The LLM, Claude or a local Ollama model, only writes the wording, so it cannot make up analysis.",
          "A Neo4j schema keys every position by FEN, so the coach can find the same mistake across games and generate puzzles from it.",
          "A hand-written UCI client in the browser lets one Stockfish worker serve every view, which is what lets the whole review run with the backend switched off.",
        ],
      },
      {
        heading: "What's in it",
        points: [
          "Day Review: every game you played today, with the moments that decided it.",
          "Coach Kittu: ask why a move was bad and get an answer grounded in the engine.",
          "Your Puzzles, built from your own blunders.",
          "Opening Courses and an Endgame Academy with spaced repetition.",
        ],
      },
    ],
  },
  {
    slug: "cowordle",
    title: "CoWordle",
    kind: "Real-time multiplayer Wordle",
    card: "/projects/cowordle/card.webp",
    summary: "Wordle, but everyone in the room races on the same word.",
    context:
      "Create a room, share the code, and race your friends on the same word over several rounds. There's also a solo drill and a hard mode for practising alone.",
    company: "Personal project",
    role: "Solo: full stack",
    stack: ["Next.js", "Node.js", "Socket.IO", "MongoDB"],
    timeline: "2026",
    link: "https://co-wordle.vercel.app",
    linkLabel: "Play CoWordle",
    desktop: shots("cowordle", "desktop", [
      "Solo drill mid-game with the on-screen keyboard",
      "Room settings: time per round, rounds, classic or hard mode",
      "CoWordle lobby",
    ]),
    mobile: shots("cowordle", "mobile", [
      "Solo drill on mobile",
      "Lobby on mobile",
      "Room settings on mobile",
    ]),
    sections: [
      {
        heading: "Problem",
        body: "Wordle is a single-player game that everyone plays together anyway, by comparing grids in a group chat afterwards. CoWordle makes the race happen live.",
      },
      {
        heading: "How it works",
        points: [
          "Players in a room race on the same word over Socket.IO.",
          "The server validates guesses and holds the answer, so clients never see it and can't cheat.",
          "Reconnecting restores an in-progress game, so a dropped connection doesn't cost you the round.",
          "MongoDB stores rooms, rounds and scores.",
        ],
      },
    ],
  },
  {
    slug: "prana",
    title: "Prana",
    kind: "Astrology consultations, chat and voice",
    card: "/projects/prana/stock2.png",
    summary:
      "pranaindia.com and its real-time chat and voice consultation service, built from scratch.",
    context:
      "Prana is home to Pandit Chandrashekhar Sharma's astrology practice. Visitors read free horoscopes, then book a chat or call with an astrologer. I built the customer site, the consultation service behind it, and the experiments that tuned the funnel.",
    company: "Prana (PranaIndia)",
    role: "SDE-1",
    stack: ["Next.js", "TypeScript", "Express", "Redis", "WebSockets", "AWS", "Docker", "MongoDB"],
    timeline: "Jul 2025 – Present",
    link: "https://pranaindia.com",
    linkLabel: "Visit pranaindia.com",
    desktop: shots("prana", "desktop", [
      "Prana home with chat and call entry points",
      "Free horoscope picker",
      "About Prana",
    ]),
    mobile: shots("prana", "mobile", [
      "Prana home on mobile",
      "Free horoscope picker on mobile",
      "About Prana on mobile",
    ]),
    sections: [
      {
        heading: "Real-time consultations",
        body: "The chat and voice-call service buffers messages in Redis and batch-flushes them to the database, sustaining 150+ concurrent chats at sub-200ms latency with AES-GCM encrypted messaging.",
      },
      {
        heading: "Backend and infra",
        body: "A TypeScript/Express microservices backend on AWS EC2 with auto-scaling, ECR and Amplify, shipped with blue-green deployments.",
      },
      {
        heading: "Experiments",
        body: "An in-house A/B testing and behaviour-tracking library ran 10+ experiments across 150,000+ weekly users. The changes it drove lifted landing-to-consultation conversion 3x, from 2% to 6%.",
      },
      {
        heading: "Also shipped",
        points: ["office.pranaindia.com, a dedicated portal for high-ticket clients.", "Streamlined consultation workflows for the astrologers."],
      },
    ],
  },
  {
    slug: "bestfares365",
    title: "Bestfares365",
    kind: "Flight booking platform, B2B and B2C",
    card: "/projects/bestfares/stock.png",
    summary: "A rebuilt airline-booking and CRM platform for customers and travel agents.",
    context:
      "Bestfares365 sells flights to customers directly and through a network of travel agents. I rebuilt the booking platform and CRM on the MERN stack, and it replaced the company's legacy system on both channels.",
    company: "Fuzzy Nodes, Sydney (remote)",
    role: "Full Stack Engineer",
    stack: ["Next.js", "Node.js", "Express", "MongoDB", "Amadeus API"],
    timeline: "Feb 2024 – Sep 2024",
    link: "https://bestfares365.com.au",
    linkLabel: "Visit bestfares365",
    desktop: shots("bestfares", "desktop", [
      "Flight search on the Bestfares365 home page",
      "Visa assistance flow",
      "Travel agent registration",
    ]),
    mobile: shots("bestfares", "mobile", [
      "Flight search on mobile",
      "Visa assistance on mobile",
      "Agent registration on mobile",
    ]),
    sections: [
      {
        heading: "Search that finds cheaper fares",
        body: "A fare-search algorithm on top of the Amadeus API widens the search across route and connection combinations, then sorts the candidates to surface itineraries cheaper than a direct query returns.",
      },
      {
        heading: "Built for agents too",
        points: [
          "An agent wallet with full transaction logs.",
          "A dynamic-pricing engine that applies configurable markups per route, airline and agent.",
          "Amadeus integration for search, fares and ticketing.",
        ],
      },
      {
        heading: "Outcome",
        body: "The new platform replaced the legacy booking system and is used across both the customer and travel-agent channels.",
      },
    ],
  },
  {
    slug: "cardagain",
    title: "CardAgain",
    kind: "Pokémon card marketplace",
    card: "/projects/cardagain/stock.png",
    summary: "A Pokémon trading store with memberships, giveaways, grading and referrals.",
    context:
      "CardAgain runs on the eCommerce template I productized for freelance work: orders, inventory, CMS, analytics dashboards, subscriptions and checkout. On top of it sit the collector features: tiered memberships, giveaways, card grading and referrals.",
    company: "Freelance",
    role: "Full stack, end to end",
    stack: ["Next.js", "Node.js", "MongoDB", "Custom CMS & CRM"],
    timeline: "2024 – Present",
    link: "https://cardagain.net",
    linkLabel: "Visit CardAgain",
    desktop: shots("cardagain", "desktop", [
      "CardAgain home",
      "Subscription plans",
      "Card grading service",
    ]),
    mobile: shots("cardagain", "mobile", [
      "CardAgain home on mobile",
      "Subscription plans on mobile",
      "Card grading on mobile",
    ]),
    sections: [
      {
        heading: "One template, many stores",
        body: "Rather than building each client store from scratch, I turned the common parts into a reusable template: order and inventory management, a CMS, analytics dashboards, subscriptions and checkout. CardAgain, Press-On-Nails and WWTG all run on it.",
      },
      {
        heading: "Collector features",
        points: [
          "Three subscription tiers with monthly entries, product drops and trading-fee discounts.",
          "Tier-based giveaways.",
          "Grading submissions, tracked end to end.",
          "A referral programme.",
        ],
      },
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
