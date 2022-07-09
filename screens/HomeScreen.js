import { useLayoutEffect } from 'react'
import {
  Text,
  SafeAreaView,
  View,
  Image,
  TextInput,
  ScrollView
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import SafeViewAndroid from '../utils/SafeViewAndroid'
import {
  UserIcon,
  ChevronDownIcon,
  SearchIcon,
  AdjustmentsIcon
} from 'react-native-heroicons/outline'
import Categories from '../components/Categories'
import FeaturedRow from '../components/FeaturedRow'

const HomeScreen = () => {
  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [])

  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
      {/* Header */}
      <View className="flex-row p-3 items-center mx-4 space-x-2">
        <Image
          source={{ uri: 'https://links.papareact.com/wru' }}
          className="h-7 w-7 bg-gray-300 rounded-full"
        />
        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">Deliver Now</Text>
          <Text className="font-bold text-xl">
            Current Location
            <ChevronDownIcon size={20} color="#00CCBB" />
          </Text>
        </View>
        <UserIcon size={25} color="#00CCBB" />
      </View>

      {/* Search */}
      <View className="flex-row items-center space-x-2 mx-4 pb-2">
        <View className="flex-row spzce-x-2 flex-1 bg-gray-200 p-3 items-center">
          <SearchIcon color="gray" size={20} />
          <TextInput
            placeholder="Restaurants and Cuisines"
            keyboardType="default"
            className="ml-1"
          />
        </View>
        <AdjustmentsIcon color="#00CCBB" />
      </View>

      {/* Body */}
      <ScrollView>
        {/* Categories */}
        <Categories />

        {/* Featured rows */}
        <FeaturedRow
          id="123"
          title="Featured"
          description="Paid placements for our partners"
        />

        <FeaturedRow
          id="234"
          title="Tasty Discounts"
          description="Everyone is enjoying these juicy discounts"
        />

        <FeaturedRow
          id="345"
          title="Offers near you"
          description="Why not support your local restaurant tonight"
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen
