import Link from "next/link";
import clientConfig from "../client-config";

const Post = props => {
  const { post } = props;

  return undefined !== post ? (
    <div className="grid-item" key={post.postId}>
      <Link
        as={`/post/${post.slug}-${post.postId}`}
        href={`/post?slug=${post.slug}-${post.postId}`}
      >
        <a>
          <img src={post.featuredImage.sourceUrl} alt={post.title} />
        </a>
      </Link>
      <Link
        as={`/post/${post.slug}-${post.postId}`}
        href={`/post?slug=${post.slug}-${post.postId}`}
      >
        <a>{post.title}</a>
      </Link>
    </div>
  ) : (
    ""
  );
};

export default Post;
