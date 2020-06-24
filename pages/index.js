import Layout from "../components/Layout";
import Posts from "../components/Posts";

const Index = props => {
  const { posts } = props;

  return (
    <Layout>
      <Posts/>
    </Layout>
  );
};

export default Index;
