import { useLoaderData } from '@remix-run/react'
import { StructuredText } from 'react-datocms'
import { load } from '~/lib/datocms'

const HOMEPAGE_QUERY = `query HomePage($limit: IntType) {
  posts: allPosts(first: $limit) {
    slug
    title
    content {
      value
    }
  }
}`

export async function loader() {
  return load({
    query: HOMEPAGE_QUERY,
    variables: { limit: 10 },
  })
}

export default function Index() {
  const { posts } = useLoaderData()

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>TODAY I LEARNED</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <h2>{post.title}</h2>
            <StructuredText data={post.content} />
          </li>
        ))}
      </ul>
    </div>
  )
}
