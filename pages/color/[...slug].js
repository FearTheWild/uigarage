/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from 'react'
import Router, { withRouter } from 'next/router'
import { useQuery } from '@apollo/react-hooks'
import ReactLoading from 'react-loading'

import Layout from '../../components/Layout'
import Filter from '../../components/Filter'
import Post from '../../components/Post'

import COLOR_QUERY from '../../queries/color'

// eslint-disable-next-line react/prop-types
<<<<<<< HEAD
function Color ({ router }) {
  const loadNum = 15
  const [endCursor, setEndCursor] = useState('')
  const [colorId, setColorId] = useState()
=======
<<<<<<<< HEAD:pages/color/[...slug].js
function color ({ router }) {
  const [loadNum, setLoadNum] = useState(15)
  const [colorId, setcolorId] = useState()
========
function PostFormat ({ router }) {
  const loadNum = 15
  const [endCursor, setEndCursor] = useState('')
  const [postFormatId, setpostFormatId] = useState()
>>>>>>>> b35b596ad0f64658b94c4c812ad4952af8cfd326:pages/type/[...slug].js
>>>>>>> b35b596ad0f64658b94c4c812ad4952af8cfd326
  const [postsArray, setPostsArray] = useState([])
  const [initialLoad, setInitialLoad] = useState(false)
  const [skipStatus, setSkipStatus] = useState(true)
  const [hasNextPage, setHasNextPage] = useState(true)
  const { loading, error, data } = useQuery(
    COLOR_QUERY,
    {
      variables: {
<<<<<<< HEAD
        id: colorId,
        endCursor: endCursor,
=======
<<<<<<<< HEAD:pages/color/[...slug].js
        id: colorId,
========
        id: postFormatId,
        endCursor: endCursor,
>>>>>>>> b35b596ad0f64658b94c4c812ad4952af8cfd326:pages/type/[...slug].js
>>>>>>> b35b596ad0f64658b94c4c812ad4952af8cfd326
        count: loadNum
      },
      skip: skipStatus
    }
  )
  useEffect(() => {
    if (router.query && router.query.slug) {
<<<<<<< HEAD
      setColorId(router.query.slug[1])
=======
      setcolorId(router.query.slug[1])
>>>>>>> b35b596ad0f64658b94c4c812ad4952af8cfd326
    }
  })

  useEffect(() => {
    setSkipStatus(false)
  }, [colorId])

  useEffect(() => {
    const onCompleted = (data) => {
<<<<<<< HEAD
      if (data && data.color) {
        const fetchData = data.color.posts.nodes
        setPostsArray([...postsArray, ...fetchData])
        setInitialLoad(true)

        if (!data.color.posts.pageInfo.hasNextPage) {
          setHasNextPage(false)
        }
=======
<<<<<<<< HEAD:pages/color/[...slug].js
      if (data && data.color) {
        setInitialLoad(true)
        setPostsArray(data.color.posts.nodes)
========
      if (data && data.postFormat) {
        const fetchData = data.postFormat.posts.nodes
        setPostsArray([...postsArray, ...fetchData])
        setInitialLoad(true)

        if (!data.postFormat.posts.pageInfo.hasNextPage) {
          setHasNextPage(false)
        }
>>>>>>>> b35b596ad0f64658b94c4c812ad4952af8cfd326:pages/type/[...slug].js
>>>>>>> b35b596ad0f64658b94c4c812ad4952af8cfd326
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
<<<<<<< HEAD
    setEndCursor(data.color.posts.pageInfo.endCursor)
=======
    setEndCursor(data.postFormat.posts.pageInfo.endCursor)
>>>>>>> b35b596ad0f64658b94c4c812ad4952af8cfd326
  }
  return (
    <Layout>
      <Filter/>
      <div className="container mx-auto py-6">
        <div className={initialLoad ? 'flex flex-wrap posts-container' : 'flex flex-wrap'} >
          {postsArray.length
            ? postsArray.map((post) => <Post key={`ct-pt-${post.postId}`} post={post} />)
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
              hasNextPage ? (
                <span onClick={() => handleLoadMore()}>Load more...</span>
              )
                : ''
            )}
          </div>
        )}
      </div>
      <div className="back-btn" onClick={() => Router.back()}>
        <svg id="search-icon" className="back-icon" viewBox="0 0 24 24">
          <path d="M26.105,21.891c-0.229,0-0.439-0.131-0.529-0.346l0,0c-0.066-0.156-1.716-3.857-7.885-4.59
          c-1.285-0.156-2.824-0.236-4.693-0.25v4.613c0,0.213-0.115,0.406-0.304,0.508c-0.188,0.098-0.413,0.084-0.588-0.033L0.254,13.815
          C0.094,13.708,0,13.528,0,13.339c0-0.191,0.094-0.365,0.254-0.477l11.857-7.979c0.175-0.121,0.398-0.129,0.588-0.029
          c0.19,0.102,0.303,0.295,0.303,0.502v4.293c2.578,0.336,13.674,2.33,13.674,11.674c0,0.271-0.191,0.508-0.459,0.562
          C26.18,21.891,26.141,21.891,26.105,21.891z"/>
        </svg>
      </div>
    </Layout>
  )
}

<<<<<<< HEAD
export default withRouter(Color)
=======
export default withRouter(color)
>>>>>>> b35b596ad0f64658b94c4c812ad4952af8cfd326
