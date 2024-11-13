import { View, ViewStyle, StyleSheet, SafeAreaView } from 'react-native';
import React, { FC, ReactNode } from 'react';
import { Colors } from '@unistyles/Constants';

interface CustomSafeAreaViewProps {
    children: ReactNode;
    style?: ViewStyle;
}

const CustomSafeAreaView: FC<CustomSafeAreaViewProps> = ({ children, style }) => {
    return (
        <View style={[styles.container, style]}>
            <SafeAreaView />
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    }
});

export default CustomSafeAreaView;
