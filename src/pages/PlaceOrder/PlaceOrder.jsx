import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../Context/StoreContext'
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: ""
    })
    const [paymentMethod, setPaymentMethod] = useState('cash');
    const [cardDetails, setCardDetails] = useState({
        cardNumber: '',
        cardName: '',
        expiry: '',
        cvv: ''
    });
    const [paymentError, setPaymentError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const { getTotalCartAmount, placeOrder, cartItems, food_list } = useContext(StoreContext);

    const navigate = useNavigate();

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setData(data => ({ ...data, [name]: value }))
    }

    const handlePaymentChange = (event) => {
        setPaymentMethod(event.target.value);
        setPaymentError('');
    }

    const handleCardDetailsChange = (event) => {
        const { name, value } = event.target;
        setCardDetails(prev => ({ ...prev, [name]: value }));
    }

    const handlePlaceOrder = () => {
        setPaymentError('');
        setSuccessMessage('');
        if (paymentMethod === 'credit') {
            if (!cardDetails.cardNumber || !cardDetails.cardName || !cardDetails.expiry || !cardDetails.cvv) {
                setPaymentError('Please complete all credit card fields.');
                return;
            }
        }
        const methodLabel = paymentMethod === 'credit' ? 'Credit Card' : 'Cash';
        const orderItems = food_list
            .filter(item => cartItems[item.food_id] > 0)
            .map(item => ({
                id: item.food_id,
                name: item.food_name,
                quantity: cartItems[item.food_id],
                price: item.food_price
            }));
        if (!orderItems.length) {
            setPaymentError('Your cart is empty.');
            return;
        }
        const deliveryInfo = { ...data };
        const total = getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 5;
        const createdOrder = placeOrder({
            deliveryInfo,
            items: orderItems,
            total,
            paymentMethod: methodLabel
        });
        setSuccessMessage(`Order placed successfully using ${methodLabel}.`);
        setTimeout(() => {
            navigate('/order-tracking', { state: { deliveryData: deliveryInfo, paymentMethod: methodLabel, orderId: createdOrder?.id } })
        }, 1200);
    }

    useEffect(() => {
        if (getTotalCartAmount() === 0) {
            navigate('/')
        }
    }, [])

    return (
        <div className='place-order'>
            <div className="place-order-left">
                <p className='title'>Delivery Information</p>
                <div className="multi-field">
                    <input type="text" name='firstName' onChange={onChangeHandler} value={data.firstName} placeholder='First name' />
                    <input type="text" name='lastName' onChange={onChangeHandler} value={data.lastName} placeholder='Last name' />
                </div>
                <input type="email" name='email' onChange={onChangeHandler} value={data.email} placeholder='Email address' />
                <input type="text" name='street' onChange={onChangeHandler} value={data.street} placeholder='Street' />
                <div className="multi-field">
                    <input type="text" name='city' onChange={onChangeHandler} value={data.city} placeholder='City' />
                    <input type="text" name='state' onChange={onChangeHandler} value={data.state} placeholder='State' />
                </div>
                <div className="multi-field">
                    <input type="text" name='zipcode' onChange={onChangeHandler} value={data.zipcode} placeholder='Zip code' />
                    <input type="text" name='country' onChange={onChangeHandler} value={data.country} placeholder='Country' />
                </div>
                <input type="text" name='phone' onChange={onChangeHandler} value={data.phone} placeholder='Phone' />
            </div>
            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Cart Totals</h2>
                    <div>
                        <div className="cart-total-details"><p>Subtotal</p><p>{getTotalCartAmount()} EGP</p></div>
                        <hr />
                        <div className="cart-total-details"><p>Delivery Fee</p><p>{getTotalCartAmount() === 0 ? 0 : 5} EGP</p></div>
                        <hr />
                        <div className="cart-total-details"><b>Total</b><b>{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 5} EGP</b></div>
                    </div>
                </div>
                <div className="payment-options">
                    <h2>Select Payment Method</h2>
                    <div className="payment-methods">
                        <label>
                            <input type="radio" name="paymentMethod" value="credit" checked={paymentMethod === 'credit'} onChange={handlePaymentChange} />
                            Credit Card
                        </label>
                        <label>
                            <input type="radio" name="paymentMethod" value="cash" checked={paymentMethod === 'cash'} onChange={handlePaymentChange} />
                            Cash
                        </label>
                    </div>
                    {paymentMethod === 'credit' ? (
                        <div className="payment-card-form">
                            <input type="text" name="cardNumber" placeholder='Card number' value={cardDetails.cardNumber} onChange={handleCardDetailsChange} />
                            <div className="multi-field">
                                <input type="text" name="expiry" placeholder='MM/YY' value={cardDetails.expiry} onChange={handleCardDetailsChange} />
                                <input type="text" name="cvv" placeholder='CVV' value={cardDetails.cvv} onChange={handleCardDetailsChange} />
                            </div>
                            <input type="text" name="cardName" placeholder='Cardholder name' value={cardDetails.cardName} onChange={handleCardDetailsChange} />
                        </div>
                    ) : (
                        <p className='cash-note'>You will pay in cash on delivery.</p>
                    )}
                    {paymentError && <p className='payment-error'>{paymentError}</p>}
                    {successMessage && <p className='payment-success'>{successMessage}</p>}
                    <button onClick={handlePlaceOrder}>PLACE ORDER</button>
                </div>

            </div>
        </div>
    )
}

export default PlaceOrder
