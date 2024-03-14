import {StackNavigationProp} from '@react-navigation/stack';
export enum DashboardRoutes {
  WELCOME = 'Welcome',
  LOGIN = 'Login',
  SIGNUP = 'SignUp',
  REGISTER = 'Register',
  DASHBOARD = 'Dashboard',
}

export type RootStackParamList = {
  Login: undefined;
  Welcome: undefined;
  SignUp: undefined;
  Register: undefined;
  Dashboard: {token?: any};
};
export type NavigationType = StackNavigationProp<RootStackParamList>;
