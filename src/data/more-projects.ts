export type MiniProject = {
  title: string;
  kind: string;
  year?: string;
  /** One number that sums the project up. */
  stat: { value: string; label: string };
  summary: string;
  points: string[];
  tags: string[];
  github?: string;
  link?: string;
  note?: string;
};

export const moreProjects: MiniProject[] = [
  {
    title: "Unilosa CRM",
    kind: "Freelance · CRM that replaced Salesforce",
    stat: { value: "9 roles", label: "with row-level access" },
    summary: "A CRM built solo for an export-trading company, replacing their Salesforce setup.",
    points: [
      "Strict RBAC across sales, documentation and accounts: sales execs see only their own orders, country managers their country's, and accounts is split into makers and approvers.",
      "Salesforce formula fields ported to TypeScript, plus real-time chat on the same Redis-buffered design as Prana's.",
      "Export paperwork (invoices, packing lists, bills of lading, COAs) rendered from EJS templates to PDF with Puppeteer.",
    ],
    tags: ["TypeScript", "Node.js", "Redis", "Puppeteer", "RBAC"],
  },
  {
    title: "AuctionWorld",
    kind: "Freelance · Subscription auction platform",
    stat: { value: "3 channels", label: "notified in parallel" },
    summary: "An auction platform where members bid with subscription credits.",
    points: [
      "Bids are validated and charged against the bidder's credits atomically; an unclaimed win cascades to the next-highest bidder.",
      "Reminder jobs run through a queue and fan out over WhatsApp, web push and in-app at once, so one failing channel never blocks the others. Dead push subscriptions are pruned automatically.",
      "Unpaid checkouts get one WhatsApp reminder, processed in batches.",
    ],
    tags: ["Node.js", "Job queues", "WhatsApp API", "Web Push"],
    note: "No longer online",
  },
  {
    title: "Sudoku",
    kind: "Solver and generator",
    year: "2023",
    stat: { value: "81 vs 69M", label: "nodes visited, DLX vs backtracking" },
    summary: "Backtracking benchmarked against Knuth's Dancing Links on a puzzle built to break it.",
    points: [
      "Algorithm X over a 324-constraint exact-cover matrix: on the hard puzzle, DLX visits 81 nodes in 0.03ms where backtracking visits 69 million in 1.9s.",
      "The generator seeds the diagonal boxes and uses DLX to guarantee every puzzle has exactly one solution.",
    ],
    tags: ["C++", "Dancing Links", "Exact cover"],
    github: "https://github.com/MubashirTanwar/Sudoku",
  },
  {
    title: "Timetable generator",
    kind: "University course timetabling (UCTP)",
    year: "2023–24",
    stat: { value: "0 clashes", label: "72 lectures in ~30s" },
    summary: "A genetic algorithm that schedules a university's week without conflicts.",
    points: [
      "Room, instructor and student-group clashes are hard constraints; preferences and gaps are soft, all as weighted penalties.",
      "Mutation targets the events causing clashes, and adapts its rate to escape local optima.",
    ],
    tags: ["Python", "Genetic algorithms", "Optimisation"],
    github: "https://github.com/MubashirTanwar/Timetable",
  },
  {
    title: "Marathi handwriting OCR",
    kind: "National Informatics Centre",
    year: "2024",
    stat: { value: "83%", label: "accuracy on handwritten letters" },
    summary: "A TrOCR model that reads handwritten Marathi government letters.",
    points: [
      "Fine-tuned a Vision Encoder-Decoder (ViT encoder + Marathi-BERT-v2 decoder) in PyTorch and Hugging Face.",
      "Automated 90% of labelling to build a corpus of 135,000+ line- and word-level image-text pairs.",
      "A Django OCR API with Elasticsearch-backed deduplication passed an alpha test in the NIC Mumbai office.",
    ],
    tags: ["PyTorch", "Hugging Face", "Django", "Elasticsearch"],
    github: "https://github.com/MubashirTanwar/TrOCR",
  },
];
