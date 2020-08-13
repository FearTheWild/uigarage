/* eslint-disable no-tabs */
import gql from 'graphql-tag'

<<<<<<< HEAD
const COLOR_QUERY = gql`
	query color ($id: ID!, $endCursor: String, $count: Int) {
		color(id: $id) {
			id
=======
<<<<<<<< HEAD:queries/color.js
const COLOR_QUERY = gql`
	query color ($id: ID!, $count: Int) {
		color(id: $id) {
            count
            description
========
const POSTFORMAT_QUERY = gql`
	query postFormat ($id: ID!, $endCursor: String, $count: Int) {
		postFormat(id: $id) {
			id
			count
			description
>>>>>>>> b35b596ad0f64658b94c4c812ad4952af8cfd326:queries/postFormat.JS
>>>>>>> b35b596ad0f64658b94c4c812ad4952af8cfd326
			link
			name
			slug
			uri
			count
			posts (first: $count, after: $endCursor) {
				nodes {
					id
					title
					slug
					date
					postId
					featuredImage {
						node {
							id
							uri
							title
							srcSet
							sourceUrl
						}
					}
					categories {
						nodes {
							name
						}
					}
				}
				pageInfo {
					endCursor
					hasNextPage
					hasPreviousPage
					startCursor
				}
			}
		}
	}
`

export default COLOR_QUERY
