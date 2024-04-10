import logo from '../../assets/LogoNonTitle.svg';
import Back from '../../assets/back.svg?react'
import '../styles/notPaid.css'

export default function NotPaid() {
  return (
    <div className='content'>
      <div className='box'>
        <img className='logo' src={logo} alt="" />
        <p className='not_paid_title'>У вас не оплачена квитанция за питание</p>
        <p className='not_paid_desc'>Вы не можете получить талон, пока не оплатили квитанцию</p>
        <div className='button n_p'> <Back stroke='#fff' className="back" /> <p>Назад</p></div>
      </div>
    </div>
  )
}
