import { getAuthUserData } from "./authReducer";
import { InferActionsTypes } from "./store";

const initialState = {
  initialized: false,
};

export type initialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;

const appReducer = (
  state = initialState,
  action: ActionsType
): initialStateType => {
  switch (action.type) {
    case "SN/APP/INITIALIZED_SUCCESS":
      return {
        ...state,
        initialized: true,
      };

    default:
      return state;
  }
};

export const actions = {
  initializedSuccess: () => ({ type: "SN/APP/INITIALIZED_SUCCESS" } as const),
};

export const initializeApp = () => (dispatch: any) => {
  dispatch(getAuthUserData()).then(() => {
    dispatch(actions.initializedSuccess());
  });
};

export default appReducer;
