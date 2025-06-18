'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { fetchAuth, selectIsAuth } from '../../redux/slices/auth'
import Link from 'next/link'
import './login.css'
import { useDispatch, useSelector } from 'react-redux'

export const Login = () => {
  const router = useRouter()
  const isAuth = useSelector(selectIsAuth)
  const dispatch = useDispatch()
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  })

  const onSubmit = async (values: { email: string; password: string }) => {
    try {
      // Формируем корректный JSON
      const authData = {
        email: values.email.trim(),
        password: values.password.trim()
      }

      // Проверка админских учетных данных (если нужно)
      if (values.email === 'admin@admin.com' && values.password === 'admin') {
        router.push('/admin')
        return
      }

      // Отправляем запрос через Redux
      const action = await dispatch(fetchAuth(authData) as any)
      const data = action.payload

      if (!data) {
        throw new Error('No payload received')
      }

      if (data.token) {
        localStorage.setItem('token', data.token)
        router.push(data.role === 'admin' ? '/admin' : '/')
      } else {
        setError('Неверные учетные данные')
      }
      
    } catch (err) {
      setError(err.message || 'Ошибка сервера')
      console.error('Auth error:', err)
    }
  }

  if (isAuth) {
    router.push('/')
    return null
  }

  return (
    <section className="Login">
      <div className="preview">
        <h3 className="text-center">Вход</h3>
        {error && <div className="error-message">{error}</div>}
        
        <div className="registration-cssave">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <input
                className="form-control-item"
                type="email"
                placeholder="Email"
                {...register('email', {
                  required: 'Введите почту',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Введите корректный email',
                  },
                })}
              />
              {errors.email && <p className="check">{errors.email.message}</p>}
            </div>

            <div className="form-group">
              <input
                className="form-control-item"
                type="password"
                placeholder="Пароль"
                {...register('password', {
                  required: 'Введите пароль',
                  minLength: { value: 6, message: 'Минимум 6 символов' },
                })}
              />
              {errors.password && <p className="check">{errors.password.message}</p>}
            </div>

            <div className="form-group">
              <button
                className="btn btn-primary btn-block create-account"
                type="submit"
                disabled={!isValid}
              >
                ВОЙТИ
              </button>
            </div>

            <div className="form-group">
              <Link href="/register" className="register-link">
                Нет аккаунта? <span>Зарегистрироваться</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Login