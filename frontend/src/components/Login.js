import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setMessage("❗ يرجى إدخال اسم المستخدم وكلمة المرور.");
      return;
    }

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ تم تسجيل الدخول بنجاح!");
        setTimeout(() => {
          navigate("/users");
        }, 1500);
      } else {
        setMessage(data?.message || "⚠️ حدث خطأ أثناء تسجيل الدخول.");
      }
    } catch (error) {
      setMessage("⚠️ فشل الاتصال بالخادم.");
    }
  };

  return (
    <div
      className="content content-fixed content-auth"
      style={{
        background: "url(/static/assets/img/trees.jpg) no-repeat center",
        backgroundSize: "cover",
        minHeight: "100vh",
      }}
    >
      <div className="container">
        <div
          className="media align-items-stretch justify-content-center pos-relative"
          style={{ marginTop: "10%" }}
        >
          <div
            className="sign-wrapper mg-lg-l-50 mg-xl-l-60 bg-white pd-4 rounded-10 border wd-100p"
            style={{ maxWidth: "420px" }}
          >
            {/* ✅ مسافة فوق الشعار */}
            <div style={{ marginTop: "20px", marginBottom: "20px", textAlign: "center" }}>
              <img
                src="/static/assets/img/logo-small.svg"
                alt="Logo"
                style={{ maxWidth: "100%" }}
              />
            </div>

            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>اسم المستخدم</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="أدخل اسم المستخدم"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
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
                  autoComplete="current-password"
                />
              </div>

              <button type="submit" className="btn btn-brand-02 btn-block">
                    1  تسجيل الدخول
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

            {/* ✅ إزالة الهامش أسفل "أو" */}
            <div className="divider-text" style={{ marginBottom: "1px" }}>
              أو
            </div>

            {/* ✅ إضافة هامش أسفل الرابط */}
            <div className="tx-13 mg-t-10 tx-center" >
              ليس لديك حساب؟{" "}
              <a href="/register" style={{ textDecoration: "underline" }}>
                سجل الآن
              </a>
            </div>
              <div className="  mt-2">  </div>              

          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
