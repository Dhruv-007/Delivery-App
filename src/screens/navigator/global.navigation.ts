import {
  createNavigationContainerRef,
  ParamListBase,
} from '@react-navigation/native';

// Define the type for the navigation reference
type NavigationRefType = ReturnType<typeof createNavigationContainerRef>;

// Create the navigation reference
export const navigationRef: NavigationRefType = createNavigationContainerRef();

// Implement the navigate function
export function navigate<RouteName extends keyof ParamListBase>(
  name: RouteName,
  params?: ParamListBase[RouteName],
) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}
