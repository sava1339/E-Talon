import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from '../store/store';
import { BrowserRouter } from 'react-router-dom'

export const viteEnv = (keyName:string) =>{
  return import.meta.env[`VITE_${keyName}`];
} 

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
)
