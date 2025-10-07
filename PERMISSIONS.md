# Phân quyền trong hệ thống quản lý

## 1. Các vai trò người dùng

Hệ thống có 3 vai trò người dùng chính:

### 1.1 Customer (Khách hàng)
- Quyền hạn cơ bản nhất
- Chỉ có thể xem sản phẩm, đặt hàng, quản lý giỏ hàng, v.v.

### 1.2 Staff (Nhân viên)
Quyền hạn:
- Quản lý sản phẩm: thêm, sửa, xóa, cập nhật thông tin
- Quản lý đơn hàng: xem, xác nhận, thay đổi trạng thái đơn
- Quản lý tồn kho, giá bán, khuyến mãi (nếu được phân công)
- KHÔNG được:
  - Quản lý người dùng, nhân viên khác
  - Quản lý danh mục lớn
  - Quản lý nội dung website
  - Xem báo cáo tổng thể

### 1.3 Admin (Quản trị viên)
Quyền hạn:
- Có tất cả quyền của Staff
- Quản lý người dùng (customer, staff): thêm, phân quyền, khóa, xóa
- Quản lý danh mục, thương hiệu laptop
- Quản lý nội dung website (banner, tin tức, giao diện)
- Xem báo cáo, thống kê doanh thu, đơn hàng, sản phẩm
- Toàn quyền kiểm soát hệ thống

### 1.4 Super Admin (admin1)
Quyền hạn đặc biệt:
- Có tất cả quyền của Admin thông thường
- Duy nhất có quyền quản lý các Admin khác (thêm, sửa, xóa admin)
- Các admin khác không thể thêm, sửa, xóa admin1 hoặc các admin khác

## 2. Cách thực hiện phân quyền

### 2.1 Frontend
- Sử dụng hook `useAuthorization` để kiểm tra quyền người dùng
- Component `ProtectedRoute` để bảo vệ các route admin
- Sidebar được lọc theo quyền người dùng
- Các chức năng quản lý người dùng được phân quyền chi tiết hơn

### 2.2 Backend
- Kiểm tra quyền trong các controller
- Phân quyền dựa trên roles được lưu trong database
- Mỗi endpoint API được bảo vệ theo vai trò người dùng

## 3. Các chức năng đã được phân quyền

### 3.1 Quản lý người dùng
- Thêm người dùng mới: Tất cả admin đều có thể thêm customer và staff, chỉ admin1 có thể thêm admin
- Chỉnh sửa thông tin người dùng: Tất cả admin đều có thể chỉnh sửa customer và staff, chỉ admin1 có thể chỉnh sửa admin
- Xóa người dùng: Tất cả admin đều có thể xóa customer và staff, chỉ admin1 có thể xóa admin
- Xem chi tiết người dùng: Tất cả admin đều có thể xem

### 3.2 Quản lý sản phẩm (Staff & Admin)
- Thêm sản phẩm mới
- Chỉnh sửa sản phẩm
- Xóa sản phẩm
- Xem chi tiết sản phẩm
- Danh sách sản phẩm

### 3.3 Quản lý danh mục (Staff & Admin)
- Thêm danh mục mới
- Chỉnh sửa danh mục
- Xóa danh mục
- Danh sách danh mục

### 3.4 Quản lý thương hiệu (Staff & Admin)
- Thêm thương hiệu mới
- Chỉnh sửa thương hiệu
- Xóa thương hiệu
- Danh sách thương hiệu

### 3.5 Quản lý đơn hàng (Staff & Admin)
- Xem danh sách đơn hàng
- Xác nhận đơn hàng
- Thay đổi trạng thái đơn hàng

### 3.6 Quản lý kho hàng (Staff & Admin)
- Xem danh sách kho
- Báo cáo tồn kho
- Lịch sử nhập xuất
- Cảnh báo hết hàng

### 3.7 Báo cáo & Thống kê (Admin & Super Admin)
- Tổng quan doanh thu
- Sản phẩm bán chạy
- Thống kê khách hàng
- Hiệu suất hệ thống

## 4. Cách kiểm tra quyền

Trong frontend, sử dụng hook `useAuthorization`:

```javascript
import { useAuthorization } from '../hooks/useAuthorization';

const { hasRole, isSuperAdmin, canManageUsers, canManageAdmins, canManageProducts, canViewReports } = useAuthorization();

// Kiểm tra vai trò cụ thể
if (hasRole('admin')) {
  // Hiển thị chức năng chỉ dành cho admin
}

// Kiểm tra xem có phải là super admin (admin1) không
if (isSuperAdmin) {
  // Hiển thị chức năng đặc biệt chỉ dành cho admin1
}

// Kiểm tra quyền quản lý admin
if (canManageAdmins) {
  // Hiển thị chức năng quản lý admin (chỉ admin1)
}
```

## 5. Bảo vệ route

Sử dụng component `ProtectedRoute` để bảo vệ các route:

```javascript
<Route path="/admin/users" element={
  <ProtectedRoute requiredRole="admin">
    <ListUsers />
  </ProtectedRoute>
} />
```