import { View, Text, Pressable } from 'react-native';
import React, { useState } from 'react';
import { useStyles } from 'react-native-unistyles';
import { homeStyles } from '@unistyles/homeStyles';
import CustomText from '@components/global/CustomText';
import { Colors } from '@unistyles/Constants';
import Icon from '@components/global/Icon';
import RecomendedList from '@components/list/RecomendedList';
import BreakerText from '@components/ui/BreakerText';
import RegularFoodList from '@components/list/RegularFoodList';

const ExploreSection = () => {
    const [tabSelected, setSelectedTab] = useState(1);
    const { styles } = useStyles(homeStyles);
    return (
        <View style={styles.topHidingContainer}>
            <View style={styles.flexRowCenter}>
                <Pressable style={styles.leftTab(tabSelected === 1)} onPress={() => setSelectedTab(1)}>
                    <CustomText color={tabSelected === 1 ? Colors.text : Colors.lightText} fontFamily='Okra-Medium'>
                        Recommended
                    </CustomText>
                </Pressable>
                <Pressable style={styles.rightTab(tabSelected === 2)} onPress={() => setSelectedTab(2)}>
                    <Icon name='bookmark-outline' iconFamily='Ionicons' color={tabSelected === 2 ? Colors.text : Colors.lightText} size={14} />
                    <CustomText color={tabSelected === 2 ? Colors.text : Colors.lightText} fontFamily='Okra-Medium'>
                        Collection
                    </CustomText>
                </Pressable>
            </View>
            <RecomendedList />
            <BreakerText text="What's on your mind?" />
            <RegularFoodList />
            <BreakerText text="All Restaurants" />
        </View>
    );
};

export default ExploreSection;
