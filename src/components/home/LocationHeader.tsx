import { View, SafeAreaView } from 'react-native'
import React, { FC } from 'react'
import { useSharedState } from '@features/tabs/SharedContext'
import { useStyles } from 'react-native-unistyles';
import { homeStyles } from '@unistyles/homeStyles';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import Icon from '@components/global/Icon';

const LocationHeader: FC = () => {
    const { scrollYGlobal } = useSharedState();
    const { styles } = useStyles(homeStyles);
    const textColor = '#000000';
    const opacityFadingStyles = useAnimatedStyle(() => {
        const opacity = interpolate(scrollYGlobal.value, [0, 80], [1, 0]);
        return {
            opacity: opacity
        }
    });

    return (
        <Animated.View style={[opacityFadingStyles]}>
            <SafeAreaView />
            <View style={styles.flexRowBetween}>
                <View style={styles.flexRowGap}>
                    <Icon name='map-marker' color={textColor} iconFamily='MaterialCommunityIcons' size={32} />
                </View>
            </View>
        </Animated.View>
    )
}

export default LocationHeader;
