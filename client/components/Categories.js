import { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import CategoryCard from './CategoryCard'
import sanityClient, { urlFor } from '../sanity'

export default function Categories() {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    sanityClient
      .fetch(
        `
    *[_type == "category"]
    `
      )
      .then(data => setCategories(data))
  }, [])

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
      {categories.map(category => (
        <CategoryCard
          key={category._id}
          imgUrl={urlFor(category.image).url()}
          title={category.name}
        />
      ))}
    </ScrollView>
  )
}
