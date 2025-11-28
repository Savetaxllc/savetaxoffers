import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import MainLayout from './mainLayout';
import { ThemeProvider } from '@mui/material';
import theme from './theme';
import { HomePage } from './homePage';
import { RegistrationPage } from './Registration';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            {/* Define your routes here */}
            <Route path="/" element={<HomePage />} />
            <Route path= 'offer-registration' element= {<RegistrationPage/>}/>
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
