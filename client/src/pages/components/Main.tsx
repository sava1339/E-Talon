import React, { useEffect, useState } from 'react'
import '../styles/main.css'
import logo from '../../assets/Logo.svg';
import userInpt from '../../assets/userInput.svg';
import passwordInput from '../../assets/passwordInput.svg';
import { useAppDispatch } from '../../../store/hook';
import { setBackgroundDark, setMiniLogo, setPersonal, setScand, setShowChangePassword, setUser } from '../../../reducers/pageReducer';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { child, get, getDatabase, ref, set } from 'firebase/database';
import { userInterface } from '../../types/types';


export default function Main() {
  const [userTypeSelect,setUserTypeSelect] = useState(0);
  const [login,setLogin] = useState('');
  const [password,setPassword] = useState('');
  const [loadingLogin,setLoadingLogin] = useState(false);
  const [errorUserType,setErrorUserType] = useState(0);
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
    dispatch(setShowChangePassword(false));
    const buttons = document.querySelectorAll('.button_login');
    buttons.forEach(el => {
      el.classList.remove('active');
    })
    buttons[id].classList.add('active');
    setUserTypeSelect(id);
  }
  const authUser = async(uid:string,start:number)=>{
    if(uid == ""){
      setErrorUserType(1);
    }
    let personal = false;
    const db = getDatabase();
    const dbRef = ref(getDatabase());
    await get(child(dbRef, `users/${uid}`)).then(async(snapshot) => {
      if (snapshot.exists()) {
        const user:userInterface = snapshot.val();
        if(start == 0 && user.username === "g@gmail.com"){
          setErrorUserType(1);
          setLoadingLogin(false);
          return;
        }
        if(start == 1 && user.username !== "g@gmail.com"){
          setErrorUserType(1);
          setLoadingLogin(false);
          return;
        }
        if(start == 1 && user.username === "g@gmail.com"){
          personal = true;
          if(user.info === null || user.info === 0){
            await set(ref(db,`users/${uid}/info`),1);
          }
          if(user.payment === null ||user.payment === 0){
            await set(ref(db,`users/${uid}/payment`),1);
          }
        }
        if(start == 0 && user.username !== "g@gmail.com"){
          personal = false;
          if(user.info === null || user.info === 0){
            await set(ref(db,`users/${uid}/info`),1);
          }
          if(user.payment === null || user.payment === 0){
            await set(ref(db,`users/${uid}/payment`),1);
          }
        }
        await get(child(dbRef, `users/${uid}`)).then(async(snapshot)=>{
          const afterUser = snapshot.val();
          const key: string = generateRandomString(12);
          const dataUser:userInterface = {
            key: key,
            info: afterUser.info,
            isKeyUsed: afterUser.isKeyUsed,
            name:afterUser.name,
            schoolClass: afterUser.schoolClass,
            payment: afterUser.payment,
            username: afterUser.username,
            auto: afterUser.auto || 0
          }
          if(personal){
            localStorage.setItem('token',uid);
            localStorage.setItem('personal',"true");
            if(user.isKeyUsed === 2 || user.isKeyUsed === 0){
              await set(ref(db,`users/${uid}/key`),key);
              dispatch(setUser({user:dataUser,uid:"None"}));
              dispatch(setMiniLogo(true));
              dispatch(setBackgroundDark(false));
              dispatch(setPersonal({page:2,personal:true}));
              return;
            }
            if(user.info === 2){
              await set(ref(db,`users/${uid}/key`),key);
              dispatch(setUser({user:dataUser,uid:"None"}));
              dispatch(setMiniLogo(true));
              dispatch(setBackgroundDark(false));
              dispatch(setPersonal({page:3,personal:true}));
              return;
            }
            if(user.payment ===2){
              await set(ref(db,`users/${uid}/key`),key);
              dispatch(setUser({user:dataUser,uid:"None"}));
              dispatch(setMiniLogo(false));
              dispatch(setBackgroundDark(true));
              dispatch(setPersonal({page:1,personal:true}));
              return;
            }
            if(user.payment === 1 && user.isKeyUsed === 1 && user.info === 1){
              await set(ref(db,`users/${uid}/key`),key);
              dispatch(setUser({user:dataUser,uid:"None"}));
              dispatch(setMiniLogo(false));
              dispatch(setBackgroundDark(false));
              dispatch(setPersonal({page:4,personal:true}));
              return;
            }
          }else{
            localStorage.setItem('token',uid);
            localStorage.setItem('personal',"false");
            if(user.isKeyUsed === 0){
              await set(ref(db,`users/${uid}/key`),key);
              dispatch(setUser({user:dataUser,uid:uid}));
              dispatch(setMiniLogo(true));
              dispatch(setBackgroundDark(false));
              dispatch(setScand(true));
              dispatch(setPersonal({page:2,personal:false}));
              return;
            }
            if(user.isKeyUsed === 2){
              await set(ref(db,`users/${uid}/key`),key);
              dispatch(setUser({user:dataUser,uid:uid}));
              dispatch(setMiniLogo(true));
              dispatch(setBackgroundDark(false));
              dispatch(setPersonal({page:2,personal:false}));
              return;
            }
            if(user.info === 2){
              await set(ref(db,`users/${uid}/key`),key);
              dispatch(setUser({user:dataUser,uid:uid}));
              dispatch(setMiniLogo(true));
              dispatch(setBackgroundDark(false));
              dispatch(setPersonal({page:3,personal:false}));
              return;
            }
            if(user.payment ===2){
              await set(ref(db,`users/${uid}/key`),key);
              dispatch(setUser({user:dataUser,uid:uid}));
              dispatch(setMiniLogo(false));
              dispatch(setBackgroundDark(true));
              dispatch(setPersonal({page:1,personal:false}));
              return;
            }
            if(user.payment === 1 && user.isKeyUsed === 1 && user.info === 1){
              await set(ref(db,`users/${uid}/key`),key);
              dispatch(setUser({user:dataUser,uid:uid}));
              dispatch(setMiniLogo(false));
              dispatch(setBackgroundDark(false));
              dispatch(setPersonal({page:4,personal:false}));
              return;
            }
          }
        }).catch((error) => {
          console.log(error);
          localStorage.removeItem('token');
          setErrorUserType(3);
          setLoadingLogin(false);
          });
        setLoadingLogin(false);
      } else {
        localStorage.removeItem('token');
        setErrorUserType(3);
        setLoadingLogin(false);
      }
    }).catch((error) => {
      console.log(error);
      localStorage.removeItem('token');
      setErrorUserType(3);
      setLoadingLogin(false);
      });
  }
  useEffect(()=>{
    if(localStorage.getItem('token')){
      setLoadingLogin(true);
      authUser(localStorage.getItem('token') || "",localStorage.getItem('personal') == "true" ? 1 : 0);
    }
  },[])
  const loginFunc = async()=>{
    if(!login || !password){
      setErrorUserType(2);
      return;
    }
    dispatch(setShowChangePassword(false));
    const auth = getAuth();
    setLoadingLogin(true);
    await signInWithEmailAndPassword (auth, login.toLowerCase(),password)
      .then(async(userCredential) => {
        const getUser = userCredential.user;
        authUser(getUser.uid,userTypeSelect);
        })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorUserType(3);
        setLoadingLogin(false);
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
            <div className='input_img'>
              <img src={userInpt} alt="" />
              <input value={login} onChange={(event:React.ChangeEvent<HTMLInputElement>)=> setLogin(event.target.value)} className='user_input' placeholder='Логин' type="text" />
            </div>
            <p className='input_label'>Введите пароль</p>
            <div className='input_img'>
              <img src={passwordInput} alt="" />
              <input value={password} onChange={(event:React.ChangeEvent<HTMLInputElement>)=> setPassword(event.target.value)} className='user_input' placeholder='Пароль' type="password" />
            </div>
            {errorUserType == 1 && <p className="error_title">Неправильный тип пользователя!</p> }
            {errorUserType == 2 && <p className="error_title">Есть пустые поля!</p> }
            {errorUserType == 3 && <p className="error_title">Неверный логин или пароль!</p> }
            <button onClick={loginFunc} className='full_w button active login'>Войти</button>
            <button onClick={()=> dispatch(setShowChangePassword(true))} className='full_w button'>Забыли пароль?</button>
          </div>
        }
      </div>
    </div>
  )
}
