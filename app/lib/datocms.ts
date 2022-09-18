import tiny from 'tiny-json-http'

type LoadParams = {
  query: string
  variables: { limit: number }
  includeDrafts?: boolean
  excludeInvalid?: boolean
}

export async function load({
  query,
  variables,
  includeDrafts,
  excludeInvalid,
}: LoadParams) {
  let endpoint = 'https://graphql.datocms.com'

  const headers: Record<string, string> = {
    authorization: `Bearer ${process.env.DATOCMS_READONLY_TOKEN}`,
  }
  if (process.env.DATOCMS_ENVIRONMENT) {
    headers['X-Environment'] = process.env.DATOCMS_ENVIRONMENT
  }
  if (includeDrafts) {
    headers['X-Include-Drafts'] = 'true'
  }
  if (excludeInvalid) {
    headers['X-Exclude-Invalid'] = 'true'
  }

  const { body } = await tiny.post({
    url: endpoint,
    headers,
    data: { query, variables },
  })
  if (body.errors) {
    console.error('Ouch! The query has some errors!', body.errors)
    throw body.errors
  }
  return body.data
}
