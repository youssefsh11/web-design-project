import React, { useContext, useEffect, useMemo, useState } from 'react'
import './FoodDisplay.css'
import FoodItem from '../FoodItem/FoodItem'
import { StoreContext } from '../../Context/StoreContext'

const FoodDisplay = ({category, searchTerm = ""}) => {

  const {food_list} = useContext(StoreContext);
  const [allDishes,setAllDishes] = useState([]);
  const [menuSearch,setMenuSearch] = useState('');
  const [filters,setFilters] = useState({
    vegetarian:false,
    spicy:false,
    price:'all'
  });

  useEffect(()=>{
    const categoryFiltered = food_list.filter((item)=> category==="All" || category===item.food_category);
    setAllDishes(categoryFiltered);
  },[food_list, category]);

  const isVegetarianItem = (item) => {
    const name = item.food_name.toLowerCase();
    const vegKeywords = ['veg','salad','pure','pasta','noodles','cake','ice','mushroom','paneer','cheese','lasagna','rolls','rice'];
    const nonVegKeywords = ['chicken','meat','fish','beef'];
    if (nonVegKeywords.some(word => name.includes(word))) return false;
    if (vegKeywords.some(word => name.includes(word))) return true;
    return item.food_category === 'Pure Veg' || item.food_category === 'Salad';
  }

  const isSpicyItem = (item) => {
    const name = item.food_name.toLowerCase();
    const desc = item.food_desc?.toLowerCase() || '';
    return ['peri','spicy','chili','pepper'].some(word => name.includes(word) || desc.includes(word));
  }

  const getRatingValue = (item) => {
    if (typeof item.food_rating === 'number') return item.food_rating;
    return 4 + ((item.food_id % 5) * 0.2);
  }

  const getReviewCount = (item) => {
    if (typeof item.review_count === 'number') return item.review_count;
    return 20 + item.food_id * 2;
  }

  const matchesPriceRange = (price) => {
    if (filters.price === 'all') return true;
    if (filters.price === 'low') return price <= 150;
    if (filters.price === 'medium') return price > 150 && price <= 250;
    if (filters.price === 'high') return price > 250;
    return true;
  }

  const filteredDishes = useMemo(()=>{
    const globalQuery = searchTerm.trim().toLowerCase();
    const localQuery = menuSearch.trim().toLowerCase();
    return allDishes.filter((item)=>{
      const description = item.food_desc?.toLowerCase() || '';
      const name = item.food_name.toLowerCase();
      const matchesLocalSearch = !localQuery || name.includes(localQuery) || description.includes(localQuery);
      const matchesGlobalSearch = !globalQuery || name.includes(globalQuery) || description.includes(globalQuery);
      const matchesVegetarian = !filters.vegetarian || isVegetarianItem(item);
      const matchesSpicy = !filters.spicy || isSpicyItem(item);
      const matchesPrice = matchesPriceRange(item.food_price);
      return matchesVegetarian && matchesSpicy && matchesPrice && matchesLocalSearch && matchesGlobalSearch;
    });
  },[allDishes, filters, menuSearch, searchTerm]);

  const toggleFilter = (key) => {
    setFilters(prev=>({...prev,[key]:!prev[key]}));
  }

  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>
      <div className='food-display-controls'>
        <input
          type="text"
          placeholder='Search dishes...'
          value={menuSearch}
          onChange={(e)=>setMenuSearch(e.target.value)}
        />
        <div className="food-display-filters">
          <button
            type='button'
            className={filters.vegetarian?'active':''}
            onClick={()=>toggleFilter('vegetarian')}
          >Vegetarian</button>
          <button
            type='button'
            className={filters.spicy?'active':''}
            onClick={()=>toggleFilter('spicy')}
          >Spicy</button>
          <select value={filters.price} onChange={(e)=>setFilters(prev=>({...prev,price:e.target.value}))}>
            <option value="all">All prices</option>
            <option value="low">Low (&le; 150 EGP)</option>
            <option value="medium">Medium (151-250 EGP)</option>
            <option value="high">High (&gt; 250 EGP)</option>
          </select>
        </div>
      </div>
      <div className='food-display-list'>
        {filteredDishes.length ? filteredDishes.map((item)=>(
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
        )) : <p className='food-display-empty'>No dishes match your search.</p>}
      </div>
    </div>
  )
}

export default FoodDisplay
