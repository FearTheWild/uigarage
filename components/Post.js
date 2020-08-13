/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react'
import Link from 'next/link'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const Post = props => {
  // eslint-disable-next-line react/prop-types
  const { post } = props
  const [isAfterLoad, setAfterLoad] = useState(false)
  // eslint-disable-next-line react/react-in-jsx-scope
  const placeholder = (<div className="photo-placeholder"></div>)
  const afterLazyLoad = () => {
    setAfterLoad(true)
  }

  return undefined !== post ? (
    <div className="w-1/2 md:w-1/4 lg:w-1/5 px-3 pb-8" key={post.postId}>
      <Link
        as={`/post/${post.slug}-${post.postId}`}
        href={`/post?slug=${post.slug}-${post.postId}`}
      >
        <a className="block mb-2">
          <LazyLoadImage
            alt={post.title}
            src={post.featuredImage ? post.featuredImage.node.sourceUrl : ''}
            delayTime={700}
            effect="blur"
            afterLoad={afterLazyLoad}
            placeholder={placeholder}
          />
        </a>
      </Link>

      {isAfterLoad ? (
        <Link
          as={`/post/${post.slug}-${post.postId}`}
          href={`/post?slug=${post.slug}-${post.postId}`}
        >
          <a className="text-base font-bold text-grey-400 hover:text-ui-dark">{post.title}</a>
        </Link>
      ) : ''
      }
    </div>
  ) : (
    ''
  )
}

export default Post
