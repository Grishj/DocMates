// src/constants/index.ts

export const ROUTES = {
  // main tabs
  HOME: "Home",
  ORDER: "Order",
  INBOX: "Inbox",
  PROFILE: "Profile",

  // ──────────────────
  // auth
  // ──────────────────
  WELCOME: "Welcome",
  ONBOARDING: "Onboarding",
  SIGNIN: "SignIn",
  SIGNUP: "SignUp",

  // ──────────────────
  // home
  // ──────────────────
  // home stack screens ← rename these to be distinct
  HOME_SCREEN: "HomeScreen", // ← was HOME: "Home"
  DETAIL: "DetailScreen",
  SELECT_UNIVERSITY: "SelectUniversity",
  SELECT_CATEGORY: "SelectCategory",
  REGISTRATION_TYPE: "RegistrationType",
  SELECT_COLLEGE: "SelectCollege",
  CHECKOUT: "Checkout",
  PAYMENT: "Payment",
  ORDER_SUCCESS: "OrderSuccess",

  // ──────────────────
  // order
  // ──────────────────

  ORDER_DETAIL: "OrderDetail",
  TRACK_ORDER: "TrackOrder",

  // ──────────────────
  // inbox
  // ──────────────────

  MESSAGE_DETAIL: "MessageDetail",
  NEW_MESSAGE: "NewMessage",

  // ──────────────────
  // profile
  // ──────────────────

  EDIT_PROFILE: "EditProfile",
  SETTINGS: "Settings",
  CHANGE_PASSWORD: "ChangePassword",
} as const;
