# Thiết Kế Database Hệ Thống Bán Hàng Trực Tuyến (E-commerce)

## 📋 Tổng Quan

Tài liệu này mô tả thiết kế database hoàn chỉnh cho hệ thống bán hàng trực tuyến, bao gồm quản lý sản phẩm, khách hàng, đơn hàng, giỏ hàng và nhiều tính năng khác.

## 🗄️ Cấu Trúc Database

### **1. Bảng Users (users)**
**Mục đích:** Quản lý tài khoản người dùng cơ bản

| Cột | Kiểu dữ liệu | Mô tả |
|-----|-------------|-------|
| id | BIGINT (PK) | ID tự động tăng |
| username | VARCHAR(255) UNIQUE | Tên đăng nhập |
| password | VARCHAR(255) | Mật khẩu đã mã hóa |
| email | VARCHAR(255) | Email người dùng |
| full_name | VARCHAR(255) | Họ tên đầy đủ |
| created_at | TIMESTAMP | Thời gian tạo |
| updated_at | TIMESTAMP | Thời gian cập nhật |
| is_active | BOOLEAN | Trạng thái hoạt động |

### **2. Bảng Categories (categories)**
**Mục đích:** Phân loại sản phẩm theo danh mục

| Cột | Kiểu dữ liệu | Mô tả |
|-----|-------------|-------|
| id | BIGINT (PK) | ID tự động tăng |
| name | VARCHAR(255) | Tên danh mục |
| description | TEXT | Mô tả danh mục |
| slug | VARCHAR(255) UNIQUE | URL thân thiện |
| parent_id | BIGINT (FK) | Danh mục cha |
| level | INT | Cấp độ (0=gốc, 1=cấp 1...) |
| path | VARCHAR(500) | Đường dẫn đầy đủ |
| image_url | VARCHAR(500) | Ảnh danh mục |
| icon | VARCHAR(100) | Icon danh mục |
| color | VARCHAR(7) | Màu sắc (hex) |
| is_active | BOOLEAN | Trạng thái hoạt động |
| is_featured | BOOLEAN | Danh mục nổi bật |
| sort_order | INT | Thứ tự sắp xếp |
| product_count | INT | Số lượng sản phẩm |
| meta_title | VARCHAR(255) | Tiêu đề SEO |
| meta_description | VARCHAR(500) | Mô tả SEO |
| created_at | TIMESTAMP | Thời gian tạo |
| updated_at | TIMESTAMP | Thời gian cập nhật |

### **3. Bảng Products (products)**
**Mục đích:** Quản lý thông tin sản phẩm

| Cột | Kiểu dữ liệu | Mô tả |
|-----|-------------|-------|
| id | BIGINT (PK) | ID tự động tăng |
| name | VARCHAR(255) | Tên sản phẩm |
| description | TEXT | Mô tả chi tiết |
| short_description | VARCHAR(500) | Mô tả ngắn |
| price | DECIMAL(10,2) | Giá gốc |
| sale_price | DECIMAL(10,2) | Giá khuyến mãi |
| cost_price | DECIMAL(10,2) | Giá vốn |
| sku | VARCHAR(100) UNIQUE | Mã sản phẩm |
| stock_quantity | INT | Số lượng tồn kho |
| min_stock_level | INT | Mức tồn kho tối thiểu |
| weight | DECIMAL(8,3) | Trọng lượng (kg) |
| dimensions | VARCHAR(100) | Kích thước |
| category_id | BIGINT (FK) | Danh mục |
| brand | VARCHAR(100) | Thương hiệu |
| model | VARCHAR(100) | Model |
| color | VARCHAR(50) | Màu sắc |
| size | VARCHAR(50) | Kích cỡ |
| material | VARCHAR(100) | Chất liệu |
| image_url | VARCHAR(500) | Ảnh chính |
| slug | VARCHAR(255) UNIQUE | URL thân thiện |
| is_active | BOOLEAN | Trạng thái hoạt động |
| is_featured | BOOLEAN | Sản phẩm nổi bật |
| is_digital | BOOLEAN | Sản phẩm số |
| view_count | BIGINT | Số lượt xem |
| sales_count | BIGINT | Số lượt bán |
| rating | DECIMAL(3,2) | Đánh giá trung bình |
| review_count | INT | Số đánh giá |
| meta_title | VARCHAR(255) | Tiêu đề SEO |
| meta_description | VARCHAR(500) | Mô tả SEO |
| created_at | TIMESTAMP | Thời gian tạo |
| updated_at | TIMESTAMP | Thời gian cập nhật |

