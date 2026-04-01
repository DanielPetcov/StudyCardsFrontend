import { Beaker, Code, Landmark } from "lucide-react"
import { DemoCard, DemoDeck } from "@/types"

export const DEMO_CARDS: DemoCard[] = [
  {
    id: "dc-1",
    order: 0,
    question: "What is the powerhouse of the cell?",
    options: ["Nucleus", "Mitochondria", "Ribosome", "Golgi Apparatus"],
    correctIndex: 1,
  },
  {
    id: "dc-2",
    order: 1,
    question: "Which organelle is responsible for protein synthesis?",
    options: ["Lysosome", "Smooth ER", "Ribosome", "Plasma Membrane"],
    correctIndex: 2,
  },
  {
    id: "dc-3",
    order: 2,
    question:
      "What structure surrounds the cell and controls what enters and exits?",
    options: ["Cell Wall", "Cytoplasm", "Nuclear Envelope", "Plasma Membrane"],
    correctIndex: 3,
  },
  {
    id: "dc-4",
    order: 3,
    question: "Which organelle contains the cell's genetic material?",
    options: ["Vacuole", "Nucleus", "Centrosome", "Peroxisome"],
    correctIndex: 1,
  },
  {
    id: "dc-5",
    order: 4,
    question:
      "What is the jelly-like substance that fills the interior of the cell?",
    options: ["Cytoplasm", "Nucleoplasm", "Stroma", "Matrix"],
    correctIndex: 0,
  },
]

export const DEMO_DECKS: DemoDeck[] = [
  {
    id: "dd-1",
    title: "Biology 101 — Cell Structure",
    description:
      "Comprehensive flashcards covering cell organelles, membranes, and cellular functions.",
    icon: "beaker",
    cardCount: 24,
  },
  {
    id: "dd-2",
    title: "JavaScript Fundamentals",
    description:
      "Core concepts of JavaScript including closures, promises, and the event loop.",
    icon: "code",
    cardCount: 18,
  },
  {
    id: "dd-3",
    title: "World History — Renaissance",
    description:
      "Key events, figures, and cultural movements of the European Renaissance period.",
    icon: "landmark",
    cardCount: 15,
  },
]

export const TESTIMONIALS_DATA = [
  {
    key: "t1",
    avatar: "https://i.pravatar.cc/100?img=47",
    initials: "MI",
  },
  {
    key: "t2",
    avatar: "https://i.pravatar.cc/100?img=12",
    initials: "AP",
  },
  {
    key: "t3",
    avatar: "https://i.pravatar.cc/100?img=26",
    initials: "ED",
  },
]

export const DECK_ICONS = {
  beaker: Beaker,
  code: Code,
  landmark: Landmark,
}
