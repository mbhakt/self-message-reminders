import type { backendInterface } from "../backend";

const sampleMessages = [
  {
    id: BigInt(1),
    content: "Grocery list: Milk, Eggs, Bread, Coffee",
    timestamp: BigInt(Date.now() - 1000 * 60 * 60 * 2) * BigInt(1_000_000),
  },
  {
    id: BigInt(2),
    content: "Reminder: Team Meeting at 2:00 PM",
    timestamp: BigInt(Date.now() - 1000 * 60 * 90) * BigInt(1_000_000),
  },
  {
    id: BigInt(3),
    content: "Remember to pay utility bill today",
    timestamp: BigInt(Date.now() - 1000 * 60 * 60) * BigInt(1_000_000),
  },
  {
    id: BigInt(4),
    content: "Pick up dry cleaning after work 👔",
    timestamp: BigInt(Date.now() - 1000 * 60 * 30) * BigInt(1_000_000),
  },
];

const sampleTemplates = [
  {
    id: BigInt(1),
    name: "Project Update",
    text: "Status, Progress, Blockers",
  },
  {
    id: BigInt(2),
    name: "Workout Plan",
    text: "Mon: Legs, Wed: Cardio, Fri: Upper",
  },
  {
    id: BigInt(3),
    name: "Daily Goals",
    text: "1. Priority task\n2. Email follow-ups\n3. Exercise",
  },
];

export const mockBackend: backendInterface = {
  listMessages: async () => sampleMessages,
  listTemplates: async () => sampleTemplates,
  sendMessage: async (content: string) => ({
    id: BigInt(Date.now()),
    content,
    timestamp: BigInt(Date.now()) * BigInt(1_000_000),
  }),
  deleteMessage: async (_id) => true,
  createTemplate: async (name: string, text: string) => ({
    id: BigInt(Date.now()),
    name,
    text,
  }),
  updateTemplate: async (_id, _name, _text) => true,
  deleteTemplate: async (_id) => true,
};
