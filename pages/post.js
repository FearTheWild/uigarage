import Layout from "../components/Layout";
import { withRouter } from "next/router";
import client from "../components/ApolloClient";

import POST_BY_ID_QUERY from "../queries/post-by-id";

const Post = withRouter(props => {
  const { post } = props;

  return (
    <Layout>
      {post ? (
        <div className="container">
          <div className="post">
            <div className="media">
              <img src={post.featuredImage.sourceUrl} alt={post.title} />
            </div>
            <h2>{post.title}</h2>
          </div>
        </div>
      ) : (
        ""
      )}
    </Layout>
  );
});

Post.getInitialProps = async function(context) {
  let {
    query: { slug }
  } = context;
  const id = slug ? parseInt(slug.split("-").pop()) : context.query.id;
  const res = await client.query({
    query: POST_BY_ID_QUERY,
    variables: { id }
  });

  return {
    post: res.data.post
  };
};

export default Post;
