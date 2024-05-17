import React from 'react'

export default function HeaderApp() {
  return (
    <header>
        <div>
            <span className='logo'>Crowdfunding Website</span>
            <ul className='nav'>
                <li>Главная</li>
                <li>Каталог</li>
                <li>Личный кабинет</li>
                <li>О нас</li>
            </ul>
        </div>
        <div className='presentation'></div>
    </header>
  )
}
