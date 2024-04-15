
import { useEffect, useState } from 'react';
import '../styles/question.css';
import { useAppDispatch, useAppSelector } from '../../../store/hook';
import { setAuto, setBackgroundDark, setMiniLogo, setPage } from '../../../reducers/pageReducer';
import { set, ref, getDatabase, get, child } from 'firebase/database';



export default function Question() {
  const [accept,setAccept] = useState(false);
  const [block,setBlock] = useState(false);
  const autoCheck = useAppSelector(state => state.page.user.auto);
  const [loading,setLoading] = useState(true);
  const [lastTimeText,setlastTimeText] = useState('');
  const uid = useAppSelector(state => state.page.uid)
  const dispatch = useAppDispatch();
  const db = getDatabase();
  const acceptFunc = async() =>{
    if(accept){
      const secondTime = await fetch('https://worldtimeapi.org/api/ip',{
        method:"GET",
      }).then(res => res.json())
      const time = secondTime.datetime.slice(11,13)
      if(!(secondTime.timezone === "Asia/Yekaterinburg") || +time > 9 || +time < 6){
        setBlock(true);
      }else{
        dispatch(setMiniLogo(true));
        dispatch(setBackgroundDark(false));
        await set(ref(db,`users/${uid}/isKeyUsed`),2);
        dispatch(setPage(2));
      }
    }else{
      dispatch(setBackgroundDark(true))
      setAccept(true)
    }
  }
  useEffect(()=>{
      let lastTime:number = 0;
      const getTime = async()=>{
        const dbRef = ref(getDatabase());
      await get(child(dbRef, `version/time`)).then(async(snapshot:any) => {
        if (snapshot.exists()) {
          lastTime = snapshot.val();
          setlastTimeText(snapshot.val());
        }
      })
      const secondTime = await fetch('https://worldtimeapi.org/api/ip',{
        method:"GET",
      }).then(res => res.json())
      const time = secondTime.datetime.slice(11,13)
      if(!(secondTime.timezone === "Asia/Yekaterinburg") || +time > lastTime || +time < 6){
        setBlock(true);
        setLoading(false);
      }else{
        setLoading(false);
      }
    }
    getTime()
  })
  const back = async() =>{
    if(accept){
      setAccept(false);
      dispatch(setBackgroundDark(false));
    }else{
      localStorage.removeItem('token');
      dispatch(setMiniLogo(true));
      dispatch(setBackgroundDark(false));
      await set(ref(db,`users/${uid}/info`),2);
      await set(ref(db,`users/${uid}/auto`),autoCheck);
      dispatch(setPage(3));
    }
  }
  return (
    <div className='content'>
      {accept? 
        <div className='box question_alt'>
          {accept && !block && <p className="title alt"> Вы уверены, что <span className='white_text alt'>не пойдете</span> сегодня на комплексное  питание?</p>}
          {block && <p className="title red_color"> Запись с 6:00 до {lastTimeText}:00!</p>}
          <div className="buttom_box alt">
            <button onClick={back} className="button alt">Нет, я передумал</button>
            <button onClick={acceptFunc} className="button alt active">Да, я уверен</button>
          </div>
        </div>
      :
      <div className='box'>
        {loading ? 
        null
        :
        <div>
          {!block && <p className="title"> Идете ли вы <span className='white_text'>сегодня на комплекс?</span></p>}
          {block && <p className="title red_color"> Запись с 6:00 до {lastTimeText}:00 утра!</p>}
          {!block && 
          <div className="buttom_box">
            <button onClick={acceptFunc} className="button active">Да, иду!</button>
            <button onClick={back} className="button">Нет</button>
          </div>}
          <div style={{display:"flex",justifyContent:"center",alignItems:"center",margin:"1em 0 0 0"}}>
            <input type="checkbox" className='checkbox_auto' id="checkbox" checked={!!autoCheck} onChange={()=>dispatch(setAuto(!!!autoCheck))} /> 
            <label htmlFor="checkbox">Записывать автоматически</label>
          </div>
        </div>
        }
      </div>
      }
    </div>
  )
}
