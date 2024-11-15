import { View, Text } from 'react-native';
import React, { FC } from 'react';
import { useAppDispatch, useAppSelector } from '@states/reduxHook';
import { useStyles } from 'react-native-unistyles';
import { foodStyles } from '@unistyles/foodStyles';
import ScalePress from '@components/ui/ScalePress';
import Icon from '@components/global/Icon';
import { selectRestaurantCartItem } from '@states/reducers/cartSlice';
import CustomText from '@components/global/CustomText';

const AddButton: FC<{ item: any, restaurant: any }> = ({ item, restaurant }) => {
    const dispatch = useAppDispatch();
    const { styles } = useStyles(foodStyles);
    const cart = useAppSelector(selectRestaurantCartItem(restaurant?.id, item?.id));
    return (
        <>
            <View style={styles.addButtonContainer(cart != null)}>
                <ScalePress>
                    <Icon name='minus' />
                </ScalePress>
                {
                    item?.isCustomizable && (
                        <CustomText fontFamily='Okra-Medium'>
                            Customisable
                        </CustomText>
                    )
                }
            </View>
        </>
    );
};

export default AddButton;
