import { createContext, useState } from "react";
import { food_list,menu_list } from "../assets/assets";
export const StoreContext = createContext(null);

const ORDER_STATUS_STEPS = ['Received','Preparing','Out for delivery','Delivered'];

const StoreContextProvider = (props) => {

    const [cartItems,setCartItems] = useState({});
    const [orders,setOrders] = useState([]);
    const [favoriteIds, setFavoriteIds] = useState([]);
    
    const addToCart = (itemId) =>{
        if(!cartItems[itemId])
        {
            setCartItems((prev)=>({...prev,[itemId]:1}));
        }
        else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}));
        }
    }

    const removeFromCart = (itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }
    
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
          if (cartItems[item] > 0) {
            let itemInfo = food_list.find((product) => product.food_id === Number(item));
            totalAmount += itemInfo.food_price * cartItems[item];
          }
        }
        return totalAmount;
      }

    const toggleFavorite = (itemId) => {
        setFavoriteIds(prev => (
            prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
        ));
    }
    
    const placeOrder = ({ deliveryInfo, items, total, paymentMethod }) =>{
        if (!items || !items.length) return null;
        const newOrder = {
            id: Date.now(),
            deliveryInfo,
            items,
            total,
            paymentMethod,
            createdAt: new Date().toISOString(),
            statusIndex: 0
        };
        setOrders(prev => [newOrder, ...prev]);
        setCartItems({});
        return newOrder;
    }

    const advanceOrderStatus = (orderId) => {
        setOrders(prev => prev.map(order => {
            if (order.id !== orderId) return order;
            const nextIndex = Math.min(order.statusIndex + 1, ORDER_STATUS_STEPS.length - 1);
            return {...order, statusIndex: nextIndex};
        }));
    }

    const contextValue = {
        food_list,
        menu_list,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        placeOrder,
        orders,
        advanceOrderStatus,
        ORDER_STATUS_STEPS,
        favoriteIds,
        toggleFavorite
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
        )

}

export default StoreContextProvider;