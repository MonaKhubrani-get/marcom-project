import pymysql

def create_db_connection():
    return pymysql.connect(
        host='db',
        port=3306,
        user='root',
        password='rootpass',
        database='mydatabase',
        charset='utf8mb4'
    )
