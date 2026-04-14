// src/types/navigation.ts
import { ROUTES } from "@constants/index";

export type AuthStackParamList = {
  [ROUTES.WELCOME]: undefined;
  [ROUTES.ONBOARDING]: undefined;
  [ROUTES.SIGNIN]: undefined;
  [ROUTES.SIGNUP]: undefined;
  [ROUTES.ROLE_SELECTION]: undefined;
  [ROUTES.PROVIDER_VERIFICATION]: undefined;
};

export type HomeStackParamList = {
  [ROUTES.HOME_SCREEN]: undefined;
  [ROUTES.DETAIL]: undefined;
  [ROUTES.CHECKOUT]: undefined;
  [ROUTES.PAYMENT]: undefined;
  [ROUTES.ORDER_SUCCESS]: undefined;
};
