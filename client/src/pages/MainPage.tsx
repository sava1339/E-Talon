import backDec from '../assets/BackDec.svg';
import backDecAlt from '../assets/BeckDecAlt.svg';
import './styles/background.css';
import Main from './components/Main';
import logo from '../assets/Logo.svg';
import NotPaid from './components/NotPaid';
import InformationMain from './components/InformationMain';
import { useAppSelector } from '../../store/hook';
import DataGet from './components/DataGet';
import Question from './components/Question';
import ResetPassword from './components/ResetPassword';

export default function mainPage() {
  const {backgroundDark, miniLogo} = useAppSelector(state => state.page); 
  const page = useAppSelector(state => state.page.page);
  const showPasswordChange = useAppSelector(state => state.page.showChangePassword);
  
  return (
    <div className='main'>
      <img style={{top:"0",rotate:"180deg"}} className='absolute back_dec' src={backDecAlt} alt="" />
      <img style={{top:"0",rotate:"180deg"}} className='absolute back_dec' src={backDec} alt="" />
      <img style={{bottom:"0"}} className='absolute back_dec' src={backDecAlt} alt="" />
      <img style={{bottom:"0"}} className='absolute back_dec' src={backDec} alt="" />
      {miniLogo && <img className='mini_logo' src={logo} />}
      {backgroundDark && <div className='dark'></div>}
      {showPasswordChange && <ResetPassword/>}
      <div className='background'>
        {+page == 0 ? <Main/> : null}
        {+page == 1 ? <NotPaid/> : null}
        {+page == 2 ? <InformationMain/> : null}
        {+page == 3 ? <DataGet/> : null}
        {+page == 4 ? <Question/> : null}
      </div>
    </div>
  )
}