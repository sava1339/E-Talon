import { setBackgroundDark, setMiniLogo, setPage } from '../../../reducers/pageReducer';
import { useAppDispatch } from '../../../store/hook';
import '../styles/dataGet.css'
import Back from '../../assets/back.svg?react';

export default function DataGet() {
  const dispatch = useAppDispatch();

  const back = () =>{
    localStorage.removeItem('token');
    dispatch(setMiniLogo(false));
    dispatch(setBackgroundDark(false));
    dispatch(setPage(0));
  }
  return (
    <div className='content'>
      <div className='box'>
        <p className='title'>Информация получена</p>
        <p className='desc'>Хорошего вам дня!</p>
        <div onClick={back} className='button i_c'> <Back stroke='#fff' className="back" /> <p>Выйти</p></div>
      </div>
    </div>
  )
}
