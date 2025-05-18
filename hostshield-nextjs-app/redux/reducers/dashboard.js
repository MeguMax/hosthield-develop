import * as t from "../types";

const leftPanel = (
  state = {
    isOpen: false,
  },
  action
) => {
  switch (action.type) {
    case t.SET_LEFTPANEL_ISOPEN:
      return {
        ...state,
        isOpen: action.payload,
      };
    default:
      return { ...state };
  }
};
const profile = (
  state = {
    profileName: "guest",
  },
  action
) => {
  switch (action.type) {
    case t.SET_NAME:
      return {
        ...state,
        profileName: action.payload,
      };
    default:
      return { ...state };
  }
};
const ShareModalReducer = (state = { isOpen: false, link: "" }, action) => {
  switch (action.type) {
    case t.SET_SHAREMODAL_ISOPEN:
      return {
        ...state,
        isOpen: action.payload,
      };
    case t.SET_SHAREMODAL_LINK:
      return {
        ...state,
        link: action.payload,
      };
    default:
      return { ...state };
  }
};

const WarningPaymentModalReducer = (state = { isOpen: false }, action) => {
  switch (action.type) {
    case t.SET_WARNINGMODAL_ISOPEN:
      return {
        ...state,
        isOpen: action.payload,
      };
    default:
      return { ...state };
  }
};
const WarningModalReducer = (state = { isOpen: false }, action) => {
  switch (action.type) {
    case t.SET_WARNING_MODAL_ISOPEN:
      return {
        ...state,
        isOpen: action.payload,
      };
    default:
      return { ...state };
  }
};
const CancelSubscriptionModalReducer = (state = { isOpen: false }, action) => {
  switch (action.type) {
    case t.SET_CANCEL_SUBSCRIPTIONS_MODAL_ISOPEN:
      return {
        ...state,
        isOpen: action.payload,
      };
    default:
      return { ...state };
  }
};

const SignWaiverModalReducer = (state = { isOpen: false }, action) => {
  switch (action.type) {
    case t.SET_SIGN_WAIVER_MODAL_ISOPEN:
      return {
        ...state,
        isOpen: action.payload,
      };
    default:
      return { ...state };
  }
};
const UserRoleReducer = (state = { role: "user" }, action) => {
  switch (action.type) {
    case t.SET_USERROLE:
      return {
        ...state,
        role: action.payload,
      };
    default:
      return { ...state };
  }
};

export {
  leftPanel,
  profile,
  ShareModalReducer,
  WarningPaymentModalReducer,
  WarningModalReducer,
  CancelSubscriptionModalReducer,
  SignWaiverModalReducer,
  UserRoleReducer,
};
