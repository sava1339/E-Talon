import  { useState } from 'react';
import '../styles/informationMain.css';
import Back from '../../assets/back.svg?react';
import {QRCodeSVG} from 'qrcode.react';
import { Scanner } from '@yudiel/react-qr-scanner';

export default function InformationMain() {
  const [check] = useState(false);
  const [personal] = useState(true);
  return (
    <div className='content'>
      <div className='box'>
        {!check && !personal && <div className='qr_code'>
          <QRCodeSVG value='https://youtu.be/dQw4w9WgXcQ?si=51c15Nzld_H5WVyh' />
          </div>}
        {personal && <div className='qr_code scan'>
          <Scanner
              onResult={(text) => window.location.replace(text)}
              onError={(error) => console.log(error?.message)}
          />
        </div> }
        {check && <p className='title'>Информация получена</p>}
        {check && <p className='desc'>Хорошего вам дня!</p>}
        <button className='full_w button active i_c top_buttom'>Сменить аккаунт</button>
        <div className='button i_c'> <Back stroke='#fff' className="back" /> <p>Выйти</p></div>
      </div>
    </div>
  )
}
