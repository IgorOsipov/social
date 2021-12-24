import { responceApiCodes } from "../Types/responceApiCodes";
import { usersType } from "../Types/types";

export type authMeResponceType = {
  data: {
    id: number;
    email: string;
    login: string;
  };
};

export type authLoginResponceType = {
  data: {
    userId: number;
  };
};

export type getUsersResponceType = {
  items: Array<usersType>;
  totalCount: number;
  error: string;
};

export type apiResponceType = {
  resultCode: responceApiCodes;
  messages: Array<string>;
};

export type noDataResponceType = {
  data: {};
};

export type savePhotoResponceType = {
  data: {
    photos: {
      large: string;
      small: string;
    };
  };
};
