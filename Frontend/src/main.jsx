import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import {BrowserRouter} from "react-router-dom";
import { AuthProvider } from './context/auth.jsx';
import { SearchProvider } from './context/search.jsx';
import { CardProvider } from './context/card.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <SearchProvider>
      <CardProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
       </CardProvider>
    </SearchProvider>
  </AuthProvider>,
)
