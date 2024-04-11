import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from '../store/store';
import { BrowserRouter } from 'react-router-dom'
import { initializeApp } from 'firebase/app';

export const viteEnv = (keyName:string) =>{
  return import.meta.env[`VITE_${keyName}`];
} 
const firebaseConfig = {
  apiKey: viteEnv("API_KEY"),
  authDomain: viteEnv("AUTH_DOMAIN"),
  databaseURL: viteEnv("DATABASE_URL"),
  projectId: viteEnv("PROJECT_ID"),
  storageBucket: viteEnv("STORAGE_BUCKET"),
  messagingSenderId: viteEnv("MESSAGING_SENDER_ID"),
  appId: viteEnv("APP_ID"),
  measurementId: viteEnv("MEASUREMENT_ID")
}

initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
)
