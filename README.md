# DocMate

**"Campus Tadha Xa? No Tension Bro, DocMate Le DauDxa!"**

> **[Campus too far? No worries! DocMate's got you covered!]**

DocMate is a modern React Native mobile application that connects students with verified local runners (DocMates) near universities across Nepal. Say goodbye to expensive, tiring, and time-consuming trips to campus for official documents like transcripts, degrees, migration certificates, provisional certificates, and more.

Whether you need documents from Tribhuvan University, Kathmandu University, or any other campus in Nepal — DocMate gets it done while you relax at home.

---

## ✨ Key Features

- **🔍 Find Your DocMate** – Browse and filter verified runners near your university with real-time availability, ratings, success rate, and detailed reviews
- **📝 Easy Document Requests** – Intuitive form to request any university document (transcripts, degrees, character certificates, provisional certificates, etc.)
- **📍 Real-time Order Tracking** – Live status updates from "Applied" → "Processing" → "Ready to Deliver" with location sharing
- **💬 In-app Chat System** – Direct, secure communication with your assigned DocMate for questions and updates
- **👥 Dual User Roles** – Seamless switching between Student mode and DocMate (Runner) mode
- **💳 Secure Payments** – Multiple payment gateways (eSewa, Khalti, IME Pay) and bank transfer options
- **🎓 Smart Onboarding** – University detection, verification, and personalized experience based on your institution
- **👤 Comprehensive Profiles** – Manage order history, earnings (for runners), settings, and verification documents

---

## 🚀 Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React Native** | Cross-platform mobile development |
| **Expo** | Development platform & build service |
| **TypeScript** | Type-safe JavaScript |
| **Redux Toolkit** | Predictable state management |
| **React Navigation** | Bottom Tabs + Stack Navigators |
| **Expo Vector Icons** | Icon library (Ionicons) |

---

## 📋 Project Structure

```
DocMate/
├── src/
│   ├── api/                           # API client and endpoints
│   │   ├── client.ts                 # Axios/Fetch configuration
│   │   └── documents.ts              # Document-related API calls
│   │
│   ├── components/                    # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   └── ui/                       # Atomic UI components
│   │       ├── Divider.tsx
│   │       ├── Icon.tsx
│   │       ├── Spacer.tsx
│   │       └── Text.tsx
│   │
│   ├── constants/
│   │   └── index.ts                  # Route names & app constants
│   │
│   ├── features/                      # Feature-based Redux modules
│   │   └── documents/
│   │       ├── documentsSlice.ts     # Redux slice
│   │       └── hooks/                # Feature hooks
│   │           ├── useDocuments.ts
│   │           └── useUpload.ts
│   │
│   ├── hooks/                         # Custom React hooks
│   │   ├── useAppDispatch.ts
│   │   ├── useAppSelector.ts
│   │   └── useDebounce.ts
│   │
│   ├── navigation/                    # Navigation configuration
│   │   ├── AppNavigator.tsx          # Root navigator (Auth/Main)
│   │   ├── tabs/
│   │   │   └── MainTabs.tsx          # Bottom tab navigation
│   │   └── stacks/
│   │       ├── auth/                 # Auth screens
│   │       │   └── AuthStack.tsx
│   │       ├── home/                 # Home feature
│   │       │   └── HomeStack.tsx
│   │       ├── inbox/                # Messaging feature
│   │       │   └── InboxStack.tsx
│   │       ├── order/                # Order tracking feature
│   │       │   └── OrderStack.tsx
│   │       └── profile/              # User profile feature
│   │           └── ProfileStack.tsx
│   │
│   ├── screens/                       # Screen components
│   │   ├── auth/                     # Authentication flow
│   │   │   ├── WelcomeScreen.tsx
│   │   │   ├── OnboardingScreen.tsx
│   │   │   ├── SignInScreen.tsx
│   │   │   ├── SignUpScreen.tsx
│   │   │   └── ...
│   │   └── main/                    # Main app screens
│   │       ├── home/
│   │       ├── inbox/
│   │       ├── order/
│   │       └── profile/
│   │
│   ├── store/
│   │   └── index.ts                  # Redux store setup
│   │
│   ├── theme/                         # Design system
│   │   ├── colors.ts                 # Color palette
│   │   └── spacing.ts                # Spacing scale
│   │
│   ├── types/                         # TypeScript definitions
│   │   ├── index.ts
│   │   └── navigation.ts             # Navigation param types
│   │
│   └── utils/                         # Utility functions
│       ├── formatDate.ts
│       ├── formatFileSize.ts
│       └── validateEmail.ts
│
├── App.tsx                           # Root component wrapper
├── index.ts                          # Entry point
├── app.json                          # Expo configuration
├── babel.config.js                   # Babel setup
├── tsconfig.json                     # TypeScript config
├── package.json                      # Dependencies & scripts
└── assets/                           # Icons, splash screen, etc.
```

---

## 📲 Navigation Architecture

```
AppNavigator (Stack)
│
├── 🔐 Auth Stack (when not logged in)
│   ├── WelcomeScreen
│   ├── OnboardingScreen
│   ├── SignInScreen / SignUpScreen
│   ├── LoginScreen / RegisterScreen
│   └── ForgotPasswordScreen
│
└── 🏠 Main Tabs (when logged in) - Bottom Tab Navigation
    ├── Home Tab
    │   ├── HomeScreen (Browse DocMates & documents)
    │   ├── DetailScreen (DocMate profile)
    │   ├── CheckoutScreen
    │   ├── PaymentScreen
    │   └── OrderSuccessScreen
    │
    ├── Orders Tab
    │   ├── OrderScreen (Order history)
    │   ├── OrderDetailScreen
    │   └── TrackOrderScreen (Live tracking)
    │
    ├── Inbox Tab
    │   ├── InboxScreen (Chat list)
    │   ├── MessageDetailScreen (Chat with DocMate)
    │   └── NewMessageScreen
    │
    └── Profile Tab
        ├── ProfileScreen
        ├── EditProfileScreen
        ├── SettingsScreen
        └── ChangePasswordScreen
```

### Tab Icons
- **Home** – 🏠 home / home-outline
- **Orders** – 📦 receipt / receipt-outline
- **Inbox** – 💬 chatbubble / chatbubble-outline
- **Profile** – 👤 person / person-outline

---

## 🛠 Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** or **yarn**
- **Expo CLI** – Install globally: `npm install -g expo-cli`
- **iOS Simulator** (macOS) or **Android Emulator** (optional for testing)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd DocMate

# Install dependencies
npm install

# Install necessary Expo packages
npx expo install react-native-safe-area-context

# Start development server
npm start
```

### Running the App

```bash
# Start Expo development server
npm start

# Run on iOS Simulator
npm run ios

# Run on Android Emulator
npm run android

# Run in web browser
npm run web

# Or scan QR code with Expo Go app (Android/iOS)
```

### Development Tips

- **Toggle Auth Flow**: Change `isLoggedIn` in `src/navigation/AppNavigator.tsx` to test authentication
- **Hot Reload**: Changes auto-refresh in the dev server
- **Debug**: Use React Native Debugger for better debugging experience

---

## 🎨 Design & UX Philosophy

- **Student-Friendly** – Intuitive, fast, and minimal friction
- **Color Scheme** – Vibrant Orange (Primary) + Deep Blue (Secondary)
- **Typography** – Clean, readable fonts optimized for mobile
- **Accessibility** – WCAG compliant with proper contrast ratios
- **Localization** – Bilingual support (English 🇬🇧 + Nepali 🇳🇵)
- **Tone** – Humorous, relatable, and encouraging (making campus runs fun!)
- **Responsive Design** – Works seamlessly on phones of all sizes with safe area handling

---

## 🚧 Roadmap & Future Enhancements

### Phase 2 (Q2 2026)
- [ ] Video verification for DocMate runners
- [ ] University-specific document automation
- [ ] Push notifications for real-time updates
- [ ] Advanced filtering & search capabilities

### Phase 3 (Q3 2026)
- [ ] AI-based document recommendation engine
- [ ] Courier integration for document delivery
- [ ] Comprehensive rating & review system with badges
- [ ] Referral program ("Invite a friend, get free delivery!")

### Phase 4 (Q4 2026 & Beyond)
- [ ] Admin dashboard for dispute management
- [ ] Analytics & insights for runners
- [ ] Bulk document requests
- [ ] University partner integrations
- [ ] Support for international students

---

## 📝 Development Notes

- **Mock Data** – Currently using mock/placeholder data for rapid development
- **Auth State** – Authentication is hardcoded to `isLoggedIn = true` for quick testing
  - Change this in `src/navigation/AppNavigator.tsx` to test the full auth flow
- **Architecture** – Feature-based modular structure for easy scaling
- **Redux Setup** – Ready for state management (slices in `src/features/`)
- **API Integration** – API client structure ready in `src/api/`
- **Type Safety** – Strict TypeScript configuration for production readiness

### Environment Setup

- **Node Version**: v18+ recommended
- **Package Manager**: npm (can use yarn as alternative)
- **Platform**: macOS/Linux/Windows compatible

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## ❓ Troubleshooting

### Common Issues

**Expo won't start?**
```bash
# Clear cache and reinstall
npm install
npx expo start --clear
```

**Module not found error?**
```bash
# Check tsconfig paths and babel module resolver config
# Ensure all imports use the correct aliases
```

**Android/iOS simulator not responding?**
```bash
# Kill existing process and restart
npx expo start --clear
# Then select your platform
```

---

## 📄 License

This project is **private and proprietary**. All rights reserved.

---

## 👨‍💻 Team

**Created with ❤️ by Grish Joshi**

*For Nepali students who are tired of making endless campus runs.* 🎓

---

## 📞 Support

For issues, questions, or feature requests, please open an issue or contact the team.

---

**Last Updated**: April 2026 | **Version**: 1.0.0
**Here's a much better, engaging, and accurate `README.md` tailored for your DocMate app:**

---

```markdown
# DocMate

**"Campus Tadha Xa? No Tension Bro, DocMate Le DauDxa!"**

> **[Campus too far? No worries! DocMate's got you covered!]**

DocMate is a modern React Native mobile application that connects students with verified local runners (DocMates) near universities across Nepal. Say goodbye to expensive, tiring, and time-consuming trips to campus for official documents like transcripts, degrees, migration certificates, provisional certificates, and more.

Whether you need documents from Tribhuvan University, Kathmandu University, or any other campus in Nepal — DocMate gets it done while you relax at home.

---

## ✨ Key Features

- **🔍 Find Your DocMate**: Browse and filter verified runners near your university with real-time availability, ratings, success rate, and detailed reviews
- **📝 Easy Document Requests**: Intuitive form to request any university document (transcripts, degrees, character certificates, provisional certificates, etc.)
- **📍 Real-time Order Tracking**: Live status updates from "Applied" → "Processing" → "Ready to Deliver" with location sharing
- **💬 In-app Chat System**: Direct, secure communication with your assigned DocMate for questions and updates
- **👥 Dual User Roles**: Seamless switching between Student mode and DocMate (Runner) mode
- **💳 Secure Payments**: Multiple payment gateways (eSewa, Khalti, IME Pay) and bank transfer options
- **🎓 Smart Onboarding**: University detection, verification, and personalized experience based on your institution
- **👤 Comprehensive Profiles**: Manage order history, earnings (for runners), settings, and verification documents

## 🚀 Tech Stack

| Technology            | Purpose                              |
| --------------------- | ------------------------------------ |
| **React Native**      | Cross-platform mobile development    |
| **Expo**              | Development platform & build service |
| **TypeScript**        | Type-safe JavaScript                 |
| **Redux Toolkit**     | Predictable state management         |
| **React Navigation**  | Bottom Tabs + Stack Navigators       |
| **Expo Vector Icons** | Icon library (Ionicons)              |

---

DocMate/
├── src/
│ ├── api/ # API client and endpoints
│ │ ├── client.ts # Axios/Fetch configuration
│ │ └── documents.ts # Document-related API calls
│ │
│ ├── components/ # Reusable UI components
│ │ ├── Button.tsx
│ │ ├── Card.tsx
│ │ ├── Input.tsx
│ │ ├── Modal.tsx
│ │ └── ui/ # Atomic UI components
│ │ ├── Divider.tsx
│ │ ├── Icon.tsx
│ │ ├── Spacer.tsx
│ │ └── Text.tsx
│ │
│ ├── constants/
│ │ └── index.ts # Route names & app constants
│ │
│ ├── features/ # Feature-based Redux modules
│ │ └── documents/
│ │ ├── documentsSlice.ts # Redux slice
│ │ └── hooks/ # Feature hooks
│ │ ├Architecture
```

AppNavigator (Stack)
│
├── 🔐 Auth Stack (when not logged in)
│ ├── WelcomeScreen
│ ├── OnboardingScreen
│ ├── SignInScreen / SignUpScreen
│ ├── LoginScreen / RegisterScreen
│ └── ForgotPasswordScreen
│
└── 🏠 Main Tabs (when logged in) - Bottom Tab Navigation
├── Home Tab
**Node.js** v18 or higher

- **npm** or **yarn**
- **Expo CLI** – Install globally: `npm install -g expo-cli`
- **iOS Simulator** (macOS) or **Android Emulator** (optional for testing)

### Installation

```bash
# Clone the repository
git clone https://github.com/Grishj/DocMates
cd DocMate

# Install dependencies
npm install

# Install necessary Expo packages
npx expo install react-native-safe-area-context

# Start development server
npm start
```

### Running the App

```bash
# Start Expo development server
npm start

# Run on iOS Simulator
npm run ios

# Run on Android Emulator
npm run android

# Run in web browser
npm run web

# Or scan QR code with Expo Go app (Android/iOS)
```

### Development Tips

- **Toggle Auth Flow**: Change `isLoggedIn` in `src/navigation/AppNavigator.tsx` to test authentication
- **Hot Reload**: Changes auto-refresh in the dev server
- **Debug**: Use React Native Debugger for better debugging experience\*Inbox\*\* – 💬 Chat Bubble
- **Profile** – 👤 Person
  │ ├── navigation/ # Navigation configuration
  │ │ ├── AppNavigator.tsx # Root navigator (Auth/Main)
  │ │ ├── tabs/
  │ │ │ └── MainTabs.tsx # Bottom tab navigation
  │ │ └── stacks/
  │ │ ├── auth/ # Auth screens
  │ │ │ └── AuthStack.tsx
  │ │ ├── home/ # Home feature
  │ │ │ └── HomeStack.tsx
  │ │ ├── inbox/ # Messaging feature
  │ │ │ └── InboxStack.tsx
  │ │ ├── order/ # Order tracking feature
  │ │ │ └── OrderStack.tsx
  │ │ └── profile/ # User profile feature
  │ │ └── ProfileStack.tsx
  │ │
  │ ├── screens/ # Screen components
  │ │ ├── auth/ # Authentication flow
  │ │ │ ├── WelcomeScreen.tsx
  │ │ │ ├── OnboardingScreen.tsx
  │ │ │ ├── SignInScreen.tsx
  │ │ │ ├── SignUpScreen.tsx
  │ │ │ └── ...
  │ │ └── main/ # Main app screens
  │ │ ├── home/
  │ │ ├── inbox/
  │ │ ├── order/
  │ │ └── profile/
  │ │
  │ ├── store/
  │ │ └── index.ts # Redux store setup
  │ │
  │ ├── theme/ # Design system
  │ │ ├── colors.ts # Color palette
  │ │ └── spacing.ts # Spacing scale
  │ │
  │ ├── types/ # TypeScript definitions
  │ │ ├── index.ts
  │ │ └── navigation.ts # Navigation param types
  │ │
  │ └── utils/ # Utility functions
  │ ├── formatDate.ts
  │ ├── formatFileSize.ts
  │ └── validateEmail.ts
  │
  ├── App.tsx # Root component wrapper
  ├── index.ts # Entry point
  ├── app.json # Expo configuration
  ├── babel.config.js # Babel setup
  ├── tsconfig.json # TypeScript config
  ├── package.json # Dependencies & scripts
  └── assets/ # Icons, splash screen, etc.
  ├── app.jsonUX Philosophy

- **Student-Friendly**: Intuitive, fast, and minimal friction
- **Color Scheme**: Vibrant Orange (Primary) + Deep Blue (Secondary)
- **Typography**: Clean, readable fonts optimized for mobile
- **Accessibility**: WCAG compliant with proper contrast ratios
- **Localization**: Bilingual support (English 🇬🇧 + Nepali 🇳🇵)
- **Tone**: Humorous, relatable, and encouraging (making campus runs fun!)
- **Responsive Design**: Works seamlessly on phones of all sizes with safe area handling

## 📲 Navigation Flow

- **Auth Stack**: Welcome → Onboarding → Sign In / Sign Up → University Selection
- **Main Tabs**:
  - **Home** – Browse services, universities, and available DocMates
  - **Orders** – Active & past orders with tracking
  - **Inbox** – Chat with your DocMate
  - **Profile** – User profile, earnings (for runners), settings

---

## 🛠 Getting Started

### Prerequisites

- Node.js (v18+)
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator or Android Emulator (optional)

### Installation

```bash
# Clone the repo
git clone <your-repo-url>
cd DocMate

# Install dependencies
npm install

# Start development server
npm start
```

### Run on Devices

Roadmap & Future Enhancements

### Phase 2 (Q2 2026)

- [ ] Video verification for DocMate runners
- [ ] University-specific document automation
- [ ] Push notifications for real-time updates
- [ ] Advanced filtering & search capabilities

### Phase 3 (Q3 2026)

- [ ] AI-based document recommendation engine
- [ ] Courier integration for document delivery
- [ ] Comprehensive rating & review system with badges
- [ ] Referral program ("Invite a friend, get free delivery!")

### Phase 4 (Q4 2026 & Beyond)

- **Mock Data**: Currently using mock/placeholder data for rapid development
- **Auth State**: Authentication is hardcoded to `isLoggedIn = true` for quick testing
  - Change this in `src/navigation/AppNavigator.tsx` to test the full auth flow
- **Architecture**: Feature-based modular structure for easy scaling
- **Redux Setup**: Ready for state management (slices in `src/features/`)
- **API Integration**: API client structure ready in `src/api/`
- **Type Safety**: Strict TypeScript configuration for production readiness

### Environment Setup

- **Node Version**: v18+ recommended
- **Package Manager**: npm (can use yarn as alternative)
- **Platform**: macOS/Linux/Windows compatible

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## ❓ Troubleshooting

### Common Issues

**Expo won't start?**

```bash
# Clear cache and reinstall
npm install
npx expo start --clear
```

**Module not found error?**

```bash
# Check tsconfig paths and babel module resolver config
# Ensure all imports use the correct aliases
```

**Android/iOS simulator not responding?**

```bash
# Kill existing process and restart
npx expo start --clear
# Then select your platform
```

---

## 📄 License

This project is **private and proprietary**. All rights reserved.

---

## 👨‍💻 Team

**Created with ❤️ by [Your Team Name]**

_For Nepali students who are tired of making endless campus runs._ 🎓

---

## 📞 Support

For issues, questions, or feature requests, please [open an issue](link-to-issues) or contact the team.

---

**Last Updated**: April 2026 | **Version**: 1.0.0

## 🚧 Future Enhancements

- Video verification for DocMates (runners)
- University-specific document automation
- AI-based document recommendation
- Courier integration for document delivery
- Rating & review system with badges
- Admin dashboard for dispute management
- Push notifications for order updates
- Referral system ("Invite your friend, get free delivery")

---

## 📝 Development Notes

- Currently using mock data for development
- Authentication is set to `isLoggedIn = true` for faster testing (change in `AppNavigator.tsx`)
- Following feature-based architecture for scalability
- Ready for backend integration (Node.js / NestJS recommended)

---

## 📄 License

This project is **private and proprietary**.

---

**Made with ❤️ by Grish Joshi for Nepali students who are tired of campus runs.**

---
