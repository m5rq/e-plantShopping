import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let total = 0;

    cart.forEach(item => {
      // cost might be "$15" or 15, so normalize it to a number
      const numericCost = parseFloat(
        String(item.cost).startsWith('$')
          ? item.cost.substring(1)
          : item.cost
      );

      total += numericCost * item.quantity;
    });

    // you can return fixed 2 decimal places if you like
    return total.toFixed(2);
  };

  // Go back to product list ("Continue Shopping")
  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping(e); // this calls the parent to hide the cart
  };

  // Increase quantity of an item
  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({
        name: item.name,
        quantity: item.quantity + 1,
      })
    );
  };

  // Decrease quantity of an item
  // If it would go to 0, remove it
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({
          name: item.name,
          quantity: item.quantity - 1,
        })
      );
    } else {
      // quantity would drop to 0 → remove item entirely
      dispatch(removeItem(item.name));
    }
  };

  // Completely remove an item from the cart
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Calculate total cost for a single cart item (quantity * unit price)
  const calculateTotalCost = (item) => {
    const numericCost = parseFloat(
      String(item.cost).startsWith('$')
        ? item.cost.substring(1)
        : item.cost
    );

    const subtotal = numericCost * item.quantity;
    return subtotal.toFixed(2);
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>
        Total Cart Amount: ${calculateTotalAmount()}
      </h2>

      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img
              className="cart-item-image"
              src={item.image}
              alt={item.name}
            />

            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>

              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>

                <span className="cart-item-quantity-value">
                  {item.quantity}
                </span>

                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>

              <div className="cart-item-total">
                Total: ${calculateTotalCost(item)}
              </div>

              <button
                className="cart-item-delete"
                onClick={() => handleRemove(item)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{ marginTop: '20px', color: 'black' }}
        className="total_cart_amount"
      >
        {/* You could optionally show total again here if you want */}
        {/* Total: ${calculateTotalAmount()} */}
      </div>

      <div className="continue_shopping_btn">
        <button
          className="get-started-button"
          onClick={(e) => handleContinueShopping(e)}
        >
          Continue Shopping
        </button>
        <br />

        <button
          className="get-started-button1"
          onClick={() =>
            alert('Functionality to be added for future reference')
          }
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
