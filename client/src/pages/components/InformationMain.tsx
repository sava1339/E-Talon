import  { useState } from 'react';
import '../styles/informationMain.css';
import Back from '../../assets/back.svg?react';
import AcceptIcon from '../../assets/AcceptIcon.svg'
import {QRCodeSVG} from 'qrcode.react';
import { Scanner } from '@yudiel/react-qr-scanner';
import { useAppDispatch, useAppSelector } from '../../../store/hook';
import { setBackgroundDark, setMiniLogo, setPage, setScand } from '../../../reducers/pageReducer';
import { set,ref, getDatabase, get, child, onValue } from 'firebase/database';

export default function InformationMain() {
  const scand = useAppSelector(state=> state.page.scand);
  const [scanResult,setScanResult] = useState(0);
  const [scanActive,setScanActive] = useState(true);
  const personal = useAppSelector(state => state.page.personal);
  const user = useAppSelector(state => state.page.user);
  const uid = useAppSelector(state => state.page.uid);
  const dispatch = useAppDispatch();
  const db = getDatabase();
  const databaseRef = ref(db,`users/${uid}/isKeyUsed`);
  onValue(databaseRef, (snapshot) => {
    const data = snapshot.val();
    if(data === 0 && !scand ){
      dispatch(setScand(true));
    }
  });
  const scan = async(text:string)=>{
    const dbRef = ref(getDatabase());
    await get(child(dbRef, `users`)).then(async(snapshot:any) => {
      if (snapshot.exists()) {
        const keys = Object.keys(snapshot.val());
        for(let i = 0; i < keys.length; i++){
          if(snapshot.val()[keys[i]].key === text){
            if(snapshot.val()[keys[i]].isKeyUsed === 2){
              await set(ref(db,`users/${keys[i]}/isKeyUsed`),0);
              setScanResult(2);
              setScanActive(false);
              setTimeout(()=>{
                setScanActive(true);
                setScanResult(0);
              },500)
              break;
            }else{
              setScanResult(1);
              break;
            }
          }
        }
      }
    })
  }
  const back = ()=>{
    localStorage.removeItem('token');
    dispatch(setMiniLogo(false));
    dispatch(setBackgroundDark(false));
    dispatch(setPage(0));
  }
  return (
    <div className='content'>
      <div className='box'>
        {!personal && !scand && <div className='qr_code'>
          <QRCodeSVG  value={user.key} />
          </div>}
        {scand && <div className='accept_box'>
          <img className='accept_icon' src={AcceptIcon} alt="" />
        </div> }
        {personal && <div className='qr_code scan'>
          {scanActive ? 
            <Scanner
            onResult={(text) => scan(text)}
            onError={(error) => console.log(error?.message)}
        />
          :
          <Scanner
              onResult={(text) => scan(text)}
              onError={(error) => console.log(error?.message)}
              enabled={false}
          />
          }
        </div> }
        {scanResult == 1 && <p className='title err scan_data'>Ошибка сканирования</p>}
        {scanResult == 2 && <p className='title scan_data'>Сканирование успешно!</p>}
        <div onClick={back} className='button i_c'> <Back stroke='#fff' className="back" /> <p>Выйти</p></div>
      </div>
    </div>
  )
}
