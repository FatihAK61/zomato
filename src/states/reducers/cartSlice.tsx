import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface CartItem {
    isVeg: boolean;
    id: string;
    name: string;
    price: number;
    quantity: number;
    cartPrice?: number;
    isCustomizable?: boolean;
    customizations?: any[];
}

interface RestaurantDetails {
    id: string;
    name: string;
    discount: string;
    discountAmount: string;
    time: string;
    distance: string;
    rating: number;
    imageUrl: string;
}

interface RestaurantCart { restaurant: RestaurantDetails; items: CartItem[] }
interface CartState { carts: RestaurantCart[] }
const initialState: CartState = { carts: [] };

export const selectRestaurantCartItem = (restaurantId: string, itemId: string) =>
    createSelector(
        (state: RootState) => state.cart.carts.find((cart) => cart.restaurant.id === restaurantId)?.items,
        (items) => items?.find(item => item?.id === itemId) || null
    )

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemToCart: (state, action: PayloadAction<{ restaurant: RestaurantDetails, item: CartItem }>) => {
            const { restaurant, item } = action.payload;
            const existingRestaurantCart = state.carts.find((cart) => cart.restaurant.id === restaurant.id);
            if (existingRestaurantCart) {
                const existingItem = existingRestaurantCart?.items?.find(cardItem => cardItem?.id === item?.id);
                if (existingItem) {
                    existingItem.quantity += 1;
                    existingItem.cartPrice = (existingItem.cartPrice || 0) + existingItem?.price
                } else {
                    existingRestaurantCart?.items?.push({ ...item, quantity: 1, cartPrice: item?.price })
                }
            } else {
                state.carts.push({ restaurant, items: [{ ...item, quantity: 1, cartPrice: item?.price }] })
            }
        },
        removeItemFromCart: (state, action: PayloadAction<{ restaurant_id: string, itemId: string }>) => {
            const { restaurant_id, itemId } = action?.payload;
            const restaurantCart = state?.carts?.find((cart) => cart?.restaurant?.id === restaurant_id);
            if (!restaurantCart) return;

            const itemIndex = restaurantCart.items?.findIndex((item) => item?.id === itemId);
            if (itemIndex !== -1) {
                const item = restaurantCart?.items[itemIndex];
                if (item.quantity > 1) {
                    item.quantity -= 1;
                    item.cartPrice = (item.cartPrice || 0) - item?.price;
                } else {
                    restaurantCart.items.splice(itemIndex, 1);
                }
            }
            if (restaurantCart.items.length === 0) {
                state.carts = state.carts.filter((cart) => cart.restaurant.id !== restaurant_id);
            }
        },
        addCustomizableItem: (
            state,
            action: PayloadAction<{
                restaurant: RestaurantDetails;
                item: CartItem;
                customization: {
                    quantity: number;
                    price: number;
                    customizationOptions: any[];
                }
            }>) => {
            const { restaurant, item, customization } = action.payload;
            const existingRestaurantCart = state.carts.find((cart) => cart.restaurant.id === restaurant.id);
            if (existingRestaurantCart) {
                const existingItem = existingRestaurantCart?.items?.find(cartItem => cartItem?.id === item?.id) as any;
                if (existingItem) {
                    const excistingCustomizationIndex = existingItem?.customizations?.findIndex(
                        (cust: any) => JSON.stringify(cust.customizationOptions) === JSON.stringify(customization.customizationOptions))
                    if (excistingCustomizationIndex !== undefined && excistingCustomizationIndex !== -1) {
                        const existingCustomization = existingItem?.customizations[excistingCustomizationIndex];
                        existingCustomization.quantitiy += customization?.quantity
                        existingCustomization.cartPrice += customization?.price
                    } else {
                        const newCustomizationId = `c${(existingItem?.customizations?.length || 0) + 1}`;
                        existingItem?.customizations?.push({
                            id: newCustomizationId,
                            ...customization,
                            quantity: customization?.quantity,
                            cartPrice: customization?.price,
                            price: customization?.price / customization?.quantity
                        })
                    }
                    existingItem.quantity += customization?.quantity;
                    existingItem.cartPrice = (existingItem?.cartPrice || 0) + existingItem?.price
                } else {
                    const newCustomizationId = `c1`;
                    state.carts.push({
                        restaurant,
                        items: [{
                            ...item, quantity: customization.quantity, cartPrice: customization?.price, customizations: [
                                {
                                    id: newCustomizationId,
                                    ...customization,
                                    quantity: customization?.quantity,
                                    cartPrice: customization.price,
                                    price: customization.price / customization.quantity
                                }
                            ]
                        }]
                    });
                }
            } else {
                const newCustomizationId = `c1`;
                state.carts.push({
                    restaurant,
                    items: [{
                        ...item, quantity: customization.quantity, cartPrice: customization?.price, customizations: [
                            {
                                id: newCustomizationId,
                                ...customization,
                                quantity: customization?.quantity,
                                cartPrice: customization.price,
                                price: customization.price / customization.quantity
                            }
                        ]
                    }]
                });
            }
        }
    }
})
export const { addItemToCart, removeItemFromCart, addCustomizableItem } = cartSlice.actions;
export const selectCart = (state: RootState) => state.cart;


export default cartSlice.reducer;
