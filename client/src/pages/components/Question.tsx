
import { useState } from 'react';
import '../styles/question.css';
import { useAppDispatch, useAppSelector } from '../../../store/hook';
import { setBackgroundDark, setMiniLogo, setPage } from '../../../reducers/pageReducer';
import { set, ref, getDatabase } from 'firebase/database';

export default function Question() {
  const [accept,setAccept] = useState(false);
  const uid = useAppSelector(state => state.page.uid)
  const dispatch = useAppDispatch();
  const db = getDatabase();
  const acceptFunc = async() =>{
    if(accept){
      dispatch(setMiniLogo(true));
      dispatch(setBackgroundDark(false));
      await set(ref(db,`users/${uid}/isKeyUsed`),2);
      dispatch(setPage(2));
    }else{
      dispatch(setBackgroundDark(true))
      setAccept(true)
    }
  }
  const back = async() =>{
    dispatch(setMiniLogo(true));
    dispatch(setBackgroundDark(false));
    await set(ref(db,`users/${uid}/info`),2);
    dispatch(setPage(3));
  }
  return (
    <div className='content'>
      {accept? 
        <div className='box question_alt'>
          {accept && <p className="title alt"> Вы уверены, что <span className='white_text alt'>не пойдете</span> сегодня на комплексное  питание?</p>}
          <div className="buttom_box alt">
            <button onClick={back} className="button alt">Нет, я передума</button>
            <button onClick={acceptFunc} className="button alt active">Да, я уверен</button>
          </div>
        </div>
      :
      <div className='box'>
        <p className="title"> Идете ли вы <span className='white_text'>сегодня на комплекс?</span></p>
        <div className="buttom_box">
          <button onClick={acceptFunc} className="button active">Да, иду!</button>
          <button onClick={back} className="button">Нет</button>
        </div>
      </div>
      }
    </div>
  )
}
