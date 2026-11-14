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
  /** Leave empty to hide the screenshots section. */
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
    summary: "A free, self-hosted replacement for chess.com's paid game review, and the coach is a cat.",
    context:
      "Enter a chess.com username and Outpost reviews every game you played that day, finds what keeps costing you points, and turns your own mistakes into puzzles. Two LangGraph agents do the talking; Stockfish and a Neo4j graph supply every fact. It's a solo side project, built to go deep on agents, graphs and engine work.",
    company: "Side project",
    role: "Solo: design, frontend, backend, agents, infra",
    stack: ["Next.js", "TypeScript", "FastAPI", "Python", "LangGraph", "Neo4j", "Stockfish 17.1", "Claude / Ollama", "Docker Compose"],
    timeline: "Oct 2026 – Present",
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
        heading: "Works with the backend switched off",
        body: "The Next.js front end runs Stockfish 17.1 in WebAssembly through a UCI client I wrote, so a single engine worker serves every view. Game review and progress tracking keep working with no server at all; the backend only adds the coach and the graph.",
      },
      {
        heading: "Two agents, no made-up analysis",
        points: [
          "A FastAPI service runs native Stockfish and two LangGraph agents: a fixed day-review pipeline, and a coach that routes each question to only the steps it needs (games, a position, the player profile, openings).",
          "Coach answers stream token by token over server-sent events.",
          "Every number the coach states comes from the engine or the graph. The LLM (Claude, or a local Ollama model) only writes the wording, and it's optional.",
        ],
      },
      {
        heading: "A graph of your mistakes",
        body: "Neo4j holds every game, mistake, motif, puzzle and course line, with positions keyed by FEN. That's what lets the coach show the same error recurring across different games and turn it into a puzzle. With no Neo4j configured, an in-memory store stands in.",
      },
      {
        heading: "Move classification you can check",
        body: "Brilliant-through-Blunder classification is rebuilt from the Lichess win-probability curve and implemented twice, in Python and TypeScript, against one shared test suite. A calibration script scores it against chess.com's own published accuracy for the same games.",
      },
      {
        heading: "Courses",
        points: [
          "6 opening repertoires (133 lines, 25 quizzes) and an endgame academy (13 lessons, 27 drills), all on spaced repetition.",
          "Course content lives in a plain-text format checked by a build script: every move must be legal, and no position may have two repertoire moves across transpositions.",
          "Docker Compose runs the whole stack; GitHub Actions runs CI.",
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
      "Create a room, share the code, and race your friends on the same word over as many rounds as you like. Faster solves in fewer tries score more, there's a live scoreboard and chat, and a solo drill and hard mode for practising alone.",
    company: "Side project",
    role: "Solo: full stack",
    stack: ["Next.js", "TypeScript", "Node.js", "Socket.IO", "MongoDB"],
    timeline: "Mar 2026",
    link: "https://co-wordle.vercel.app",
    linkLabel: "Play CoWordle",
    github: "https://github.com/MubashirTanwar/CoWordle",
    desktop: [],
    mobile: [],
    sections: [
      {
        heading: "Problem",
        body: "Wordle is a single-player game that everyone plays together anyway, by comparing grids in a group chat afterwards. CoWordle makes the race happen live.",
      },
      {
        heading: "How it works",
        points: [
          "Players in a room race on the same word over Socket.IO, and everyone sees each other's progress as coloured rows (never the letters).",
          "The host picks the round length, number of rounds, Classic or Word500 mode, and hard mode.",
          "Scores reward solving faster and in fewer tries; each round ends with a breakdown and the game with final standings.",
        ],
      },
      {
        heading: "Fair by design",
        points: [
          "The server validates every guess and holds the answer, so a client can't read it from the network or the bundle.",
          "Reconnecting restores an in-progress game, so a dropped connection doesn't cost you the round.",
          "MongoDB stores rooms, rounds and scores.",
        ],
      },
    ],
  },
  {
    slug: "prana",
    title: "Prana",
    kind: "Astrology consultations: chat, voice and an in-house engine",
    card: "/projects/prana/stock2.png",
    summary:
      "pranaindia.com, its real-time chat and voice consultations, an in-house astrology engine, and the experiments that tuned the funnel.",
    context:
      "Prana is the astrology practice of Pandit Chandrashekhar Sharma. Visitors read free horoscopes and kundalis, then pay for a chat or call with an astrologer. I built the customer site from scratch, the consultation service behind it, the wallet, and the engine that computes the charts, and replaced two paid vendors along the way.",
    company: "Prana (PranaIndia), Bengaluru",
    role: "SDE-1",
    stack: [
      "Next.js",
      "TypeScript",
      "Express",
      "WebSockets",
      "Redis",
      "BullMQ",
      "PostgreSQL",
      "MongoDB",
      "Swiss Ephemeris",
      "LangChain",
      "OpenAI",
      "Razorpay",
      "Exotel",
      "AWS",
      "Docker",
    ],
    timeline: "Jul 2025 – Present",
    link: "https://pranaindia.com",
    linkLabel: "Visit pranaindia.com",
    desktop: [],
    mobile: shots("prana", "mobile", [
      "Start: pick what's on your mind",
      "Astrologers, filtered by concern",
      "Astrologer profile with ratings, consultations and session pricing",
      "A live chat consultation with session timer and per-minute rate",
      "A voice call, connected through Exotel",
      "Chat history after a session ends",
    ]),
    sections: [
      {
        heading: "Real-time chat and voice, built in-house",
        body: "Consultations used to run on paid third-party APIs. I rebuilt chat and voice end to end over WebSockets: messages are buffered in Redis and batch-flushed to Postgres, sustaining 150+ concurrent chats at sub-200ms latency, with AES-GCM encrypted messaging. Voice calls go through Exotel.",
        points: [
          "After launch I hunted down the hard parts of real-time: sockets that didn't reconnect cleanly after deploys (fixed with reconnect retry logic), and race conditions in socket status and between Razorpay's payment webhooks and our own verify call.",
        ],
      },
      {
        heading: "An astrology engine, owned in-house",
        body: "Kundalis, daily horoscopes, planetary positions and charts all came from a paid API. Over a couple of months of weekends I rebuilt it on Swiss Ephemeris and matched the vendor's output 100%, then pitched it internally and we dropped the ~$300/month subscription. It now runs at no cost and is being packaged as an API to sell.",
        points: [
          "The hard part was the domain, not the code: ayanamsa, house systems and chart divisions are conventions, not astronomy. I sat with Pandit Chandrashekhar Sharma until I understood the system.",
        ],
      },
      {
        heading: "AI on your own chart",
        body: "A RAG chatbot in production answers questions about a user's kundali: the user enters their birth details, the engine computes the chart, and that structured data goes through retrieval and few-shot prompting (LangChain on OpenAI) to produce the answer.",
      },
      {
        heading: "Experiments that moved conversion 4x",
        body: "I built an A/B testing and behaviour-tracking library: the browser batches events and flushes them on a size or time threshold (or when the tab closes), and the server bulk-writes each batch. It has run 20+ experiments across 150,000+ weekly users, and the changes they drove lifted landing-to-consultation conversion from 2% to 8%.",
      },
      {
        heading: "Payments, wallet and backend",
        points: [
          "A wallet for top-ups, paying for consultations from the balance, astrologer earnings and admin adjustments, with Razorpay payments and webhooks.",
          "A TypeScript/Express microservices backend on AWS EC2 with auto-scaling, ECR and Amplify, shipped with blue-green deployments in Docker.",
          "Postgres runs the consultation side (live chat, bookings, wallet); MongoDB holds e-commerce, user journeys and archived chats. BullMQ queues notifications and background jobs.",
          "Also shipped office.pranaindia.com, a dedicated portal for high-ticket clients.",
        ],
      },
      {
        heading: "Team",
        body: "I manage the interns, take part in hiring, and ran the knowledge transfer for the SDE-1 who joined after me, including the system design of everything above.",
      },
    ],
  },
  {
    slug: "bestfares365",
    title: "Bestfares365",
    kind: "Flight booking platform and CRM, B2B and B2C",
    card: "/projects/bestfares/stock.png",
    summary: "A rebuilt flight-booking platform and CRM for customers and travel agents, on Amadeus.",
    context:
      "Bestfares365 sells flights to customers directly and through a network of travel agents. I rebuilt the whole product from the ground up (customer booking site, agent portal and admin CRM) and it replaced the company's legacy system on both channels.",
    company: "FuzzyNodes, Australia (remote)",
    role: "Full Stack Developer",
    stack: ["React / Next.js", "Node.js", "Express", "MongoDB", "Amadeus API"],
    timeline: "Feb 2024 – Sep 2024",
    link: "https://bestfares365.com.au",
    linkLabel: "Visit bestfares365",
    desktop: shots("bestfares", "desktop", [
      "Search: Sydney to Singapore, return, 10–17 Dec",
      "Live results with airline fare strip, filters and Best / Cheapest / Fastest sorting",
      "Flight details: outbound and return timeline",
      "Flight details: baggage per leg",
      "Flight details: fare breakdown and ticket conditions",
      "Booking: passenger details and fare summary",
    ]),
    mobile: shots("bestfares", "mobile", [
      "Search on mobile",
      "Results on mobile",
      "Flight details on mobile",
      "Baggage on mobile",
      "Fare breakdown on mobile",
      "Passenger details on mobile",
    ]),
    sections: [
      {
        heading: "The whole product, front to back",
        body: "I worked across all of it, front end and backend: the customer booking flow, the travel-agent portal and the admin CRM, with all of the business logic. Amadeus powers flight search, pricing and ticketing.",
      },
      {
        heading: "Cheaper fares than a straight search",
        body: "I wrote a fare-search algorithm on top of Amadeus that surfaces cheaper itineraries than a direct Amadeus query returns. How it does that is the client's IP, so that's all I'll say about it.",
      },
      {
        heading: "Built for travel agents",
        points: [
          "An agent wallet with transaction logs and booking management.",
          "A dynamic-pricing engine that applies configurable markups per route, airline and agent.",
          "Agent sign-up and an admin CRM to manage agents, bookings and pricing.",
        ],
      },
      {
        heading: "Outcome",
        body: "The new platform replaced the company's legacy booking system and runs both the customer and travel-agent channels.",
      },
    ],
  },
  {
    slug: "cardagain",
    title: "CardAgain",
    kind: "Headless Shopify store for Pokémon cards",
    card: "/projects/cardagain/stock.png",
    summary: "A headless Shopify storefront for Pokémon cards, with memberships, giveaways, grading and referrals.",
    context:
      "CardAgain sells Pokémon cards and bundles to collectors. I built it as a headless Shopify store: a custom Next.js storefront over Shopify's Storefront GraphQL API, with multiple payment integrations, a membership system, and an admin CMS and CRM to run it all.",
    company: "Freelance client",
    role: "Full stack, end to end",
    stack: ["Next.js", "TypeScript", "Shopify Storefront GraphQL API", "Stripe", "Node.js"],
    timeline: "2025",
    link: "https://cardagain.net",
    linkLabel: "Visit CardAgain",
    desktop: shots("cardagain", "desktop", ["CardAgain home", "Subscription plans", "Card grading service"]),
    mobile: shots("cardagain", "mobile", ["CardAgain home on mobile", "Subscription plans on mobile", "Card grading on mobile"]),
    sections: [
      {
        heading: "Headless Shopify",
        body: "Shopify holds the catalogue, inventory and orders; the storefront is entirely custom and talks to it through the Storefront GraphQL API. That kept the store manageable for the client in Shopify while giving the site its own look and features Shopify themes can't do.",
      },
      {
        heading: "Payments and memberships",
        points: [
          "Multiple payment integrations, including Stripe for recurring memberships.",
          "Three Stripe subscription tiers with upgrades, downgrades and gifted memberships, unlocking monthly giveaway entries, product drops and trading-fee discounts.",
          "Referral credits minted as Shopify discount codes, so they work at the normal checkout.",
        ],
      },
      {
        heading: "Run by the client",
        points: [
          "An admin CMS and CRM for content, customers, giveaways and grading submissions.",
          "Per-section admin permissions, enforced in middleware.",
          "Tier-based giveaways and a card-grading service tracked end to end.",
        ],
      },
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
