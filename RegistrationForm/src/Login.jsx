import React, { useState } from 'react';

function Login() {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (!savedUser) {
      alert("No user found. Please register first.");
      return;
    }

    if (loginData.email === savedUser.email && loginData.password === savedUser.password) {
      alert("Login successful!");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="LoginDiv">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" name="email" placeholder="Email" onChange={handleLoginChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleLoginChange} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
