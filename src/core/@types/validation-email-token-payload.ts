export type ValidationEmailTokenPayload<T extends string> = {
  email: string;
  purpose: T;
};
