import { TailwindProvider } from 'tailwindcss-react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Provider } from 'react-redux'
import { StripeProvider } from '@stripe/stripe-react-native'
import { store } from './store'
import { API_URL } from '@env'
import HomeScreen from './screens/HomeScreen'
import RestaurantScreen from './screens/RestaurantScreen'
import CartScreen from './screens/CartScreen'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <StripeProvider publishableKey="pk_test_51LMBK0SE2PVbp6EqVeWzXYs52asIETOO48gTnJKDZ1aoMjJULZL7om6o7x3iCSOKltHQehucZoQIIajjwXFgvsc6001NDvSnuS">
          <TailwindProvider>
            <Stack.Navigator>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Restaurant" component={RestaurantScreen} />
              <Stack.Screen
                name="Cart"
                component={CartScreen}
                options={{
                  presentation: 'modal',
                  animation: 'slide_from_bottom'
                }}
              />
            </Stack.Navigator>
          </TailwindProvider>
        </StripeProvider>
      </Provider>
    </NavigationContainer>
  )
}
