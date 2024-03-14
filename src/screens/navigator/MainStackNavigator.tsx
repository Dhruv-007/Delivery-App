import {createStackNavigator} from '@react-navigation/stack';
import {DashboardRoutes, RootStackParamList} from '../enums';

import WelcomeScreen from '../welcomeScreen';

import LoginScreen from '../loginScreen';
import signupScreen from '../signupScreen';
import RegisterSuccessFully from '../registerSuccessFully';
import DashboardScreen from '../dashboardScreen';

const Stack = createStackNavigator<RootStackParamList>();

const MainNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={DashboardRoutes.WELCOME}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={DashboardRoutes.WELCOME} component={WelcomeScreen} />
      <Stack.Screen name={DashboardRoutes.LOGIN} component={LoginScreen} />
      <Stack.Screen name={DashboardRoutes.SIGNUP} component={signupScreen} />
      <Stack.Screen
        name={DashboardRoutes.DASHBOARD}
        component={DashboardScreen}
      />
      <Stack.Screen
        name={DashboardRoutes.REGISTER}
        component={RegisterSuccessFully}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
