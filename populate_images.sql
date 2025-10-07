-- SQL script to populate product_images table with existing images
-- First, clear any existing data (for testing purposes only)
DELETE FROM laptop_store.product_images;

-- Insert sample image records for products
INSERT INTO laptop_store.product_images (product_id, url, alt_text, sort_order, is_primary, created_at) VALUES
(1, 'products/1045ba5c-40a5-4ab3-9951-0ffbeac2d78a.jpg', 'Dell Gaming G15 55112', 0, 1, NOW()),
(2, 'products/64085fb6-394f-46f4-8857-aae373f4f50d.jpg', 'Gaming MSI 3050 i7', 0, 1, NOW()),
(3, 'products/f542e1ae-2bbe-47fa-858f-4fcf237e347d.jpg', 'Gamin MSI 3050 i7', 0, 1, NOW());

-- Verify the inserted data
SELECT * FROM laptop_store.product_images;