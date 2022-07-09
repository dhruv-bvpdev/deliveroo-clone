import { ScrollView } from 'react-native'
import CategoryCard from './CategoryCard'

export default function Categories() {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10
      }}
    >
      {/* Category Cards */}
      <CategoryCard
        imgUrl={require('../assets/breakfast.png')}
        title="Breakfast"
      />
      <CategoryCard imgUrl={require('../assets/pizza.png')} title="Pizza" />
      <CategoryCard imgUrl={require('../assets/grocery.png')} title="Grocery" />
      <CategoryCard imgUrl={require('../assets/dessert.png')} title="Dessert" />
      <CategoryCard imgUrl={require('../assets/burgers.png')} title="Burgers" />
      <CategoryCard imgUrl={require('../assets/chicken.png')} title="Chicken" />
    </ScrollView>
  )
}
