// src/constants/index.ts

export const ROUTES = {
  // main tabs
  HOME: "Home",
  REQUEST: "Request",
  INBOX: "Inbox",
  PROFILE: "Profile",

  // darta-sathi mode tabs
  DS_DASHBOARD: "DSDashboard",
  DS_TASKS: "DSTasks",
  DS_EARNINGS: "DSEarnings",
  DS_INBOX: "DSInbox",

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
  COLLEGE_SERVICE_PROVIDERS: "CollegeServiceProviders",
  CONFIRM_REQUEST: "ConfirmRequest",
  REQUEST_SUCCESS: "RequestSuccess",
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
  HELP_SUPPORT: "HelpSupport",
  PRIVACY_POLICY: "PrivacyPolicy",
  TERMS_CONDITIONS: "TermsConditions",
  REQUEST_HISTORY: "RequestHistory",

  // ──────────────────
  // notifications
  // ──────────────────
  NOTIFICATIONS: "Notifications",
} as const;
