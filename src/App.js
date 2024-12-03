import React from 'react';
import { useState } from 'react';
import Login from './components/auth/Login';
import  Signup from './components/auth/Signup';
import BookingForm from './components/BookingForm';
import './App.css';


function App() {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <div>
            {!authenticated ? (
                <>
                    <Signup />
                    <Login setAuthenticated={setAuthenticated} />
                </>
            ) : (
                <BookingForm />
            )}
    </div>
  );
}

export default App;
