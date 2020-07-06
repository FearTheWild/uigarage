import Link from "next/link";
import clientConfig from "../client-config";

const Post = props => {
  const { post } = props;
  
  return undefined !== post ? (
    <div className="w-1/2 md:w-1/4 lg:w-1/5 px-3 pb-8" key={post.postId}>
      <Link
        as={`/post/${post.slug}-${post.postId}`}
        href={`/post?slug=${post.slug}-${post.postId}`}
      >
        <a className="block mb-2">
          <img src={post.featuredImage? post.featuredImage.sourceUrl: ``} alt={post.title} />
        </a>
      </Link>
      <Link
        as={`/post/${post.slug}-${post.postId}`}
        href={`/post?slug=${post.slug}-${post.postId}`}
      >
        <a className="text-base font-bold text-grey-400 hover:text-ui-dark">{post.title}</a>
      </Link>
    </div>
  ) : (
    ""
  );
};

export default Post;
