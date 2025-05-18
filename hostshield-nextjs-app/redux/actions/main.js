import * as t from "../types";
import axios from "axios";

export const setInfo = (name) => async (dispatch) => {
  await dispatch({
    type: t.SET_NAME,
    payload: name,
  });
};

export const setLeftPanelIsOpen = (isOpen) => async (dispatch) => {
  await dispatch({
    type: t.SET_LEFTPANEL_ISOPEN,
    payload: isOpen,
  });
};

export const setShareModalIsOpen = (isOpen) => async (dispatch) => {
  await dispatch({
    type: t.SET_SHAREMODAL_ISOPEN,
    payload: isOpen,
  });
};

export const setShareModalLink = (link) => async (dispatch) => {
  await dispatch({
    type: t.SET_SHAREMODAL_LINK,
    payload: link,
  });
};

export const setWarningPaymentModalIsOpen = (isOpen) => async (dispatch) => {
  await dispatch({
    type: t.SET_WARNINGMODAL_ISOPEN,
    payload: isOpen,
  });
};

export const setWarningModalIsOpen = (isOpen) => async (dispatch) => {
  await dispatch({
    type: t.SET_WARNING_MODAL_ISOPEN,
    payload: isOpen,
  });
};

export const setCancelSubscriptionIsOpen = (isOpen) => async (dispatch) => {
  await dispatch({
    type: t.SET_CANCEL_SUBSCRIPTIONS_MODAL_ISOPEN,
    payload: isOpen,
  });
};

export const setSignWaiverModalIsOpen = (isOpen) => async (dispatch) => {
  await dispatch({
    type: t.SET_SIGN_WAIVER_MODAL_ISOPEN,
    payload: isOpen,
  });
};

export const setUserRoleAction = (role) => async (dispatch) => {
  await dispatch({
    type: t.SET_USERROLE,
    payload: role,
  });
};
