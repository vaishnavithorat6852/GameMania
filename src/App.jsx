import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AppProvider } from './context/AppProvider';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import GameDetails from './pages/GameDetails';
import Wishlist from './pages/Wishlist';

const Layout = ({ children }) => (
  <div className="min-h-screen bg-gray-50 dark:bg-[#111111] text-gray-900 dark:text-white transition-colors duration-200 flex flex-col">
    <Navbar />
    <main className="container w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
      {children}
    </main>
    <footer className="p-8 text-center text-sm text-gray-500 border-t border-gray-200 dark:border-gray-800 mt-auto bg-white dark:bg-[#141414]">
      <p>© {new Date().getFullYear()} GameMania. Created with RAWG API.</p>
    </footer>
  </div>
);

function App() {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/games/:id" element={<GameDetails />} />
            <Route path="/wishlist" element={<Wishlist />} />
          </Routes>
        </Layout>
        <Toaster position="bottom-right" 
                 toastOptions={{
                   style: {
                     background: '#333',
                     color: '#fff',
                     borderRadius: '12px',
                   },
                 }} 
        />
      </Router>
    </AppProvider>
  );
}

export default App;
