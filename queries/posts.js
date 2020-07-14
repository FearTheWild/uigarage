import gql from 'graphql-tag'

const POSTS_QUERY = gql`
  query Posts($id: Int) {
    posts(first: $id) {
      nodes {
        id
        title
        slug
        date
        postId
        featuredImage {
          id
          uri
          title
          srcSet
          sourceUrl
        }
        categories {
          nodes {
            name
          }
        }
      }
      edges {
        cursor
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`

export default POSTS_QUERY
