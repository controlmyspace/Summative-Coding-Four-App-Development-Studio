// all my mock data in one file so the screens stay clean
// content is based on real flock together events and posts where possible

export const USER = {
  name: "Maya",
  city: "London",
};


export const EVENTS = [
  {
    id: "1",
    type: "Walks",
    title: "Sunrise Walk · Hampstead Heath",
    date: "Sat 23 Mar · 06:00",
    duration: "2hrs",
    going: 32,
    live: true,
    tag: "WALK",
    cta: "Just fly in",
    image: require("../assets/images/walk-sunrise.jpg"),
    description:
      "Early start, big reward. We meet at the south entrance and walk up to Parliament Hill for sunrise. Beginners welcome, spare binoculars available.",
  },
  {
    id: "2",
    type: "Walks",
    title: "Wetland Wander",
    date: "Sun 24 Mar · 09:00",
    duration: "2hrs",
    going: 15,
    live: false,
    tag: "WALK",
    cta: "Reserve your spot",
    image: require("../assets/images/walk-wetland.jpg"),
    description:
      "A slow loop around the Walthamstow Wetlands looking for waterfowl and, if we're lucky, a kingfisher.",
  },
  {
    id: "3",
    type: "Walks",
    title: "Salomon x Flock Trail Day",
    date: "Sun 24 Mar · 09:00 · Box Hill",
    duration: "4hrs",
    going: 48,
    live: false,
    tag: "PARTNER",
    cta: "Space is limited",
    image: require("../assets/images/walk-trail.jpg"),
    description:
      "Partner trail day with Salomon at Box Hill. Gear to try, ridge views, and a longer walk than usual.",
  },
  {
    id: "4",
    type: "Talks",
    title: "Urban Birding",
    date: "Tue 26 Mar · 19:30",
    duration: "1.5hrs",
    going: 50,
    live: false,
    tag: "TALK",
    cta: "Reserve your spot",
    image: require("../assets/images/talk-urban.jpg"),
    description:
      "An evening talk on spotting birds in the city, no countryside required.",
  },
  {
    id: "5",
    type: "Talks",
    title: "Why we look up: a conversation",
    date: "Tue 26 Mar · 19:30 · Brixton",
    duration: "2hrs",
    going: 80,
    live: false,
    tag: "TALK",
    cta: "Space is limited",
    image: require("../assets/images/talk-lookup.jpg"),
    description:
      "A panel conversation on nature, community and why looking up changes how we see the city.",
  },
  // diaspora walks, the flock together chapters around the world
  {
    id: "6",
    type: "Walks",
    title: "Tokyo Flock · Yoyogi Park",
    date: "Sat 14 Sept · 08:00",
    duration: "2hrs",
    going: 12,
    live: false,
    tag: "TOKYO",
    cta: "Just fly in",
    image: require("../assets/images/trip-tokyo.jpg"),
    description:
      "Our Tokyo chapter walks Yoyogi Park's wooded paths. All flocks welcome, visiting members especially.",
  },
  {
    id: "7",
    type: "Walks",
    title: "Toronto Flock · High Park",
    date: "Sat 21 Sept · 09:00",
    duration: "2.5hrs",
    going: 18,
    live: false,
    tag: "TORONTO",
    cta: "Reserve your spot",
    image: require("../assets/images/walk-wetland.jpg"),
    description:
      "The Toronto chapter's autumn walk through High Park, warblers on migration if we time it right.",
  },
  {
    id: "8",
    type: "Walks",
    title: "Milan Flock · Parco Sempione",
    date: "Sun 22 Sept · 08:30",
    duration: "2hrs",
    going: 9,
    live: false,
    tag: "MILAN",
    cta: "Reserve your spot",
    image: require("../assets/images/walk-trail.jpg"),
    description:
      "Milan's flock meets at the Arco della Pace for a gentle loop of Parco Sempione.",
  },
];

// poll options, PollCard copies these into state so the counts can change
export const POLL = {
  question: "Where should we walk in April?",
  closes: "Closes Sun 23:59 · 4 days left",
  totalVoters: 300,
  options: [
    { id: "a", label: "Richmond Park · deer + parakeets", votes: 186 },
    { id: "b", label: "Walthamstow Wetlands · waterfowl", votes: 66 },
    { id: "c", label: "Box Hill · ridge views", votes: 33 },
    { id: "d", label: "Lea Valley · kingfishers", votes: 15 },
  ],
};

