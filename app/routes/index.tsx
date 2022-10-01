import { Box, Heading, Text, UnorderedList } from '@chakra-ui/react'
import { useLoaderData } from '@remix-run/react'
import { renderNodeRule, StructuredText } from 'react-datocms'
import { isHeading, isCode, isParagraph } from 'datocms-structured-text-utils'
import { load } from '~/lib/datocms'

/*
 - Add a nice background
 - Improve responsive design

*/

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

type Post = {
  slug: string
  title: string
  content: any
}

export default function Index() {
  const { posts } = useLoaderData()

  return (
    <Box
      color='gray.200'
      bgColor='gray.800'
      height='100vh'
      p={['0.4rem', '2rem', '4rem', '8rem']}
      style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}
    >
      <Heading as='h1'>TODAY I LEARNED</Heading>
      <UnorderedList m='1.2rem'>
        {posts.map((post: Post) => (
          <li key={post.slug}>
            <Heading as='h2' fontSize='2xl'>
              {post.title}
            </Heading>
            <StructuredText
              data={post.content}
              customNodeRules={[
                renderNodeRule(isParagraph, ({ children }) => {
                  return <Text my='1.2rem'>{children}</Text>
                }),
              ]}
            />
          </li>
        ))}
      </UnorderedList>
    </Box>
  )
}