### **4. Bảng Product Images (product_images)**
**Mục đích:** Lưu trữ nhiều ảnh cho một sản phẩm

| Cột | Kiểu dữ liệu | Mô tả |
|-----|-------------|-------|
| product_id | BIGINT (FK) | ID sản phẩm |
| image_url | VARCHAR(500) | Đường dẫn ảnh |

### **5. Bảng Product Tags (product_tags)**
**Mục đích:** Gắn thẻ cho sản phẩm

| Cột | Kiểu dữ liệu | Mô tả |
|-----|-------------|-------|
| product_id | BIGINT (FK) | ID sản phẩm |
| tag | VARCHAR(100) | Thẻ |

### **6. Bảng Customers (customers)**
**Mục đích:** Thông tin chi tiết khách hàng

| Cột | Kiểu dữ liệu | Mô tả |
|-----|-------------|-------|
| id | BIGINT (PK) | ID tự động tăng |
| user_id | BIGINT (FK) | Tài khoản người dùng |
| first_name | VARCHAR(100) | Tên |
| last_name | VARCHAR(100) | Họ |
| phone | VARCHAR(20) | Số điện thoại |
| date_of_birth | DATE | Ngày sinh |
| gender | ENUM | Giới tính |
| avatar_url | VARCHAR(500) | Ảnh đại diện |
| customer_type | ENUM | Loại khách hàng |
| loyalty_points | INT | Điểm tích lũy |
| total_orders | INT | Tổng đơn hàng |
| total_spent | DECIMAL(15,2) | Tổng chi tiêu |
| average_order_value | DECIMAL(10,2) | Giá trị đơn hàng TB |
| preferred_language | VARCHAR(10) | Ngôn ngữ ưa thích |
| preferred_currency | VARCHAR(3) | Tiền tệ ưa thích |
| newsletter_subscribed | BOOLEAN | Đăng ký newsletter |
| sms_notifications | BOOLEAN | Thông báo SMS |
| email_notifications | BOOLEAN | Thông báo email |
| last_login_at | TIMESTAMP | Lần đăng nhập cuối |
| last_order_at | TIMESTAMP | Đơn hàng cuối |
| notes | TEXT | Ghi chú |
| created_at | TIMESTAMP | Thời gian tạo |
| updated_at | TIMESTAMP | Thời gian cập nhật |

### **7. Bảng Customer Addresses (customer_addresses)**
**Mục đích:** Địa chỉ giao hàng của khách hàng

| Cột | Kiểu dữ liệu | Mô tả |
|-----|-------------|-------|
| id | BIGINT (PK) | ID tự động tăng |
| customer_id | BIGINT (FK) | ID khách hàng |
| type | ENUM | Loại địa chỉ (HOME, OFFICE, OTHER) |
| is_default | BOOLEAN | Địa chỉ mặc định |
| recipient_name | VARCHAR(255) | Tên người nhận |
| phone | VARCHAR(20) | Số điện thoại |
| address_line_1 | VARCHAR(255) | Địa chỉ dòng 1 |
| address_line_2 | VARCHAR(255) | Địa chỉ dòng 2 |
| ward | VARCHAR(100) | Phường/Xã |
| district | VARCHAR(100) | Quận/Huyện |
| city | VARCHAR(100) | Thành phố/Tỉnh |
| country | VARCHAR(100) | Quốc gia |
| postal_code | VARCHAR(20) | Mã bưu điện |
| latitude | DECIMAL(10,8) | Vĩ độ |
| longitude | DECIMAL(11,8) | Kinh độ |
| notes | TEXT | Ghi chú giao hàng |
| created_at | TIMESTAMP | Thời gian tạo |
| updated_at | TIMESTAMP | Thời gian cập nhật |

