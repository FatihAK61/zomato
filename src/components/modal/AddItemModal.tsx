import { View, Image, TouchableOpacity, ScrollView } from 'react-native';
import React, { FC } from 'react';
import { useStyles } from 'react-native-unistyles';
import { modelStyles } from '@unistyles/modelStyles';
import CustomText from '@components/global/CustomText';
import Icon from '@components/global/Icon';
import { Colors } from '@unistyles/Constants';
import DottedLine from '@components/ui/DottedLine';

const AddItemModal: FC<{ item: any, restaurant: any, onClose: () => void }> = ({ item, restaurant, onClose }) => {
    const { styles } = useStyles(modelStyles);

    return (
        <View>
            <View style={styles.headerContainer}>
                <View style={styles.flexRowGap}>
                    <Image source={{ uri: item?.image }} style={styles.headerImage} />
                    <CustomText fontFamily='Okra-Bold' fontSize={12}>{item?.name}</CustomText>
                </View>
                <View style={styles.flexRowGap}>
                    <TouchableOpacity>
                        <Icon name='bookmark-outline' iconFamily='Ionicons' color={Colors.primary} size={16} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon name='share-outline' iconFamily='Ionicons' color={Colors.primary} size={16} />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {item?.customizationOptions?.map((customization: any, index: number) => {
                    return (
                        <View style={styles.subContainer} key={index}>
                            <CustomText fontFamily='Okra-Medium'>{customization?.type}</CustomText>
                            <CustomText
                                fontFamily='Okra-Medium'
                                variant='h7' color='#888'>
                                {customization?.required ? "Required • Select any 1 option" : `Add on your ${customization?.type}`}
                            </CustomText>
                            <DottedLine />
                            {
                                customization?.options?.map((option: any, optionIndex: number) => {
                                    return (
                                        <TouchableOpacity
                                            key={optionIndex}
                                            style={styles.optionContainer}
                                            onPress={() => { }}>
                                            <CustomText fontFamily='Okra-Medium' fontSize={11}>
                                                {option?.name}
                                            </CustomText>
                                            <View style={styles.flexRowGap}>
                                                <CustomText fontSize={11} fontFamily='Okra-Medium'>
                                                    ₺ {option?.price}
                                                </CustomText>
                                                <Icon name={'radiobox-blank'} iconFamily='MaterialCommunityIcons' color='#888' size={16} />
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                    )
                })}
            </ScrollView>
        </View>
    );
};

export default AddItemModal;
