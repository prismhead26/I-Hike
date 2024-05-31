import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Outlet } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const darkStorage = localStorage.getItem("darkMode");

    setIsDarkMode(darkStorage);
  }, []);

  const toggleBackgroundColor = () => {
    localStorage.setItem("darkMode", !isDarkMode);
    setIsDarkMode(!isDarkMode);
  };

  const appStyle = {
    backgroundColor: isDarkMode ? "black" : "white",
    color: isDarkMode ? "lightgray" : "black",
    minHeight: "100vh",
    transition: "background-color 0.5s ease",
  };

  return (
    <ApolloProvider client={client}>
      <div style={appStyle}>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header toggleBackgroundColor={toggleBackgroundColor} />
          <div className="container">
            <Outlet />
          </div>
          <Footer />
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
