import React, { useEffect } from "react";
import "./Blog.css";

const Blog = (props) => {
  useEffect(() => {
    props.changeHeaderHandler(4);
  }, [props]);

  return (
    <div className="col-10 offset-1 card">
      <h4 className="text-uppercase text-primary">Cam kết sản phẩm</h4>
      <p>Tất cả sản phẩm bán ra 100% là chính hãng.</p>
      <hr />
      <h4 className="text-uppercase text-primary">HỖ TRỢ MUA HÀNG</h4>
      <p>Bảo hành cho quý khách.</p>
      <h6 className="fw-fw-bolder"> Liên hệ </h6>
      <p>Quý khách liên hệ số điện thoại Hotline: 035.555.8333</p>
    </div>
  );
};

export default Blog;
