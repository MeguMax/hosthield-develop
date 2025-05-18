import { useEffect, useState } from "react";
//Components
import Head from "next/head";
import { useRouter } from "next/router";
import { RadioGroup } from "@headlessui/react";
import DashboardLayout from "../../../src/components/layout/DashboardLayout";
import TagInput from "../../../src/components/input/input-tag";
import DropzoneWithoutDrag from "../../../src/components/file-upload";
//Icons
import { BiCheck } from "react-icons/bi";
import { RiAttachmentLine } from "react-icons/ri";
//Animation
import { motion } from "framer-motion";
//styles
import styled from "styled-components";
import { PUBLIC_API_KEY } from "../../../utils";

export default function CreateWaiver() {
  const router = useRouter();

  const [hasLLC, setHasLLC] = useState(false);
  const [llcName, setLlcName] = useState("");
  const [accessToProperty, setAccessToProperty] = useState("");

  const [appliancesList, setAppliancesList] = useState([]);
  const [waiverName, setWaiverName] = useState();
  const [streetAddress, setStreetAddress] = useState();
  const [city, setCity] = useState();
  const [zipCode, setZipCode] = useState();
  const [state, setState] = useState();
  const [owner, setOwner] = useState();
  const [manager, setManager] = useState();
  const [listingLink, setListingLink] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [smokeDetectors, setSmokeDetectors] = useState();
  const [propertyCondition, setPropertyCondition] = useState();
  const [forRenovation, setForRenovation] = useState();

  // For forms
  const [propertyType, setPropertyType] = useState("");
  const [bunkBeds, setBunkBeds] = useState("");
  const [stairs, setStairs] = useState("");
  const [permitPets, setPermitPets] = useState("");
  const [issuesWithGuests, setIssuesWithGuests] = useState("");
  const [handRailings, setHandRailings] = useState("");
  const [stairsLighting, setStairsLighting] = useState("");
  const [pool, setPool] = useState("");
  const [repairOrRenovation, setRepairOrRenovation] = useState("");
  const [depthMarkers, setDepthMarkers] = useState("");
  const [hotTub, setHotTub] = useState("");
  const [balcony, setBalcony] = useState("");
  const [doorBellOrSecurity, setDoorBellOrSecurity] = useState("");
  const [errorMsg, setErrorMsg] = useState();
  const [tagData, setTagData] = useState([]);
  // Attached docs
  const [attachedDocs, setAttachedDocs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleAttachedDocsChanged = (docs) => {
    if (Array.isArray(docs)) {
      const docsToAttach = docs.map((doc) => doc.file);
      setAttachedDocs(docsToAttach);
    }
  };

  //proveri ponovo sve kako se preuzima iz forme i dodaj novi field za renovation

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const userItem = JSON.parse(localStorage.getItem("user"));
    const { target } = event;
    const { form } = target;
    // send data to BE
    const url = `${PUBLIC_API_KEY}/create-waiver`;
    setIsLoading(true);
    let formData = new FormData();
    // upload multiple files
    attachedDocs.forEach((doc) => {
      formData.append("attachedDocuments", doc);
    });
    try {
      formData.append(
        "data",
        JSON.stringify({
          appliancesList,
          waiverName,
          streetAddress,
          city,
          llcName,
          accessToProperty,
          zipCode,
          state,
          phoneNumber,
          owner,
          manager,
          listingLink,
          smokeDetectors,
          propertyCondition,
          propertyType,
          forRenovation,
          bunkBeds: bunkBeds !== "no",
          stairs: stairs !== "no",
          permitPets: permitPets !== "no",
          issuesWithGuests: issuesWithGuests !== "no",
          handRailings: handRailings !== "no",
          stairsLighting: stairsLighting !== "no",
          pool: pool !== "no",
          repairOrRenovation: repairOrRenovation !== "no",
          depthMarkers: depthMarkers !== "no",
          hotTub: hotTub !== "no",
          balcony: balcony !== "no",
          doorBellOrSecurity: doorBellOrSecurity !== "no",
          user: userItem.value.username,
          id: 0, // mandatory for the BE
        })
      );
    } catch (e) {
      console.error(e);
    }

    if (errorMsg) {
      setIsLoading(false);
    } else {
      fetch(url, {
        method: "POST",
        credentials: 'include',
        body: formData,
      })
        .then((response) => {
          response.json().then((data) => {
            const updatedUserItem = {
              ttl: userItem.ttl,
              value: data,
            };
            localStorage.setItem("user", JSON.stringify(updatedUserItem));
            // persistense data: store user into localstorage
            //localStorage.setItem("user", JSON.stringify(userData));
            setIsLoading(false);
            // redirect to success page
            router.push("/dashboard/user/create-waiver-success");
          });
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    // check if user is logged in: if not, redirect to login page
    const userItem = JSON.parse(localStorage.getItem("user"));
    if (!userItem || !userItem.ttl || userItem.ttl < new Date().getTime()) {
      return router.push("/");
    }
  }, [router]);

  return (
    <DashboardLayout>
      <Head>
        <title>Create Waiver | HostShield</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StyledCreateWaiver className="flex flex-col px-3 md:ml-12 mt-10 lg:mb-20 space-y-9 w-full lg:w-2/4 text-site-dark">
        <div>
          <h3 className="text-4xl font-semibold">Create Waiver</h3>
          <p className=" ml-1 text-site-darkgray font-light tracking-wide">
            Fill in all the informations
          </p>
        </div>
        <div>
          <form
            encType="multipart/form-data"
            className="w-full px-1 md:w-8/12 lg:w-10/12 2xl:w-8/12 md:px-auto md:ml-1"
          >
            <input type="hidden" name="appliances-list" value={tagData} />
            <div className="mt-5">
              <div className="flex space-y-3 flex-col justify-center">
                <label
                  className="text-site-dark text-opacity-75 text-base"
                  htmlFor="waiver-name"
                >
                  Property / Waiver name
                </label>
                <input
                  onChange={(e) => {
                    setWaiverName(e.target.value);
                  }}
                  type="text"
                  id="waiver-name"
                  placeholder=""
                  name="waiver-name"
                  required
                  className="bg-input-gray border-gray-100 focus:border-gray-300 focus:ring-0 font-light text-site-dark py-3 px-5 rounded-md"
                />
              </div>
            </div>
            <div className="mt-5">
              <div className="flex space-y-3 flex-col justify-center">
                <label
                  className="text-site-dark text-opacity-75 text-base"
                  htmlFor="property-location"
                >
                  Street Address
                </label>
                <input
                  onChange={(e) => {
                    setStreetAddress(e.target.value);
                  }}
                  type="text"
                  id="street-address"
                  placeholder=""
                  name="street-address"
                  required
                  className="bg-input-gray border-gray-100 focus:border-gray-300 focus:ring-0 font-light text-site-dark py-3 px-5 rounded-md"
                />
              </div>
            </div>
            <div className="mt-5">
              <div className="flex space-y-3 flex-col justify-center">
                <label
                  className="text-site-dark text-opacity-75 text-base"
                  htmlFor="property-location"
                >
                  City
                </label>
                <input
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                  type="text"
                  id="city"
                  placeholder=""
                  name="city"
                  required
                  className="bg-input-gray border-gray-100 focus:border-gray-300 focus:ring-0 font-light text-site-dark py-3 px-5 rounded-md"
                />
              </div>
            </div>
            <div className="mt-5">
              <div className="flex space-y-3 flex-col justify-center">
                <label
                  className="text-site-dark text-opacity-75 text-base"
                  htmlFor="property-state"
                >
                  State
                </label>
                <input
                  onChange={(e) => {
                    setState(e.target.value);
                  }}
                  type="text"
                  id="property-state"
                  placeholder=""
                  name="property-state"
                  required
                  className="bg-input-gray border-gray-100 focus:border-gray-300 focus:ring-0 font-light text-site-dark py-3 px-5 rounded-md"
                />
              </div>
            </div>
            <div className="mt-5">
              <div className="flex space-y-3 flex-col justify-center">
                <label
                  className="text-site-dark text-opacity-75 text-base"
                  htmlFor="property-location"
                >
                  ZIP Code
                </label>
                <input
                  onChange={(e) => {
                    setZipCode(e.target.value);
                  }}
                  type="text"
                  id="zip-code"
                  placeholder=""
                  name="zip-code"
                  required
                  className="bg-input-gray border-gray-100 focus:border-gray-300 focus:ring-0 font-light text-site-dark py-3 px-5 rounded-md"
                />
              </div>
            </div>
            <div className="mt-5">
              <div className="flex space-y-3 flex-col justify-center">
                <label
                  className="text-site-dark text-opacity-75 text-base"
                  htmlFor="waiver-owner"
                >
                  Full name of the property owner
                </label>
                <input
                  onChange={(e) => {
                    setOwner(e.target.value);
                  }}
                  type="text"
                  id="waiver-owner"
                  placeholder=""
                  name="waiver-owner"
                  required
                  className="bg-input-gray border-gray-100 focus:border-gray-300 focus:ring-0 font-light text-site-dark py-3 px-5 rounded-md"
                />
              </div>
            </div>
            <div className="mt-5">
              <fieldset>
                <div>
                  <legend className="text-gray-500">
                    Properties owned by LLC?
                  </legend>
                </div>
                <div className="mt-4 space-y-4">
                  <div className="flex items-center">
                    <input
                      id="properties_owned_yes"
                      name="properties_owned"
                      type="radio"
                      className="h-4 w-4 text-site-main focus:ring-offset-0 focus:ring-0 border-gray-300"
                      onChange={(e) => setHasLLC(true)}
                    />
                    <label
                      htmlFor="properties_owned_yes"
                      className="ml-3 block text-sm text-gray-500"
                    >
                      Yes
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="properties_owned_no"
                      name="properties_owned"
                      type="radio"
                      className="h-4 w-4 text-site-main focus:ring-offset-0 focus:ring-0 border-gray-300"
                      onChange={(e) => setHasLLC(false)}
                    />
                    <label
                      htmlFor="properties_owned_no"
                      className="ml-3 block text-sm text-gray-500"
                    >
                      No
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
            {hasLLC && (
              <div className="mt-5">
                <div className="flex space-y-1 flex-col justify-center">
                  <label className="text-gray-500" htmlFor="properties">
                    LLC name
                  </label>
                  <input
                    type="text"
                    id="properties"
                    placeholder=""
                    name="properties"
                    autoComplete="off"
                    required
                    className="bg-gray-100 border-gray-200 focus:border-gray-300 focus:ring-0 font-light text-site-dark py-2 px-5 rounded-md"
                    value={llcName}
                    onChange={(e) => setLlcName(e.target.value)}
                  />
                </div>
              </div>
            )}
            {typeof hasLLC === "boolean" && !hasLLC && (
              <div>
                Are you interested in protecting your property and yourself
                through an LLC? We can quickly form an LLC for you!
              </div>
            )}
            <div className="mt-5">
              <div className="flex space-y-3 flex-col justify-center">
                <label
                  className="text-site-dark text-opacity-75 text-base"
                  htmlFor="waiver-manager"
                >
                  Full name of the property manager
                </label>
                <input
                  onChange={(e) => {
                    setManager(e.target.value);
                  }}
                  type="text"
                  id="waiver-manager"
                  placeholder=""
                  name="waiver-manager"
                  required
                  className="bg-input-gray border-gray-100 focus:border-gray-300 focus:ring-0 font-light text-site-dark py-3 px-5 rounded-md"
                />
              </div>
            </div>
            <div className="mt-5">
              <div className="flex space-y-3 flex-col justify-center">
                <label
                  className="text-site-dark text-opacity-75 text-base"
                  htmlFor="propertyAccess"
                >
                  Who has access to property
                </label>
                <input
                  type="text"
                  id="propertyAccess"
                  placeholder=""
                  name="propertyAccess"
                  required
                  className="bg-input-gray border-gray-100 focus:border-gray-300 focus:ring-0 font-light text-site-dark py-3 px-5 rounded-md"
                  onChange={(e) => {
                    setAccessToProperty(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="mt-5">
              <div className="flex space-y-3 flex-col justify-center">
                <label
                  className="text-site-dark text-opacity-75 text-base"
                  htmlFor="listing-link"
                >
                  Please provide a link to your listing
                </label>
                <input
                  onChange={(e) => {
                    setListingLink(e.target.value);
                  }}
                  type="url"
                  id="listing-link"
                  placeholder=""
                  name="listing-link"
                  required
                  className="bg-input-gray border-gray-100 focus:border-gray-300 focus:ring-0 font-light text-site-dark py-3 px-5 rounded-md"
                />
              </div>
            </div>
            <div className="mt-5">
              <div className="flex space-y-3 flex-col justify-center">
                <label
                  className="text-site-dark text-opacity-75 text-base"
                  htmlFor="phone-number"
                >
                  Provide a phone number for HostShield Team if they need to
                  contact you
                </label>
                <input
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                  }}
                  type="tel"
                  id="phone-number"
                  placeholder=""
                  name="phone-number"
                  required
                  className="bg-input-gray border-gray-100 focus:border-gray-300 focus:ring-0 font-light text-site-dark py-3 px-5 rounded-md"
                />
              </div>
            </div>
            <div className="mt-5">
              <div className="flex flex-col lg:flex-row lg:flex-wrap xl:flex-nowrap justify-center">
                <div className="flex lg:w-full xl:w-6/12 xl:mr-2 space-y-1 flex-col justify-center">
                  <RadioGroup value={propertyType} onChange={setPropertyType}>
                    <RadioGroup.Label className="text-site-dark text-opacity-75 text-base">
                      Type of property
                    </RadioGroup.Label>
                    <RadioGroup.Option
                      value="Single family home"
                      className="flex w-max items-center space-x-2 mt-4"
                    >
                      {({ checked }) => (
                        <>
                          <span
                            className={`inline-flex items-center justify-center  rounded-full w-7 h-7 cursor-pointer ${
                              checked
                                ? "bg-site-main"
                                : "border border-site-gray bg-transparent"
                            }`}
                          >
                            {checked && (
                              <BiCheck className="text-white text-xl" />
                            )}
                          </span>
                          <span className="inline-block align-middle cursor-pointer">
                            Single family home
                          </span>
                        </>
                      )}
                    </RadioGroup.Option>
                    <RadioGroup.Option
                      value="Apartment"
                      className="flex w-max items-center space-x-2 mt-4"
                    >
                      {({ checked }) => (
                        <>
                          <span
                            className={`inline-flex items-center justify-center rounded-full w-7 h-7 cursor-pointer ${
                              checked
                                ? "bg-site-main"
                                : "border border-site-gray bg-transparent"
                            }`}
                          >
                            {checked && (
                              <BiCheck className="text-white text-xl" />
                            )}
                          </span>
                          <span className="inline-block align-middle cursor-pointer">
                            Apartment
                          </span>
                        </>
                      )}
                    </RadioGroup.Option>
                  </RadioGroup>
                </div>
                <div className="flex mt-5 lg:w-full xl:mt-auto xl:w-6/12 space-y-1 flex-col justify-center">
                  <RadioGroup value={bunkBeds} onChange={setBunkBeds}>
                    <RadioGroup.Label className="text-site-dark text-opacity-75 text-base">
                      Does your listing have bunk beds?
                    </RadioGroup.Label>
                    <RadioGroup.Option
                      value="yes"
                      className="flex w-max items-center space-x-2 mt-4"
                    >
                      {({ checked }) => (
                        <>
                          <span
                            className={`inline-flex items-center justify-center  rounded-full w-7 h-7 cursor-pointer ${
                              checked
                                ? "bg-site-main"
                                : "border border-site-gray bg-transparent"
                            }`}
                          >
                            {checked && (
                              <BiCheck className="text-white text-xl" />
                            )}
                          </span>
                          <span className="inline-block align-middle cursor-pointer">
                            Yes
                          </span>
                        </>
                      )}
                    </RadioGroup.Option>
                    <RadioGroup.Option
                      value="no"
                      className="flex w-max items-center space-x-2 mt-4"
                    >
                      {({ checked }) => (
                        <>
                          <span
                            className={`inline-flex items-center justify-center  rounded-full w-7 h-7 cursor-pointer ${
                              checked
                                ? "bg-site-main"
                                : "border border-site-gray bg-transparent"
                            }`}
                          >
                            {checked && (
                              <BiCheck className="text-white text-xl" />
                            )}
                          </span>
                          <span className="inline-block align-middle cursor-pointer">
                            No
                          </span>
                        </>
                      )}
                    </RadioGroup.Option>
                  </RadioGroup>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <div className="flex flex-col lg:flex-row lg:flex-wrap xl:flex-nowrap justify-center">
                <div className="flex lg:w-full xl:w-6/12 xl:mr-2 space-y-1 flex-col justify-center">
                  <RadioGroup value={stairs} onChange={setStairs}>
                    <RadioGroup.Label className="text-site-dark text-opacity-75 text-base">
                      Does your listing have stairs?
                    </RadioGroup.Label>
                    <RadioGroup.Option
                      value="yes"
                      className="flex w-max items-center space-x-2 mt-4"
                    >
                      {({ checked }) => (
                        <>
                          <span
                            className={`inline-flex items-center justify-center  rounded-full w-7 h-7 cursor-pointer ${
                              checked
                                ? "bg-site-main"
                                : "border border-site-gray bg-transparent"
                            }`}
                          >
                            {checked && (
                              <BiCheck className="text-white text-xl" />
                            )}
                          </span>
                          <span className="inline-block align-middle cursor-pointer">
                            Yes
                          </span>
                        </>
                      )}
                    </RadioGroup.Option>
                    <RadioGroup.Option
                      value="no"
                      className="flex w-max items-center space-x-2 mt-4"
                    >
                      {({ checked }) => (
                        <>
                          <span
                            className={`inline-flex items-center justify-center rounded-full w-7 h-7 cursor-pointer ${
                              checked
                                ? "bg-site-main"
                                : "border border-site-gray bg-transparent"
                            }`}
                          >
                            {checked && (
                              <BiCheck className="text-white text-xl" />
                            )}
                          </span>
                          <span className="inline-block align-middle cursor-pointer">
                            No
                          </span>
                        </>
                      )}
                    </RadioGroup.Option>
                  </RadioGroup>
                </div>
                <div className="flex mt-5 lg:w-full xl:mt-auto xl:w-6/12 space-y-1 flex-col justify-center">
                  <RadioGroup value={permitPets} onChange={setPermitPets}>
                    <RadioGroup.Label className="text-site-dark text-opacity-75 text-base">
                      Does your listing permit pets?
                    </RadioGroup.Label>
                    <RadioGroup.Option
                      value="yes"
                      className="flex w-max items-center space-x-2 mt-4"
                    >
                      {({ checked }) => (
                        <>
                          <span
                            className={`inline-flex items-center justify-center  rounded-full w-7 h-7 cursor-pointer ${
                              checked
                                ? "bg-site-main"
                                : "border border-site-gray bg-transparent"
                            }`}
                          >
                            {checked && (
                              <BiCheck className="text-white text-xl" />
                            )}
                          </span>
                          <span className="inline-block align-middle cursor-pointer">
                            Yes
                          </span>
                        </>
                      )}
                    </RadioGroup.Option>
                    <RadioGroup.Option
                      value="no"
                      className="flex w-max items-center space-x-2 mt-4"
                    >
                      {({ checked }) => (
                        <>
                          <span
                            className={`inline-flex items-center justify-center  rounded-full w-7 h-7 cursor-pointer ${
                              checked
                                ? "bg-site-main"
                                : "border border-site-gray bg-transparent"
                            }`}
                          >
                            {checked && (
                              <BiCheck className="text-white text-xl" />
                            )}
                          </span>
                          <span className="inline-block align-middle cursor-pointer">
                            No
                          </span>
                        </>
                      )}
                    </RadioGroup.Option>
                  </RadioGroup>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <div className="flex space-y-3 flex-col justify-center">
                <label
                  className="text-site-dark text-opacity-75 text-base"
                  htmlFor="appliance-listing"
                >
                  Please list the appliances in your listing
                </label>
                <TagInput
                  appliancesList={appliancesList}
                  setAppliancesList={setAppliancesList}
                  inputClasses="bg-input-gray border-gray-100 focus:border-gray-300 focus:ring-0 font-light text-site-dark py-3 px-5 rounded-md"
                  placeholder="Press comma after typing"
                  limit="10"
                  tagBgColor="bg-site-main"
                  tagTextColor="text-white"
                  tagCloseIconColor="text-white"
                  name="appliance-listing"
                  id="appliance-listing"
                />
              </div>
            </div>
            <div className="mt-5">
              <div className="flex flex-col lg:flex-row lg:flex-wrap xl:flex-nowrap justify-center">
                <div className="flex lg:w-full xl:w-6/12 xl:mr-2 space-y-1 flex-col justify-center">
                  <RadioGroup
                    value={issuesWithGuests}
                    onChange={setIssuesWithGuests}
                  >
                    <RadioGroup.Label className="text-site-dark text-opacity-75 text-base">
                      Have you had any issues with guests at your property?
                    </RadioGroup.Label>
                    <RadioGroup.Option
                      value="yes"
                      className="flex w-max items-center space-x-2 mt-4"
                    >
                      {({ checked }) => (
                        <>
                          <span
                            className={`inline-flex items-center justify-center  rounded-full w-7 h-7 cursor-pointer ${
                              checked
                                ? "bg-site-main"
                                : "border border-site-gray bg-transparent"
                            }`}
                          >
                            {checked && (
                              <BiCheck className="text-white text-xl" />
                            )}
                          </span>
                          <span className="inline-block align-middle cursor-pointer">
                            Yes
                          </span>
                        </>
                      )}
                    </RadioGroup.Option>
                    <RadioGroup.Option
                      value="no"
                      className="flex w-max items-center space-x-2 mt-4"
                    >
                      {({ checked }) => (
                        <>
                          <span
                            className={`inline-flex items-center justify-center rounded-full w-7 h-7 cursor-pointer ${
                              checked
                                ? "bg-site-main"
                                : "border border-site-gray bg-transparent"
                            }`}
                          >
                            {checked && (
                              <BiCheck className="text-white text-xl" />
                            )}
                          </span>
                          <span className="inline-block align-middle cursor-pointer">
                            No
                          </span>
                        </>
                      )}
                    </RadioGroup.Option>
                  </RadioGroup>
                </div>
                <div className="flex lg:w-full xl:mt-auto xl:w-6/12 space-y-1 flex-col justify-center">
                  <div className="flex mb-7 space-y-3 flex-col justify-center">
                    <label
                      className="text-site-dark text-opacity-75 text-base"
                      htmlFor="smoke-detectors"
                    >
                      Number of smoke detectors
                    </label>
                    <select
                      onChange={(e) => {
                        setSmokeDetectors(e.target.value);
                      }}
                      className="bg-input-gray border-gray-100 focus:border-gray-300 focus:ring-0 font-light text-site-dark py-3 px-5 rounded-md"
                      name="smoke-detectors"
                      id="smoke-detectors"
                    >
                      <option value="none">none</option>
                      <option value="<10">{`< 10`}</option>
                      <option value="> 10">{`> 10`}</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <div className="flex flex-col lg:flex-row lg:flex-wrap xl:flex-nowrap justify-center">
                <div className="flex lg:w-full xl:w-6/12 xl:mr-2 space-y-1 flex-col justify-center">
                  <RadioGroup value={handRailings} onChange={setHandRailings}>
                    <RadioGroup.Label className="text-site-dark text-opacity-75 text-base">
                      Do stairs have handrailing&rsquo;s?
                    </RadioGroup.Label>
                    <RadioGroup.Option
                      value="yes"
                      className="flex w-max items-center space-x-2 mt-4"
                    >
                      {({ checked }) => (
                        <>
                          <span
                            className={`inline-flex items-center justify-center  rounded-full w-7 h-7 cursor-pointer ${
                              checked
                                ? "bg-site-main"
                                : "border border-site-gray bg-transparent"
                            }`}
                          >
                            {checked && (
                              <BiCheck className="text-white text-xl" />
                            )}
                          </span>
                          <span className="inline-block align-middle cursor-pointer">
                            Yes
                          </span>
                        </>
                      )}
                    </RadioGroup.Option>
                    <RadioGroup.Option
                      value="no"
                      className="flex w-max items-center space-x-2 mt-4"
                    >
                      {({ checked }) => (
                        <>
                          <span
                            className={`inline-flex items-center justify-center rounded-full w-7 h-7 cursor-pointer ${
                              checked
                                ? "bg-site-main"
                                : "border border-site-gray bg-transparent"
                            }`}
                          >
                            {checked && (
                              <BiCheck className="text-white text-xl" />
                            )}
                          </span>
                          <span className="inline-block align-middle cursor-pointer">
                            No
                          </span>
                        </>
                      )}
                    </RadioGroup.Option>
                  </RadioGroup>
                </div>
                <div className="flex mt-5 lg:w-full xl:mt-auto xl:w-6/12 space-y-1 flex-col justify-center">
                  <RadioGroup
                    value={stairsLighting}
                    onChange={setStairsLighting}
                  >
                    <RadioGroup.Label className="text-site-dark text-opacity-75 text-base">
                      Stairs have lighting?
                    </RadioGroup.Label>
                    <RadioGroup.Option
                      value="yes"
                      className="flex w-max items-center space-x-2 mt-4"
                    >
                      {({ checked }) => (
                        <>
                          <span
                            className={`inline-flex items-center justify-center  rounded-full w-7 h-7 cursor-pointer ${
                              checked
                                ? "bg-site-main"
                                : "border border-site-gray bg-transparent"
                            }`}
                          >
                            {checked && (
                              <BiCheck className="text-white text-xl" />
                            )}
                          </span>
                          <span className="inline-block align-middle cursor-pointer">
                            Yes
                          </span>
                        </>
                      )}
                    </RadioGroup.Option>
                    <RadioGroup.Option
                      value="no"
                      className="flex w-max items-center space-x-2 mt-4"
                    >
                      {({ checked }) => (
                        <>
                          <span
                            className={`inline-flex items-center justify-center  rounded-full w-7 h-7 cursor-pointer ${
                              checked
                                ? "bg-site-main"
                                : "border border-site-gray bg-transparent"
                            }`}
                          >
                            {checked && (
                              <BiCheck className="text-white text-xl" />
                            )}
                          </span>
                          <span className="inline-block align-middle cursor-pointer">
                            No
                          </span>
                        </>
                      )}
                    </RadioGroup.Option>
                  </RadioGroup>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <div className="flex flex-col lg:flex-row lg:flex-wrap xl:flex-nowrap justify-center">
                <div className="flex lg:w-full xl:mr-2 space-y-1 flex-col justify-center">
                  <RadioGroup value={pool} onChange={setPool}>
                    <RadioGroup.Label className="text-site-dark text-opacity-75 text-base">
                      Does your listing have a pool?
                    </RadioGroup.Label>
                    <RadioGroup.Option
                      value="yes"
                      className="flex w-max items-center space-x-2 mt-4"
                    >
                      {({ checked }) => (
                        <>
                          <span
                            className={`inline-flex items-center justify-center  rounded-full w-7 h-7 cursor-pointer ${
                              checked
                                ? "bg-site-main"
                                : "border border-site-gray bg-transparent"
                            }`}
                          >
                            {checked && (
                              <BiCheck className="text-white text-xl" />
                            )}
                          </span>
                          <span className="inline-block align-middle cursor-pointer">
                            Yes
                          </span>
                        </>
                      )}
                    </RadioGroup.Option>
                    <RadioGroup.Option
                      value="no"
                      className="flex w-max items-center space-x-2 mt-4"
                    >
                      {({ checked }) => (
                        <>
                          <span
                            className={`inline-flex items-center justify-center rounded-full w-7 h-7 cursor-pointer ${
                              checked
                                ? "bg-site-main"
                                : "border border-site-gray bg-transparent"
                            }`}
                          >
                            {checked && (
                              <BiCheck className="text-white text-xl" />
                            )}
                          </span>
                          <span className="inline-block align-middle cursor-pointer">
                            No
                          </span>
                        </>
                      )}
                    </RadioGroup.Option>
                  </RadioGroup>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <div className="flex flex-col lg:flex-row lg:flex-wrap xl:flex-nowrap justify-center">
                <div className="flex lg:w-full xl:w-6/12 xl:mr-2 space-y-1 flex-col justify-center">
                  <RadioGroup
                    value={repairOrRenovation}
                    onChange={setRepairOrRenovation}
                  >
                    <RadioGroup.Label className="text-site-dark text-opacity-75 text-base">
                      Any areas or parts on your property in need of repair or
                      renovation?
                    </RadioGroup.Label>
                    <RadioGroup.Option
                      value="yes"
                      className="flex w-max items-center space-x-2 mt-4"
                    >
                      {({ checked }) => (
                        <>
                          <span
                            className={`inline-flex items-center justify-center  rounded-full w-7 h-7 cursor-pointer ${
                              checked
                                ? "bg-site-main"
                                : "border border-site-gray bg-transparent"
                            }`}
                          >
                            {checked && (
                              <BiCheck className="text-white text-xl" />
                            )}
                          </span>
                          <span className="inline-block align-middle cursor-pointer">
                            Yes
                          </span>
                        </>
                      )}
                    </RadioGroup.Option>
                    <RadioGroup.Option
                      value="no"
                      className="flex w-max items-center space-x-2 mt-4"
                    >
                      {({ checked }) => (
                        <>
                          <span
                            className={`inline-flex items-center justify-center rounded-full w-7 h-7 cursor-pointer ${
                              checked
                                ? "bg-site-main"
                                : "border border-site-gray bg-transparent"
                            }`}
                          >
                            {checked && (
                              <BiCheck className="text-white text-xl" />
                            )}
                          </span>
                          <span className="inline-block align-middle cursor-pointer">
                            No
                          </span>
                        </>
                      )}
                    </RadioGroup.Option>
                  </RadioGroup>
                </div>
                <div className="flex mt-5 lg:w-full xl:mt-auto xl:w-6/12 space-y-1 flex-col justify-center">
                  <RadioGroup value={depthMarkers} onChange={setDepthMarkers}>
                    <RadioGroup.Label className="text-site-dark text-opacity-75 text-base">
                      Do you have depth markers?
                    </RadioGroup.Label>
                    <RadioGroup.Option
                      value="yes"
                      className="flex w-max items-center space-x-2 mt-4"
                    >
                      {({ checked }) => (
                        <>
                          <span
                            className={`inline-flex items-center justify-center  rounded-full w-7 h-7 cursor-pointer ${
                              checked
                                ? "bg-site-main"
                                : "border border-site-gray bg-transparent"
                            }`}
                          >
                            {checked && (
                              <BiCheck className="text-white text-xl" />
                            )}
                          </span>
                          <span className="inline-block align-middle cursor-pointer">
                            Yes
                          </span>
                        </>
                      )}
                    </RadioGroup.Option>
                    <RadioGroup.Option
                      value="no"
                      className="flex w-max items-center space-x-2 mt-4"
                    >
                      {({ checked }) => (
                        <>
                          <span
                            className={`inline-flex items-center justify-center  rounded-full w-7 h-7 cursor-pointer ${
                              checked
                                ? "bg-site-main"
                                : "border border-site-gray bg-transparent"
                            }`}
                          >
                            {checked && (
                              <BiCheck className="text-white text-xl" />
                            )}
                          </span>
                          <span className="inline-block align-middle cursor-pointer">
                            No
                          </span>
                        </>
                      )}
                    </RadioGroup.Option>
                  </RadioGroup>
                </div>
              </div>
            </div>
            {repairOrRenovation == "yes" && (
              <div className="mt-5">
                <div className="flex space-y-3 flex-col justify-center">
                  <label
                    className="text-site-dark text-opacity-75 text-base"
                    htmlFor="property-condition"
                  >
                    For renovation
                  </label>
                  <textarea
                    onChange={(e) => {
                      setForRenovation(e.target.value);
                    }}
                    type="text"
                    id="for-renovation"
                    placeholder=""
                    name="for-renovation"
                    className="bg-input-gray border-gray-100 focus:border-gray-300 focus:ring-0 font-light text-site-dark py-3 px-5 rounded-md"
                  />
                </div>
              </div>
            )}
            <div className="mt-5">
              <div className="flex flex-col lg:flex-row lg:flex-wrap xl:flex-nowrap justify-center">
                <div className="flex lg:w-full xl:w-6/12 xl:mr-2 space-y-1 flex-col justify-center">
                  <RadioGroup value={hotTub} onChange={setHotTub}>
                    <RadioGroup.Label className="text-site-dark text-opacity-75 text-base">
                      Does your listing have a hot tub?
                    </RadioGroup.Label>
                    <RadioGroup.Option
                      value="yes"
                      className="flex w-max items-center space-x-2 mt-4"
                    >
                      {({ checked }) => (
                        <>
                          <span
                            className={`inline-flex items-center justify-center  rounded-full w-7 h-7 cursor-pointer ${
                              checked
                                ? "bg-site-main"
                                : "border border-site-gray bg-transparent"
                            }`}
                          >
                            {checked && (
                              <BiCheck className="text-white text-xl" />
                            )}
                          </span>
                          <span className="inline-block align-middle cursor-pointer">
                            Yes
                          </span>
                        </>
                      )}
                    </RadioGroup.Option>
                    <RadioGroup.Option
                      value="no"
                      className="flex w-max items-center space-x-2 mt-4"
                    >
                      {({ checked }) => (
                        <>
                          <span
                            className={`inline-flex items-center justify-center rounded-full w-7 h-7 cursor-pointer ${
                              checked
                                ? "bg-site-main"
                                : "border border-site-gray bg-transparent"
                            }`}
                          >
                            {checked && (
                              <BiCheck className="text-white text-xl" />
                            )}
                          </span>
                          <span className="inline-block align-middle cursor-pointer">
                            No
                          </span>
                        </>
                      )}
                    </RadioGroup.Option>
                  </RadioGroup>
                </div>
                <div className="flex mt-5 lg:w-full xl:mt-auto xl:w-6/12 space-y-1 flex-col justify-center">
                  <RadioGroup value={balcony} onChange={setBalcony}>
                    <RadioGroup.Label className="text-site-dark text-opacity-75 text-base">
                      Does your listing have a balcony?
                    </RadioGroup.Label>
                    <RadioGroup.Option
                      value="yes"
                      className="flex w-max items-center space-x-2 mt-4"
                    >
                      {({ checked }) => (
                        <>
                          <span
                            className={`inline-flex items-center justify-center  rounded-full w-7 h-7 cursor-pointer ${
                              checked
                                ? "bg-site-main"
                                : "border border-site-gray bg-transparent"
                            }`}
                          >
                            {checked && (
                              <BiCheck className="text-white text-xl" />
                            )}
                          </span>
                          <span className="inline-block align-middle cursor-pointer">
                            Yes
                          </span>
                        </>
                      )}
                    </RadioGroup.Option>
                    <RadioGroup.Option
                      value="no"
                      className="flex w-max items-center space-x-2 mt-4"
                    >
                      {({ checked }) => (
                        <>
                          <span
                            className={`inline-flex items-center justify-center  rounded-full w-7 h-7 cursor-pointer ${
                              checked
                                ? "bg-site-main"
                                : "border border-site-gray bg-transparent"
                            }`}
                          >
                            {checked && (
                              <BiCheck className="text-white text-xl" />
                            )}
                          </span>
                          <span className="inline-block align-middle cursor-pointer">
                            No
                          </span>
                        </>
                      )}
                    </RadioGroup.Option>
                  </RadioGroup>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <div className="flex flex-col lg:flex-row lg:flex-wrap xl:flex-nowrap justify-center">
                <div className="flex lg:w-full xl:mr-2 space-y-1 flex-col justify-center">
                  <RadioGroup
                    value={doorBellOrSecurity}
                    onChange={setDoorBellOrSecurity}
                  >
                    <RadioGroup.Label className="text-site-dark text-opacity-75 text-base">
                      Does listing have ring doorbell or security system?
                    </RadioGroup.Label>
                    <RadioGroup.Option
                      value="yes"
                      className="flex w-max items-center space-x-2 mt-4"
                    >
                      {({ checked }) => (
                        <>
                          <span
                            className={`inline-flex items-center justify-center  rounded-full w-7 h-7 cursor-pointer ${
                              checked
                                ? "bg-site-main"
                                : "border border-site-gray bg-transparent"
                            }`}
                          >
                            {checked && (
                              <BiCheck className="text-white text-xl" />
                            )}
                          </span>
                          <span className="inline-block align-middle cursor-pointer">
                            Yes
                          </span>
                        </>
                      )}
                    </RadioGroup.Option>
                    <RadioGroup.Option
                      value="no"
                      className="flex w-max items-center space-x-2 mt-4"
                    >
                      {({ checked }) => (
                        <>
                          <span
                            className={`inline-flex items-center justify-center rounded-full w-7 h-7 cursor-pointer ${
                              checked
                                ? "bg-site-main"
                                : "border border-site-gray bg-transparent"
                            }`}
                          >
                            {checked && (
                              <BiCheck className="text-white text-xl" />
                            )}
                          </span>
                          <span className="inline-block align-middle cursor-pointer">
                            No
                          </span>
                        </>
                      )}
                    </RadioGroup.Option>
                  </RadioGroup>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <div className="flex space-y-3 flex-col justify-center">
                <label
                  className="text-site-dark text-opacity-75 text-base"
                  htmlFor="property-condition"
                >
                  List any potentially dangerous or hazardous condition on the
                  property or any other important information
                </label>
                <textarea
                  onChange={(e) => {
                    setPropertyCondition(e.target.value);
                  }}
                  type="text"
                  id="property-condition"
                  placeholder=""
                  name="property-condition"
                  required
                  className="bg-input-gray border-gray-100 focus:border-gray-300 focus:ring-0 font-light text-site-dark py-3 px-5 rounded-md"
                />
              </div>
            </div>
            <div className="mt-5">
              <div className="flex space-y-3 flex-col justify-center">
                <label
                  className="text-site-dark text-opacity-75 text-base"
                  htmlFor="file-upload"
                >
                  Upload your house rules and any fines/deposits or photos of
                  the property
                </label>
                <DropzoneWithoutDrag
                  className="flex justify-center items-center space-x-1 bg-input-gray border-gray-100 py-7 px-5 rounded-md cursor-pointer"
                  IconClasses="text-gray-400 text-xl cursor-pointer"
                  LabelText="Attach your documents or photos "
                  LabelTextClasses="text-site-dark text-opacity-50 font-normal"
                  Icon={<RiAttachmentLine className="text-gray-400 text-xl" />}
                  onChange={handleAttachedDocsChanged}
                />
              </div>
            </div>
            <div className="mt-5">
              <fieldset>
                <div className="flex space-y-1 flex-col justify-center">
                  {isLoading ? (
                    <div className="flex justify-center py-4 px-4 border border-transparent bg-site-main text-xs font-medium rounded-md text-white focus:outline-none uppercase tracking-widest">
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
                      className="savesign-button group relative py-4 px-4 border border-transparent bg-site-main text-xs font-medium rounded-md text-white focus:outline-none uppercase tracking-widest"
                      onClick={handleOnSubmit}
                    >
                      Create Waiver
                    </button>
                  )}
                </div>
              </fieldset>
            </div>
            <div className="mt-5">
              <fieldset>
                <div className="flex space-y-1 flex-col justify-center">
                  <label className="text-site-dark text-opacity-75 text-base">
                    {errorMsg}
                  </label>
                </div>
              </fieldset>
            </div>
          </form>
        </div>
      </StyledCreateWaiver>
    </DashboardLayout>
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

const StyledCreateWaiver = styled(motion.section)`
  @media (min-width: 1536px) {
  }
`;
