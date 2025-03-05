import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './styles/global.scss'
import { router } from './router';
import { RouterProvider } from 'react-router-dom';
import { store } from './redux/store';
import { Provider } from 'react-redux';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);


reportWebVitals();