export const CLOSED_POLL = {
  question: "Which beginner binoculars should we recommend?",
  winner: "Nikon Aculon · 412 votes",
};


export const FACTS = [
  { id: "fa1", text: "Robins can sing at night under streetlights.", by: "Amara", votes: 14 },
  { id: "fa2", text: "A kestrel can spot a beetle from 50m away.", by: "Dev", votes: 9 },
  { id: "fa3", text: "Magpies recognise themselves in mirrors.", by: "Joel", votes: 7 },
];

export const FORUM_POSTS = [
  { id: "f0", title: "How to build a DIY bird feeder at home", meta: "DIY · 18 replies", thread: true },
  { id: "f4", title: "Opportunity: student documentary about birds, want to be involved?", meta: "Opportunities · by Lena · 9 replies" },
  { id: "f1", title: "Best optics for beginners?", meta: "Gear · 24 replies" },
  { id: "f2", title: "Spotted: Kingfisher at Regent's Canal", meta: "Sightings · 12 replies" },
  { id: "f3", title: "Anyone driving to Box Hill on Sunday?", meta: "Lifts · 6 replies" },
];

export const THREAD = {
  title: "How to build a DIY bird feeder at home",
  meta: "DIY · started by Nadia · 18 replies",
  replies: [
    {
      id: "r1",
      author: "Nadia",
      text: "Starting this thread because my balcony feeder finally has regulars! Share your builds, tips and links below 🐦",
    },
    {
      id: "r2",
      author: "Marcus",
      text: "These are the dimensions that worked for me, the 1.5\" opening keeps the pigeons out:",
      image: require("../assets/images/thread-dimensions.jpg"),
    },
    {
      id: "r3",
      author: "Priya",
      text: "Made one entirely from old wine corks! Waterproof and the robins love it.",
      image: require("../assets/images/thread-corkhouse.jpg"),
    },
    {
      id: "r4",
      author: "Joel",
      text: "Tip: keep it 2m+ off the ground and away from fences cats can climb. The RSPB guide is great: rspb.org.uk/feeding-birds",
    },
  ],
};

// bird directory
export const BIRDS = [
  {
    id: "b1",
    name: "Robin",
    latin: "Erithacus rubecula",
    fact: "Sings all year round, even at night under streetlights.",
    image: require("../assets/images/bird-robin.jpg"),
    archive: true,
  },
  {
    id: "b2",
    name: "Blue Tit",
    latin: "Cyanistes caeruleus",
    fact: "Can hang upside down from branches to feed.",
    image: require("../assets/images/bird-bluetit.jpg"),
  },
  {
    id: "b3",
    name: "Great Spotted Woodpecker",
    latin: "Dendrocopos major",
    fact: "Drums on trees up to 40 times per second.",
    image: require("../assets/images/bird-woodpecker.jpg"),
  },
  {
    id: "b4",
    name: "Goldfinch",
    latin: "Carduelis carduelis",
    fact: "A group of goldfinches is called a 'charm'.",
    image: require("../assets/images/bird-goldfinch.jpg"),
  },
  {
    id: "b5",
    name: "Kestrel",
    latin: "Falco tinnunculus",
    fact: "Hovers perfectly still in the air while hunting.",
    image: require("../assets/images/bird-kestrel.jpg"),
  },
  {
    id: "b6",
    name: "Magpie",
    latin: "Pica pica",
    fact: "One of the few animals that recognises itself in a mirror.",
    image: require("../assets/images/bird-magpie.jpg"),
  },
];

