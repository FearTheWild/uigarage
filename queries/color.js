/* eslint-disable no-tabs */
import gql from 'graphql-tag'

const COLOR_QUERY = gql`
	query color ($id: ID!, $count: Int) {
		color(id: $id) {
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

export default COLOR_QUERY
