import "./../styles/style.scss";
//Animation
import { AnimatePresence } from "framer-motion";
//Redux Setup
import { wrapper } from "../redux/store";
// Stripe js
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import Script from "next/script";
import Head from "next/head";
import Img from "next/image";
import Hotjar from '@hotjar/browser';

function MyApp({ Component, pageProps }) {
  const siteId = 3088517;
  const hotjarVersion = 6;
  Hotjar.init(siteId, hotjarVersion);
  // TODO: replace stripe test publishable key
  // const publishableKey = 'pk_test_51JXXYHGVWepdsrTJqlaUr759ZTjEy5SrAUJ9flL5qXI0kn510UWJjDge9rgmrxg0avnzvSUKq8yqZ9MGMjvU7okw00elDq8bld';
  const publishableKey =
    "pk_live_51JXXYHGVWepdsrTJl2llGE1BSyUDlql332lcvSnKO0B30PBcmAdkCWbA0ghsqRaDEFvQBfWBJNCFVeTnVlfCVIZq00LHVq3Wnh";
  const stripePromise = loadStripe(publishableKey);
  return (
    <Elements stripe={stripePromise}>
      <Head>
        <link
          href="https://assets.calendly.com/assets/external/widget.css"
          rel="stylesheet"
        />
        <meta name="facebook-domain-verification" content="9al2to2i5cb5dg0vl88khmxja68uqa" />
      </Head>
      <Script
        strategy="beforeInteractive"
        src="https://assets.calendly.com/assets/external/widget.js"
        type="text/javascript"
        async
      ></Script>
      <Script strategy="beforeInteractive">{`(function(w,r){w._rwq=r;w[r]=w[r]||function(){(w[r].q=w[r].q||[]).push(arguments)}})(window,'rewardful');`}</Script>
      <Script
        strategy="beforeInteractive"
        async
        src="https://r.wdfl.co/rw.js"
        data-rewardful="540c05"
      ></Script>
      <Script
        strategy="beforeInteractive"
        type="text/javascript"
        id="hs-script-loader"
        async
        defer
        src="//js.hs-scripts.com/21570001.js"
      ></Script>
      <Script strategy="beforeInteractive">
        {
          "!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init', '297061959239734');fbq('track', 'PageView');"
        }
      </Script>
      <noscript>
        <Img
          height="1"
          width="1"
          style="display:none"
          src="https://www.facebook.com/tr?id=297061959239734&ev=PageView&noscript=1"
        />
      </noscript>
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

          ga('create', 'UA-7CWCDC38FV-Y', 'auto');
          ga('send', 'pageview');
        `}
      </Script>
      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} />
      </AnimatePresence>
    </Elements>
  );
}

export default wrapper.withRedux(MyApp);
