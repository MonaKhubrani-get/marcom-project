import mysql.connector

try:
    conn = mysql.connector.connect(
        host='localhost',
        user='root',
        password='rootpass',  # أو كلمة المرور التي وضعتها في XAMPP
        database='mydatabase'
    )
    print("✅ تم الاتصال بقاعدة البيانات بنجاح!")
    conn.close()
except mysql.connector.Error as err:
    print("❌ فشل الاتصال: ", err)
