import { useState } from 'react'
import '../styles/resetPassword.css'
import emailIcon from '../../assets/Email.svg'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import okIcon from '../../assets/Ok.svg'
import errorIcon from '../../assets/Error.svg'
import { child, get, getDatabase, ref } from 'firebase/database';

export default function ResetPassword() {
    const [resEmail,setResEmail] = useState("");
    const [paswordChangingError,setPaswordChangingError] = useState(0);
    const resetPassword = async() =>{
        const dbRef = ref(getDatabase());
        const auth = getAuth();
        await get(child(dbRef, `users`)).then(async(snapshot:any) => {
            if (snapshot.exists()) {
              const keys = Object.keys(snapshot.val());
              for(let i = 0; i < keys.length; i++){
                if(snapshot.val()[keys[i]].username === resEmail){
                    await sendPasswordResetEmail(auth, resEmail)
                    .then(() => {
                      setPaswordChangingError(2);
                    })
                    .catch((e) => {
                        console.log(e);
                      setPaswordChangingError(1);
                    });
                }
              }
            }
          }
        );
        setPaswordChangingError(1);
      }
  return (
    <div className='reset_password'>
        <div className='reset_password_box'>
            <div className="reset_password_padding">
                {paswordChangingError > 0 &&
                    <div className='res_pas_message'>
                        {paswordChangingError == 1 && <img className='message_icon' src={errorIcon} alt="" /> }
                        {paswordChangingError == 1 && <p className='message error_message'>Не удалось найти аккаунт E-Talon</p> }
                        {paswordChangingError == 2 && <img className='message_icon' src={okIcon} alt="" /> }
                        {paswordChangingError == 2 && <p className='message ok_message'>Пароль выслан вам на почту</p> }
                    </div>
                }
                <p className='res_pas_title'>Восстановить пароль</p>
                <p className='res_pas_desc'>Введите почту</p>
                <div className='input_img'>
                    <img src={emailIcon} alt="" />
                    <input value={resEmail} onChange={(event:React.ChangeEvent<HTMLInputElement>)=> setResEmail(event.target.value)} className='user_input' placeholder='example@gmail.com' type="email" />
                </div>
                <button onClick={resetPassword} className='button active'>Получить пароль</button>
            </div>
        </div>
    </div>
  )
}
