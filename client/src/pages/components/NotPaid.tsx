import { setBackgroundDark, setMiniLogo, setPage } from '../../../reducers/pageReducer';
import { useAppDispatch } from '../../../store/hook';
import logo from '../../assets/LogoNonTitle.svg';
import Back from '../../assets/back.svg?react'
import '../styles/notPaid.css'

export default function NotPaid() {
  const dispatch = useAppDispatch()
  const back = ()=>{
    localStorage.removeItem('token');
    dispatch(setMiniLogo(false));
    dispatch(setBackgroundDark(false));
    dispatch(setPage(0));
  }
  return (
    <div className='content'>
      <div className='box'>
        <img className='logo' src={logo} alt="" />
        <p className='not_paid_title'>У вас не оплачена квитанция за питание</p>
        <p className='not_paid_desc'>Вы не можете получить талон, пока не оплатили квитанцию</p>
        <div onClick={back} className='button n_p'> <Back stroke='#fff' className="back" /> <p>Назад</p></div>
      </div>
    </div>
  )
}
