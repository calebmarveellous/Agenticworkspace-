export type Script = {
  id: string;
  label: string;
  hook: string;
  problemLines: string[];
  bookTitle: string;
  bookSubtitle: string;
  chapters: Array<[string, string]>;
  price: string;
  priceNote: string;
  cta: string;
  trustLine: string;
};

export const scripts: Record<"A" | "B" | "C", Script> = {
  A: {
    id: "A",
    label: "Ex Text hook",
    hook: 'STILL TEXTING YOUR EX “JUST IN CASE”?',
    problemLines: [
      "This week alone, the internet diagnosed:",
      "situationships with no name,",
      "boyfriends jealous of chatbots,",
      "and a guy who split a $14.37 bill down to the cent.",
    ],
    bookTitle: "THE GROUP CHAT DIAGNOSTIC MANUAL",
    bookSubtitle: "The comedic self-help book for your situationship",
    chapters: [
      ["01", "The Situationship Anniversary"],
      ["02", "Cushioning: The “Just In Case” Ex"],
      ["03", "Ghostlighting"],
      ["05", "My Boyfriend Is Jealous Of My AI Boyfriend"],
      ["09", "Meeting His Mom, Who Called Me “Sweetie” Like A Threat"],
      ["10", "The Bill, Split To The Exact Cent"],
    ],
    price: "₦5,000",
    priceNote: "one-time · instant PDF download",
    cta: "GET THE BOOK NOW",
    trustLine: "Funnier than your last relationship.",
  },
  B: {
    id: "B",
    label: "Group Chat hook",
    hook: "YOUR GROUP CHAT HAS DIAGNOSED YOUR RELATIONSHIP BETTER THAN ANY THERAPIST",
    problemLines: [
      "Cushioning. Ghostlighting.",
      "Love bombing, or just... nice?",
      "The internet has a name",
      "for everything you're going through.",
    ],
    bookTitle: "THE GROUP CHAT DIAGNOSTIC MANUAL",
    bookSubtitle: "10 chapters. Zero actual therapy credentials required.",
    chapters: [
      ["02", "Cushioning: The “Just In Case” Ex"],
      ["07", "Love Bombing or Just... Nice?"],
      ["09", "Meeting His Mom, Who Called Me “Sweetie” Like A Threat"],
      ["06", "The Therapy-Speak Courtroom"],
    ],
    price: "₦5,000",
    priceNote: "one-time · no subscription",
    cta: "GET IT NOW",
    trustLine: "Cheaper than the coffee you bought your situationship.",
  },
  C: {
    id: "C",
    label: "Golden Retriever vs Black Cat hook",
    hook: "GOLDEN RETRIEVER BOYFRIEND, OR BLACK CAT BOYFRIEND?",
    problemLines: [
      "14 months in and neither of you",
      "has said the word out loud.",
      "Sound familiar?",
    ],
    bookTitle: "THE GROUP CHAT DIAGNOSTIC MANUAL",
    bookSubtitle: "An unlicensed field guide to modern dating",
    chapters: [
      ["04", "Golden Retriever Boyfriend vs. Black Cat Boyfriend"],
      ["07", "Love Bombing or Just... Nice?"],
      ["08", "The 45-Minute Micro-Mance"],
      ["01", "The Situationship Anniversary"],
    ],
    price: "₦5,000",
    priceNote: "one-time · instant download",
    cta: "GET THE BOOK NOW",
    trustLine: "Funnier than your last relationship.",
  },
};
