import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '@features/auth/SplashScreen';
import LoginScreen from '@features/auth/LoginScreen';
import { navigationRef } from '@utils/NavigationUtils';
import AnimatedTabs from '@features/tabs/AnimatedTabs';
import RestaurantScreen from '@features/restaurants/RestaurantScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="RestaurantScreen" component={RestaurantScreen} />
                <Stack.Screen name="SplashScreen" component={SplashScreen} />
                <Stack.Screen options={{ animation: 'fade' }} name="LoginScreen" component={LoginScreen} />
                <Stack.Screen options={{ animation: 'fade' }} name="UserBottomTab" component={AnimatedTabs} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
