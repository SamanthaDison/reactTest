import React from 'react';
import { createHashRouter } from 'react-router-dom';
import { App } from './App.jsx';
import AboutPage from './pages/AboutPage.jsx';
import AccountPage from './pages/AccountPage.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import HomePage from './pages/HomePage.jsx';
import PostsPage from './pages/PostsPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import { accountService } from './services/AccountService.js';
import { postsService } from './services/PostsService.js';
import AuthGuard from './utils/AuthGuard.jsx';

// this is a more typical router setup to vue or angular
export const router = createHashRouter([
  {
    // default path and element (component or page) to load
    path: "/",
    element: <App />,
    // auto directs to this page w/ any router error
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "Posts",
        element: <PostsPage />
      },
      {
        path: "profile/:id",
        element: <ProfilePage />,
        // loader: postsService.getProfileContent,
      },
      {
        path: "account",
        // tries to go and get accnt before loading page (before you can access this route, do this)
        // loaders must return a value
        loader: accountService.getAccount,
        element:
          <AuthGuard>
            {/* AccountPage is the child component that is rendered upon authenticated login */}
            <AccountPage />
          </AuthGuard>,
      },

    ],
  },
]);