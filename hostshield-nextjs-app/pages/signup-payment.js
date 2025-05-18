import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
//Components
//----Radio Button
import { RadioGroup } from "@headlessui/react";
//----Date Picker
// import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//----Icons
import { MdKeyboardArrowLeft } from "react-icons/md";
//Payment Logos
import {
  AmericanExpress,
  VisaCard,
  MasterCard,
  MaestroCard,
  PayPal,
} from "../src/components/payment-methods/paymenticons";
//----Logo
import Logo from "../src/components/header/logo";
//----Backgrounds
import TransparentShieldBg from "../src/components/background/transparent-hostshield-bg";
//----Styled
import styled from "styled-components";
//----Animations
import { motion } from "framer-motion";
import { pageAnimation } from "../src/components/animation/index";
// Stripe.js
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import StatusMessages, {
  useMessages,
} from "../src/components/status-messages/StatusMessages";
import { PUBLIC_API_KEY } from "./../utils";

export default function SignUpPayment() {
  const router = useRouter();
  const [selected, setSelected] = useState("defense");
  const [americanExpressSelected, setAmericanExpressSelected] = useState(true);
  const [visaSelected, setVisaSelected] = useState(true);
  const [masterCardSelected, setMasterCardSelected] = useState(true);
  const [maestroCardSelected, setMaestroCardSelected] = useState(true);
  const [paypaylSelected, setPaypalSelected] = useState(true);
  // const [date, setDate] = useState("");
  const [checkme, setCheckMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // TODO: add infrastructure to call stripe api
  // stripe infrastructure
  const stripe = useStripe();
  const elements = useElements();
  const [messages, addMessage] = useMessages();
  // --stripe infrastructure

  const [checkCoupon, setCheckCoupon] = useState({ amount_off: 0 });

  const [count, setCount] = useState(1);
  const [couponCode, setCouponCode] = useState("");
  const [total, setTotal] = useState();

  let incrementCount = () => {
    setCount(count + 1);
  };
  let decrementCount = () => {
    setCount(count - 1);
  };
  let amount = 39.99;
  const plans = [
    // {
    //   id: 1,
    //   name: "HostShield Lite",
    //   amount: "$19.99 / per month per property",
    //   value: "lite",
    // },
    {
      id: 2,
      name: "HostShield With Waiver Defense",
      amount: "$39.99 / per month per property",
      value: "defense",
    },
    // flat rate plan is not needed for now
    // {
    //   id: 3,
    //   name: "Entity Formation",
    //   amount: "$250 / flat rate",
    //   value: "entity",
    // },
  ];

  const findSelectedPaymentMethod = () => {
    if (americanExpressSelected) {
      return "american";
    }
    if (visaSelected) {
      return "visa";
    }
    if (masterCardSelected) {
      return "master";
    }
    if (maestroCardSelected) {
      return "maestro";
    }
    if (paypaylSelected) {
      return "paypal";
    }
    return "";
  };

  // const handleOnSubmit = (event) => {
  //   event.preventDefault();
  //   const {target} = event;
  //   const {form} = target;
  //   const plan = selected;
  //   const paymentMethod = findSelectedPaymentMethod();
  //   const cardholder = form['3'].name === 'cc-name' ? form['3'].value: '';
  //   const cardNumber = form['4'].name === 'cc-number' ? form['4'].value : '';
  //   const validTill = form['5'].name === 'cc-exp' ? form['5'].value : '';
  //   const cvv = form['6'].name === 'cc-csc' ? form['6'].value : '';

  //   // TODO: send data to BE
  //   const url = 'ENTER_SOME_URL';
  //   fetch(url, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       plan,
  //       paymentMethod,
  //       cardholder,
  //       cardNumber,
  //       validTill,
  //       cvv
  //     })
  //   }).then(response => {
  //     // TODO: handle response
  //     console.log(response);
  //     // window.location = "/registration-success";
  //   }).catch(error => console.error(error));
  // }

  //PAYPAL ICON
  // {paypaylSelected == false && (
  //   <PayPal
  //     className="cursor-pointer border py-2.5 px-2 rounded-sm border-gray-200 w-20 h-12 mr-1.5"
  //     colored={paypaylSelected}
  //     onClick={() => {
  //       setAmericanExpressSelected(false);
  //       setMasterCardSelected(false);
  //       setMaestroCardSelected(false);
  //       setPaypalSelected(!paypaylSelected);
  //       setVisaSelected(false);
  //     }}
  //   />
  // )}
  // {paypaylSelected && (
  //   <PayPal
  //     className="cursor-pointer border py-2.5 px-2 rounded-sm border-gray-200 w-20 h-12 mr-1.5"
  //     colored={paypaylSelected}
  //     onClick={() => {
  //       setAmericanExpressSelected(false);
  //       setMasterCardSelected(false);
  //       setMaestroCardSelected(false);
  //       setPaypalSelected(!paypaylSelected);
  //       setVisaSelected(false);
  //     }}
  //   />
  // )}

  const handleOnSubmit = async (e) => {
    try {
      const userItem = JSON.parse(localStorage.getItem("user"));
      // We don't want to let default form submission happen here,
      // which would refresh the page.
      e.preventDefault();
      setIsLoading(true);
      addMessage("Updating...");

      if (
        !stripe ||
        !elements ||
        (selected !== "lite" && selected !== "defense")
      ) {
        // Stripe.js has not yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        setIsLoading(false);
        return;
      }

      const result = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
        billing_details: {
          email: userItem.value.email, // TODO: replace email value with username value
        },
      });

      if (result.error) {
        console.error(result.error.message);
        setIsLoading(false);
      } else {
        // TODO: replace email value with username value
        const res = await fetch(
          `${PUBLIC_API_KEY}${
            selected === "lite" ? "/subscribe-plan-1" : "/subscribe-plan-2"
          }`,
          {
            method: "POST",
            credentials: 'include',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              payment_method: result.paymentMethod.id,
              username: userItem.value.username,
              email: userItem.value.email,
              quantity: count,
              couponCode: couponCode.toUpperCase(),
            }),
          }
        );
        // eslint-disable-next-line camelcase
        res.json().then((data) => {
          const { client_secret, status } = data;

          if (status === "requires_action") {
            stripe.confirmCardPayment(client_secret).then(function (result) {
              if (result.error) {
                addMessage(result.error);
                // Display error message in your UI.
                // The card was declined (i.e. insufficient funds, card has expired, etc)
              } else {
                addMessage("Success");
                // Show a success message to your customer
              }
              setIsLoading(false);
            });
          } else {
            addMessage("Success");
            setIsLoading(false);
            router.push("/registration-success");
            // No additional information was needed
            // Show a success message to your customer
          }
        });
      }
    } catch (err) {
      setIsLoading(false);
      console.error(err);
    }
  };
  const downloadTerms = () => {
    fetch("terms.pdf", {
      method: "GET",
      headers: {
        "content-type": "application/pdf",
      },
    })
      .then((response) => {
        response.blob().then((blob) => {
          const newBlob = new Blob([blob]);
          const blobUrl = window.URL.createObjectURL(newBlob);
          const link = document.createElement("a");
          link.href = blobUrl;
          link.setAttribute("download", `terms.pdf`);
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);

          window.URL.revokeObjectURL(blob);
        });
      })
      .catch((err) => console.error(err));
  };
  const downloadPrivacy = () => {
    fetch("privacy.pdf", {
      method: "GET",
      headers: {
        "content-type": "application/pdf",
      },
    })
      .then((response) => {
        response.blob().then((blob) => {
          const newBlob = new Blob([blob]);
          const blobUrl = window.URL.createObjectURL(newBlob);
          const link = document.createElement("a");
          link.href = blobUrl;
          link.setAttribute("download", `privacy.pdf`);
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);

          window.URL.revokeObjectURL(blob);
        });
      })
      .catch((err) => console.error(err));
  };
  const checkCouponEvent = async (code) => {
    code = code.toUpperCase();
    const res = await fetch("https://api.stripe.com/v1/coupons/" + code, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Bearer " +
          "API_KEY",
      },
    });
    res.json().then((data) => {
      if (data.error) {
        setCheckCoupon({ amount_off: 0 });
      } else {
        setCheckCoupon(data);
      }
    });
  };
  useEffect(() => {
    if (router.query.coupon) {
      setCouponCode(router.query.coupon);
      checkCouponEvent(router.query.coupon);
    }
  }, [router]);

  return (
    <div className="min-h-screen">
      <Head>
        <title>SignUp Payment | HostShield</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <motion.section
        className=""
        exit="exit"
        variants={pageAnimation}
        initial="hidden"
        animate="show"
      >
        <div className="flex flex-col lg:flex-row md:min-h-screen bg-section-gradient">
          <div className="min-h-screen order-2 md:order-1 lg:w-2/5 bg-white p-5 flex flex-col justify-between lg:rounded-r-4xl">
            <div>
              <MdKeyboardArrowLeft className="inline-block text-xl" />
              <Link href="/">
                <a className="text-sm font-semibold text-site-dark">
                  Back To Home
                </a>
              </Link>
            </div>
            <div className="flex flex-col justify-evenly mt-16 lg:mt-12">
              {/*<div className="container">
                <div className="card">
                  <div className="main">
                    <div className="co-img">
                      {/*<img
                        src="https://shieldmyrental.com/src/images/hostshield-symbol-black.svg"
                        alt=""
                      />
                    </div>
                    <div className="vertical"></div>
                    <div className="content">
                      <h2>HOSTSHIELD</h2>
                      <h1>
                        {" "}
                        SETUP FEE <span>Coupon</span>
                      </h1>
                      <p>Waive $199.9 Setup fee</p>
                    </div>
                  </div>
                  <div className="copy-button">
                    <input
                      id="copyvalue"
                      type="text"
                      readOnly
                      defaultValue="24HOURS"
                    />
                    <button  className="copybtn">
                      COPY
                    </button>
                  </div>
                </div>
              </div>*/}

              <div>
                <h1 className="text-4xl md:text-5xl font-medium text-center text-site-dark">
                  Create Account
                </h1>
              </div>
              <form className="space-y-6 mx-auto w-full md:w-8/12 lg:w-10/12 xl:w-11/12 2xl:w-7/12">
                <input type="hidden" name="agree" value={checkme} />
                <input type="hidden" name="plan_selected" value={selected} />
                <div className="mt-5">
                  <div className="flex space-y-1 flex-col justify-center">
                    <label
                      className="text-gray-500 text-base mb-2"
                      htmlFor="email-address"
                    >
                      Choose a plan
                    </label>
                    <RadioGroup
                      name="plan"
                      value={selected}
                      onChange={setSelected}
                    >
                      <div className="space-y-4">
                        {plans.map((plan) => (
                          <RadioGroup.Option
                            key={plan.id}
                            value={plan.value}
                            className={({ active, checked }) =>
                              `${
                                active
                                  ? "ring-1  ring-site-main ring-opacity-60 bg-site-main bg-opacity-5 "
                                  : ""
                              } ${
                                checked
                                  ? "ring-1 ring-site-main bg-site-main bg-opacity-5 text-site-main"
                                  : "ring-1 ring-gray-300 bg-white text-site-dark text-opacity-75"
                              } relative rounded-sm px-5 py-2 cursor-pointer flex focus:outline-none`
                            }
                          >
                            {({ active, checked }) => (
                              <>
                                <div className="flex items-center justify-between w-full">
                                  <div className="flex items-center">
                                    <div className="text-sm">
                                      <RadioGroup.Label
                                        as="p"
                                        className={`font-normal ${
                                          checked
                                            ? "text-site-main"
                                            : "text-site-dark text-opacity-75"
                                        }`}
                                      >
                                        {`${plan.name} (${plan.amount})`}{" "}
                                      </RadioGroup.Label>
                                    </div>
                                  </div>
                                  <div className="flex-shrink-0 text-white">
                                    <div
                                      className={`w-6 h-6 rounded-full ${
                                        checked
                                          ? "bg-site-main"
                                          : "bg-white border-gray-300 border"
                                      }`}
                                    ></div>
                                  </div>
                                </div>
                              </>
                            )}
                          </RadioGroup.Option>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                </div>
                <div className="mt-5">
                  <div className="flex space-y-1 flex-col justify-center">
                    <label
                      className="text-gray-500 text-base"
                      htmlFor="payment-method"
                    >
                      Accepted Payment Methods
                    </label>
                    <div className="flex space-y-3 justify-start flex-wrap ">
                      {americanExpressSelected && (
                        <AmericanExpress
                          className="cursor-pointer mt-3 py-2.5 px-2 border rounded-sm border-gray-200 w-20 h-12 mr-1.5 "
                          colored={americanExpressSelected}
                          onClick={() =>
                            setAmericanExpressSelected(!americanExpressSelected)
                          }
                        />
                      )}
                      {americanExpressSelected == false && (
                        <AmericanExpress
                          className="cursor-pointer mt-3 py-2.5 px-2 border rounded-sm border-gray-200 w-20 h-12 mr-1.5 "
                          colored={americanExpressSelected}
                          onClick={() => {
                            setAmericanExpressSelected(
                              !americanExpressSelected
                            );
                            setMasterCardSelected(false);
                            setMaestroCardSelected(false);
                            setPaypalSelected(false);
                            setVisaSelected(false);
                          }}
                        />
                      )}
                      {visaSelected && (
                        <VisaCard
                          className="cursor-pointer border py-2 px-2 rounded-sm border-gray-200 w-20 h-12 mr-1.5"
                          colored={visaSelected}
                          onClick={() => {
                            setAmericanExpressSelected(false);
                            setMasterCardSelected(false);
                            setMaestroCardSelected(false);
                            setPaypalSelected(false);
                            setVisaSelected(!visaSelected);
                          }}
                        />
                      )}
                      {visaSelected == false && (
                        <VisaCard
                          className="cursor-pointer border py-2 px-2 rounded-sm border-gray-200 w-20 h-12 mr-1.5"
                          colored={visaSelected}
                          onClick={() => {
                            setAmericanExpressSelected(false);
                            setMasterCardSelected(false);
                            setMaestroCardSelected(false);
                            setPaypalSelected(false);
                            setVisaSelected(!visaSelected);
                          }}
                        />
                      )}
                      {masterCardSelected && (
                        <MasterCard
                          className="cursor-pointer border py-1 px-5 rounded-sm border-gray-200 w-20 h-12 mr-1.5"
                          colored={masterCardSelected}
                          onClick={() => {
                            setAmericanExpressSelected(false);
                            setMasterCardSelected(!masterCardSelected);
                            setMaestroCardSelected(false);
                            setPaypalSelected(false);
                            setVisaSelected(false);
                          }}
                        />
                      )}
                      {masterCardSelected == false && (
                        <MasterCard
                          className="cursor-pointer border py-1 px-5 rounded-sm border-gray-200 w-20 h-12 mr-1.5"
                          colored={masterCardSelected}
                          onClick={() => {
                            setAmericanExpressSelected(false);
                            setMasterCardSelected(!masterCardSelected);
                            setMaestroCardSelected(false);
                            setPaypalSelected(false);
                            setVisaSelected(false);
                          }}
                        />
                      )}
                      {maestroCardSelected == false && (
                        <MaestroCard
                          className="cursor-pointer border py-1 px-5 rounded-sm border-gray-200 w-20 h-12 mr-1.5"
                          colored={maestroCardSelected}
                          onClick={() => {
                            setAmericanExpressSelected(false);
                            setMasterCardSelected(false);
                            setMaestroCardSelected(!maestroCardSelected);
                            setPaypalSelected(false);
                            setVisaSelected(false);
                          }}
                        />
                      )}
                      {maestroCardSelected && (
                        <MaestroCard
                          className="cursor-pointer border py-1 px-5 rounded-sm border-gray-200 w-20 h-12 mr-1.5"
                          colored={maestroCardSelected}
                          onClick={() => {
                            setAmericanExpressSelected(false);
                            setMasterCardSelected(false);
                            setMaestroCardSelected(!maestroCardSelected);
                            setPaypalSelected(false);
                            setVisaSelected(false);
                          }}
                        />
                      )}
                    </div>
                    <input
                      type="hidden"
                      id="payment-method"
                      placeholder=""
                      name="cc-type"
                      autoComplete="cc-type"
                      required
                    />
                  </div>
                </div>
                <div className="mt-5">
                  <div className="flex justify-between items-baseline">
                    <label
                      className="text-gray-500 text-base"
                      htmlFor="quantityCounter"
                    >
                      Number of Properties
                    </label>
                    <div className="component-quantity-input">
                      <span onClick={decrementCount}>-</span>
                      <input
                        id="quantityCounter"
                        type="text"
                        value={count}
                        onChange={null}
                        disabled
                      />
                      <span onClick={incrementCount}>+</span>
                    </div>
                  </div>
                </div>
                {/* <div className="mt-5">
                  <div className="flex space-y-1 flex-col justify-center">
                    <label
                      className="text-gray-500 text-base"
                      htmlFor="cc-name"
                    >
                      Cardholder name
                    </label>
                    <input
                      type="text"
                      id="cc-name"
                      placeholder=""
                      name="cc-name"
                      autoComplete="cc-name"
                      required
                      className="bg-gray-100 border-gray-200 focus:border-gray-300 focus:ring-0 font-light text-site-dark py-2 px-5 rounded-md"
                    />
                  </div>
                </div> */}
                {/* <div className="mt-5">
                  <div className="flex space-y-1 flex-col justify-center">
                    <label
                      className="text-gray-500 text-base"
                      htmlFor="cc-number"
                    >
                      Card number
                    </label>
                    <input
                      type="text"
                      id="cc-number"
                      placeholder=""
                      name="cc-number"
                      autoComplete="cc-number"
                      required
                      className="bg-gray-100 border-gray-200 focus:border-gray-300 focus:ring-0 font-light text-site-dark py-2 px-5 rounded-md"
                    />
                  </div>
                </div> */}
                {/* <div className="mt-5">
                  <div className="flex flex-col lg:flex-row lg:flex-wrap xl:flex-nowrap justify-center">
                    <div className="flex lg:w-full xl:w-6/12 xl:mr-2 space-y-1 flex-col justify-center">
                      <label
                        className="text-gray-500 text-base"
                        htmlFor="cc-exp"
                      >
                        Valid till
                      </label>
                      <Datepicker
                        selected={date}
                        onChange={(date) => setDate(date)}
                        dateFormat="MM/yy"
                        className="border-gray-200 w-full focus:border-gray-300 focus:ring-0 bg-gray-100 font-light text-site-dark py-2 px-5 rounded-md"
                        closeOnScroll={true}
                        showMonthYearPicker
                        showFourColumnMonthYearPicker
                        name="cc-exp"
                        placeholder="MM/YY"
                        autoComplete="cc-exp"
                        required
                      />
                    </div>
                    <div className="flex mt-5 lg:w-full xl:mt-auto xl:w-6/12 space-y-1 flex-col justify-center">
                      <label
                        className="text-gray-500 text-base"
                        htmlFor="cc-csc"
                      >
                        CVV
                      </label>
                      <input
                        type="tel"
                        id="cc-csc"
                        placeholder=""
                        name="cc-csc"
                        autoComplete="cc-csc"
                        required
                        className="bg-gray-100 border-gray-200 focus:border-gray-300 focus:ring-0 font-light text-site-dark py-2 px-5 rounded-md"
                      />
                    </div>
                  </div>
                </div> */}
                {/* stripe form */}
                {(americanExpressSelected ||
                  visaSelected ||
                  maestroCardSelected ||
                  masterCardSelected) && (
                  <div>
                    <span className="text-gray-500 text-base">
                      Card Details
                    </span>
                    <div className="py-2 px-5 rounded-sm ring-1 ring-gray-300 mt-2">
                      <CardElement
                        id="card"
                        options={{ hidePostalCode: true }}
                      />
                      <StatusMessages messages={messages} />
                    </div>
                    <div className="mt-5">
                      <div className="flex space-y-1 flex-col justify-center">
                        <label
                          className="text-gray-500 text-base"
                          htmlFor="couponCode"
                        >
                          Coupon Code
                        </label>
                        <input
                          type="text"
                          id="couponCode"
                          placeholder=""
                          name="couponCode"
                          value={couponCode}
                          onChange={(e) => {
                            setCouponCode(e.target.value);
                            checkCouponEvent(e.target.value);
                          }}
                          className="bg-gray-100 border-gray-200 focus:border-gray-300 focus:ring-0 font-light text-site-dark py-2 px-5 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                )}
                <div className="mt-5">
                  <div className="flex justify-between items-baseline">
                    <label
                      className="text-site-dark text-opacity-50 mr-2"
                      htmlFor="transaction-amount"
                    >
                      Amount:
                    </label>
                    <span className="text-xl text-dark font-medium">
                      {count == 1 ? count + " Waiver" : count + " Waivers"}
                    </span>
                  </div>
                </div>
                <div className="mt-5">
                  <div className="flex justify-between items-baseline">
                    <label
                      className="text-site-dark text-opacity-50 mr-2"
                      htmlFor="transaction-amount"
                    >
                      Setup fee:
                    </label>
                    <span className="text-xl text-dark font-medium">
                      $199.99
                    </span>
                  </div>
                </div>
                <div className="mt-5">
                  <div className="flex justify-between items-baseline">
                    <label
                      className="text-site-dark text-opacity-50 mr-2"
                      htmlFor="transaction-amount"
                    >
                      Subtotal:
                    </label>
                    <span className="text-xl text-dark font-medium">{`$${
                      typeof selected === "string"
                        ? selected === "lite"
                          ? count * 19.99
                          : count * 39.99
                        : 0
                    }`}</span>
                  </div>
                </div>
                <div className="mt-5">
                  <div className="flex justify-between items-baseline">
                    <label
                      className="text-site-dark text-opacity-50 mr-2"
                      htmlFor="transaction-amount"
                    >
                      Discount:
                    </label>
                    <span className="text-xl text-dark font-medium">
                      {checkCoupon.amount_off
                        ? "-$" +
                          checkCoupon.amount_off
                            .toString()
                            .slice(
                              0,
                              checkCoupon.amount_off.toString().length - 2
                            ) +
                          "." +
                          checkCoupon.amount_off.toString().slice(-2)
                        : "-$" + 0}
                    </span>
                  </div>
                </div>
                <div className="mt-5">
                  <div className="flex justify-between items-baseline">
                    <label
                      className="text-site-dark text-opacity-50 mr-2"
                      htmlFor="transaction-amount"
                    >
                      Total:
                    </label>
                    <span className="text-2xl text-dark font-medium">{`$${
                      typeof selected === "string"
                        ? selected === "lite"
                          ? Number(
                              199.99 +
                                count * 19.99 -
                                Number(
                                  checkCoupon.amount_off
                                    .toString()
                                    .slice(
                                      0,
                                      checkCoupon.amount_off.toString().length -
                                        2
                                    ) +
                                    "." +
                                    checkCoupon.amount_off.toString().slice(-2)
                                ).toFixed(2)
                            )
                          : Number(
                              199.99 +
                                count * 39.99 -
                                Number(
                                  checkCoupon.amount_off
                                    .toString()
                                    .slice(
                                      0,
                                      checkCoupon.amount_off.toString().length -
                                        2
                                    ) +
                                    "." +
                                    checkCoupon.amount_off.toString().slice(-2)
                                )
                            ).toFixed(2)
                        : 199.99
                    }`}</span>
                  </div>
                </div>
                <div className="mt-5">
                  <fieldset>
                    <div className="mt-4 space-y-4">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="agree"
                            name="agree"
                            type="checkbox"
                            className="text-site-main border-gray-300 checked:ring-offset-0 checked:ring-0 focus:ring-offset-0 focus:ring-0 h-4 w-4 rounded"
                            onChange={() => setCheckMe(!checkme)}
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label
                            htmlFor="agree"
                            className="font-light text-site-darkgray"
                          >
                            14 days free from today, then just $39.99/m. Cancel
                            through your dashboard or by email
                            (help@shieldmyrental.com).
                          </label>
                          <br />
                          <label
                            htmlFor="agree"
                            className="font-light text-site-darkgray"
                          >
                            I&rsquo;ve read and agree with{" "}
                            <span
                              className="text-site-dark font-medium cursor-pointer"
                              onClick={downloadTerms}
                            >
                              Terms of Service&nbsp;
                            </span>
                            and our{" "}
                            <span
                              className="text-site-dark font-medium cursor-pointer"
                              onClick={downloadPrivacy}
                            >
                              Privacy Policy
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                </div>
                <div className="mt-5">
                  <fieldset>
                    <div className="flex space-y-1 flex-col justify-center">
                      {isLoading ? (
                        <div className="flex justify-center py-4 px-4 border border-transparent bg-site-main text-sm font-medium rounded-md text-white focus:outline-none uppercase tracking-widest">
                          <StyledLoadingSpinner>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                          </StyledLoadingSpinner>
                        </div>
                      ) : (
                        <button
                          type="button"
                          className={
                            !checkme
                              ? "savesign-button group relative py-5 px-4 text-sm font-medium rounded-md focus:outline-none uppercase tracking-widest bg-input-gray border-gray-100"
                              : "group relative py-4 px-4 border border-transparent bg-site-main text-sm font-medium rounded-md text-white focus:outline-none uppercase tracking-widest"
                          }
                          onClick={handleOnSubmit}
                          disabled={!checkme}
                        >
                          Complete Signup
                        </button>
                      )}
                    </div>
                  </fieldset>
                </div>
              </form>
            </div>

            <div className="mt-12 md:mt-12">
              <p className="text-center text-site-gray font-light text-opacity-60">
                {new Date().getFullYear()} &#169; HostShield
              </p>
            </div>
          </div>
          <div className="hidden lg:order-2 lg:w-3/5 bg-section-gradient lg:flex flex-col justify-center relative overflow-hidden  text-white p-5">
            <StyledTransparentShieldBg className="inline-block w-screen h-screen absolute top-0 opacity-20" />
            <Logo className="w-full h-32 mx-auto z-10" />
            <p className="text-center md:text-4xl font-medium mt-12 z-10">
              Your waiver, only smarter
            </p>
            {/*<p className="mt-6 opacity-75 text-center text-sm md:text-base font-light px-0 md:px-20 z-10">
              Convert your waiver into a digital smart waiver{" "}
              <br className="hidden md:block" /> and get more than just a
              signature.
            </p>*/}
          </div>
        </div>
      </motion.section>
    </div>
  );
}

const StyledLoadingSpinner = styled.div`
  display: inline-block;
  position: relative;
  height: 20px;
  width: 76px;

  div {
    position: absolute;
    top: 3.5px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: #fff;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }
  div:nth-child(1) {
    left: 8px;
    animation: lds-ellipsis1 0.6s infinite;
  }
  div:nth-child(2) {
    left: 8px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  div:nth-child(3) {
    left: 32px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  div:nth-child(4) {
    left: 56px;
    animation: lds-ellipsis3 0.6s infinite;
  }
  @keyframes lds-ellipsis1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes lds-ellipsis3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  @keyframes lds-ellipsis2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(24px, 0);
    }
  }
`;

const StyledTransparentShieldBg = styled(TransparentShieldBg)`
  left: -60%;
  @media (min-width: 1200px) {
    left: -80%;
  }
  @media (min-width: 1440px) {
    left: -84%;
  }
`;
