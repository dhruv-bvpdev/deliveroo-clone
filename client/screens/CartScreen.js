import { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { XCircleIcon } from 'react-native-heroicons/solid'
import { selectRestaurant } from '../features/restaurantSlice'
import {
  removeFromCart,
  selectCartItems,
  selectCartTotal
} from '../features/cartSlice'
import SafeViewAndroid from '../utils/SafeViewAndroid'
import { urlFor } from '../sanity'
import CurrencyFormat from 'react-currency-format'
import { useStripe } from '@stripe/stripe-react-native'
import { API_URL } from '@env'

const CartScreen = () => {
  const navigation = useNavigation()
  const restaurant = useSelector(selectRestaurant)
  const items = useSelector(selectCartItems)
  const cartTotal = useSelector(selectCartTotal)
  const deliveryFee = cartTotal > 500 ? 0 : 70

  const dispatch = useDispatch()
  const [groupedItemsInCart, setGroupedItemsInCart] = useState([])
  const [loading, setLoading] = useState(false)

  if (cartTotal === 0) navigation.goBack()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [])

  const { initPaymentSheet, presentPaymentSheet } = useStripe()

  const fetchPaymentSheetParams = async () => {
    const response = await fetch(`${API_URL}/api/payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        paymentMethodType: 'card',
        total_order_value: cartTotal + deliveryFee
      })
    })
    const { clientSecret } = await response.json()

    return {
      clientSecret
    }
  }

  const initializePaymentSheet = async () => {
    const { clientSecret } = await fetchPaymentSheetParams()

    const { error } = await initPaymentSheet({
      paymentIntentClientSecret: clientSecret,
      merchantDisplayName: 'Deliveroo'
    })
    if (!error) {
      setLoading(true)
    }
  }

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet()

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message)
      setLoading(false)
    } else {
      navigation.navigate('PreparingOrder')
    }
  }

  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      ;(results[item.id] = results[item.id] || []).push(item)
      return results
    }, {})

    setGroupedItemsInCart(groupedItems)
    initializePaymentSheet()
  }, [items])

  const buttonStyle = `rounded-lg p-4 ${
    loading ? 'bg-[#00CCBB]' : 'bg-gray-400'
  }`

  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
      <View className="flex-1 bg-gray-100">
        <View className="p-5 border-b border-[#00CCBB] bg-white shadow-xs">
          <View>
            <Text className="text-lg font-bold text-center">Cart</Text>
            <Text className="text-center text-gray-400">
              {restaurant.title}
            </Text>
          </View>
          <TouchableOpacity
            onPress={navigation.goBack}
            className="rounded-full bg-gray-100 absolute top-3 right-5"
          >
            <XCircleIcon color="#00CCBB" height={50} width={50} />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
          <Image
            source={{ uri: 'https://links.papareact.com/wru' }}
            className="h-7 w-7 bg-gray-300 p-4 rounded-full"
          />
          <Text className="flex-1">Delivery in 30-35 min</Text>
          <TouchableOpacity>
            <Text className="text-[#00CCBB]">Change</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="divide-y divide-gray-200">
          {Object.entries(groupedItemsInCart).map(([key, items]) => (
            <View
              key={key}
              className="flex-row items-center space-x-3 bg-white py-2 px-5"
            >
              <Text className="text-[#00CCBB]">{items.length} x</Text>
              <Image
                source={{ uri: urlFor(items[0]?.image).url() }}
                className="h-12 w-12 rounded-full"
              />
              <Text className="flex-1">{items[0]?.name}</Text>

              <CurrencyFormat
                value={items[0].price}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'₹'}
                renderText={value => (
                  <Text className="text-gray-600">{value}</Text>
                )}
              />

              <TouchableOpacity>
                <Text
                  className="text-[#00CCBB] text-xs"
                  onPress={() => dispatch(removeFromCart({ id: key }))}
                >
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <View className="p-5 bg-white space-y-4">
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Subtotal</Text>
            <CurrencyFormat
              value={cartTotal}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'₹'}
              renderText={value => (
                <Text className="text-gray-400">{value}</Text>
              )}
            />
          </View>

          <View className="flex-row justify-between">
            <Text className="text-gray-400">Delivery Fee</Text>
            <CurrencyFormat
              value={deliveryFee}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'₹'}
              renderText={value => (
                <Text className="text-gray-400">{value}</Text>
              )}
            />
          </View>

          <View className="flex-row justify-between">
            <Text>Order Total</Text>
            <CurrencyFormat
              value={cartTotal + deliveryFee}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'₹'}
              renderText={value => (
                <Text className="font-extrabold">{value}</Text>
              )}
            />
          </View>

          <TouchableOpacity
            onPress={openPaymentSheet}
            disabled={!loading}
            className={buttonStyle}
          >
            <Text className="text-center text-white text-lg font-bold">
              Place Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default CartScreen
