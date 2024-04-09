import backDec from '../assets/BackDec.svg';
import backDecAlt from '../assets/BeckDecAlt.svg';
import './styles/main.css';
import Main from './components/Main';

export default function mainPage() {

  return (
    <div className='main'>
        <img style={{top:"0",rotate:"180deg"}} className='absolute back_dec' src={backDecAlt} alt="" />
        <img style={{top:"0",rotate:"180deg"}} className='absolute back_dec' src={backDec} alt="" />
        <img style={{bottom:"0"}} className='absolute back_dec' src={backDecAlt} alt="" />
        <img style={{bottom:"0"}} className='absolute back_dec' src={backDec} alt="" />
      <div className='background'>
        <Main/>
      </div>
    </div>
  )
}