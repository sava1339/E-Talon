import React, { useState } from 'react'
import '../styles/main.css'
import logo from '../../assets/Logo.svg';
import userInpt from '../../assets/userInput.svg';
import passwordInput from '../../assets/passwordInput.svg';

export default function Main() {
  const [userTypeSelect,setUserTypeSelect] = useState(0);
  const [login,setLogin] = useState('');
  const [password,setPassword] = useState('');

  const selectUserType = (id:number) =>{
    const buttons = document.querySelectorAll('.button_login');
    buttons.forEach(el => {
      el.classList.remove('active');
    })
    buttons[id].classList.add('active');
    setUserTypeSelect(id);
    console.log( userTypeSelect, login,password)
  }
  return (
    <div className='content'>
      <div className='box'>
        <img className='logo' src={logo} alt="" />
        <div className='login_select'>
          <button onClick={()=> selectUserType(0)} className='button_login active'>Ученик</button>
          <button onClick={()=> selectUserType(1)} className='button_login'>Персонал</button>
        </div>
        <p className='input_label'>Введите логин</p>
        <div className='user_input_box'>
          <img src={userInpt} alt="" />
          <input onChange={(event:React.ChangeEvent<HTMLInputElement>)=> setLogin(event.target.value)} className='user_input' placeholder='Логин' type="text" />
        </div>
        <p className='input_label'>Введите пароль</p>
        <div className='user_input_box'>
          <img src={passwordInput} alt="" />
          <input onChange={(event:React.ChangeEvent<HTMLInputElement>)=> setPassword(event.target.value)} className='user_input' placeholder='Пароль' type="text" />
        </div>
        <button className='full_w button active login'>Войти</button>
        <button className='full_w button'>Забыли пароль?</button>
      </div>
    </div>
  )
}
