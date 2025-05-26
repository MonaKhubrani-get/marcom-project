import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Registration() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setMessage("❗ يرجى إدخال اسم المستخدم وكلمة المرور.");
      return;
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ تم إنشاء الحساب بنجاح!");
        setUsername('');
        setPassword('');

        // الانتقال إلى صفحة تسجيل الدخول بعد قليل
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      } else {
        setMessage(data?.message || "❌ فشل في إنشاء الحساب.");
      }
    } catch (err) {
      console.error("Error:", err);
      setMessage("⚠️ تعذر الاتصال بالخادم.");
    }
  };

  return (
    <div
      className="content content-fixed content-auth"
      style={{
        background: "url(/static/assets/img/trees.jpg) no-repeat center",
        backgroundSize: "cover",
        minHeight: "100vh",
        paddingTop: "50px",
      }}
    >
      <div className="container">
        <div
          className="sign-wrapper mg-lg-l-50 mg-xl-l-60 bg-white pd-4 rounded-10 border wd-100p"
          style={{
            maxWidth: "420px",
            margin: "auto",
            padding: "20px",
            boxShadow: "0 0 10px rgba(0,0,0,0.05)",
          }}
        >
          <img
            src="/static/assets/img/logo-small.svg"
            alt="Logo"
            className="mb-4"
          />

          <h4 className="mb-4 text-center"> إنشاء حساب جديد</h4>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>اسم المستخدم</label>
              <input
                type="text"
                className="form-control"
                placeholder="أدخل اسم المستخدم"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>كلمة المرور</label>
              <input
                type="password"
                className="form-control"
                placeholder="أدخل كلمة المرور"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
 
            <button type="submit" className="btn btn-brand-02 btn-block">
              تسجيل
            </button>
          </form>

          {message && (
            <div
              className={`alert mt-3 ${
                message.startsWith("✅") ? "alert-success" : "alert-danger"
              }`}
            >
              {message}
            </div>
          )}

          <div className="divider-text">أو</div>

          <div className="tx-13 mg-t-10 tx-center">
            لديك حساب؟{" "}
            <a href="/login" style={{ textDecoration: "underline" }}>
              تسجيل الدخول
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
