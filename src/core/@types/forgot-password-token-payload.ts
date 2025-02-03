export type ForgotPasswordTokenPayload<T extends string> = {
  email: string;
  purpose: T;
};
