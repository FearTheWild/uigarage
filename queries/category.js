/* eslint-disable no-tabs */
import gql from 'graphql-tag'

const CATEGORY_QUERY = gql`
	query Category ($id: ID!, $count: Int) {
		category(id: $id) {
			link
			name
			slug
			uri
			posts (first: $count) {
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
			}
		}
	}
`

export default CATEGORY_QUERY
