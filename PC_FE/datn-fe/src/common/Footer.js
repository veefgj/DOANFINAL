import React from 'react'
import '../static/css/style.css'
const Footer = () => {
  return (
    <div>
        <footer>
          <div className="container-fluid padding bg-light text-dark">
            <div className="row text-center">
              <div className="col-md-4">           
                <hr className="light" />
                <h5>Thông tin liên hệ</h5>
                <p>Địa chỉ: Số 555, Xuân Phương, Phương Canh, Nam Từ Liêm, Hà Nội </p>
                <p>Điện thoại: 0911.975.426</p>
                <p>Hotline: 035.555.8333</p>
                <p>Email: minhhiencomputer@gmail.com</p>
              </div>
              <div className="col-md-4">
                <hr className="light" />
                <h5>Thời gian làm việc</h5>
                <hr className="light" />
                <p>Thứ hai- Chủ nhật: 8:00 - 22:00</p>
              </div>
              <div className="col-md-4">
                <hr className="light" />
                <h5>Hệ thống cửa hàng</h5>
                <hr className="light" />
                <p>Chính sách đổi trả</p>
                <p>Chính sách trả góp</p>
              </div>
              <div className="col-12">
                <hr className="light-100" />
                <h5>© 2024 Máy tính & Phụ kiện </h5>
              </div>
            </div>
          </div>
        </footer>
      </div>
  )
}

export default Footer