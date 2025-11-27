import React, { useContext } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../Context/StoreContext'

const MyOrders = () => {
  const { orders, ORDER_STATUS_STEPS, advanceOrderStatus } = useContext(StoreContext)

  const formatDate = (isoDate) => {
    if (!isoDate) return ''
    return new Date(isoDate).toLocaleString('en-EG', {
      dateStyle: 'medium',
      timeStyle: 'short'
    })
  }

  return (
    <div className='my-orders'>
      <h2>My Orders</h2>
      {orders.length ? (
        <div className='orders-list'>
          {orders.map(order => (
            <div key={order.id} className='order-card'>
              <div className='order-card-header'>
                <p className='order-id'>Order #{order.id}</p>
                <p className='order-date'>{formatDate(order.createdAt)}</p>
              </div>
              <div className='order-items'>
                {order.items.map(item => (
                  <div key={item.id} className='order-item'>
                    <p>{item.name}</p>
                    <span>x{item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className='order-summary'>
                <p className='order-total'>Total: {order.total} EGP</p>
                <div className='order-status-steps'>
                  {ORDER_STATUS_STEPS.map((step, index) => (
                    <div key={step} className={`order-status-step ${index <= order.statusIndex ? 'active' : ''}`}>
                      <span className='step-dot'></span>
                      <p>{step}</p>
                    </div>
                  ))}
                </div>
                <button
                  type='button'
                  onClick={()=>advanceOrderStatus(order.id)}
                  disabled={order.statusIndex === ORDER_STATUS_STEPS.length - 1}
                >
                  {order.statusIndex === ORDER_STATUS_STEPS.length - 1 ? 'Delivered' : 'Next status'}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className='orders-empty'>You haven't placed any orders yet.</p>
      )}
    </div>
  )
}

export default MyOrders
