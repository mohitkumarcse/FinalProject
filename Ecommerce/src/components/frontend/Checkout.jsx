import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const [personalInfo, setPersonalInfo] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    full_address: "",
    city: "",
    state: "",
    zipcode: "",
    error_list: [],
  });

  let totalCartPrice = 0;

  useEffect(() => {
    axios.get(`view-cart`).then((res) => {
      if (res.data.statusCode === 200) {
        setCart(res.data.card_items);
      }
      if (res.data.statusCode === 404) {
        Swal.fire("Warning", res.data.message, "warning");
      }
      setLoading(false);
    });
  }, []);

  const handleInput = (e) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
  };

  const hanlePlaceOrder = (e) => {
    e.preventDefault();
    let data = {
      first_name: personalInfo.first_name,
      last_name: personalInfo.last_name,
      phone: personalInfo.phone,
      email: personalInfo.email,
      full_address: personalInfo.full_address,
      city: personalInfo.city,
      state: personalInfo.state,
      zipcode: personalInfo.zipcode,
    };
    console.log(data);
    axios.post(`place-order`, data).then((res) => {
      if (res.data.statusCode === 200) {
        console.log(res);
        Swal.fire("Order Placed Successfully", res.data.message, "success");
      } else if (res.data.statusCode === 422) {
        setPersonalInfo({
          ...personalInfo,
          error_list: res.data.validation_errors,
        });
      }
    });
  };

  if (loading) {
    return <h4>Checkout Loading ...</h4>;
  }

  return (
    <>
      <div className="py-3 bg-warning">
        <div className="container">
          <h6>Checkout</h6>
        </div>
      </div>
      <div className="py-3">
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <div className="card">
                <div className="card-header">
                  <h4>Basic Information</h4>
                </div>
                <form onSubmit={hanlePlaceOrder}>
                  <div className="car-body m-4">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group mb-3">
                          <label>First Name</label>
                          <input
                            type="text"
                            name="first_name"
                            onChange={handleInput}
                            className="form-control"
                          />
                          <span className="text-danger">
                            {personalInfo.error_list.first_name}
                          </span>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group mb-3">
                          <label>Last Name</label>
                          <input
                            type="text"
                            name="last_name"
                            onChange={handleInput}
                            className="form-control"
                          />
                          <span className="text-danger">
                            {personalInfo.error_list.last_name}
                          </span>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group mb-3">
                          <label>Phone</label>
                          <input
                            type="text"
                            name="phone"
                            onChange={handleInput}
                            className="form-control"
                          />
                          <span className="text-danger">
                            {personalInfo.error_list.phone}
                          </span>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group mb-3">
                          <label>Email</label>
                          <input
                            type="text"
                            name="email"
                            onChange={handleInput}
                            className="form-control"
                          />
                          <span className="text-danger">
                            {personalInfo.error_list.email}
                          </span>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group mb-3">
                          <label>Full Address</label>
                          <input
                            type="text"
                            name="full_address"
                            onChange={handleInput}
                            className="form-control"
                          />
                          <span className="text-danger">
                            {personalInfo.error_list.full_address}
                          </span>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group mb-3">
                          <label>City</label>
                          <input
                            type="text"
                            name="city"
                            onChange={handleInput}
                            className="form-control"
                          />
                          <span className="text-danger">
                            {personalInfo.error_list.city}
                          </span>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group mb-3">
                          <label>State</label>
                          <input
                            type="text"
                            name="state"
                            onChange={handleInput}
                            className="form-control"
                          />
                          <span className="text-danger">
                            {personalInfo.error_list.state}
                          </span>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group mb-3">
                          <label>Zip Code</label>
                          <input
                            type="text"
                            name="zipcode"
                            onChange={handleInput}
                            className="form-control"
                          />
                          <span className="text-danger">
                            {personalInfo.error_list.zipcode}
                          </span>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <button
                          type="submit"
                          className="btn btn-primary btn-sm float-end fw-bold"
                        >
                          Place order
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-md-5">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th width="50%">Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((items) => {
                    totalCartPrice =
                      items.product.selling_price * items.product_qty;
                    return (
                      <tr key={items.id}>
                        <td>{items.product.product_name}</td>
                        <td>{items.product.selling_price}</td>
                        <td className="text-center">{items.product_qty}</td>
                        <td>{totalCartPrice}</td>
                      </tr>
                    );
                  })}
                  <tr>
                    <td colSpan="2" className="text-end fw-bold">
                      Grand Total
                    </td>
                    <td colSpan="2" className="text-end fw-bold">
                      {totalCartPrice}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
