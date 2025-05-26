import os
import datetime
import pymysql
from flask import request, session
from dotenv import load_dotenv

# تحميل متغيرات البيئة من ملف .env
load_dotenv()

# إعدادات عامة
os.environ['TZ'] = 'Asia/Riyadh'
DB = os.getenv("DB_NAME", "erp")
Ver = os.getenv("VERSION", "0.59")
UNIT = os.getenv("UNIT", "tst")
Server = os.getenv("SERVER_NAME", "Local")
myDB = f"marcomar_{DB}{UNIT}{Ver}"
db_log = f"{myDB}_log"

DbUser = os.getenv("MYSQL_USER", "root")
DbPwd = os.getenv("MYSQL_PASSWORD", "")
DbHost = os.getenv("MYSQL_HOST", "localhost")
DbPort = int(os.getenv("MYSQL_PORT", 3306))

def create_db_connection():
    return pymysql.connect(
        host=DbHost,
        port=DbPort,
        user=DbUser,
        password=DbPwd,
        database=myDB,
        charset='utf8mb4'
    )
