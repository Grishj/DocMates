// src/types/navigation.ts
import { ROUTES } from "@constants/index";

export type HomeStackParamList = {
  [ROUTES.HOME_SCREEN]: undefined;
  [ROUTES.DETAIL]: undefined;
  [ROUTES.CHECKOUT]: undefined;
  [ROUTES.PAYMENT]: undefined;
  [ROUTES.ORDER_SUCCESS]: undefined;
};
