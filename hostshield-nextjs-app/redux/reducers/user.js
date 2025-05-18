import * as actionTypes from '../types';

const initialState = {
    user: null,
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.STORE_USER:
            const {userData} = action.payload;
            return {
              ...state,
              user: userData,
            };
        default:
            return {
                ...state
            };
    }
}

export default userReducer;