// community archive for the robin
export const ROBIN_ARCHIVE = {
  photos: [
    { id: "p1", by: "Maya", image: require("../assets/images/bird-robin.jpg") },
    { id: "p2", by: "Dev · 'built a nest on my porch!'", image: require("../assets/images/robin-nest.jpg") },
    { id: "p3", by: "Amara · 'visits my window every morning'", image: require("../assets/images/robin-window.jpg") },
    { id: "p4", by: "Joel · field sketches", image: require("../assets/images/robin-sketch.jpg") },
  ],
  observations: [
    { id: "o1", text: "Regent's Canal, 12 Mar, singing before sunrise", by: "Amara" },
    { id: "o2", text: "Hampstead Heath, 23 Mar, followed our group for 20 mins", by: "Maya" },
    { id: "o3", text: "Walthamstow Wetlands, 24 Mar, pair gathering moss", by: "Priya" },
  ],
  // recordings cant actually play, audio needs expo-av + mic permissions
  // which is future development, but the archive structure itself is real
  recordings: [
    { id: "s1", name: "Dawn song · Hampstead Heath", length: "0:42", by: "Dev" },
    { id: "s2", name: "Evening call · Regent's Canal", length: "0:18", by: "Amara" },
  ],
  facts: [
    { id: "ft1", text: "Both male and female robins sing, which is unusual for UK birds.", by: "Joel" },
    { id: "ft2", text: "In folklore, a robin at your window carries messages from loved ones.", by: "Priya" },
    { id: "ft3", text: "They follow birdwatchers hoping we'll turn up worms.", by: "Dev" },
  ],
};


export const BOOK = {
  title: "Outsiders",
  subtitle: "Reclaim your place in nature",
  authors: "Nadeem Perera & Ollie Olanipekun",
  image: require("../assets/images/book-outsiders.jpg"),
  blurb:
    "Written by the founders of Flock Together, Outsiders is part manifesto, part guide: why nature belongs to all of us, and how to take your place in it. Every copy sold supports the collective's free walks.",
};

export const CONTENT = [
  { id: "c2", kind: "Watch", title: "Flock Together: Birdsong", source: "Short documentary" },
  { id: "c3", kind: "Listen", title: "Tweet of the Day", source: "BBC Radio 4 podcast" },
  { id: "c7", kind: "Listen", title: "Birdsong Basics", source: "Learn 5 common songs" },
  { id: "c4", kind: "Read", title: "Bird Therapy", source: "by Joe Harkness" },
  { id: "c8", kind: "Read", title: "Flock Together Manifesto", source: "flocktogether.world" },
  { id: "c5", kind: "Visit", title: "The Birds Gallery", source: "Natural History Museum · free · nhm.ac.uk" },
  { id: "c6", kind: "Visit", title: "Walthamstow Wetlands", source: "Free entry · open daily" },
  { id: "c9", kind: "Visit", title: "London Wetland Centre", source: "Barnes, SW London" },
];

// profile stuff
export const MY_WALKS = [
  { id: "w1", title: "Sunrise Walk · Hampstead Heath", date: "23 Mar 2026" },
  { id: "w2", title: "Wetland Wander", date: "16 Feb 2026" },
  { id: "w3", title: "Epping Forest Amble", date: "12 Jan 2026" },
];

export const MY_PHOTOS = [
  { id: "mp1", image: require("../assets/images/bird-robin.jpg") },
  { id: "mp2", image: require("../assets/images/robin-window.jpg") },
  { id: "mp3", image: require("../assets/images/walk-sunrise.jpg") },
  { id: "mp4", image: require("../assets/images/bird-goldfinch.jpg") },
];

export const ABOUT_CARDS = [
  {
    id: "a1",
    kicker: "OUR PHILOSOPHY",
    text: "Nature belongs to everyone. Flock Together exists so people of colour can take up space outdoors. Together, safely, joyfully. Every walk is free, every level is welcome.",
  },
  {
    id: "a2",
    kicker: "ABOUT FLOCK TOGETHER",
    text: "Founded in London in 2020 by Ollie Olanipekun and Nadeem Perera, Flock Together began as a birdwatching club and grew into a worldwide collective with chapters from Tokyo to Toronto.",
  },
];

export const FAQS = [
  { id: "q1", q: "Do I need binoculars?", a: "No, we always bring spares to share." },
  { id: "q2", q: "Are walks really free?", a: "Always. Nature belongs to everyone." },
  { id: "q3", q: "I've never birdwatched before.", a: "Perfect, most of us hadn't either. Walk leaders look after beginners." },
  { id: "q4", q: "Can I bring a friend?", a: "Yes! Just have them join the flock in the app." },
];
