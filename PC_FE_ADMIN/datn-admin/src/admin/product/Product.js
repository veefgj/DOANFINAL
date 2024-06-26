import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { getAllProductsByBrandAdmin, updateStatusProduct } from "../../api/ProductApi";
import { NavLink } from "react-router-dom";
import { getBrands } from "../../api/BrandApi";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState({});
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [brand, setBrand] = useState([]);

  useEffect(() => {
    onLoad();
  }, [page]);

  const onLoad = () => {
    getAllProductsByBrandAdmin(0, page, 5).then((response) => {
      setProducts(response.data.content);
      debugger
      setTotal(response.data.totalPages);
    });

    getBrands(1, 10)
      .then((resp) => setBrand(resp.data.content))
      .catch((error) => console.log(error));
  };

  const updateStatusProductById = (id) => {
    console.log(id);
    updateStatusProduct(id).then((res) => {
      onLoad();
    })
  }

  const onChangePage = (page) => {
    setPage(page);
  };

  var rows = new Array(total).fill(0).map((zero, index) => (
    <li className={page === index + 1 ? "page-item active" : "page-item"} key={index}>
      <button className="page-link" style={{ borderRadius: 50 }} onClick={() => onChangePage(index + 1)}>
        {index + 1}
      </button>
    </li>
  ));

  const getProductByBrandHandler = (value) => {
    if (value == 0) {
      onLoad();
    } else {
      getAllProductsByBrandAdmin(value, 1, 5)
        .then((resp) => {
          setProducts(resp.data.content);
          setTotal(resp.data.totalPages);
        })
        .catch((error) => console.log(error));
    }
  };
  return (
    <div className="col-12">
      <div className="card">
        <div className="card__header">
          <NavLink to="/add-product" className="btn btn-primary" style={{ borderRadius: 50 }}>
            Thêm sản phẩm
          </NavLink>
        </div>
        <div className="row mb-3 mt-3">
          <div className="col-sm-4 mt-2">
            <select className="form-control" onChange={(event) => getProductByBrandHandler(event.target.value)}>
              <option value="0">Tất cả</option>
              {brand &&
                brand.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="card__body">
          <div>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Tên sản phẩm</th>
                    <th scope="col">Mã sản phẩm</th>
                    <th scope="col">Thương hiệu</th>
                    <th scope="col">Hình ảnh</th>
                    <th scope="col">Trạng thái</th>
                    <th scope="col">Cập nhật</th>
                  </tr>
                </thead>
                <tbody>
                  {products &&
                    products.map((item, index) => (
                      <tr key={index}>
                        <th scope="row">
                          <NavLink to={`/product-view/${item.id}`} exact>
                            {index + 1}
                          </NavLink>
                        </th>
                        <th>{item.name}</th>
                        <th>{item.code}</th>
                        {/* <th>{item.brand}</th> */}
                        <th>
                          {" "}
                          <img className="img-fluid" style={{ width: "100px", height: "100px" }} src={require(`../../static/images/${item?.image}`)} alt="" />
                          {/* <img className="img-fluid" style={{ width: "100px", height: "100px" }} src={`/static/images/${item?.image}`} alt="" /> */}

                        </th>
                        <th>{item.active ? "Đang bán" : "Dừng bán"}</th>
                        <th>
                        
                          <button className="btn btn-warning" onClick={() => updateStatusProductById(item.id)}>{item.active === true ? "Lock" : "UnLock"}</button>
                        </th>
                        <th>
                          <NavLink to={`/product-detail/${item.id}`} exact>
                            <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                          </NavLink>
                        </th>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <nav aria-label="Page navigation">
          <ul className="pagination offset-5 mt-3">
            <li className={page === 1 ? "page-item disabled" : "page-item"}>
              <button className="page-link" style={{ borderRadius: 50 }} onClick={() => onChangePage(1)}>
                {`<<`}
              </button>
            </li>
            {rows}
            <li className={page === total ? "page-item disabled" : "page-item"}>
              <button className="page-link" style={{ borderRadius: 50 }} onClick={() => onChangePage(total)}>
                {`>>`}
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận cập nhật?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Modal.Footer>
              <Button variant="danger" onClick={handleClose}>
                Xác nhận
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Đóng
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Product;
