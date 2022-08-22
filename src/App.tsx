import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { SignUp } from './pages';

function App() {
    return (
        <div className='App'>
            <Routes>
                <Route path='/sign-up' element={<SignUp />} />
                <Route path='/login' element={<h1>log in</h1>} />
            </Routes>
        </div>
    );
}

export default App;
