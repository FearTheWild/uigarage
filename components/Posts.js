import { useState, useEffect } from "react";
import Layout from "./Layout";
import Post from "./Post";
import client from "./ApolloClient";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const POSTS_QUERY = gql`
  query {
    posts(first: 15) {
      nodes {
        title
        slug
        postId
        featuredImage {
          sourceUrl
        }
      }
    }
  }
`;

const Posts = props => {
  const { posts } = props;
  const { loading, error, data } = useQuery(POSTS_QUERY);

  if (loading)
    return (
      <div className="container mx-auto py-6">
        <div className="flex flex-wrap">Loading...</div>
      </div>
    );
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
        {data.posts.nodes.length
          ? data.posts.nodes.map(post => <Post key={post.postId} post={post} />)
          : ""}
      </div>
    </div>
  );
};

export default Posts;
