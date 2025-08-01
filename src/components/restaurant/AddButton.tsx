import { View, TouchableOpacity, Text } from 'react-native';
import React, { FC, useCallback, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@states/reduxHook';
import { useStyles } from 'react-native-unistyles';
import { foodStyles } from '@unistyles/foodStyles';
import { addItemToCart, removeItemFromCart, selectRestaurantCartItem } from '@states/reducers/cartSlice';
import CustomText from '@components/global/CustomText';
import { Colors } from '@unistyles/Constants';
import ScalePress from '@components/ui/ScalePress';
import Icon from '@components/global/Icon';
import { RFValue } from 'react-native-responsive-fontsize';
import AnimatedNumbers from 'react-native-animated-numbers';
import CustomModal from '@components/modal/CustomModal';
import AddItemModal from '@components/modal/AddItemModal';

const AddButton: FC<{ item: any, restaurant: any }> = ({ item, restaurant }) => {
    const dispatch = useAppDispatch();
    const { styles } = useStyles(foodStyles);
    const cart = useAppSelector(selectRestaurantCartItem(restaurant?.id, item?.id));
    const modalRef = useRef<any>(null);

    const openAddModal = () => {
        modalRef?.current?.openModal(
            <AddItemModal item={item} onClose={() => modalRef.current?.closeModal()} restaurant={restaurant} />
        )
    }

    const addCartHandler = useCallback(() => {
        if (item?.isCustomizable) {
            if (cart !== null) {
                console.log('Repeat modal')
                return
            }
            openAddModal()
        } else {
            dispatch(addItemToCart({ restaurant: restaurant, item: { ...item, customisation: [] } }))
        }
    }, [dispatch, item, restaurant, cart])

    const removeCartHandler = useCallback(() => {
        if (item?.isCustomizable) {
            if (cart !== null) {
                console.log('open modal')
                return
            }
        } else {
            dispatch(removeItemFromCart({ restaurant_id: restaurant?.id, itemId: item?.id }))
        }
    }, [dispatch, item, restaurant, cart])

    return (
        <>
            <CustomModal ref={modalRef} />
            <View style={styles.addButtonContainer(cart !== null)}>
                {cart ? (
                    <View style={styles.selectedContainer}>
                        <ScalePress onPress={removeCartHandler}>
                            <Icon iconFamily='MaterialCommunityIcons' color='#fff' name='minus-thick' size={RFValue(13)} />
                        </ScalePress>
                        <AnimatedNumbers
                            includeComma={false}
                            animationDuration={300}
                            animateToNumber={cart?.quantity}
                            fontStyle={styles.animatedCount}
                        />
                        <ScalePress onPress={addCartHandler}>
                            <Icon iconFamily='MaterialCommunityIcons' color='#fff' name='plus-thick' size={RFValue(13)} />
                        </ScalePress>
                    </View>
                ) : (
                    <TouchableOpacity onPress={addCartHandler} style={styles.noSelectionContainer} activeOpacity={0.6} accessibilityLabel='Add item to cart'>
                        <CustomText fontFamily='Okra-Bold' variant='h5' color={Colors.primary}>ADD</CustomText>
                        <CustomText variant='h5' color={Colors.primary} style={styles.plusSmallIcon}>+</CustomText>
                    </TouchableOpacity>
                )}
            </View>
            {item?.isCustomizable && (
                <CustomText fontFamily='Okra-Medium' style={styles.customizeText}>
                    Hello Sexy !
                </CustomText>
            )}
        </>
    );
};

export default AddButton;
