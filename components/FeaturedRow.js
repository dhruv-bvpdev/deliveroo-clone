import { View, Text } from 'react-native'
import { ArrowRightIcon } from 'react-native-heroicons/outline'
import { ScrollView } from 'react-native'
import RestuarantCard from './RestuarantCard'

export default function FeaturedRow({ id, title, description }) {
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
        <RestuarantCard
          id="123"
          imgUrl="https://links.papareact.com/gn7"
          title="Yo's Sushi"
          rating={4.5}
          genre="Japanese"
          address="123 Main St"
          short_description="Test Description"
          dishes={[]}
          long={20}
          lat={0}
        />

        <RestuarantCard
          id="123"
          imgUrl="https://links.papareact.com/gn7"
          title="Yo's Sushi"
          rating={4.5}
          genre="Japanese"
          address="123 Main St"
          short_description="Test Description"
          dishes={[]}
          long={20}
          lat={0}
        />

        <RestuarantCard
          id="123"
          imgUrl="https://links.papareact.com/gn7"
          title="Yo's Sushi"
          rating={4.5}
          genre="Japanese"
          address="123 Main St"
          short_description="Test Description"
          dishes={[]}
          long={20}
          lat={0}
        />
      </ScrollView>
    </View>
  )
}
