import React from "react";
import ReactDOM from "react-dom";
import Homepage from "./components/Homepage";
import ApolloClient from 'apollo-boost';
import 'bootstrap/dist/css/bootstrap.css';
import { ApolloProvider } from '@apollo/react-hooks';
import SinglePost from './components/SinglePost/SinglePost'
import Search from './components/Search/Search'
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";

const client = new ApolloClient({
    uri: 'https://api-eu-central-1.graphcms.com/v2/ckg6v77ev82kk01wedyca8nor/master',
    request: operation => {
      operation.setContext({
        headers: {
          authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
        },
      });
    },
  });

  ReactDOM.render(
      <React.StrictMode>
        <ApolloProvider client={client}>
          <Router>
            <Switch>
              <Route exact path="/post/:slug">
                <SinglePost />
              </Route>
                <Route exact path="/search/:query">
                <Search />
              </Route>
               <Route exact path="/">
                <Homepage />
              </Route>
            </Switch>
          </Router>
        </ApolloProvider>
      </React.StrictMode>,
      document.getElementById("root")
    );

