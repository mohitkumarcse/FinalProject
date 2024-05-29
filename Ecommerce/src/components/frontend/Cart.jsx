import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  var totalCartPrice = 0;
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

  const handleDecrement = (card_id) => {
    setCart((cart) =>
      cart.map((item) =>
        card_id === item.id
          ? {
              ...item,
              product_qty: item.product_qty - (item.product_qty > 1 ? 1 : 0),
            }
          : item
      )
    );
    updateCartQuantity(card_id, "dec");
  };

  const handleIncrement = (card_id) => {
    setCart((cart) =>
      cart.map((item) =>
        card_id === item.id
          ? {
              ...item,
              product_qty: item.product_qty + (item.product_qty < 10 ? 1 : 0),
            }
          : item
      )
    );
    updateCartQuantity(card_id, "inc");
  };

  function updateCartQuantity(cart_id, scope) {
    axios.put(`cart-update-quantity/${cart_id}/${scope}`).then((res) => {
      console.log(res);
    });
  }

  const removeCard = (e, card_id_remove) => {
    let thisCicked = e.currentTarget;
    thisCicked.innerText = "removing ..";
    console.log(thisCicked, card_id_remove);
    axios.post(`cart-remove/${card_id_remove}`).then((res) => {
      console.log(res);
      if (res.data.statusCode === 200) {
        Swal.fire("Success", res.data.message, "success");
        thisCicked.closest("tr").remove();
      } else if (res.data.statusCode === 404) {
        Swal.fire("Warning", res.data.message, "warning");
        thisCicked.innerText = "remove";
      } else if (res.data.statusCode === 401) {
        Swal.fire("Error", res.data.message, "error");
      }
    });
  };

  if (loading) {
    return <h4>Cart Loading ...</h4>;
  } else {
    var CART_HTML = "";
    if (cart.length > 0) {
      CART_HTML = (
        <div className="row">
          <div className="col-md-12">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((carts, index) => {
                  totalCartPrice =
                    carts.product.selling_price * carts.product_qty;
                  // console.log(carts.product.image);
                  return (
                    <tr key={index}>
                      <td width="10%">
                        <img
                          src={`http://127.0.0.1:8000/uploads/product/${carts.product.image}`}
                          alt="Product Image"
                          width="50px"
                          height="50px"
                        />
                      </td>
                      <td>{carts.product.product_name}</td>
                      <td width="15%" className="text-center">
                        {carts.product.selling_price}
                      </td>
                      <td width="15%">
                        <div className="input-group">
                          <button
                            type="button"
                            onClick={() => handleDecrement(carts.id)}
                            className="input-group-text"
                          >
                            -
                          </button>
                          <div className="form-control text-center">
                            {carts.product_qty}
                          </div>
                          <button
                            type="button"
                            onClick={() => handleIncrement(carts.id)}
                            className="input-group-text"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td width="15%" className="text-center">
                        {carts.product.selling_price * carts.product_qty}
                      </td>
                      <td>
                        <button
                          type="button"
                          className="text-center btn btn-danger btn-sm"
                          onClick={(e) => removeCard(e, carts.id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="col-md-8"></div>
          <div className="col-md-4">
            <div className="card car_body mt-3">
              <h4>
                Sub Total <span className="float-end">{totalCartPrice}</span>
              </h4>
              <h4>
                Grand Total <span className="float-end">{totalCartPrice}</span>
              </h4>
              <Link to="/checkout" className="btn btn-primary btn-sm">
                Checkout
              </Link>
            </div>
          </div>
        </div>
      );
    } else {
      CART_HTML = (
        <div className="row">
          <div className="col-md-12">
            <h4 className="text-center">Your Shoping Cart is Empty</h4>
          </div>
        </div>
      );
    }
  }

  return (
    <>
      <div className="py-3 bg-warning">
        <div className="container">
          <h6>Home /Cart</h6>
        </div>
      </div>
      <div className="py-3">
        <div className="container">{CART_HTML}</div>
      </div>
    </>
  );
};

export default Cart;
