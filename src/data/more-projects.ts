export type Section = {
  heading: string;
  body?: string;
  points?: string[];
  /** A small results table: first row is the header. */
  table?: string[][];
  /** A short code or data sample, shown monospaced. */
  code?: string;
  caption?: string;
};

export type MiniProject = {
  slug: string;
  title: string;
  kind: string;
  year?: string;
  /** One number that sums the project up. */
  stat: { value: string; label: string };
  summary: string;
  tags: string[];
  github?: string;
  link?: string;
  note?: string;
  sections: Section[];
};

export const moreProjects: MiniProject[] = [
  {
    slug: "sudoku",
    title: "Sudoku solver and generator",
    kind: "Algorithms · C++",
    year: "2023",
    stat: { value: "81 vs 69M", label: "nodes visited, Dancing Links vs backtracking" },
    summary:
      "Three solvers for the same puzzles, from plain backtracking to Knuth's Dancing Links, plus a generator that only ever produces puzzles with exactly one solution.",
    tags: ["C++", "Algorithm X", "Dancing Links", "Exact cover", "Benchmarking"],
    github: "https://github.com/MubashirTanwar/Sudoku",
    sections: [
      {
        heading: "Three solvers",
        points: [
          "Backtracking: take the first empty cell, try 1–9, and check each digit by scanning its row, column and box (27 cells) every time.",
          "Fast backtracking: the same search, but with rowUsed[9][10], colUsed[9][10] and boxUsed[9][10] lookup tables, so checking a digit is 3 array reads instead of a 27-cell scan.",
          "Dancing Links (DLX): Sudoku as an exact-cover problem, solved with Knuth's Algorithm X.",
        ],
      },
      {
        heading: "Sudoku as exact cover",
        body: "Every placement \"digit d in row r, column c\" is one of 729 candidate rows, and each one satisfies exactly four of 324 constraint columns: the cell is filled, the row has d, the column has d, and the box has d. A solved grid is a set of rows that covers every column exactly once.",
        points: [
          "Algorithm X always branches on the column with the fewest remaining options (Knuth's S heuristic), so forced moves are taken first and most guesses never happen.",
          "Dancing links make covering and uncovering a column O(1): removed nodes keep their own left/right/up/down pointers, so undoing a choice is just relinking them.",
          "Implemented with flat int arrays (L, R, U, D, column-of, row-id) instead of heap-allocated nodes: 325 column headers plus 4 nodes per candidate row.",
        ],
      },
      {
        heading: "Results",
        table: [
          ["Puzzle", "Solver", "Time", "Nodes"],
          ["\"Evil\": built to break backtracking", "Backtracking", "1,945.7 ms", "69,175,316"],
          ["", "Fast backtracking", "530.2 ms", "69,175,316"],
          ["", "Dancing Links", "0.032 ms", "81"],
          ["AI Escargot (23 clues)", "Backtracking", "0.683 ms", "8,969"],
          ["", "Fast backtracking", "0.252 ms", "8,969"],
          ["", "Dancing Links", "0.111 ms", "168"],
        ],
        caption:
          "The lookup tables give a steady 4–5x speedup at identical node counts. On the evil puzzle DLX visits 81 nodes, one per cell: it never backtracks at all.",
      },
      {
        heading: "Generator with guaranteed unique puzzles",
        points: [
          "Fill the three diagonal boxes with random permutations first: they share no row, column or box, so no checks are needed, and they make the rest of the grid fast to complete.",
          "Solve the rest, then remove cells in random order. A cell stays removed only if DLX, counting solutions with a limit of 2, still finds exactly one.",
          "Difficulty is the number of clues left: easy 40, medium 32, hard 26.",
        ],
      },
    ],
  },
  {
    slug: "timetable",
    title: "Timetable generator",
    kind: "Optimisation · Python",
    year: "2023–24",
    stat: { value: "0 clashes", label: "72 lectures placed in about 30 seconds" },
    summary:
      "A genetic algorithm for the University Course Timetabling Problem: give every lecture a time slot and a room so that nobody is in two places at once.",
    tags: ["Python", "Genetic algorithms", "Constraint optimisation", "No dependencies"],
    github: "https://github.com/MubashirTanwar/Timetable",
    sections: [
      {
        heading: "The problem",
        body: "The sample department has 6 student groups, 10 teachers, 5 rooms and 25 courses, which expand into 72 weekly lectures to place on a 5-day, 6-period grid (30 slots). Each lecture is one event, and a candidate timetable is simply a list of [slot, room] pairs, one per event.",
      },
      {
        heading: "Fitness as weighted penalties",
        table: [
          ["Constraint", "Type", "Penalty"],
          ["Two events in one room at the same time", "Hard", "1000"],
          ["A teacher in two places at once", "Hard", "1000"],
          ["A student group in two places at once", "Hard", "1000"],
          ["Room smaller than the class", "Hard", "1000"],
          ["Teacher scheduled when unavailable", "Hard", "1000"],
          ["Same course twice in one day", "Soft", "3"],
          ["Teacher outside their preferred slots", "Soft", "2"],
          ["A free period stuck between a group's classes", "Soft", "1"],
        ],
        caption: "Because a single clash outweighs every soft penalty combined, the search always removes clashes first and only then polishes quality.",
      },
      {
        heading: "The genetic algorithm",
        points: [
          "Population of 150, single-point crossover, top-10 elitism, and parents drawn from the best 50.",
          "Targeted mutation: the fitness function also returns which events are involved in hard violations, and about 70% of mutations move those events instead of random ones. This was the change that made convergence fast.",
          "Escaping local optima: if the best score hasn't improved for 40 generations, the mutation rate triples (from 4% to 12%) until it does.",
        ],
      },
      {
        heading: "Output",
        body: "It reliably reaches zero hard violations in about 30 seconds, usually with a handful of soft points left. It prints the penalty breakdown and weekly timetables for every group and every teacher, and plots the convergence curve if matplotlib is installed.",
        code: "final penalty: 12\nno clashes! remaining penalty is just soft stuff (gaps/preferences)\nviolation breakdown: {'teacher preference': 5, 'gaps': 2}",
      },
    ],
  },
  {
    slug: "marathi-ocr",
    title: "Marathi OCR",
    kind: "Machine learning · National Informatics Centre",
    year: "2024",
    stat: { value: "83%", label: "accuracy, used to digitise government letters" },
    summary:
      "A TrOCR vision encoder-decoder fine-tuned to read Marathi documents received by the NIC office, with the dataset built from scratch.",
    tags: ["PyTorch", "Hugging Face Transformers", "TrOCR", "ViT", "Marathi-BERT", "Django", "Elasticsearch"],
    github: "https://github.com/MubashirTanwar/TrOCR",
    sections: [
      {
        heading: "Model",
        points: [
          "TrOCR's encoder-decoder design with a Google ViT encoder (vit-base-patch16-224), which reads the image as a sequence of 16×16 patches, and L3Cube's Marathi-BERT-v2 as the text decoder.",
          "Fine-tuned in PyTorch with Hugging Face Transformers, reaching 83% accuracy on the office's letters.",
        ],
      },
      {
        heading: "Dataset",
        points: [
          "There was no usable Marathi OCR dataset, so I built one from scanned documents, with line-level and word-level image-text pairs.",
          "A semi-supervised pipeline automated about 90% of the labelling, growing the corpus to 135,000+ pairs.",
          "Part of it is public in the repo: 2,671 line images and 8,077 word images, raw and preprocessed, each with a CSV of file name and text.",
        ],
      },
      {
        heading: "In production",
        body: "A Django API wraps the model for PDF OCR, with Elasticsearch-backed deduplication so the same document isn't processed twice. It passed an alpha test in the NIC Mumbai office.",
      },
    ],
  },
  {
    slug: "unilosa",
    title: "Unilosa CRM",
    kind: "Freelance · CRM",
    stat: { value: "Salesforce", label: "replaced with a custom CRM" },
    summary: "A CRM built for an export-trading company to replace their Salesforce setup.",
    tags: ["TypeScript", "Node.js"],
    sections: [],
  },
  {
    slug: "auctionworld",
    title: "AuctionWorld",
    kind: "Freelance · Subscription auctions",
    stat: { value: "3 channels", label: "notified in parallel" },
    summary: "An auction platform where members bid with subscription credits.",
    tags: ["Node.js", "Job queues", "WhatsApp API", "Web Push"],
    note: "No longer online",
    sections: [
      {
        heading: "Bidding",
        points: [
          "Bids are validated and charged against the bidder's credits atomically, so two bids can never spend the same credits.",
          "If a winner doesn't claim their item, the win cascades to the next-highest bidder.",
        ],
      },
      {
        heading: "Notifications",
        points: [
          "Reminder jobs run through a queue and fan out over WhatsApp, web push and in-app at the same time, so one failing channel never blocks the others.",
          "Dead push subscriptions are pruned automatically.",
          "Unpaid checkouts get a single WhatsApp reminder, processed in batches.",
        ],
      },
    ],
  },
];
