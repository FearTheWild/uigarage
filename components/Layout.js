import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";

import client from "./ApolloClient";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "@apollo/react-hooks";

const Layout = props => {
  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client}>
        <div>
          <Head>
            <title>UIGarage</title>
          </Head>
          <Header />
          {props.children}
          <Footer />
        </div>
      </ApolloHooksProvider>
    </ApolloProvider>
  );
};

export default Layout;
