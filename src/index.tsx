import React from 'react';
// import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { MyTheme } from './styles';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material/styles';
import { FiltersProvider } from '~/products/FiltersProvider';
import ErrorHandler from '~/errors/ErrorHandler';
import { hydrate, render } from 'react-dom';

const rootElement = document.getElementById('root');
const MainApp = () => (
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <ThemeProvider theme={MyTheme}>
          <StyledEngineProvider injectFirst>
            <FiltersProvider>
              <ErrorHandler>
                <App />
              </ErrorHandler>
            </FiltersProvider>
          </StyledEngineProvider>
        </ThemeProvider>
      </Router>
    </Provider>
  </React.StrictMode>
);

// ReactDOM.render(
//   ,
//   document.getElementById('root')
// );

if (rootElement?.hasChildNodes()) {
  hydrate(<MainApp />, rootElement);
} else {
  render(<MainApp />, rootElement);
}
