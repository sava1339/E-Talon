import backDec from '../assets/BackDec.svg';
import backDecAlt from '../assets/BeckDecAlt.svg';
import './styles/background.css';
import Main from './components/Main';
import logo from '../assets/Logo.svg';
import { useState } from 'react';
import NotPaid from './components/NotPaid';
import InformationMain from './components/InformationMain';

export default function mainPage() {
  const [backgroundDark] = useState(false);
  const [miniLogo] = useState(true);
  const [selectPage] = useState(2);

  return (
    <div className='main'>
      <img style={{top:"0",rotate:"180deg"}} className='absolute back_dec' src={backDecAlt} alt="" />
      <img style={{top:"0",rotate:"180deg"}} className='absolute back_dec' src={backDec} alt="" />
      <img style={{bottom:"0"}} className='absolute back_dec' src={backDecAlt} alt="" />
      <img style={{bottom:"0"}} className='absolute back_dec' src={backDec} alt="" />
      {miniLogo && <img className='mini_logo' src={logo} />}
      {backgroundDark && <div className='dark'></div>}
      <div className='background'>
        {selectPage === 0 && <Main/>}
        {selectPage === 1 && <NotPaid/>}
        {selectPage === 2 && <InformationMain/>}
      </div>
    </div>
  )
}