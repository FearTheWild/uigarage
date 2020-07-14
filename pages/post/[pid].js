/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from 'react'
import { withRouter } from 'next/router'
import ReactLoading from 'react-loading'
import moment from 'moment'

import { initializeApollo } from '../../components/ApolloClient'
import Layout from '../../components/Layout'

import CACHEDNUM_QUERY from '../../queries/cached-num'
import POSTS_QUERY from '../../queries/posts'

// eslint-disable-next-line react/prop-types
function Post ({ router }) {
  const apolloClient = initializeApollo()
  const [pid, setPid] = useState()
  const [post, setPost] = useState()

  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    if (router.query && router.query.pid) {
      // eslint-disable-next-line react/prop-types
      const postId = parseInt(router.query.pid.split('-').pop())
      setPid(postId)
    }
  })

  useEffect(() => {
    setTimeout(() => {
      const cachedLoadNum = apolloClient.readQuery({ query: CACHEDNUM_QUERY })
      const posts = apolloClient.readQuery({
        query: POSTS_QUERY,
        variables: {
          id: cachedLoadNum.loadNum
        }
      })
      posts.posts.nodes.map((postItem) => {
        if (postItem.postId === pid) {
          setPost(postItem)
        }
      })
    }, 100)
  }, [pid])

  return (
    <Layout>
      {post ? (
        <div className="container mx-auto py-8">
          <div className="w-full md:w-1/2 mx-auto">
            <div className="block mb-6">
              <img
                className="w-full m-0"
                src={post.featuredImage ? post.featuredImage.sourceUrl : ''}
                alt={post.title}
              />
            </div>
            <div className="description">
              <br></br>
              <h2 className="text-ui-dark"><b>{post.title}</b></h2>
              <h5>Published: {moment(post.date).format('ll')}</h5>
              <br></br>
              <h4><b>Categories:</b>
                {post.categories.nodes.length
                  ? post.categories.nodes.map((category, id) => <a href="#" key={id}>{category.name}</a>)
                  : ''
                }
              </h4>
            </div>
          </div>
        </div>
      ) : (
        <div className="load-initial">
          <ReactLoading
            className="load-icon"
            type="spinningBubbles"
            color="#333333"
            height="60px"
            width="60px"
          />
        </div>
      )}
    </Layout>
  )
}

export default withRouter(Post)
