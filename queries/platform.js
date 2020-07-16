/* eslint-disable no-tabs */
import gql from 'graphql-tag'

const PLATFORM_QUERY = gql`
	query platform ($id: ID!, $count: Int) {
		platform(id: $id) {
            count
            description
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

export default PLATFORM_QUERY
