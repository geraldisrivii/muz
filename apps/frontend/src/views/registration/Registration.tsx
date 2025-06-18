"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRegister,
  selectIsAuth,
  selectAuthError,
  clearError,
} from "../../redux/slices/auth";
import "./registration.css";

const Registration = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const error = useSelector(selectAuthError);
  const [showErrors, setShowErrors] = useState(false);
  const [step, setStep] = useState<"register" | "verify">("register");
  const [registeredEmail, setRegisteredEmail] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      verificationCode: "",
    },
    mode: "onChange",
  });

  const onSubmitRegister = async (values) => {
    const resultAction = await dispatch(fetchRegister(values) as any);
    if (fetchRegister.fulfilled.match(resultAction)) {
      setRegisteredEmail(values.email);
      setStep("verify");
    }
  };

  const onSubmitVerify = async (values) => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/auth/email-verify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code: values.verificationCode,
            email: registeredEmail,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        router.push("/login");
      } else {
        router.push("/");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const password = watch("password");

  if (step === "verify") {
    return (
      <section className="Login">
        <div className="preview">
          <h3 className="text-center">Подтверждение Email</h3>
          <p className="text-center">Код отправлен на {registeredEmail}</p>

          <div className="registration-cssave">
            <form onSubmit={handleSubmit(onSubmitVerify)}>
              <div className="form-group">
                <input
                  className="form-control-item"
                  type="text"
                  placeholder="Введите код из письма"
                  {...register("verificationCode", {
                    required: "Введите код подтверждения",
                  })}
                />
                {showErrors && errors.verificationCode && (
                  <p className="check">{errors.verificationCode.message}</p>
                )}
              </div>

              <div className="form-group">
                <button
                  className="btn btn-primary btn-block create-account"
                  type="submit"
                >
                  ПОДТВЕРДИТЬ
                </button>
              </div>

              <div className="form-group">
                <button
                  type="button"
                  className="log-in"
                  onClick={() => setStep("register")}
                >
                  Назад к регистрации
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="Login">
      <div className="preview">
        <h3 className="text-center">Регистрация</h3>
        {error && (
          <p className="check" style={{ color: "red", textAlign: "center" }}>
            {error}
          </p>
        )}
        <div className="registration-cssave">
          <form onSubmit={handleSubmit(onSubmitRegister)}>
            <div className="form-group">
              <input
                className="form-control-item"
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: "Введите почту",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Введите корректный email",
                  },
                })}
                onFocus={() => setShowErrors(true)}
              />
              {showErrors && errors.email && (
                <p className="check">{errors.email.message}</p>
              )}
            </div>

            <div className="form-group">
              <input
                className="form-control-item"
                type="password"
                placeholder="Пароль"
                {...register("password", {
                  required: "Введите пароль",
                  minLength: { value: 6, message: "Минимум 6 символов" },
                })}
                onFocus={() => setShowErrors(true)}
              />
              {showErrors && errors.password && (
                <p className="check">{errors.password.message}</p>
              )}
            </div>

            <div className="form-group">
              <input
                className="form-control-item"
                type="password"
                placeholder="Повторите пароль"
                {...register("confirmPassword", {
                  required: "Подтвердите пароль",
                  validate: (value) =>
                    value === password || "Пароли не совпадают",
                })}
                onFocus={() => setShowErrors(true)}
              />
              {showErrors && errors.confirmPassword && (
                <p className="check">{errors.confirmPassword.message}</p>
              )}
            </div>

            <div className="form-group">
              <button
                className="btn btn-primary btn-block create-account"
                type="submit"
                disabled={!isValid}
              >
                СОЗДАТЬ
              </button>
            </div>

            <div className="form-group">
              <Link href="/login">
                <button className="log-in" type="button">
                  Есть аккаунт? <a>Войти</a>
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Registration;
