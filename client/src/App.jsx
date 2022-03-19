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

const App = () => {
  return (
    <Router>
      <NavBar />
      <AuthContext.AuthProvider>
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
            <Route path="/login" element={<SignIn />} exact />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </AuthContext.AuthProvider>
    </Router>
  );
};

export default App;
