import { useNavigation } from '@react-navigation/native'
import CurrencyFormat from 'react-currency-format'
import { View, TouchableOpacity, Text } from 'react-native'
import { useSelector } from 'react-redux'
import { selectCartItems, selectCartTotal } from '../features/cartSlice'

export default function CartIcon() {
  const items = useSelector(selectCartItems)
  const cartTotal = useSelector(selectCartTotal)
  const navigation = useNavigation()

  return (
    <View className="absolute bottom-10 w-full z-50">
      <TouchableOpacity className="mx-5 bg-[#00CCBB] p-4 rounded-lg flex-row items-center space-x-1">
        <Text className="text-white font-extrabold text-lg bg-[#01A296] py-1 px-2">
          {items.length}
        </Text>
        <Text className="flex-1 text-white font-extrabold text-lg text-center">
          View Cart
        </Text>
        <CurrencyFormat
          value={cartTotal}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'₹'}
          renderText={value => (
            <Text className="text-lg text-white font-extrabold">{value}</Text>
          )}
        />
      </TouchableOpacity>
    </View>
  )
}
