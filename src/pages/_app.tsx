import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import { GoogleProfile } from "next-auth/providers/google";

import { api } from "~/utils/api";

import "~/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
      <Toaster />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
