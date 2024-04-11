import React, { useState } from 'react'
import '../styles/main.css'
import logo from '../../assets/Logo.svg';
import userInpt from '../../assets/userInput.svg';
import passwordInput from '../../assets/passwordInput.svg';
import { useAppDispatch } from '../../../store/hook';
import { setPersonal, setUser } from '../../../reducers/pageReducer';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { child, get, getDatabase, ref, set } from 'firebase/database';
import { userInterface } from '../../types/types';



export default function Main() {
  const [userTypeSelect,setUserTypeSelect] = useState(0);
  const [login,setLogin] = useState('');
  const [password,setPassword] = useState('');
  const [loadingLogin,setLoadingLogin] = useState(false);
  const [errorUserType,setErrorUserType] = useState(false);
  const dispatch = useAppDispatch();
  function generateRandomString(length: number): string {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  const selectUserType = (id:number) =>{
    const buttons = document.querySelectorAll('.button_login');
    buttons.forEach(el => {
      el.classList.remove('active');
    })
    buttons[id].classList.add('active');
    setUserTypeSelect(id);
  }

  const loginFunc = async()=>{
    const auth = getAuth();
    const db = getDatabase();
    setLoadingLogin(true);
    await signInWithEmailAndPassword (auth, login,password)
      .then(async(userCredential) => {
        const getUser = userCredential.user;
        const dbRef = ref(getDatabase());
        await get(child(dbRef, `users/${getUser.uid}`)).then(async(snapshot) => {
          if (snapshot.exists()) {
            const user:userInterface = snapshot.val();
            const key: string = generateRandomString(12);
            const dataUser:userInterface = {
              key: key,
              info: user.info,
              isKeyUsed: user.isKeyUsed,
              name:user.name,
              schoolClass: user.schoolClass,
              payment: user.payment,
              username: user.username
            }
            if(userTypeSelect == 0 && user.username === "g@gmail.com"){
              setErrorUserType(true);
            }
            if(userTypeSelect == 1 && user.username !== "g@gmail.com"){
              setErrorUserType(true);
            }
            if(userTypeSelect == 1 && user.username === "g@gmail.com"){
              if(user.info === null){
                await set(ref(db,`users/${getUser.uid}/info`),1);
              }
              if(user.isKeyUsed === null){
                await set(ref(db,`users/${getUser.uid}/isKeyUsed`),1);
              }
              if(user.payment === null){
                await set(ref(db,`users/${getUser.uid}/payment`),1);
              }
              await set(ref(db,`users/${getUser.uid}/key`),key);
              dispatch(setUser({user:dataUser,uid:"None"}));
              dispatch(setPersonal({page:2,personal:true}));
            }
            if(userTypeSelect == 0 && user.username !== "g@gmail.com"){
              if(user.info === null){
                await set(ref(db,`users/${getUser.uid}/info`),1);
              }
              if(user.isKeyUsed === null){
                await set(ref(db,`users/${getUser.uid}/isKeyUsed`),1);
              }
              if(user.payment === null){
                await set(ref(db,`users/${getUser.uid}/payment`),1);
              }
              await set(ref(db,`users/${getUser.uid}/key`),key);
              dispatch(setUser({user:dataUser,uid:getUser.uid}));
              dispatch(setPersonal({page:2,personal:false}));
            }
            setLoadingLogin(false);
          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.log(error);
          });
        })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode,errorMessage);
      });
  }

  return (
    <div className='content'>
      <div className='box'>
        <img className='logo' src={logo} alt="" />
        {loadingLogin ? 
          <span className="loader"></span>
        :
          <div>
            <div className='login_select'>
              {userTypeSelect === 0 ? 
              <button onClick={()=> selectUserType(0)} className='button_login active'>Ученик</button>
              :
              <button onClick={()=> selectUserType(0)} className='button_login'>Ученик</button>
              }
              {userTypeSelect === 1 ? 
              <button onClick={()=> selectUserType(1)} className='button_login active'>Персонал</button>
              :
              <button onClick={()=> selectUserType(1)} className='button_login'>Персонал</button>
              }
            </div>
            <p className='input_label'>Введите логин</p>
            <div className='user_input_box'>
              <img src={userInpt} alt="" />
              <input value={login} onChange={(event:React.ChangeEvent<HTMLInputElement>)=> setLogin(event.target.value)} className='user_input' placeholder='Логин' type="text" />
            </div>
            <p className='input_label'>Введите пароль</p>
            <div className='user_input_box'>
              <img src={passwordInput} alt="" />
              <input value={password} onChange={(event:React.ChangeEvent<HTMLInputElement>)=> setPassword(event.target.value)} className='user_input' placeholder='Пароль' type="password" />
            </div>
            {errorUserType && <p className="error_title">Неправильный тип пользователя!</p> }
            <button onClick={loginFunc} className='full_w button active login'>Войти</button>
            <button className='full_w button'>Забыли пароль?</button>
          </div>
        }
      </div>
    </div>
  )
}
