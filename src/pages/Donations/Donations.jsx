import React, { useState } from 'react'
import './Donations.css'

const Donations = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    amount: '',
    donationType: 'money',
    foodName: '',
    foodQuantity: ''
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (formData.donationType === 'money') {
      if (!formData.amount || Number(formData.amount) <= 0) {
        alert('Please enter a donation amount greater than zero.')
        return
      }
    } else {
      if (!formData.foodName.trim()) {
        alert('Please enter the food name you wish to donate.')
        return
      }
      if (!formData.foodQuantity || Number(formData.foodQuantity) <= 0) {
        alert('Please enter a quantity greater than zero.')
        return
      }
    }
    console.log('Donation submission:', formData)
    setFormData({
      name: '',
      email: '',
      amount: '',
      donationType: 'money',
      foodName: '',
      foodQuantity: ''
    })
  }

  return (
    <div className='donations'>
      <section className='donations-hero'>
        <p className='badge'>Community Impact</p>
        <h1>Donate a Meal</h1>
        <p>
          Your generosity helps us deliver warm meals and essential groceries to
          families in need. Every contribution makes a difference.
        </p>
        <div className='donations-cta'>
          <button onClick={() => window.scrollTo({ top: 500, behavior: 'smooth' })}>
            Support Now
          </button>
        </div>
      </section>

      <section className='donations-options'>
        <div className='donation-option'>
          <h3>Donate Money</h3>
          <p>
            Sponsor groceries or a full meal for someone who needs a helping
            hand. We partner with local kitchens to maximize impact.
          </p>
        </div>
        <div className='donation-option'>
          <h3>Share Extra Food</h3>
          <p>
            Have extra food from your order? Let us know and we’ll coordinate a
            safe pickup to distribute it quickly.
          </p>
        </div>
      </section>

      <section className='donations-form-section'>
        <h2>Make a Donation</h2>
        <p>Complete the form below to pledge a meal, money, or any extra food.</p>
        <form className='donations-form' onSubmit={handleSubmit}>
          <div className='form-row'>
            <input
              type='text'
              name='name'
              placeholder='Full name'
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type='email'
              name='email'
              placeholder='Email address'
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className='form-row'>
            {formData.donationType === 'money' ? (
              <input
                type='number'
                name='amount'
                placeholder='Amount in EGP'
                value={formData.amount}
                min='1'
                onChange={handleChange}
                required
              />
            ) : (
              <>
                <input
                  type='text'
                  name='foodName'
                  placeholder='Food name (e.g. Greek salad)'
                  value={formData.foodName}
                  onChange={handleChange}
                  required
                />
                <input
                  type='number'
                  name='foodQuantity'
                  placeholder='Quantity or servings'
                  value={formData.foodQuantity}
                  min='1'
                  onChange={handleChange}
                  required
                />
              </>
            )}
            <select
              name='donationType'
              value={formData.donationType}
              onChange={handleChange}
            >
              <option value='money'>Money</option>
              <option value='food'>Food</option>
            </select>
          </div>
          <button type='submit'>Submit Donation</button>
        </form>
      </section>
    </div>
  )
}

export default Donations