### **8. Bảng Orders (orders)**
**Mục đích:** Quản lý đơn hàng

| Cột | Kiểu dữ liệu | Mô tả |
|-----|-------------|-------|
| id | BIGINT (PK) | ID tự động tăng |
| order_number | VARCHAR(50) UNIQUE | Mã đơn hàng |
| customer_id | BIGINT (FK) | ID khách hàng |
| status | ENUM | Trạng thái đơn hàng |
| payment_status | ENUM | Trạng thái thanh toán |
| payment_method | VARCHAR(50) | Phương thức thanh toán |
| payment_transaction_id | VARCHAR(255) | Mã giao dịch |
| subtotal | DECIMAL(12,2) | Tổng tiền hàng |
| tax_amount | DECIMAL(10,2) | Tiền thuế |
| shipping_fee | DECIMAL(10,2) | Phí vận chuyển |
| discount_amount | DECIMAL(10,2) | Tiền giảm giá |
| total_amount | DECIMAL(12,2) | Tổng thanh toán |
| paid_amount | DECIMAL(12,2) | Số tiền đã trả |
| coupon_code | VARCHAR(50) | Mã giảm giá |
| customer_name | VARCHAR(255) | Tên khách hàng |
| customer_email | VARCHAR(255) | Email khách hàng |
| customer_phone | VARCHAR(20) | SĐT khách hàng |
| shipping_method | VARCHAR(100) | Phương thức vận chuyển |
| shipping_tracking_number | VARCHAR(100) | Mã vận đơn |
| shipping_recipient_name | VARCHAR(255) | Tên người nhận |
| shipping_phone | VARCHAR(20) | SĐT người nhận |
| shipping_address_line_1 | VARCHAR(255) | Địa chỉ giao hàng 1 |
| shipping_address_line_2 | VARCHAR(255) | Địa chỉ giao hàng 2 |
| shipping_ward | VARCHAR(100) | Phường/Xã |
| shipping_district | VARCHAR(100) | Quận/Huyện |
| shipping_city | VARCHAR(100) | Thành phố/Tỉnh |
| shipping_country | VARCHAR(100) | Quốc gia |
| estimated_delivery_date | TIMESTAMP | Ngày giao dự kiến |
| actual_delivery_date | TIMESTAMP | Ngày giao thực tế |
| notes | TEXT | Ghi chú đơn hàng |
| admin_notes | TEXT | Ghi chú admin |
| created_at | TIMESTAMP | Thời gian tạo |
| updated_at | TIMESTAMP | Thời gian cập nhật |
| confirmed_at | TIMESTAMP | Thời gian xác nhận |
| shipped_at | TIMESTAMP | Thời gian vận chuyển |
| delivered_at | TIMESTAMP | Thời gian giao hàng |
| cancelled_at | TIMESTAMP | Thời gian hủy |
| cancellation_reason | TEXT | Lý do hủy |

### **9. Bảng Order Items (order_items)**
**Mục đích:** Chi tiết sản phẩm trong đơn hàng

| Cột | Kiểu dữ liệu | Mô tả |
|-----|-------------|-------|
| id | BIGINT (PK) | ID tự động tăng |
| order_id | BIGINT (FK) | ID đơn hàng |
| product_id | BIGINT (FK) | ID sản phẩm |
| product_name | VARCHAR(255) | Tên sản phẩm |
| product_sku | VARCHAR(100) | Mã sản phẩm |
| product_image_url | VARCHAR(500) | Ảnh sản phẩm |
| unit_price | DECIMAL(10,2) | Giá đơn vị |
| original_price | DECIMAL(10,2) | Giá gốc |
| discount_amount | DECIMAL(10,2) | Tiền giảm giá |
| quantity | INT | Số lượng |
| total_price | DECIMAL(12,2) | Thành tiền |
| variant_color | VARCHAR(50) | Màu sắc |
| variant_size | VARCHAR(50) | Kích cỡ |
| variant_material | VARCHAR(100) | Chất liệu |
| variant_options | TEXT | Tùy chọn khác (JSON) |
| status | ENUM | Trạng thái item |
| shipped_quantity | INT | SL đã vận chuyển |
| delivered_quantity | INT | SL đã giao |
| returned_quantity | INT | SL đã trả |
| refunded_quantity | INT | SL đã hoàn tiền |
| notes | TEXT | Ghi chú |
| created_at | TIMESTAMP | Thời gian tạo |
| updated_at | TIMESTAMP | Thời gian cập nhật |

