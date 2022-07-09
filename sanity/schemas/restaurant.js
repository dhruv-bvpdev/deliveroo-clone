export default {
  name: 'restaurant',
  title: 'Restaurant',
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Restaurant Name',
      validation: Rule => Rule.required()
    },
    {
      name: 'short_description',
      type: 'string',
      title: 'Short Description',
      validation: Rule => Rule.max(200)
    },
    {
      name: 'image',
      type: 'image',
      title: 'Restaurant Image'
    },
    {
      name: 'lat',
      type: 'number',
      title: 'Restaurant Latitude'
    },
    {
      name: 'long',
      type: 'number',
      title: 'Restaurant Longitude'
    },
    {
      name: 'address',
      type: 'string',
      title: 'Restaurant Address',
      validation: Rule => Rule.required()
    },
    {
      name: 'rating',
      type: 'number',
      title: 'Rating',
      validation: Rule =>
        Rule.required()
          .min(1)
          .max(5)
          .error('Please enter a value between 1 and 5')
    },
    {
      name: 'type',
      title: 'Category',
      validation: Rule => Rule.required(),
      type: 'reference',
      to: [{ type: 'category' }]
    },
    {
      name: 'dishes',
      type: 'array',
      title: 'Dishes',
      of: [{ type: 'reference', to: [{ type: 'dish' }] }]
    }
  ]
}
