from flask import Flask, request, jsonify, redirect
import psycopg2
from psycopg2.extras import RealDictCursor
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def get_db_connection():
    try:
        conn = psycopg2.connect(
            host=os.environ.get("DB_HOST", "db"),
            user=os.environ.get("POSTGRES_USER", "root"),
            password=os.environ.get("POSTGRES_PASSWORD", "rootpass"),
            database=os.environ.get("POSTGRES_DB", "mydatabase")
        )
        print("✅ Database connected")
        return conn
    except Exception as e:
        print("❌ Error connecting to the database:", e)
        raise e

@app.route("/")
def index():
    return redirect("/login")

# ✅ تسجيل دخول
@app.route("/api/login", methods=["POST"])
def login():
    print("🚀 login route called")

    try:
        data = request.get_json()
        username = data.get("username")
        password = data.get("password")

        print(f"📥 Trying login for: {username}")

        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        cursor.execute("SELECT * FROM users WHERE username=%s AND password=%s", (username, password))
        user = cursor.fetchone()
        cursor.close()
        conn.close()

        if user:
            return jsonify({"message": "✅ Login successful", "success": True})
        else:
            return jsonify({"message": "❌ Invalid credentials", "success": False}), 401

    except psycopg2.Error as db_err:
        print("❌ Database Error:", db_err)
        return jsonify({"message": "Database error", "error": str(db_err)}), 500

    except Exception as err:
        print("❌ Internal Error:", err)
        return jsonify({"message": "Internal server error", "error": str(err)}), 500

# ✅ تسجيل مستخدم جديد
@app.route("/api/register", methods=["POST"])
def register():
    try:
        data = request.get_json()
        username = data.get("username")
        password = data.get("password")

        if not username or not password:
            return jsonify({"message": "❗ جميع الحقول مطلوبة"}), 400

        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute("SELECT * FROM users WHERE username=%s", (username,))
        if cursor.fetchone():
            return jsonify({"message": "⚠️ اسم المستخدم مستخدم بالفعل"}), 409

        cursor.execute("INSERT INTO users (username, password) VALUES (%s, %s)", (username, password))
        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({"message": "✅ تم إنشاء الحساب بنجاح", "success": True}), 201

    except Exception as e:
        print("❌ Registration Error:", e)
        return jsonify({"message": "❌ خطأ في الخادم", "error": str(e)}), 500

# ✅ جلب جميع المستخدمين
@app.route("/api/users", methods=["GET"])
def get_users():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        cursor.execute("SELECT id, username, password FROM users")
        users = cursor.fetchall()
        cursor.close()
        conn.close()

        return jsonify({"users": users})
    except Exception as e:
        return jsonify({"message": "❌ خطأ في جلب المستخدمين", "error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
