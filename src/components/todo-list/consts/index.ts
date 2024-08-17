import type { TValues } from "@libs/util/type";

export interface Todo {
  id: string;
  content: string;
  completed: boolean;
}

export const TAB_STATE = {
  ALL: "All",
  ACTIVE: "Active",
  COMPLETED: "Completed",
} as const;

export type TabState = TValues<typeof TAB_STATE>;
