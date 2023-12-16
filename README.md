# ĐỒ ÁN DÙNG ĐỂ HỌC NEXT.JS VÀ NODE.JS: E-WASTE

Đây là website giúp mua bán rác thải điện tử giữa các người dùng. Có 3 role chính là người mua (buyer), người bán (saler) và chủ vựa (scrap yard owner). 
+ Người mua có thể xem các bài đăng, cat với người bán.
+ Người bán có thể thêm, xóa, sửa, xem bài đăng; xem các vựa thu mua và người mua và chat với họ.
+ Chủ vựa có thể xem, xóa, sửa, thêm vựa thu mua.
  
Dự án đã dùng những tech stacks: Next.js, node.js, HTML, css và javascript

Database system: Mysql

## Getting Started
Trước khi set up dự án, điều kiện cần thiết là phải cài đặt Mysql trên máy và có database tên là mango.
```
cd backend
cd model
node initialDatabase.js
```

Website có hai thư mục là backend và frontend. Muốn dùng đầu tiên bạn phải kéo code về máy trước.

Run the backend
```
cd backend
npm i -s
npm start
```
Run the frontend:
```
cd frontend
npm i -s
npm run dev
```
Mở http://localhost:3000 để dùng website.

## Examples
Homepage

![image](https://github.com/MinhAnh83/E-waste-MA/assets/127574462/7d5c90de-624d-48fb-9fad-43a2450e8ade)

Login page

![image](https://github.com/MinhAnh83/E-waste-MA/assets/127574462/0a0cc611-e3fa-432d-87d3-742603a2c5fe)

Dashboard page of the buyer
![screencapture-localhost-3000-dashboard-2023-12-16-09_59_20](https://github.com/MinhAnh83/E-waste-MA/assets/127574462/2750cb41-a0ff-47fb-abac-ba8025909f0f)

Post management page of the saler

![screencapture-localhost-3000-dashboard-myposts-2023-12-16-10_02_48](https://github.com/MinhAnh83/E-waste-MA/assets/127574462/1f3122f3-c21c-40f1-a82f-89067b50f73b)

Scrapyard management page of scrap yard owner

![screencapture-localhost-3000-dashboard-myscrapyard-2023-12-16-10_11_31](https://github.com/MinhAnh83/E-waste-MA/assets/127574462/78e02e7a-381d-4adb-ad8b-075ec0f32f1f)




