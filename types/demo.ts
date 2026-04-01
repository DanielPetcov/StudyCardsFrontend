export interface DemoCard {
  id: string
  order: number
  question: string
  options: string[]
  correctIndex: number
}

export interface DemoAnswer {
  selectedIndex: number
  isCorrect: boolean
}

export interface DemoDeck {
  id: string
  title: string
  description: string
  icon: "beaker" | "code" | "landmark"
  cardCount: number
}
