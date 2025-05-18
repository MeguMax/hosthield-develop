import { combineReducers } from "redux";
import {
  leftPanel,
  profile,
  ShareModalReducer,
  WarningPaymentModalReducer,
  WarningModalReducer,
  CancelSubscriptionModalReducer,
  SignWaiverModalReducer,
  UserRoleReducer,
} from "./dashboard";
import userReducer from "./user";

const rootReducer = combineReducers({
  profile: profile,
  leftPanel: leftPanel,
  shareModal: ShareModalReducer,
  warningPaymentModal: WarningPaymentModalReducer,
  warningModal: WarningModalReducer,
  cancelSubscriptionModal: CancelSubscriptionModalReducer,
  signModal: SignWaiverModalReducer,
  user: userReducer,
  User: UserRoleReducer,
});

export default rootReducer;
