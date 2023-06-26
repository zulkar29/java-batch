import React from "react";
import { useForm } from "react-hook-form";
import "./index.scss";
import Logo from "./../../assets/bjit_ltd.webp";
import Email from "./../../assets/icons/email.svg";
import Password from "./../../assets/icons/password.svg";
import { useAuth } from "../../context/AuthProvider";

const LoginPage = () => {
  const { login, isError, error, isLoading } = useAuth();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  // Submit Form
  const onSubmit = (data) => login(data);

  return (
    <div className="login-page">
      <div className="lp__content-section">
        <form onSubmit={handleSubmit(onSubmit)} className="lp__login-section">
          <img className="lp__login-section_img" src={Logo} alt="logo" />
          <div className="lp__input-section">
            <input
              className="lp__input-section_input input__form"
              type="email"
              placeholder="Enter Your Email"
              defaultValue="admin@google.com"
              {...register("email", { required: true })}
            />
            {errors.email?.type === "required" && (
              <p role="alert" className="form__validation-message_red">
                Email is required
              </p>
            )}
            <img className="lp__input-section_img" src={Email} alt="Email" />
          </div>
          <div className="lp__input-section">
            <input
              className="lp__input-section_input input__form"
              type="password"
              placeholder="Enter Your Password"
              defaultValue="00112233"
              {...register("password", { required: true, minLength: 6 })}
            />
            {errors.password?.type === "required" && (
              <p role="alert" className="form__validation-message_red">
                Password is required
              </p>
            )}
            {errors.password?.type === "minLength" && (
              <p role="alert" className="form__validation-message_red">
                Password must be at least 6 characters
              </p>
            )}
            <img
              className="lp__input-section_img"
              src={Password}
              alt="Password"
            />
          </div>
          {isError && <p style={{ color: "red", padding: "5px 0" }}>{error}</p>}
          <input
            className="login-page__btn"
            type="submit"
            value={isLoading ? "Loading..." : "Login"}
            disabled={isLoading}
          />
        </form>

        <div className="lp__description-section">
          <img className="lp__description-section_img" src={Logo} alt="logo" />
          <h1 className="lp__description-section_title">Common</h1>
          <p className="lp__description-section_subtitle">
            Lorem Ipsum is simply dummy text of the printing and typesetting
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
