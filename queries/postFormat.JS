/* eslint-disable no-tabs */
import gql from 'graphql-tag'

const POSTFORMAT_QUERY = gql`
	query postFormat ($id: ID!, $count: Int) {
		postFormat(id: $id) {
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

export default POSTFORMAT_QUERY
