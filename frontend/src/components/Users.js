import React, { useEffect, useState } from "react";

function Users() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        if (data.users && data.users.length > 0) {
          setUsers(data.users);
        } else {
          setMessage("⚠️ لا توجد بيانات."); 
        }
      })
      .catch((err) => {
        console.error(err);
        setMessage("⚠️ خطأ في الاتصال بالخادم");
      });
  }, []);

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
          className="card mg-b-10"
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "10px",
            border: "1px solid rgba(72, 94, 144, 0.16)",
            maxWidth: "800px",
            margin: "auto",
            boxShadow: "0 0 10px rgba(0,0,0,0.05)",
          }}
        >
          <h4 className="mb-4 text-center">📋 قائمة المستخدمين</h4>

          {message && (
            <div
              className={`alert ${
                message.startsWith("⚠️") ? "alert-warning" : "alert-danger"
              }`}
            >
              {message}
            </div>
          )}

          {users.length > 0 && (
            <div className="table-responsive">
              <table className="table table-bordered text-center">
                <thead className="thead-light">
                  <tr>
                    <th>#</th>
                    <th>اسم المستخدم</th>
                    <th>كلمة المرور</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.username}</td>
                      <td>{user.password}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Users;
