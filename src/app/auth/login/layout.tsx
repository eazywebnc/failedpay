import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | FailedPay",
  description: "Sign in to recover your failed Stripe payments",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
