# SwipeJobs React Native App

A modular, testable, and responsive job matching app built with Expo and React Native.

## Expo GO Demo
![QR](https://github.com/user-attachments/assets/e931c75c-18cb-4841-98f8-af2d5a9966ed)

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#-tech-stack">Tech Stack</a></li>
    <li><a href="#-features">Features</a></li>
    <li><a href="#-getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#-project-structure">Project Structure</a></li>
    <li><a href="#-key-components">Key Components</a></li>
    <li><a href="#-utils">Utils</a></li>
    <li><a href="#-design">Design</a></li>
    <li><a href="#-future-improvements">Future Improvements</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

## 🚀 Tech Stack

- **Framework:** React Native with Expo
- **Language:** TypeScript
- **Navigation:** React Navigation
- **Data Fetching:** Fetch API, React Query
- **Testing:** Jest, React Native Testing Library

## 🌟 Features

- **Job Listings:** Browse jobs matched to your profile in a card layout
- **Job Details:** View job info, requirements, and accept/reject offers
- **User Profile:** View your profile details in a modern card
- **Responsive Design:** Optimized for phones and tablets
- **API Integration:** Real data, loading and error handling
- **Testing:** Unit and integration tests for components and API

## 🛠 Getting Started

### Prerequisites

- Node.js
- npm or yarn
- Expo CLI
  ```sh
  npm install -g expo-cli
  ```

### Installation

1. **Clone the repository**
   ```sh
   git clone https://github.com/xeo3221/swipejobs.git
   cd swipejobs
   ```
2. **Install dependencies**
   ```sh
   npm install
   # or
   yarn install
   ```
3. **Start the development server**
   ```sh
   npx expo start
   # or
   yarn expo start
   ```

### Running Tests

```sh
npm test
# or
yarn test
```

## 📁 Project Structure

```
src/
  api/         # API calls (Fetch)
  components/  # Reusable UI components
  context/     # Context API (if needed)
  navigation/  # Navigation setup
  screens/     # App screens
  tests/       # Unit & integration tests
  types/       # TypeScript types
  utils/       # Utility functions
```

## 📦 Key Components

- `JobCard`: Card displaying job summary
- `Loader`: Loading indicator
- `Error`: Error message display
- `ProfileScreen`: User profile view
- `JobDetailsScreen`: Detailed job info and actions
- `JobListScreen`: List of matched jobs

## 🔧 Utils

- `formatWage`, `formatShiftDate`, `safeGet`, `formatRequirements`: Utility functions for formatting and safe data access
- `useIsTablet`: Responsive design hook

## 🎨 Design

  <img src="https://github.com/user-attachments/assets/589f60cc-8300-4322-ae02-e24370bf0621" width="350" height="auto" />
  <img src="https://github.com/user-attachments/assets/e67b4606-f0d2-4779-a312-6957bc60a7b0" width="350" height="auto" />
  <img src="https://github.com/user-attachments/assets/13c20474-477e-4c82-89e5-9c04f2730f4d" width="350" height="auto" />
  <img src="https://github.com/user-attachments/assets/f280298e-6726-4d86-baf7-82f362f29f91" width="350" height="auto" />

---

_This project was created as a technical recruitment task for SwipeJobs._
