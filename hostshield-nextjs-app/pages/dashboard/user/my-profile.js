import { useState, useEffect } from "react";
import { useDispatch, connect } from "react-redux";
//Components
import Head from "next/head";
import { useRouter } from "next/router";
import { RadioGroup } from "@headlessui/react";
import DashboardLayout from "../../../src/components/layout/DashboardLayout";
import TagInput from "../../../src/components/input/input-tag";
//Icons
import { BiCheck } from "react-icons/bi";
import { RiEyeLine, RiEyeOffLine, RiCloseFill } from "react-icons/ri";
//Animation
import { motion } from "framer-motion";
//styles
import styled from "styled-components";
import { PUBLIC_API_KEY } from "../../../utils";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import StatusMessages, {
  useMessages,
} from "../../../src/components/status-messages/StatusMessages";
import {
  setWarningModalIsOpen,
  setCancelSubscriptionIsOpen,
} from "../../../redux/actions/main";

function MyProfile(props) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    propertiesOwned: "",
    firstName: "",
    lastName: "",
  });
  const [messages, addMessage] = useMessages();
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [LLC, setLLC] = useState("");
  const [tagData, setTagData] = useState([]);
  const [downgradeDrop, setDowngradeDrop] = useState({ display: "none" });
  const [inputPasswordToggle, setInputPasswordToggle] = useState(false);
  const [waivers, setWaivers] = useState(0);
  const [properties, setProperties] = useState([]);
  const [propertiesActive, setPropertiesActive] = useState([]);
  const [firstName, setFirstName] = useState(formData.firstName);
  const [lastName, setLastName] = useState(formData.lastName);
  const [email, setEmail] = useState(formData.email);
  const [username, setUsername] = useState(formData.username);
  const [password, setPassword] = useState(formData.password);
  const { user } = props;


  const [isLoading, setIsLoading] = useState(false);

  const handleOnSubmit = (event) => {
    const { target } = event;
    const { form } = target;
    const propertiesOwned = LLC;
    const propertyAccess = tagData;

    const userItem = JSON.parse(localStorage.getItem("user"));
    console.log({
      email,
      username,
      password,
      firstName,
      lastName,
      propertiesOwned: propertiesOwned === "yes",
      propertyAccess,
      id: userItem.value.id,
    });
    // send data to BE
    const url = `${PUBLIC_API_KEY}/my-profile/user`;
    setIsLoading(true);
    fetch(url, {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        username,
        password,
        firstName,
        lastName,
        propertiesOwned: propertiesOwned === "yes",
        propertyAccess,
        id: userItem.value.id,
      }),
    })
      .then((response) => {
        // update user token
        const updatedUserItem = {
          ttl: userItem.ttl,
          value: {
            ...userItem.value,
            email,
            username,
            password,
            firstName,
            lastName,
            propertiesOwned: propertiesOwned === "yes",
            propertyAccess,
          },
        };
        localStorage.setItem("user", JSON.stringify(updatedUserItem));
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };

  const handleOnUpdatePayment = async (e) => {
    try {
      const userItem = JSON.parse(localStorage.getItem("user"));
      // We don't want to let default form submission happen here,
      // which would refresh the page.
      e.preventDefault();
      setIsLoading(true);
      addMessage("Updating...");

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
        const res = await fetch(`${PUBLIC_API_KEY}/update-subscription`, {
          method: "POST",
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            payment_method: result.paymentMethod.id,
            username: userItem.value.username,
          }),
        });
        // eslint-disable-next-line camelcase
        addMessage("Success");
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
      addMessage("Error");
      console.error(err);
    }
  };

  const handleOnDownGradeDrop = async (e) => {
    e.preventDefault();
    if (downgradeDrop.display == "none") {
      setDowngradeDrop({});
      console.log(downgradeDrop);
    } else {
      setDowngradeDrop({ display: "none" });
      console.log(downgradeDrop);
    }
  };

  const handleDowngrade = async (id) => {
    dispatch(setWarningModalIsOpen(true));
    localStorage.setItem("downgrade", id);
  };

  const handleCancelSubscription = async () => {
    dispatch(setCancelSubscriptionIsOpen(true));
  };

  useEffect(() => {
    // check if user is logged in: if not, redirect to login page
    const userItem = JSON.parse(localStorage.getItem("user"));
    if (!userItem || !userItem.ttl || userItem.ttl < new Date().getTime()) {
      return router.push("/");
    }
    setFormData({
      email: userItem.value.email,
      username: userItem.value.username,
      password: userItem.value.password,
      firstName: userItem.value.firstName,
      lastName: userItem.value.lastName,
    });
    setEmail(userItem.value.email);
    setUsername(userItem.value.username);
    setFirstName(userItem.value.firstName);
    setLastName(userItem.value.lastName);
    setPassword(userItem.value.password);
    setTagData(userItem.value.propertyAccess);
    setLLC(userItem.value.propertiesOwned);
    setWaivers(userItem.value.quantity - userItem.value.waivers);
    const url = `${PUBLIC_API_KEY}/my-waivers?username=${userItem.value.username}`;
    fetch(url, {
      method: "GET",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        response.json().then((data) => {
          // if properties: set state, else redirect to create-waiver screen
          if (!data.length) {
            return router.replace("/dashboard/");
          }
          setProperties(data);
          var tempProperties = [];
          for (var i = 0; i < data.length; i++) {
            if (data[i].status.status != "disabled") {
              tempProperties.push(data[i]);
            }
          }
          setPropertiesActive(tempProperties);
        });
      })
      .catch((error) => console.error(error));
  }, [router]);

  return (
    <DashboardLayout>
      <Head>
        <title>My Profile | HostShield</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StyledCreateWaiver className="flex flex-col px-3 md:ml-12 mt-10 mb-20 space-y-9 w-full lg:w-2/4 2xl:w-3/12 text-site-dark">
        <div>
          <h3 className="text-4xl font-semibold">My profile</h3>
        </div>
        <div>
          <h4 className="text-xl font-semibold">
            Waivers available: {waivers}
          </h4>
        </div>
        <div>
          <form
            encType="multipart/form-data"
            className="w-full px-1 md:w-8/12 lg:w-10/12 md:px-auto md:ml-1"
          >
            <div className="mt-5">
              <div className="flex space-y-3 flex-col justify-center">
                <label
                  className="text-site-dark text-opacity-75 text-base"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  onChange={(e)=>{setEmail(e.target.value)}}
                  type="email"
                  id="email"
                  placeholder=""
                  name="email"
                  autoComplete="email"
                  required
                  defaultValue={formData.email}
                  className="bg-input-gray border-gray-100 focus:border-gray-300 focus:ring-0 font-light text-site-dark py-3 px-5 rounded-md"
                />
              </div>
            </div>
            <div className="mt-5">
              <div className="flex space-y-3 flex-col justify-center">
                <label
                  className="text-site-dark text-opacity-75 text-base"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  disabled
                  type="text"
                  id="username"
                  placeholder=""
                  name="username"
                  required
                  defaultValue={formData.username}
                  className="bg-input-gray border-gray-100 focus:border-gray-300 focus:ring-0 font-light text-site-dark py-3 px-5 rounded-md"
                />
              </div>
            </div>
            <div className="mt-5">
              <div className="flex space-y-3 flex-col justify-center">
                <label
                  className="text-site-dark text-opacity-75 text-base"
                  htmlFor="username"
                >
                  First Name
                </label>
                <input
                  onChange={(e)=>{setFirstName(e.target.value)}}
                  type="text"
                  id="firstName"
                  placeholder=""
                  name="firstName"
                  required
                  defaultValue={formData.firstName}
                  className="bg-input-gray border-gray-100 focus:border-gray-300 focus:ring-0 font-light text-site-dark py-3 px-5 rounded-md"
                />
              </div>
            </div>
            <div className="mt-5">
              <div className="flex space-y-3 flex-col justify-center">
                <label
                  className="text-site-dark text-opacity-75 text-base"
                  htmlFor="username"
                >
                  Last Name
                </label>
                <input
                  onChange={(e)=>{setLastName(e.target.value)}}
                  type="text"
                  id="lastName"
                  placeholder=""
                  name="lastName"
                  required
                  defaultValue={formData.lastName}
                  className="bg-input-gray border-gray-100 focus:border-gray-300 focus:ring-0 font-light text-site-dark py-3 px-5 rounded-md"
                />
              </div>
            </div>
            <div className="mt-5">
              <div className="flex space-y-3 flex-col justify-center">
                <label
                  className="text-site-dark text-opacity-75 text-base"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="flex w-full items-center relative">
                  <input
                    onChange={(e)=>{setPassword(e.target.value)}}
                    type={`${inputPasswordToggle ? "text" : "password"}`}
                    id="password"
                    placeholder=""
                    name="password"
                    required
                    defaultValue={formData.password}
                    className="w-full bg-input-gray border-gray-100 focus:border-gray-300 focus:ring-0 font-light text-site-dark py-3 pl-5 pr-8 rounded-md"
                  />
                  {inputPasswordToggle && (
                    <RiEyeOffLine
                      className="absolute cursor-pointer text-site-darkgray  top-4 right-2 text-xl"
                      onClick={() =>
                        setInputPasswordToggle(!inputPasswordToggle)
                      }
                    />
                  )}

                  {inputPasswordToggle == false && (
                    <RiEyeLine
                      className="absolute cursor-pointer text-site-darkgray  top-4 right-2 text-xl"
                      onClick={() =>
                        setInputPasswordToggle(!inputPasswordToggle)
                      }
                    />
                  )}
                </div>
              </div>
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
                      className="savesign-button group relative py-4 px-4 border border-transparent bg-site-main text-sm font-medium rounded-md text-white focus:outline-none uppercase tracking-widest"
                      onClick={handleOnSubmit}
                    >
                      Save
                    </button>
                  )}
                </div>
              </fieldset>
            </div>
          </form>
        </div>
        <div>
          <div>
            <h3 className="text-4xl font-semibold">
              Update your payment method
            </h3>
            <br />
          </div>
          <span className="text-gray-500 text-base">Card Details</span>
          <div className="py-2 px-5 rounded-sm ring-1 ring-gray-300 mt-2">
            <CardElement id="card" options={{ hidePostalCode: true }} />
            <StatusMessages messages={messages} />
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
                    className="group relative py-4 px-4 border border-transparent bg-site-main text-sm font-medium rounded-md text-white focus:outline-none uppercase tracking-widest"
                    onClick={handleOnUpdatePayment}
                  >
                    Update
                  </button>
                )}
              </div>
            </fieldset>
          </div>
        </div>
        <div>
          <a onClick={handleOnDownGradeDrop} className="text-site-main">
            DOWNGRADE OPTIONS
          </a>
          <div className="mt-5" style={downgradeDrop}>
            {propertiesActive.length == 1 ? (
              <div className="flex space-y-1 border rounded-md bg-site-main text-white py-2 px-2 opacity-50 justify-between my-2">
                <h4 className="text-lg">{propertiesActive[0].waiverName}</h4>
              </div>
            ) : (
              <>
                {propertiesActive.map((item) => (
                  <div
                    key={item.id}
                    className="flex space-y-1 border rounded-md bg-site-main text-white py-2 px-2 opacity-50 justify-between my-2"
                  >
                    <h4 className="text-lg">{item.waiverName}</h4>
                    <RiCloseFill
                      className="text-gray-300 text-lg cursor-pointer"
                      onClick={() => {
                        handleDowngrade(item.id);
                      }}
                    />
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
        <div>
          <div className="mt-5">
            <fieldset>
              <div className="flex space-y-1 flex-col justify-center">
                <button
                  type="button"
                  className="group relative py-4 px-4 border border-transparent bg-site-main text-sm font-medium rounded-md text-white focus:outline-none uppercase tracking-widest"
                  onClick={handleCancelSubscription}
                >
                  Cancel subscription
                </button>
              </div>
            </fieldset>
          </div>
        </div>
      </StyledCreateWaiver>
    </DashboardLayout>
  );
}

const mapStateToProps = (state, props) => ({
  user: state.user.user,
});

export default connect(mapStateToProps, null)(MyProfile);

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

const StyledCreateWaiver = styled(motion.section)`
  @media (min-width: 1536px) {
  }
`;
