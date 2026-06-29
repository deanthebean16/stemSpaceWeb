// STEMspace Collective — search index
// Each entry is one searchable destination: a page, or a specific section within a page.
// To make a new page or section searchable, add an entry here — no other code needs to change.
//
// Fields:
//   title      - shown as the main line in search results
//   url        - page to navigate to. Append "#some-id" to land on a specific section.
//   focusId    - optional element id on the destination page to scroll to + visually focus
//                (defaults to the URL hash if present, otherwise the section just scrolls
//                to top of page)
//   description - shown as the secondary line in search results
//   keywords   - extra words/synonyms that should match this entry but aren't in the title
//                or description (e.g. abbreviations, alternate phrasing)

const SEARCH_INDEX = [
  {
    title: "Home",
    url: "index.html",
    description: "Welcome to STEMspace Collective — free summer STEM and mental wellness workshops for youth.",
    keywords: ["home", "main", "landing", "welcome"]
  },
  {
    title: "Our Mission",
    url: "index.html#mission",
    focusId: "mission",
    description: "Why we combine hands-on STEM learning with mental wellness and de-stressing activities.",
    keywords: ["mission", "about", "values", "purpose", "why"]
  },
  {
    title: "Meet the Team",
    url: "meet.html",
    description: "The students behind STEMspace Collective.",
    keywords: ["team", "staff", "volunteers", "students", "who", "people", "meet"]
  },
  {
    title: "Photo Gallery",
    url: "photogallery.html",
    description: "Photos from past workshops and events.",
    keywords: ["photos", "gallery", "pictures", "images", "memories"]
  },
  {
    title: "Workshop Schedule",
    url: "schedule.html",
    description: "Dates and times for our 2026 summer STEM and wellness workshops.",
    keywords: ["schedule", "calendar", "dates", "times", "camp", "sessions", "workshops", "summer"]
  },
  {
    title: "Our Location",
    url: "location.html",
    description: "Where to find us — address, map, and directions.",
    keywords: ["location", "address", "map", "directions", "where", "find us", "venue"]
  },
  {
    title: "Contact Us",
    url: "contact.html",
    description: "Get in touch with us by email or Instagram.",
    keywords: ["contact", "email", "instagram", "reach", "message", "support"]
  },
  {
    title: "FAQ",
    url: "faq.html",
    description: "Frequently asked questions about our workshops and programs.",
    keywords: ["faq", "questions", "help", "answers"]
  },
  {
    title: "Is it really free?",
    url: "faq.html#faq-free",
    focusId: "faq-free",
    description: "Yes! All our workshops, snacks, and take-home kits are completely free.",
    keywords: ["free", "cost", "price", "money", "faq"]
  },
  {
    title: "Can siblings attend?",
    url: "faq.html#faq-siblings",
    focusId: "faq-siblings",
    description: "Yes, as long as they each sign up individually on the Google form.",
    keywords: ["siblings", "brother", "sister", "multiple kids", "family", "faq"]
  },
  {
    title: "Do parents stay?",
    url: "faq.html#faq-parents",
    focusId: "faq-parents",
    description: "Most workshops are kids only, except the family greenhouse building session.",
    keywords: ["parents", "stay", "drop off", "dropoff", "supervise", "faq"]
  },
  {
    title: "What should children bring to the workshops?",
    url: "faq.html#faq-bring",
    focusId: "faq-bring",
    description: "Comfortable clothing, closed-toed shoes, and a water bottle are recommended.",
    keywords: ["bring", "wear", "clothing", "shoes", "water bottle", "pack", "faq"]
  },
  {
    title: "What if we can't attend?",
    url: "faq.html#faq-cant-attend",
    focusId: "faq-cant-attend",
    description: "Email stemspace.collective@gmail.com 48 hours in advance of the workshop date.",
    keywords: ["cancel", "miss", "absence", "can't attend", "cant attend", "faq"]
  },
  {
    title: "Is food provided?",
    url: "faq.html#faq-food",
    focusId: "faq-food",
    description: "Yes, snacks and drinks will be provided at every workshop.",
    keywords: ["food", "snacks", "drinks", "eat", "faq"]
  },
  {
    title: "What ages are appropriate?",
    url: "faq.html#faq-ages",
    focusId: "faq-ages",
    description: "Each session has a recommended age (typically grades 2-8), but all ages are welcome.",
    keywords: ["age", "ages", "grade", "grades", "appropriate", "how old", "faq"]
  },
  {
    title: "Register for Workshops",
    url: "https://forms.gle/7D9K2g1k4YmDVJGm7",
    description: "Sign up for our free 2026 summer STEM & mental wellness workshops.",
    keywords: ["register", "sign up", "signup", "form", "join", "apply", "enroll"]
  }
];