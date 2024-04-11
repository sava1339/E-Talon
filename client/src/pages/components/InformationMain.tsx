import  { useState } from 'react';
import '../styles/informationMain.css';
import Back from '../../assets/back.svg?react';
import AcceptIcon from '../../assets/AcceptIcon.svg'
import {QRCodeSVG} from 'qrcode.react';
import { Scanner } from '@yudiel/react-qr-scanner';
import { useAppDispatch, useAppSelector } from '../../../store/hook';
import { setPage } from '../../../reducers/pageReducer';
import { set,ref, getDatabase, get, child, onValue } from 'firebase/database';
import { userInterface } from '../../types/types';

export default function InformationMain() {
  const [check] = useState(false);
  const [scand,setScand] = useState(false);
  const [scanResult,setScanResult] = useState(0);
  const personal = useAppSelector(state => state.page.personal);
  const user = useAppSelector(state => state.page.user);
  const uid = useAppSelector(state => state.page.uid);
  const dispatch = useAppDispatch();
  const db = getDatabase();
  const databaseRef = ref(db,`users/${uid}/isKeyUsed`);
  onValue(databaseRef, (snapshot) => {
    const data = snapshot.val();
    if(data === 0){
      setScand(true);
    }
  });
  const scan = async(text:string)=>{
    const dbRef = ref(getDatabase());
    await get(child(dbRef, `users`)).then(async(snapshot:any) => {
      if (snapshot.exists()) {
        const keys = Object.keys(snapshot.val());
        snapshot.val().map(async(el:userInterface, i:number)=>{
          if(el.key === text){
            if(el.isKeyUsed===2){
              await set(ref(db,`users/${keys[i]}/isKeyUsed`),0);
              setScanResult(2);
              return null;
            }else{
              setScanResult(1);
              return null;
            }
          }
        })
      }
    })
  }
  return (
    <div className='content'>
      <div className='box'>
        {!personal && !scand && <div className='qr_code'>
          <QRCodeSVG value={user.key} />
          </div>}
        {scand && <div className='accept_box'>
          <img className='accept_icon' src={AcceptIcon} alt="" />
        </div> }
        {personal && <div className='qr_code scan'>
          <Scanner
              onResult={(text) => scan(text)}
              onError={(error) => console.log(error?.message)}
          />
        </div> }
        {scanResult == 1 && <p className='title err scan_data'>Ошибка сканирования</p>}
        {scanResult == 2 && <p className='title scan_data'>Сканирование успешно!</p>}
        {check && <p className='title'>Информация получена</p>}
        {check && <p className='desc'>Хорошего вам дня!</p>}
        <button className='full_w button active i_c top_buttom'>Сменить аккаунт</button>
        <div onClick={()=> dispatch(setPage(0))} className='button i_c'> <Back stroke='#fff' className="back" /> <p>Выйти</p></div>
      </div>
    </div>
  )
}
