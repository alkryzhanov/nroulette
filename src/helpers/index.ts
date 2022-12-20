import { ErrorDataType } from "../types";

export const getErrors = (messages: string[]): ErrorDataType => {
  return Object.fromEntries(
    messages.map((m) => {
      const index = m.indexOf(" ");
      return [m.slice(1, index - 1), m.slice(index + 1)];
    }),
  );
};
