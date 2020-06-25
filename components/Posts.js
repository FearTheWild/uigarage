import { useState, useEffect } from "react";
import Layout from "./Layout";
import Post from "./Post";
import client from "./ApolloClient";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import ReactLoading from "react-loading";

const POSTS_QUERY = gql`
  query Posts($id: Int, $endCursor: String) {
    posts(first: $id, after: $endCursor) {
      nodes {
        title
        slug
        postId
        featuredImage {
          sourceUrl
        }
      }
      edges {
        cursor
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`;

const Posts = (props) => {
  const { posts } = props;
  const loadNum = 15;
  const [endCursor, setEndCursor] = useState("");
  const [postsArray, setPostsArray] = useState([]);
  const [initialLoad, setInitialLoad] = useState(false);
  const { loading, error, data } = useQuery(POSTS_QUERY, {
    variables: {
      id: loadNum,
      endCursor: endCursor,
    },
  });

  useEffect(() => {
    const onCompleted = (data) => {
      let fetchData = data.posts.nodes;
      setPostsArray([...postsArray, ...fetchData]);
      setInitialLoad(true);
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

  const handleLoadMore = () => {
    setEndCursor(data.posts.pageInfo.endCursor);
  };

  if (error)
    return (
      <div className="container mx-auto py-6">
        <div className="flex flex-wrap">
          Oops, there was an error :( Please try again later.
        </div>
      </div>
    );
  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-wrap">
        {postsArray.length
          ? postsArray.map((post) => <Post key={post.postId} post={post} />)
          : ""}
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
  );
};

export default Posts;
