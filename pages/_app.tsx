import Layout from "@/src/layout/layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Define the routes where you do NOT want to show the Layout (header/footer)
  const noLayoutRoutes = ["/", "/register",'/forgotpassword','/resetpassword',
    '/landing','/NotFound','/dashboard','/editprofile','/changepassword',
    ];

  // Check if the current route is in the noLayoutRoutes array
  const shouldUseLayout = !noLayoutRoutes.includes(router.pathname);

  return (
    <>
      {shouldUseLayout ? (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      ) : (
        <Component {...pageProps} />
      )}
    </>
  );
}
