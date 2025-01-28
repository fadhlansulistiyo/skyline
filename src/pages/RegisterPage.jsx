import React from "react";
import { FaCloud } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import RegisterInput from "../components/auth/RegisterInput";
import { asyncRegisterUser } from "../states/users/action";

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onRegister = ({ name, email, password }) => {
    dispatch(asyncRegisterUser({ name, email, password }));

    navigate("/");
  };

  return (
    <section className="auth-page">
      <header className="auth-page__hero">
        <h1>
          <FaCloud />
        </h1>
      </header>
      <article className="auth-page__main">
        <h2>Create Skyline account</h2>
        <RegisterInput register={onRegister} />

        <p>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </article>
    </section>
  );
}

export default RegisterPage;
