import { View, Platform } from 'react-native';
import React, { FC } from 'react';
import { useStyles } from 'react-native-unistyles';
import { homeStyles } from '@unistyles/homeStyles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const DeliveryScreen: FC = () => {

    const { styles } = useStyles(homeStyles);
    const insets = useSafeAreaInsets();

    return (
        <View style={styles.container}>
            <View style={{ height: Platform.OS === 'android' ? insets.top : 0 }} />

        </View>
    );
};

export default DeliveryScreen;
