'use client'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAuthMe } from '../../redux/slices/auth'
import Link from 'next/link'
import './profile.css'

interface UserData {
  avatarUrl?: string
  fullName?: string
  email?: string
  orders?: Array<{
    id: string
    date: string
    status: string
    total: number
  }>
}

const Profile = () => {
  const dispatch = useDispatch<any>()
  const { data: userData, status } = useSelector((state: any) => state.auth)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAuthMe())
    }
  }, [dispatch, status])

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/login'
  }

  if (status === 'loading') {
    return (
      <div className="profile">
        <div className="container">
          <div className="loading">Загрузка...</div>
        </div>
      </div>
    )
  }

  if (status === 'error' || !userData) {
    return (
      <div className="profile">
        <div className="container">
          <p className="error-message">Данные пользователя не найдены</p>
          <Link href="/login" className="auth-link">
            Войти в аккаунт
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="profile">
      <div className="container">
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar-container">
              <img
                src='/logo/NewLogo4.png'
                alt="User Avatar"
                className="profile-avatar"
               
              />
            </div>
            <div className="profile-details">
              <div className="profile-item">
              
              </div>
              <div className="profile-item">
                <label className="profile-label"><b>Email:</b></label>
                <p className="profile-email">{userData.email || 'kirill.wep@gmail.com'}</p>
              </div>
            </div>
            <div className="profile-actions">
              {/* <Link href="/profile/edit" className="btn edit-btn">
                Редактировать профиль
              </Link> */}
              <button className="btn logout-btn" onClick={handleLogout}>
                Выйти из аккаунта
              </button>
            </div>
          </div>

          <div className="profile-orders">
            <h2 className="orders-title">Ваши заказы</h2>
            {userData.orders?.length ? (
              <div className="orders-list">
                {userData.orders.map((order) => (
                  <div className="order-item" key={order.id}>
                    <div className="order-details">
                      <span className="order-date">{order.date}</span>
                      <span className={`order-status ${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                      <span className="order-total">Сумма: {order.total} ₽</span>
                    </div>
                    <Link href={`/orders/${order.id}`} className="order-link">
                      Подробнее
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-orders">У вас нет заказов</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile