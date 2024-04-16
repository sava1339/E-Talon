
import { useEffect, useState } from 'react';
import '../styles/question.css';
import { useAppDispatch, useAppSelector } from '../../../store/hook';
import { setAuto, setBackgroundDark, setMiniLogo, setPage } from '../../../reducers/pageReducer';
import { set, ref, getDatabase, get, child } from 'firebase/database';
import Back from '../../assets/back.svg?react';



export default function Question() {
  const [accept,setAccept] = useState(0);
  const [block,setBlock] = useState(false);
  const autoCheck = useAppSelector(state => state.page.user.auto);
  const [loading,setLoading] = useState(true);
  const [lastTimeText,setlastTimeText] = useState('');
  const uid = useAppSelector(state => state.page.uid)
  const dispatch = useAppDispatch();
  const db = getDatabase();
  const changeEventCheckBox = async()=>{
    const checkBox = document.querySelector('#checkbox') as HTMLInputElement;
    checkBox.disabled = true;
    await set(ref(db,`users/${uid}/auto`),autoCheck ? 0 : 1);
    dispatch(setAuto(!!!autoCheck));
    checkBox.disabled = false;
  }
  const acceptFunc = async() =>{
    if(accept == 0){
      dispatch(setBackgroundDark(true))
      setAccept(1)
    }
    if(accept == 1){
      const secondTime = await fetch('https://worldtimeapi.org/api/ip',{
        method:"GET",
      }).then(res => res.json())
      let lastTime:number = 0;
      const time = secondTime.datetime.slice(11,13)
      const dbRef = ref(getDatabase());
      await get(child(dbRef, `version/time`)).then(async(snapshot:any) => {
        if (snapshot.exists()) {
          lastTime = snapshot.val();
          setlastTimeText(snapshot.val());
        }
      })
      if(!(secondTime.timezone === "Asia/Yekaterinburg") || +time >= lastTime || +time < 6){
        setBlock(true);
      }else{
        dispatch(setMiniLogo(true));
        dispatch(setBackgroundDark(false));
        await set(ref(db,`users/${uid}/isKeyUsed`),2);
        dispatch(setPage(2));
      }
    }
    if(accept == 2){
      localStorage.removeItem('token');
      dispatch(setMiniLogo(true));
      dispatch(setBackgroundDark(false));
      await set(ref(db,`users/${uid}/info`),2);
      dispatch(setPage(3));
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
      if(!(secondTime.timezone === "Asia/Yekaterinburg") || +time >= lastTime || +time < 6){
        setBlock(true);
        setLoading(false);
      }else{
        setLoading(false);
      }
    }
    getTime()
  })
  const back = async() =>{
    if(accept == 0){
      setAccept(2);
      dispatch(setBackgroundDark(true));
    }
    if(accept == 1 || accept == 2){
      dispatch(setBackgroundDark(false));
      setAccept(0);
    }
  }
  const quit = () =>{
    localStorage.removeItem('token');
    dispatch(setMiniLogo(false));
    dispatch(setBackgroundDark(false));
    dispatch(setPage(0));
  }
  return (
    <div className='content'>
      {accept != 0? 
        <div className='box question_alt'>
          {accept == 1 && !block && <p className="title alt"> Вы уверены, что <span className='white_text alt'>пойдете</span> сегодня на комплексное  питание?</p>}
          {accept == 2 && !block && <p className="title alt"> Вы уверены, что <span className='white_text alt'>не пойдете</span> сегодня на комплексное  питание?</p>}
          {block && <p className="title red_color"> Запись с 6:00 до {lastTimeText}:00!</p>}
          {block && <div onClick={quit} className='button i_c'> <Back stroke='#fff' className="back" /> <p>Выйти</p></div>}
          {!block &&
          <div className="buttom_box alt">
            <button onClick={back} className="button alt">Нет, я передумал</button>
            <button onClick={acceptFunc} className="button alt active">Да, я уверен</button>
          </div>}
        </div>
      :
      <div className='box'>
        {loading ? 
        null
        :
        <div>
          {!block && <p className="title"> Идете ли вы <span className='white_text'>сегодня на комплекс?</span></p>}
          {block && <p className="title red_color"> Запись с 6:00 до {lastTimeText}:00 утра!</p>}
          {block && <div onClick={quit} className='button i_c'> <Back stroke='#fff' className="back" /> <p>Выйти</p></div>}
          {!block && 
          <div className="buttom_box">
            <button onClick={acceptFunc} className="button active">Да, иду!</button>
            <button onClick={back} className="button">Нет</button>
          </div>}
          {!block && <div style={{display:"flex",justifyContent:"center",alignItems:"center",margin:"1em 0 0 0"}}>
            <input type="checkbox" className='checkbox_auto' id="checkbox" checked={!!autoCheck} onChange={changeEventCheckBox} /> 
            <label htmlFor="checkbox">Записывать автоматически</label>
          </div>}
        </div>
        }
      </div>
      }
    </div>
  )
}
