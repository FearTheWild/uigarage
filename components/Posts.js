/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable camelcase */
import { useState, useEffect } from 'react'
import { initializeApollo } from './ApolloClient'
import { useQuery } from '@apollo/react-hooks'
import ReactLoading from 'react-loading'

import POSTS_QUERY from '../queries/posts'
import CachedNum_QUERY from '../queries/cached-num'

import Post from './Post'

const Posts = (props) => {
  const apolloClient = initializeApollo()

  const [loadNum, setLoadNum] = useState(15)
  const [postsArray, setPostsArray] = useState([])
  const [initialLoad, setInitialLoad] = useState(false)
  const [skipStatus, setSkipStatus] = useState(true)
  const { loading, error, data } = useQuery(
    POSTS_QUERY,
    {
      variables: {
        id: loadNum
      },
      skip: skipStatus
      // fetchPolicy: "cache-and-network"
    }
  )

  useEffect(() => {
    setTimeout(() => {
      try {
        const cachedLoadNum = apolloClient.readQuery({ query: CachedNum_QUERY })
        setLoadNum(cachedLoadNum.loadNum)
      } catch (e) {
        setLoadNum(15)
      }
      setSkipStatus(false)
    }, 100)
  }, [])

  useEffect(() => {
    const onCompleted = (data) => {
      if (data && data.posts) {
        const fetchData = data.posts.nodes
        setPostsArray([...fetchData])
        setInitialLoad(true)
        apolloClient.writeQuery({
          query: CachedNum_QUERY,
          data: {
            loadNum
          }
        })
      }
    }
    const onError = (error) => {
      return <div>{error}</div>
    }
    if (onCompleted || onError) {
      if (onCompleted && !loading && !error) {
        onCompleted(data)
      } else if (onError && !loading && error) {
        onError(error)
      }
    }
  }, [data])

  const handleLoadMore = () => {
    setLoadNum(loadNum + 15)
  }

  if (error) {
    return (
      <div className="container mx-auto py-6">
        <div className="flex flex-wrap">
          Oops, there was an error :( Please try again later.
        </div>
      </div>
    )
  }
  return (
    <div className="container mx-auto py-6">
      <div className={initialLoad ? 'flex flex-wrap posts-container' : 'flex flex-wrap'} >
        {postsArray.length
          ? postsArray.map((post) => <Post key={post.postId} post={post} />)
          : ''}
      </div>

      {!initialLoad ? (
        <div className="load-initial">
          <ReactLoading
            className="load-icon"
            type="spinningBubbles"
            color="#333333"
            height="60px"
            width="60px"
          />
        </div>
      ) : (
        <div className="load-more flex flex-wrap">
          {loading ? (
            <ReactLoading
              className="load-icon"
              type="spokes"
              color="#333333"
              height="40px"
              width="40px"
            />
          ) : (
            <span onClick={() => handleLoadMore()}>Load more...</span>
          )}
        </div>
      )}
    </div>
  )
}

export default Posts
