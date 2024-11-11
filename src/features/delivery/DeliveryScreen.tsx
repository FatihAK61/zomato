import { View, Platform } from 'react-native';
import React, { FC } from 'react';
import { useStyles } from 'react-native-unistyles';
import { homeStyles } from '@unistyles/homeStyles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { Extrapolation, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { useSharedState } from '@features/tabs/SharedContext';
import Graphics from '@components/home/Graphics';
import HeaderSection from '@components/home/HeaderSection';

const DeliveryScreen: FC = () => {

    const { styles } = useStyles(homeStyles);
    const insets = useSafeAreaInsets();
    const { scrollYGlobal } = useSharedState();

    const moveUpStyle = useAnimatedStyle(() => {
        const translateY = interpolate(
            scrollYGlobal.value,
            [0, 50],
            [0, -50],
            Extrapolation.CLAMP
        )
        return {
            transform: [{ translateY: translateY }]
        }
    });

    const moveUpStyleNotExtrapolate = useAnimatedStyle(() => {
        const translateY = interpolate(
            scrollYGlobal.value,
            [0, 50],
            [0, -50]
        )
        return {
            transform: [{ translateY: translateY }]
        }
    });

    const backgroundColorChanges = useAnimatedStyle(() => {
        const opacity = interpolate(scrollYGlobal.value, [1, 50], [0, 1]);
        return {
            backgroundColor: `rgba(255,255,255,${opacity})`
        }
    })

    return (
        <View style={styles.container}>
            <View style={{ height: Platform.OS === 'android' ? insets.top : 0 }} />
            <Animated.View style={[moveUpStyle]}>

                <Animated.View style={[moveUpStyleNotExtrapolate]}>
                    <Graphics />
                </Animated.View>

                <Animated.View style={[backgroundColorChanges, styles.topHeader]}>
                    <HeaderSection />
                </Animated.View>

            </Animated.View>
        </View>
    );
};

export default DeliveryScreen;
