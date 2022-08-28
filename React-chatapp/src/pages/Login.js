import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/log.svg";
import abs from "../assets/abstract.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/ApiRoutes";

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", password: "" });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(() => {
    async function naviga () {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) 
     navigate("/");
    //  console.log('pen',process.env.REACT_APP_LOCALHOST_KEY)
  }
  naviga();
  // eslint-disable-next-line
  }, []);

  const handleChange = (event) => {
    console.log('tekeded', event)
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { username, password } = values;
    if (username === "") {
      toast.error("Username and Password is required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Username and Password is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
       // console.log('worked')
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );

        navigate("/");
      }
    }
  };

  return (
    <>
      <FormContainer>
      <img className="ima" src={abs} alt="pic"/>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>chaTalk</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
            min="3"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Log In</button>
          <span>
            Don't have an account ? <Link to="/register">Create One.</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #ffffff;
  .ima {
    object-fit: cover;
    background-size: cover;
    height: 100vh;
    width: 100vw;
    position: relative
  }
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      font-style: italic; 
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #000000;
    border-radius: 2rem;
    padding: 5rem;
    position: absolute;
    z-index: 10;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #b91d08;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #f82b10;
      outline: none;
    }
  }
  button {
    background-color: #e60808;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    &:hover {
      background-color: #f41d1d;
    }
  }
  span {
    color: white;
    ${'' /* text-transform: uppercase; */}
    a {
      color: #f82b10;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;