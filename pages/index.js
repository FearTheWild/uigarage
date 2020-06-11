import Layout from "../components/Layout";
import Post from "../components/Post";
import client from "./../components/ApolloClient";
import gql from "graphql-tag";

const POSTS_QUERY = gql`
  query {
    posts {
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

const Index = props => {
  const { posts } = props;

  return (
    <Layout>
      <div className="container">
        <div className="grid">
          {posts.length
            ? posts.map(post => <Post key={post.postId} post={post} />)
            : ""}
        </div>
      </div>
    </Layout>
  );
};

Index.getInitialProps = async () => {
  const result = await client.query({ query: POSTS_QUERY });

  return {
    posts: result.data.posts.nodes
  };
};

export default Index;
