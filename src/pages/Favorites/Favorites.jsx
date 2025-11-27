import React, { useContext } from 'react'
import './Favorites.css'
import { StoreContext } from '../../Context/StoreContext'
import FoodItem from '../../components/FoodItem/FoodItem'

const Favorites = () => {
  const { favoriteIds, food_list } = useContext(StoreContext)

  const favoriteItems = food_list.filter(item => favoriteIds.includes(item.food_id))

  const getRatingValue = (item) => {
    if (typeof item.food_rating === 'number') return item.food_rating
    return 4 + ((item.food_id % 5) * 0.2)
  }

  const getReviewCount = (item) => {
    if (typeof item.review_count === 'number') return item.review_count
    return 20 + item.food_id * 2
  }

  return (
    <div className='favorites-page'>
      <h2>Your favourites</h2>
      {favoriteItems.length ? (
        <div className='favorites-grid'>
          {favoriteItems.map(item=>(
            <FoodItem
              key={item.food_id}
              image={item.food_image}
              name={item.food_name}
              desc={item.food_desc}
              price={item.food_price}
              id={item.food_id}
              rating={getRatingValue(item)}
              reviews={getReviewCount(item)}
            />
          ))}
        </div>
      ) : (
        <p className='favorites-empty'>You haven't added any favourites yet.</p>
      )}
    </div>
  )
}

export default Favorites

