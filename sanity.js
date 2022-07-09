import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image/url'
import { SANITY_PROJECT_ID, SANITY_DATA_SET } from '@env'

const client = sanityClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATA_SET,
  useCdn: true,
  apiVersion: '2021-10-21'
})

const builder = imageUrlBuilder(client)
export const urlFor = source => builder.image(source)
export default client
