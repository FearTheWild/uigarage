import '../styles/main.css';
// import "../style.scss";
import client from "../components/ApolloClient";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "@apollo/react-hooks";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client}>
        <Component {...pageProps} />
      </ApolloHooksProvider>
    </ApolloProvider>
  );
}
