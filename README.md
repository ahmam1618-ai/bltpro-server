# BLTPro Mock Server

سيرفر مؤقت لتطبيق BLTPro حتى يتم بناء السيرفر الحقيقي.

## طريقة النشر على Railway (مجاني):

1. اذهب لـ https://railway.app
2. سجل دخول بحساب GitHub
3. اضغط "New Project" ← "Deploy from GitHub"
4. ارفع هذه الملفات على GitHub repository جديد
5. Railway سيعطيك URL مثل: https://xxx.railway.app

## طريقة النشر على Render (مجاني):

1. اذهب لـ https://render.com
2. سجل دخول
3. New ← Web Service
4. ارفع الملفات واختر "Node"
5. Start Command: node server.js

## API Endpoints:

- POST /v/api/activate - تسجيل الدخول
- POST /v/api/heartbeat - نبضة القلب
- GET  /v/api/subscriber-data - بيانات المستخدم
- GET  /v/api/system-settings - إعدادات النظام
- POST /v/api/assets - إضافة asset
- PUT  /v/api/profile - تحديث الملف الشخصي
