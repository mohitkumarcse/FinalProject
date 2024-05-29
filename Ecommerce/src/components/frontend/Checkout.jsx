import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
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

  const submitPlaceOrder = (e, payment_mode) => {
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
      payment_mode: payment_mode,
      payment_id: "",
    };

    switch (payment_mode) {
      case "code":
        axios.post(`place-order`, data).then((res) => {
          if (res.data.statusCode === 200) {
            console.log(res);
            Swal.fire("Order Placed Successfully", res.data.message, "success");
            navigate("/thankyou");
          } else if (res.data.statusCode === 422) {
            setPersonalInfo({
              ...personalInfo,
              error_list: res.data.validation_errors,
            });
          }
        });
        break;

      case "razorpay":
        axios.post(`verify-order`, data).then((res) => {
          if (res.data.statusCode === 200) {
            var options = {
              key: "rzp_test_RqKF03HsNlyaDs",
              amount: totalCartPrice * 100,

              name: "Acme Corp",
              description: "Test Transaction",
              // image: "https://example.com/your_logo",

              handler: function (response) {
                console.log(response.razorpay_payment_id);
                data.payment_id = response.razorpay_payment_id;
                axios.post(`place-order`, data).then((res) => {
                  if (res.data.statusCode === 200) {
                    Swal.fire(
                      "Order Placed Successfully",
                      res.data.message,
                      "success"
                    );
                    navigate("/thankyou");
                  } else if (res.data.statusCode === 422) {
                    setPersonalInfo({
                      ...personalInfo,
                      error_list: res.data.validation_errors,
                    });
                  }
                });
              },
              prefill: {
                name: data.first_name + data.last_name,
                email: data.email,
                contact: data.phone,
              },
              notes: {
                address: "Razorpay Corporate Office",
              },
              theme: {
                color: "#3399cc",
              },
            };
            var rzp1 = new window.Razorpay(options);
            rzp1.open();
            // Swal.fire("Order Placed Successfully", res.data.message, "success");
          } else if (res.data.statusCode === 422) {
            setPersonalInfo({
              ...personalInfo,
              error_list: res.data.validation_errors,
            });
          }
        });

      default:
        break;
    }
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
                <form>
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
                          className="btn btn-primary btn-sm float-end fw-bold mx-1"
                          onClick={(e) => submitPlaceOrder(e, "code")}
                        >
                          Place order
                        </button>

                        <button
                          type="submit"
                          className="btn btn-primary btn-sm float-end fw-bold mx-1"
                          onClick={(e) => submitPlaceOrder(e, "razorpay")}
                        >
                          Play Online
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