### **10. Bảng Shopping Carts (shopping_carts)**
**Mục đích:** Giỏ hàng của khách hàng

| Cột | Kiểu dữ liệu | Mô tả |
|-----|-------------|-------|
| id | BIGINT (PK) | ID tự động tăng |
| customer_id | BIGINT (FK) | ID khách hàng |
| session_id | VARCHAR(255) | Session ID (khách vãng lai) |
| total_items | INT | Tổng số items |
| subtotal | DECIMAL(12,2) | Tổng tiền hàng |
| discount_amount | DECIMAL(10,2) | Tiền giảm giá |
| coupon_code | VARCHAR(50) | Mã giảm giá |
| estimated_tax | DECIMAL(10,2) | Thuế ước tính |
| estimated_shipping | DECIMAL(10,2) | Phí ship ước tính |
| estimated_total | DECIMAL(12,2) | Tổng ước tính |
| notes | TEXT | Ghi chú |
| created_at | TIMESTAMP | Thời gian tạo |
| updated_at | TIMESTAMP | Thời gian cập nhật |
| last_activity_at | TIMESTAMP | Hoạt động cuối |

### **11. Bảng Cart Items (cart_items)**
**Mục đích:** Sản phẩm trong giỏ hàng

| Cột | Kiểu dữ liệu | Mô tả |
|-----|-------------|-------|
| id | BIGINT (PK) | ID tự động tăng |
| shopping_cart_id | BIGINT (FK) | ID giỏ hàng |
| product_id | BIGINT (FK) | ID sản phẩm |
| quantity | INT | Số lượng |
| unit_price | DECIMAL(10,2) | Giá đơn vị |
| total_price | DECIMAL(12,2) | Thành tiền |
| variant_color | VARCHAR(50) | Màu sắc |
| variant_size | VARCHAR(50) | Kích cỡ |
| variant_material | VARCHAR(100) | Chất liệu |
| variant_options | TEXT | Tùy chọn khác (JSON) |
| notes | TEXT | Ghi chú |
| created_at | TIMESTAMP | Thời gian tạo |
| updated_at | TIMESTAMP | Thời gian cập nhật |

### **12. Bảng Wishlist Items (wishlist_items)**
**Mục đích:** Danh sách yêu thích

| Cột | Kiểu dữ liệu | Mô tả |
|-----|-------------|-------|
| id | BIGINT (PK) | ID tự động tăng |
| customer_id | BIGINT (FK) | ID khách hàng |
| product_id | BIGINT (FK) | ID sản phẩm |
| notes | TEXT | Ghi chú |
| priority | ENUM | Mức độ ưu tiên |
| is_public | BOOLEAN | Công khai |
| desired_quantity | INT | Số lượng mong muốn |
| price_alert_enabled | BOOLEAN | Cảnh báo giá |
| price_alert_threshold | DECIMAL(10,2) | Ngưỡng cảnh báo giá |
| stock_alert_enabled | BOOLEAN | Cảnh báo tồn kho |
| created_at | TIMESTAMP | Thời gian tạo |
| updated_at | TIMESTAMP | Thời gian cập nhật |

## 🔗 Mối Quan Hệ Database

### **Quan hệ One-to-One:**
- `users` ↔ `customers` (1:1)
- `customers` ↔ `shopping_carts` (1:1)

