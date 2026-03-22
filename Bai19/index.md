Bài 19 [Thiết kế cơ sở dữ liệu](https://legiacong.blogspot.com/2025/04/web-back-end-19-thiet-ke-co-so-du-lieu.html)

19.1 Phân tích và thiết kế các bảng

Chúng ta sẽ phân tích để tạo cơ sở dữ liệu ở mức đơn giản, chủ yếu để minh họa cho ứng dụng bán hàng đơn giản, mà nó chưa thể hiện hết các tình huống trong thực tế.

Kiểu dữ liệu của mỗi thuộc tính có thể có tên gọi khác nhau, tùy thuộc vào Hệ quản trị cơ sở dữ liệu cài đặt. Do vậy, bạn có thể thay đổi kiểu dữ liệu cho phù hợp.

Phân tích yêu cầu về dữ liệu:

\[1\] Web app sẽ bán rất nhiều sản phẩm (product). Ví dụ: áo sơ mi nữ, quần jean nữ. Để lưu trữ thông tin về các sản phẩm, chúng ta sẽ tạo bảng có tên Products. Bảng Products lưu các thông tin (thuộc tính, cột) sau:

| Products |
| --- |
| Tên thuộc tính | Kiểu dữ liệu | Diễn giải |
| id | SERIAL | Khóa chính |
| name | VARCHAR(255) | Tên sản phẩm |
| imagePath | VARCHAR(255) | Đường dẫn của tập tin hình ảnh |
| oldPrice | NUMERIC(10,2) | Giá niêm yết ban đầu (chưa giảm giá) |
| price | NUMERIC(10,2) | Giá bán hiện tại (giá khách hàng phải thanh toán) |
| summary | TEXT | Mô tả ngắn gọn về sản phẩm |
| description | TEXT | Mô tả chi tiết về sản phẩm |
| specification | JSON | Thông số kỹ thuật chi tiết của sản phẩm |
| stars | NUMERIC(3,1) | Đánh giá của khách hàng về sản phẩm |
| quantity | INTEGER | Số lượng sản phẩm hiện có trong kho |
| createdAt | TIMESTAMP | Thời điểm thông tin sản phẩm được thêm mới vào Cơ sở dữ liệu |
| updatedAt | TIMESTAMP | Thời điểm thông tin của sản phẩm được cập nhật mới nhất |
| brandId | INTEGER | Khóa ngoại, tham chiếu từ bảng Brands |
| categoryId | INTEGER | Khóa ngoại, tham chiếu từ bảng Categories |

\- SERIAL là kiểu dữ liệu tự động tăng giá trị trong Postgresql, tương đương với AUTO\_INCREMENT trong Mysql

\- NUMERIC là kiểu dữ liệu chính xác trong Postgresql, phù hợp cho giá trị tiền tệ, đánh giá (không làm tròn như FLOAT). Tham số (10,2) đảm bảo giá trị tối đa 10 chữ số, với 2 chữ số thập phân (ví dụ: 99999999.99).

\[2\] Một sản phẩm sẽ thuộc về một loại (sản phẩm) nào đó. Một loại (category) sẽ có nhiều sản phẩm. Ví dụ: “áo sơ mi nữ” thuộc loại “áo”, “áo dài tay nữ” thuộc loại “áo”.

Quan hệ giữa Categories và Products là quan hệ 1 - n (một - nhiều).

Để lưu trữ thông tin về các loại, chúng ta sẽ tạo bảng có tên Categories. Bảng Categories lưu các thông tin (thuộc tính, cột) sau:

| Categories |
| --- |
| Tên thuộc tính | Kiểu dữ liệu | Diễn giải |
| id | SERIAL | Khóa chính |
| name | VARCHAR(255) | Tên loại |
| imagePath | VARCHAR(255) | Đường dẫn của tập tin hình ảnh |
| createdAt | TIMESTAMP | Thời điểm loại được thêm mới vào Cơ sở dữ liệu |
| updatedAt | TIMESTAMP | Thời điểm thông tin của loại được cập nhật mới nhất |

\[3\] Web app sẽ bán hàng của nhiều nhãn hàng (brand). Một nhãn hàng có nhiều sản phẩm. Một sản phẩm thuộc một nhãn hàng.

Quan hệ giữa Brands và Products là quan hệ 1 - n (một - nhiều).

Để lưu trữ thông tin về các nhãn hàng, chúng ta sẽ tạo bảng có tên Brands. Bảng Brands lưu các thông tin (thuộc tính, cột) sau:

| Brands |
| --- |
| Tên thuộc tính | Kiểu dữ liệu | Diễn giải |
| id | SERIAL | Khóa chính |
| name | VARCHAR(255) | Tên nhãn hàng |
| imagePath | VARCHAR(255) | Đường dẫn của tập tin hình ảnh |
| createdAt | TIMESTAMP | Thời điểm nhãn hàng được thêm mới vào Cơ sở dữ liệu |
| updatedAt | TIMESTAMP | Thời điểm thông tin của nhãn hàng được cập nhật mới nhất |

\[4\] Mỗi sản phẩm có nhiều hình ảnh minh họa (image). Mỗi hình ảnh minh họa cho một sản phẩm duy nhất.

Quan hệ giữa Products và Images là quan hệ 1 - n.

Để lưu trữ thông tin về các hình ảnh, chúng ta sẽ tạo bảng có tên Images. Bảng Images lưu các thông tin (thuộc tính, cột) sau:

| Images |
| --- |
| Tên thuộc tính | Kiểu dữ liệu | Diễn giải |
| id | SERIAL | Khóa chính |
| name | VARCHAR(255) | Tên hình ảnh |
| imagePath | VARCHAR(255) | Đường dẫn của tập tin hình ảnh |
| createdAt | TIMESTAMP | Thời điểm hình ảnh được thêm mới vào Cơ sở dữ liệu |
| updatedAt | TIMESTAMP | Thời điểm thông tin của hình ảnh được cập nhật mới nhất |
| productId | INTEGER | Khóa ngoại, tham chiếu từ bảng Products |

\[5\] Một sản phẩm có thể được gắn nhiều thẻ (tag), một thẻ có thể gắn vào nhiều sản phẩm.

Thẻ được sử dụng để gán các từ khóa hoặc nhãn cho sản phẩm. Những thẻ này giúp mô tả các đặc điểm, phong cách, hoặc thuộc tính nổi bật của sản phẩm, từ đó hỗ trợ việc tìm kiếm, lọc và khám phá sản phẩm một cách hiệu quả hơn cho cả người quản lý và khách hàng.

Cụ thể, thẻ giúp chúng ta:

\- Phân loại sản phẩm linh hoạt: thay vì chỉ dựa vào loại (category), thẻ cho phép gán nhiều đặc điểm khác nhau cho một sản phẩm. Ví dụ, một chiếc váy có thể thuộc loại "váy" nhưng đồng thời có các thẻ như "vintage", "mùa hè", "dự tiệc".

\- Cải thiện khả năng tìm kiếm: khách hàng có thể tìm kiếm sản phẩm dựa trên các thẻ mà họ quan tâm, ngay cả khi họ không biết chính xác loại sản phẩm. Ví dụ, tìm kiếm "váy công sở" hoặc "áo thun basic".

\- Hỗ trợ lọc và sắp xếp: bạn có thể sử dụng các thẻ để tạo các bộ lọc trên trang web, giúp khách hàng thu hẹp phạm vi tìm kiếm theo các tiêu chí cụ thể (ví dụ: lọc theo phong cách, chất liệu).

\- Gợi ý sản phẩm liên quan: dựa trên các thẻ của sản phẩm đang xem, hệ thống có thể gợi ý các sản phẩm tương tự hoặc có cùng phong cách.

\- Phân tích xu hướng: các thẻ phổ biến có thể giúp cửa hàng nhận diện các xu hướng thời trang hiện tại và đưa ra quyết định nhập hàng phù hợp.

Để lưu trữ thông tin các thẻ, chúng ta sẽ tạo bảng có tên Tags. Bảng Tags lưu các thông tin (thuộc tính, cột) sau:

| Tags |
| --- |
| Tên thuộc tính | Kiểu dữ liệu | Diễn giải |
| id | SERIAL | Khóa chính |
| name | VARCHAR(255) | Tên thẻ |
| createdAt | TIMESTAMP | Thời điểm thêm thẻ mới vào Cơ sở dữ liệu |
| updatedAt | TIMESTAMP | Thời điểm thông tin của thẻ được cập nhật mới nhất |

Mối quan hệ giữa Products và Tags là n-n (nhiều - nhiều; many-to-many).

\[6\] Vì mối quan hệ giữa Products và Tags là nhiều-nhiều. Nên chúng ta cần tạo ra một bảng trung gian có tên là ProductTags. Bảng ProductTags lưu các thông tin (thuộc tính, cột) sau:

| ProductTags |
| --- |
| Tên thuộc tính | Kiểu dữ liệu | Diễn giải |
| productId | SERIAL | Tham chiếu từ bảng Products |
| tagId | INTEGER | Tham chiếu từ bảng Tags |
| createdAt | TIMESTAMP | Thời điểm thêm product-tag mới vào Cơ sở dữ liệu |
| updatedAt | TIMESTAMP | Thời điểm thông tin của product-tag được cập nhật mới nhất |

\[7\] Một sản phẩm sẽ được người dùng nhận xét, đánh giá; ví dụ về chất lượng, cảm nhận, khâu giao hàng, thanh toán.

Để lưu trữ thông tin các nhận xét, chúng ta sẽ tạo bảng có tên Reviews. Bảng Reviews lưu các thông tin (thuộc tính, cột) sau:

| Reviews |
| --- |
| Tên thuộc tính | Kiểu dữ liệu | Diễn giải |
| id | SERIAL | Khóa chính |
| review | TEXT | Nhận xét |
| stars | NUMERIC(3,1) | Đánh giá của khách hàng về sản phẩm |
| createdAt | TIMESTAMP | Thời điểm thêm nhận xét mới vào Cơ sở dữ liệu |
| updatedAt | TIMESTAMP | Thời điểm nhận xét được cập nhật mới nhất |
| productId | INTEGER | Khóa ngoại, tham chiếu từ bảng Products. Sản phẩm được nhận xét. |
| userId | INTEGER | Khóa ngoại, tham chiếu từ bảng Users. Người nhận xét. |

\[8\] Người dùng muốn mua hàng, hoặc đưa ra nhận xét về sản phẩm thì phải đăng nhập bằng tài khoản trên web app.

Để lưu trữ thông tin người dùng, chúng ta sẽ tạo bảng có tên Users. Bảng Users lưu các thông tin (thuộc tính, cột) sau:

| Users |
| --- |
| Tên thuộc tính | Kiểu dữ liệu | Diễn giải |
| id | SERIAL | Khóa chính |
| email | VARCHAR(255) | Tên tài khoản đăng nhập |
| password | VARCHAR(255) | Mật khẩu đăng nhập |
| firstName | VARCHAR(255) | Tên người dùng |
| lastName | VARCHAR(255) | Họ và tên lót người dùng |
| mobile | VARCHAR(50) | Điện thoại người dùng |
| isAdmin | BOOLEAN | Có là quản trị viên hay không |
| createdAt | TIMESTAMP | Thời điểm thêm người dùng mới vào Cơ sở dữ liệu |
| updatedAt | TIMESTAMP | Thời điểm thông tin người dùng được cập nhật mới nhất |

\[9\] Một người dùng có thể tạo ra danh sách các sản phẩm mà họ yêu thích, và một sản phẩm có thể được nhiều người yêu thích.

Để lưu trữ danh sách các sản phẩm yêu thích của người dùng, chúng ta sẽ tạo bảng có tên Wishlists. Bảng Wishlists lưu các thông tin (thuộc tính, cột) sau:

| Wishlists |
| --- |
| Tên thuộc tính | Kiểu dữ liệu | Diễn giải |
| productId | INTEGER | Khóa ngoại, tham chiếu từ bảng Products. Sản phẩm được yêu thích |
| userId | INTEGER | Khóa ngoại, tham chiếu từ bảng Users. Người yêu thích sản phẩm |
| createdAt | TIMESTAMP | Thời điểm thêm thông tin mới vào Cơ sở dữ liệu |
| updatedAt | TIMESTAMP | Thời điểm cập nhật thông tin vào Cơ sở dữ liệu mới nhất |

\[10\] Khi người dùng đặt hàng (mua hàng), web app sẽ tạo một đơn hàng.

Để lưu trữ các đơn hàng (order), chúng ta sẽ tạo bảng có tên Orders. Bảng Orders lưu các thông tin (thuộc tính, cột) sau:

| Orders |
| --- |
| Tên thuộc tính | Kiểu dữ liệu | Diễn giải |
| id | SERIAL | Khóa chính |
| quantity | INTEGER | Số lượng sản phẩm trong đơn hàng |
| total | NUMERIC(10,2) | Tổng tiền khách hàng phải trả |
| subtotal | NUMERIC(10,2) | Tổng tiền của đơn hàng (chưa tính giảm giá, thuế, phí) |
| shipping | NUMERIC(10,2) | Phí giao hàng |
| discount | NUMERIC(10,2) | Giảm giá |
| couponCode | VARCHAR(20) | Mã giảm giá, áp dụng cho đơn hàng này |
| shippingAddress | VARCHAR(255) | Địa chỉ giao hàng cho khách |
| paymentMethod | VARCHAR(50) | Phương thức thanh toán (chuyển khoản, COD) |
| paymentDetails | TEXT/JSON | Thông tin chi tiết về thanh toán (như ID giao dịch, trạng thái thanh toán, hoặc thông tin thẻ) |
| status | VARCHAR/STRING | Trạng thái đơn hàng (như: Pending, Processing, Shipped, Delivered, Cancelled). |
| createdAt | TIMESTAMP | Thời điểm thêm đơn hàng mới vào Cơ sở dữ liệu |
| updatedAt | TIMESTAMP | Thời điểm cập nhật đơn hàng vào Cơ sở dữ liệu mới nhất |
| userId | INTEGER | Khóa ngoại, tham chiếu từ bảng Users. Người đặt hàng. |

\[11\] Một đơn hàng có thể có nhiều mặt hàng, một mặt hàng có thể thuộc về nhiều đơn hàng. Để biết chính xác mặt hàng nào thuộc về đơn hàng nào thì chúng ta cần phải tạo ra một bảng phụ (có tên là OrderDetails - Chi tiết đơn hàng) để lưu thông tin.

Bảng OrderDetails lưu các thông tin (thuộc tính, cột) sau:

| OrderDetails |
| --- |
| Tên thuộc tính | Kiểu dữ liệu | Diễn giải |
| orderId | INTEGER | Khóa ngoại, tham chiếu từ bảng Orders. |
| productId | INTEGER | Khóa ngoại, tham chiếu từ bảng Products. |
| quantity | INTEGER | Số lượng sản phẩm trong chi tiết đơn hàng |
| price | NUMERIC(10,2) | Giá của đơn vị sản phẩm tại thời điểm mua hàng |
| total | NUMERIC(10,2) | Tổng tiền của chi tiết đơn hàng (quantity * price) |
| createdAt | TIMESTAMP | Thời điểm thêm thông tin mới vào Cơ sở dữ liệu |
| updatedAt | TIMESTAMP | Thời điểm cập nhật thông tin vào Cơ sở dữ liệu mới nhất |

\[12\] Nếu khách hàng muốn nhận thông tin từ cửa hàng (ví dụ: có hàng mới, thông báo khuyến mãi). Chúng ta sẽ tạo bảng Subscribes để lưu trữ thông tin các khách hàng muốn nhận thông báo. Đây là bảng độc lập, không có mối quan hệ với các bảng khác trong cơ sở dữ liệu.

Bảng Subscribes lưu các thông tin (thuộc tính, cột) sau:

| Subscribes |
| --- |
| Tên thuộc tính | Kiểu dữ liệu | Diễn giải |
| id | SERIAL | Khóa chính |
| email | VARCHAR(100) | Email khách hàng muốn nhận thông báo |
| createdAt | TIMESTAMP | Thời điểm thêm thông tin mới vào Cơ sở dữ liệu |
| updatedAt | TIMESTAMP | Thời điểm cập nhật thông tin vào Cơ sở dữ liệu mới nhất |

\[13\] Để lưu trữ các thông tin liên lạc từ khách hàng. Chúng ta sẽ tạo bảng Messages. Đây là bảng độc lập, không có mối quan hệ với các bảng khác trong cơ sở dữ liệu.

Bảng Messages lưu các thông tin (thuộc tính, cột) sau:

| Messages |
| --- |
| Tên thuộc tính | Kiểu dữ liệu | Diễn giải |
| id | SERIAL | Khóa chính |
| name | VARCHAR(255) | Tên người liên lạc |
| email | VARCHAR(100) | Email người liên lạc |
| subject | TEXT | Chủ đề trao đổi |
| message | TEXT | Nội dung trao đổi |
| createdAt | TIMESTAMP | Thời điểm thêm thông tin mới vào Cơ sở dữ liệu |
| updatedAt | TIMESTAMP | Thời điểm cập nhật thông tin vào Cơ sở dữ liệu mới nhất |

\[14\] Để có thể giao hàng tới cho khách, chúng ta cần tạo bảng (Addresses) để lưu thông tin liên quan đến việc giao hàng ứng với mỗi khách hàng.

Bảng Addresses lưu các thông tin (thuộc tính, cột) sau:

| Addresses |
| --- |
| Tên thuộc tính | Kiểu dữ liệu | Diễn giải |
| id | SERIAL | Khóa chính |
| firstName | VARCHAR(50) | Tên người nhận hàng |
| lastName | VARCHAR(100) | Họ và tên lót người nhận hàng |
| email | VARCHAR(100) | Email người nhận hàng |
| mobile | VARCHAR(20) | Điện thoại người nhận hàng |
| address | VARCHAR(255) | Địa chỉ cụ thể của người nhận, bao gồm số nhà, tên đường, khu vực. |
| country | VARCHAR(50) | Tên quốc gia của địa chỉ giao hàng |
| state | VARCHAR(50) | Tên tỉnh, thành phố trực thuộc trung ương của địa chỉ giao hàng |
| city | VARCHAR(50) | Tên thành phố thuộc tỉnh, huyện, thị xã |
| zipCode | VARCHAR(20) | Mã bưu điện của địa chỉ |
| isDefault | BOOLEAN | Đây có phải là địa chỉ giao hàng mặc định của khách hàng hay không |
| createdAt | TIMESTAMP | Thời điểm thêm thông tin mới vào Cơ sở dữ liệu |
| updatedAt | TIMESTAMP | Thời điểm cập nhật thông tin vào Cơ sở dữ liệu mới nhất |
| userId | INTEGER | Khóa ngoại, tham chiếu từ bảng Users. |

## 19.2 Bài tập

Câu hỏi 19.1 Kiểu dữ liệu VARCHAR trong thiết kế dữ liệu là gì? Phát biểu nào sau đây không đúng?

A. VARCHAR luôn chiếm một lượng bộ nhớ cố định, bằng với độ dài tối đa đã khai báo.

B. VARCHAR là kiểu dữ liệu chuỗi ký tự có độ dài thay đổi.

C. VARCHAR(n) định nghĩa một chuỗi ký tự có độ dài tối đa là 'n' ký tự.

**D. VARCHAR giúp tiết kiệm không gian lưu trữ so với kiểu CHAR khi độ dài chuỗi thực tế nhỏ hơn độ dài tối đa.**

Câu hỏi 19.2 Các mối quan hệ giữa các bảng trong thiết kế dữ liệu thường bao gồm những kiểu nào? Phát biểu nào sau đây không đúng?

A. Mối quan hệ một-một (1-1), trong đó một bản ghi ở bảng này liên kết với tối đa một bản ghi ở bảng kia và ngược lại.

B. Mối quan hệ một-nhiều (1-N), trong đó một bản ghi ở bảng này có thể liên kết với nhiều bản ghi ở bảng kia, nhưng một bản ghi ở bảng kia chỉ có thể liên kết với một bản ghi ở bảng này.

C. Mối quan hệ nhiều-nhiều (N-N), trong đó nhiều bản ghi ở bảng này có thể liên kết với nhiều bản ghi ở bảng kia và ngược lại, thường được giải quyết bằng bảng trung gian.

**D. Mối quan hệ không-một (0-1), trong đó một bản ghi ở bảng này có thể không liên kết hoặc liên kết với tối đa một bản ghi ở bảng kia. Đây là một kiểu quan hệ cơ bản thường được nhắc đến trong mọi mô hình dữ liệu.**