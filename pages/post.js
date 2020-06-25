import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { withRouter } from "next/router";
import client from "../components/ApolloClient";
import { useQuery } from "@apollo/react-hooks";
import ReactLoading from "react-loading";

import POST_BY_ID_QUERY from "../queries/post-by-id";

const Post = withRouter((props) => {
  const [post, setPost] = useState("");
  let {
    router: {
      query: { slug },
    },
  } = props;
  const id = slug ? parseInt(slug.split("-").pop()) : context.query.id;
  const { loading, error, data } = useQuery(POST_BY_ID_QUERY, {
    variables: { id },
  });

  useEffect(() => {
    const onCompleted = (data) => {
      let post = data.post;
      setPost(post);
    };
    const onError = (error) => {
      return <div>{error}</div>;
    };
    if (onCompleted || onError) {
      if (onCompleted && !loading && !error) {
        onCompleted(data);
      } else if (onError && !loading && error) {
        onError(error);
      }
    }
  }, [data]);

  return (
    <Layout>
      {post ? (
        <div className="container mx-auto py-8">
          <div className="w-full md:w-1/2 mx-auto">
            <div className="block mb-6">
              <img
                className="w-full m-0"
                src={post.featuredImage.sourceUrl}
                alt={post.title}
              />
            </div>
            <h2 className="text-ui-dark">{post.title}</h2>
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
  );
});

export default Post;
