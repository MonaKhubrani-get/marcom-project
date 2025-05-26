from flask import Blueprint, request, jsonify
import psycopg2
import os

auth = Blueprint('auth', __name__)

def get_db_connection():
    return psycopg2.connect(
        dbname="mydatabase",
        user="root",
        password="rootpass",
        host="db",
        port="5432"
    )

@auth.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM users WHERE username=%s AND password=%s", (username, password))
    user = cur.fetchone()
    cur.close()
    conn.close()

    if user:
        return jsonify({"success": True})
    else:
        return jsonify({"success": False, "message": "Invalid credentials"}), 401
