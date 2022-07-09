import { StatusBar } from 'expo-status-bar'
import { TailwindProvider } from 'tailwindcss-react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <TailwindProvider>
        <Stack.Navigator>{/* Screens */}</Stack.Navigator>
      </TailwindProvider>
    </NavigationContainer>
  )
}
