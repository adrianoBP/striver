import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AuthContext from './components/AuthContext';

import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheet.css';

import NavBar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import NotFound from './pages/NotFound';
import CirclePage from './pages/Circle';
import GrindPage from './pages/Grind';

const App = () => {
  return (
    <Router>
      <link
        href="https://fonts.googleapis.com/css?family=Quicksand"
        rel="stylesheet"
      />
      <AuthContext.AuthProvider>
        <NavBar />
        <main className="appBody">
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
              exact
            />
            <Route
              path="/circles/:circleId"
              element={
                <ProtectedRoute>
                  <CirclePage />
                </ProtectedRoute>
              }
              exact
            />
            <Route
              path="/circles/:circleId/grinds/:grindId"
              element={
                <ProtectedRoute>
                  <GrindPage />
                </ProtectedRoute>
              }
              exact
            />
            <Route path="/login" element={<SignIn />} exact />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </AuthContext.AuthProvider>
    </Router>
  );
};

export default App;
