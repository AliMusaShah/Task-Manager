import type { Task } from "../types/task-types"

/** Sample data for the UI only. Replace with your API data when integrating. */
export const MOCK_TASKS: Task[] = [
  {
    id: "1",
    title: "Buy groceries",
    description: "Milk, eggs, bread, spinach and a bag of rice for the week.",
    status: "OPEN",
  },
  {
    id: "2",
    title: "Finish NestJS Day 1",
    description:
      "Set up the project, create the first module and wire up a controller with a couple of routes.",
    status: "IN_PROGRESS",
  },
  {
    id: "3",
    title: "Call the bank",
    description:
      "Ask about the card replacement and update my mailing address.",
    status: "OPEN",
  },
  {
    id: "4",
    title: "Pay electricity bill",
    description: "Due on the 25th. Pay through the mobile app.",
    status: "DONE",
  },
  {
    id: "5",
    title: "Book dentist appointment",
    status: "DONE",
  },
]
