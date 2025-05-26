from flask import Flask, request, jsonify, render_template
import mysql.connector
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def get_db_connection():
    return mysql.connector.connect(
        host=os.environ.get("DB_HOST", "localhost"),
        user=os.environ.get("MYSQL_USER", "root"),
        password=os.environ.get("MYSQL_PASSWORD", ""),
        database=os.environ.get("MYSQL_DATABASE", "mydatabase")
    )

@app.route('/')
def index():
    return "🔄 API Running"

@app.route('/login', methods=['GET'])
def login_form():
    return render_template("login.html")

@app.route('/login', methods=['POST'])
def login_api():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM users WHERE username=%s AND password=%s", (username, password))
        user = cursor.fetchone()
        cursor.close()
        conn.close()

        if user:
            return jsonify({"message": "Login successful", "success": True})
        else:
            return jsonify({"message": "Invalid credentials", "success": False}), 401
    except mysql.connector.Error as err:
        return jsonify({"message": "Database error", "error": str(err)}), 500

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