### **Quan hệ One-to-Many:**
- `categories` → `categories` (parent-child)
- `categories` → `products`
- `customers` → `customer_addresses`
- `customers` → `orders`
- `customers` → `wishlist_items`
- `orders` → `order_items`
- `products` → `order_items`
- `products` → `cart_items`
- `products` → `wishlist_items`
- `shopping_carts` → `cart_items`

### **Quan hệ Many-to-Many:**
- `products` ↔ `tags` (thông qua product_tags)
- `products` ↔ `images` (thông qua product_images)

## 📊 Indexes Đề Xuất

### **Indexes Chính:**
```sql
-- Products
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_active ON products(is_active);
CREATE INDEX idx_products_featured ON products(is_featured);
CREATE INDEX idx_products_brand ON products(brand);
CREATE INDEX idx_products_price ON products(price);
CREATE INDEX idx_products_sale_price ON products(sale_price);
CREATE INDEX idx_products_stock ON products(stock_quantity);
CREATE INDEX idx_products_rating ON products(rating);
CREATE INDEX idx_products_created ON products(created_at);

-- Categories
CREATE INDEX idx_categories_parent ON categories(parent_id);
CREATE INDEX idx_categories_active ON categories(is_active);
CREATE INDEX idx_categories_featured ON categories(is_featured);
CREATE INDEX idx_categories_level ON categories(level);

-- Orders
CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_payment_status ON orders(payment_status);
CREATE INDEX idx_orders_created ON orders(created_at);
CREATE INDEX idx_orders_number ON orders(order_number);

-- Customers
CREATE INDEX idx_customers_user ON customers(user_id);
CREATE INDEX idx_customers_type ON customers(customer_type);
CREATE INDEX idx_customers_phone ON customers(phone);
CREATE INDEX idx_customers_email ON customers(user_id, customer_id);
```

## 🔒 Ràng Buộc Database

### **Foreign Key Constraints:**
- Tất cả các FK đều có ON DELETE CASCADE hoặc RESTRICT
- Đảm bảo tính toàn vẹn dữ liệu

### **Check Constraints:**
```sql
-- Giá phải >= 0
ALTER TABLE products ADD CONSTRAINT chk_price_positive CHECK (price >= 0);
ALTER TABLE products ADD CONSTRAINT chk_sale_price_positive CHECK (sale_price >= 0);

-- Stock phải >= 0
ALTER TABLE products ADD CONSTRAINT chk_stock_positive CHECK (stock_quantity >= 0);

-- Quantity phải > 0
ALTER TABLE order_items ADD CONSTRAINT chk_quantity_positive CHECK (quantity > 0);
ALTER TABLE cart_items ADD CONSTRAINT chk_quantity_positive CHECK (quantity > 0);
```

## 🚀 Tối Ưu Hóa Performance

### **1. Pagination:**
- Sử dụng LIMIT và OFFSET cho các danh sách lớn
- Index trên các cột sắp xếp

### **2. Caching:**
- Cache kết quả truy vấn thường xuyên
- Cache thông tin category hierarchy
- Cache product details

### **3. Partitioning:**
- Partition bảng orders theo tháng/năm
- Partition bảng order_items theo order_id

### **4. Archiving:**
- Archive các đơn hàng cũ > 2 năm
- Archive log hoạt động cũ

## 📝 Ghi Chú Triển Khai

### **1. Dữ Liệu Mẫu:**
- Tạo categories mẫu (Electronics, Fashion, Books...)
- Tạo products mẫu với đầy đủ thông tin
- Tạo customers test

### **2. Migration Strategy:**
- Tạo tables theo thứ tự dependencies
- Import dữ liệu master trước (categories)
- Import dữ liệu transaction sau (orders)

### **3. Backup Strategy:**
- Full backup hàng ngày
- Incremental backup mỗi giờ
- Point-in-time recovery

---

**Tác giả:** LeThanhDat  
**Ngày tạo:** 26/08/2025  
**Phiên bản:** 1.0  
**Môi trường:** Spring Boot + MySQL