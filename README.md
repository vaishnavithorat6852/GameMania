# 🎮 GameMania - Game Recommendation App

![GameMania Banner](https://via.placeholder.com/1200x300/141414/E50914?text=GameMania+-+Your+Ultimate+Gaming+Hub)

> A modern, responsive web application for discovering games, exploring details, and managing a wishlist. Built with React, Vite, Tailwind CSS, and the RAWG Video Games Database API.

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![RAWG API](https://img.shields.io/badge/RAWG_API-000000?style=for-the-badge&logo=api&logoColor=white)](https://rawg.io/apidocs)

---

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Screenshots](#-screenshots)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Environment Variables](#environment-variables)
  - [Installation](#installation)
- [Project Structure](#-project-structure)
- [Available Scripts](#-available-scripts)
- [License](#-license)

---

## ✨ Features

- **🚀 Game Discovery**: Explore trending, top-rated, and new games through Netflix-inspired horizontal carousels.
- **🔍 Search & Filter**: Find games by name with debounced search, or filter by specific genres using a dynamic pill navigation menu.
- **📖 Game Details**: View in-depth game information including descriptions, release dates, platforms, metacritic scores, screenshot galleries, and trailers.
- **❤️ Wishlist Management**: Add games to your wishlist. Data is persisted locally in your browser so you never lose your selections.
- **🎯 Personalized Recommendations**: Get game recommendations automatically tailored to the top genres in your wishlist.
- **🕒 Recently Viewed**: Keep track of the last 10 games you've checked out in a dedicated section on the Wishlist page.
- **🌓 Dark/Light Theme**: Toggle between a Netflix-inspired dark mode and a clean light mode seamlessly.

---

## 🛠 Tech Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4, `clsx`, `tailwind-merge`
- **Routing**: React Router DOM v7
- **State Management**: React Context API & Local Storage
- **Data Fetching**: Axios
- **Icons**: React Icons, Lucide React
- **Notifications**: React Hot Toast

---

## 📸 Screenshots

*(Add your actual application screenshots here)*

| Home Page | Game Details |
| :---: | :---: |
| ![Home](https://via.placeholder.com/600x400/141414/ffffff?text=Home+Page+Preview) | ![Details](https://via.placeholder.com/600x400/141414/ffffff?text=Game+Details+Preview) |

| Search / Category Filter | Wishlist |
| :---: | :---: |
| ![Search](https://via.placeholder.com/600x400/141414/ffffff?text=Category+Filter) | ![Wishlist](https://via.placeholder.com/600x400/141414/ffffff?text=Wishlist+Preview) |

---

## 🚀 Getting Started

Follow these instructions to set up the project locally on your machine.

### Prerequisites

You will need **Node.js** and **npm** installed on your system.
- Node.js (v18 or higher recommended)
- npm (v9 or higher)

### Environment Variables

To run this project, you will need to add your **RAWG API Key**.

1. Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```

2. Open the `.env` file and add your API key:
   ```env
   VITE_RAWG_API_KEY=your_rawg_api_key_here
   ```
   *You can get a free API key by registering at the [RAWG developer portal](https://rawg.io/apidocs).*

### Installation

1. **Clone the repository** (if not already local)
   ```bash
   git clone <your-repository-url>
   cd GameMania
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

The application will be up and running at `http://localhost:5173`.

---

## 📂 Project Structure

```text
GameMania/
├── public/                 # Static assets
├── src/
│   ├── assets/             # Internal assets (images, fonts)
│   ├── components/         # Reusable UI components
│   ├── context/            # React Context (Theme, Wishlist)
│   ├── hooks/              # Custom React hooks
│   ├── pages/              # Route pages (Home, GameDetails, etc.)
│   ├── services/           # API interaction functions (RAWG API)
│   ├── App.jsx             # Main application component
│   ├── index.css           # Global Tailwind CSS
│   └── main.jsx            # Application entry point
├── .env.example            # Example environment variables
├── eslint.config.js        # ESLint configuration
├── index.html              # HTML entry point
├── package.json            # Project dependencies and scripts
└── vite.config.js          # Vite configuration
```

---

## 📜 Available Scripts

In the project directory, you can run:

- `npm run dev`: Starts the Vite development server.
- `npm run build`: Builds the app for production into the `dist` folder.
- `npm run lint`: Runs ESLint to check for code quality issues.
- `npm run preview`: Locally previews the production build.

---

## 📄 License

This project is open-source and available under the terms of the MIT License.

---
<div align="center">
  <i>Built with ❤️ for gamers. Enjoy exploring games on GameMania!</i>
</div>
