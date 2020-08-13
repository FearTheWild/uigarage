/* eslint-disable no-tabs */
import gql from 'graphql-tag'

const FILTER_QUERY = gql`
    query {
        categories (first: 100) {
            nodes {
                count
                description
                id
                link
                name
                slug
                uri
            }
        }
        colors (first: 100) {
            nodes {
                count
                name
                slug
                description
                uri
                id
            }
        }
        platforms (first: 100) {
            nodes {
                name
                slug
                description
                uri
                id
            }
        }
    }
`

export default FILTER_QUERY
