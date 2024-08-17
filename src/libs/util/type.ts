export type TValues<T extends object> = T extends readonly unknown[] ? T[number] : T[keyof T];
