import React, { useContext } from 'react'
import './OrderTracking.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext'

const OrderTracking = () => {
  const navigate = useNavigate()
  const { state } = useLocation()
  const { orders, ORDER_STATUS_STEPS } = useContext(StoreContext)
  const deliveryInfo = state?.deliveryData || {}
  const paymentMethod = state?.paymentMethod || 'Cash on Delivery'
  const currentOrder = state?.orderId ? orders.find(order => order.id === state.orderId) : null
  const currentStatusIndex = currentOrder?.statusIndex ?? 0
  const currentTotal = currentOrder?.total

  const addressLine = [deliveryInfo.street, deliveryInfo.city, deliveryInfo.state, deliveryInfo.zipcode, deliveryInfo.country]
    .filter(Boolean)
    .join(', ')

  return (
    <div className='order-tracking'>
      <div className='order-tracking-card'>
        <p className='order-status-badge'>Live Status</p>
        <h1>Order in Progress</h1>
        <p className='order-status-text'>
          Sit tight! Our partner restaurant has received your order and we’re keeping you updated every step of the way.
        </p>
        <div className='order-timeline'>
          {ORDER_STATUS_STEPS.map((stage, index) => (
            <div key={stage} className={`timeline-step ${index <= currentStatusIndex ? 'active' : ''}`}>
              <div className={`timeline-dot ${index <= currentStatusIndex ? 'active' : ''}`}></div>
              <p>{stage}</p>
              {index < ORDER_STATUS_STEPS.length - 1 && <div className='timeline-line'></div>}
            </div>
          ))}
        </div>
        <div className='order-location'>
          <h3>Delivery location</h3>
          <p className='order-address'>{addressLine || 'No address provided'}</p>
          <p className='order-rider-update'>
            Rider is on the way to {deliveryInfo.street && deliveryInfo.city ? `${deliveryInfo.street}, ${deliveryInfo.city}` : 'your location'}.
          </p>
        </div>
        <div className='order-payment'>
          <h3>Payment Method</h3>
          <p>{paymentMethod}</p>
          {currentTotal !== undefined && <p className='order-total'>Total: {currentTotal} EGP</p>}
        </div>
        <div className='order-tracking-actions'>
          <button onClick={() => navigate('/restaurant')}>Back to Home</button>
        </div>
      </div>
    </div>
  )
}

export default OrderTracking



