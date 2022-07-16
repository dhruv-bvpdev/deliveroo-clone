import { useEffect, useLayoutEffect, useState } from 'react'
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
import sanityClient from '../sanity'

const HomeScreen = () => {
  const navigation = useNavigation()
  const [featuredCategories, setFeaturedCategories] = useState([])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [])

  useEffect(() => {
    sanityClient
      .fetch(
        `
    *[_type == "featured"] {
      name,
      short_description,
      _id,
    }
    `
      )
      .then(data => setFeaturedCategories(data))
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

        {featuredCategories?.map(category => (
          <FeaturedRow
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.short_description}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen
