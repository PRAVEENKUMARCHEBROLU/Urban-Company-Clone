import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/authcontext.jsx'
import { BookingProvider } from './context/bookingcontext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
   <StrictMode>
     <BrowserRouter>
        <AuthProvider>
            <BookingProvider>
              <App />
            </BookingProvider>
        </AuthProvider>
     </BrowserRouter>
   </StrictMode> 
);