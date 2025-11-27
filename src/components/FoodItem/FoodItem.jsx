import React, { useContext, useState } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext';

const FoodItem = ({ image, name, price, desc , id, rating = 4.2, reviews = 24 }) => {

    const [itemCount, setItemCount] = useState(0);
    const {cartItems,addToCart,removeFromCart,favoriteIds,toggleFavorite} = useContext(StoreContext);
    const isFavorite = favoriteIds.includes(id);

    return (
        <div className='food-item'>
            <div className='food-item-img-container'>
                <img className='food-item-image' src={image} alt="" />
                <button
                    type='button'
                    className={`food-item-favorite ${isFavorite ? 'active' : ''}`}
                    onClick={()=>toggleFavorite(id)}
                    aria-label={isFavorite ? 'Remove from favourites' : 'Add to favourites'}
                >
                    {isFavorite ? '♥' : '♡'}
                </button>
                {!cartItems[id]
                ?<img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt="" />
                :<div className="food-item-counter">
                        <img src={assets.remove_icon_red} onClick={()=>removeFromCart(id)} alt="" />
                        <p>{cartItems[id]}</p>
                        <img src={assets.add_icon_green} onClick={()=>addToCart(id)} alt="" />
                    </div>
                }
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{name}</p> 
                    <div className="food-item-rating">
                        <span>{rating.toFixed(1)} ★</span>
                        {reviews ? <span className='food-item-reviews'>{reviews} reviews</span> : null}
                    </div>
                </div>
                <p className="food-item-desc">{desc}</p>
                <p className="food-item-price">{price} EGP</p>
            </div>
        </div>
    )
}

export default FoodItem
