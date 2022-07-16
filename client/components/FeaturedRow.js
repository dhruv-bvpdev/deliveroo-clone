import { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { ArrowRightIcon } from 'react-native-heroicons/outline'
import { ScrollView } from 'react-native'
import RestuarantCard from './RestuarantCard'
import sanityClient from '../sanity'

export default function FeaturedRow({ id, title, description }) {
  const [restaurants, setRestaurants] = useState()

  useEffect(() => {
    sanityClient
      .fetch(
        `
    *[_type == "featured" && _id == $id] {
      ...,
      restaurants[] -> {
        ...,
        dishes[] -> ,
        type -> {
          name
        }
      }
    }[0]
    `,
        { id }
      )
      .then(data => setRestaurants(data?.restaurants))
  }, [id])

  return (
    <View className="">
      <View className="mt-4 flex-row items-center justify-between px-4">
        <Text className="font-bold text-lg">{title}</Text>
        <ArrowRightIcon color="#00CCBB" />
      </View>
      <Text className="text-xs text-gray-500 px-4">{description}</Text>

      <ScrollView
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 15
        }}
        showsHorizontalScrollIndicator={false}
        className="pt-4"
      >
        {/* Restaurant Cards */}

        {restaurants?.map(restaurant => (
          <RestuarantCard
            key={restaurant._id}
            id={restaurant._id}
            imgUrl={restaurant.image}
            title={restaurant.name}
            rating={restaurant.rating}
            genre={restaurant.type?.name}
            address={restaurant.address}
            short_description={restaurant.short_description}
            dishes={restaurant.dishes}
            long={restaurant.long}
            lat={restaurant.lat}
          />
        ))}
      </ScrollView>
    </View>
  )
}
