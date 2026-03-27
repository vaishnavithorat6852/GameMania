# GameMania - Game Recommendation App

A modern, responsive web application for discovering games, exploring details, and managing a wishlist. Built with React, Vite, Tailwind CSS, and the RAWG Video Games Database API.

## Features

- **Game Discovery**: Explore trending, top-rated, and new games through Netflix-inspired horizontal carousels.
- **Search & Filter**: Find games by name with debounced search, or filter by specific genres using a pill navigation menu.
- **Game Details**: View in-depth game information including descriptions, release dates, platforms, metacritic scores, screenshot galleries, and trailers.
- **Wishlist**: Add games to your wishlist. Data is persisted locally in your browser so you don't lose your selections.
- **Personalized Recommendations**: Get game recommendations automatically tailored to the top genres in your wishlist.
- **Recently Viewed**: Keep track of the last 10 games you've checked out in a dedicated section on the Wishlist page.
- **Dark/Light Theme**: Toggle between Netflix-inspired dark mode and a clean light mode seamlessly.

## Tech Stack

- **Frontend**: React 18, set up with Vite for rapid environment loading.
- **Styling**: Tailwind CSS v4 for utility-first responsive design.
- **Routing**: React Router DOM v6.
- **State Management**: React Context API & `localStorage`.
- **API**: [RAWG API](https://rawg.io/apidocs) via Axios.
- **Icons**: React Icons (Lucide, FontAwesome).
- **Notifications**: React Hot Toast.

## Setup Instructions

1. **Clone the repository** (if not already local).
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Configure API Key**:
   - Create a `.env` file in the root directory (you can copy from `.env.example`).
   - Add your RAWG API key:
     ```
     VITE_RAWG_API_KEY=your_rawg_api_key_here
     ```
4. **Start the development server**:
   ```bash
   npm run dev
   ```

## Production Build

To build the project for production:
```bash
npm run build
```
This generates optimized static files in the `/dist` output directory.

Enjoy exploring games on GameMania!
