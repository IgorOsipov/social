import { AppStateType } from "./store";

export const getIsInitialized = (state: AppStateType) => {
  return state.app.initialized;
};
