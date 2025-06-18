'use client'
import { useRouter } from 'next/navigation'
import "./verification.css"

export const EmailVerification = ({ email }: { email: string }) => {
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push('/') // Перенаправление на главную страницу
  }

  return (
    <div className="verification-container">
      <h2>Подтверждение email</h2>
      <p>Мы отправили код подтверждения на {email}</p>
      
      <form onSubmit={handleSubmit} className="verification-form">
        <input
          type="text"
          placeholder="Введите код из письма"
          
          maxLength={6}
          className="verification-input"
        />
        
        <button 
          type="submit" 
          className="verification-button"
        >
          Подтвердить
        </button>
      </form>

      <div className="verification-footer">
        <button 
          onClick={() => router.push('/login')} 
          className="verification-link"
        >
          Войти в другой аккаунт
        </button>
      </div>
    </div>
  )
}