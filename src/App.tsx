import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
    return (
        <div className='App'>
            <Routes>
                <Route path='/sign-up' element={<h1>sign up</h1>} />
                <Route path='/login' element={<h1>log in</h1>} />
            </Routes>
        </div>
    );
}

export default App;
