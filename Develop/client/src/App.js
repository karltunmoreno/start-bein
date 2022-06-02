import React from 'react';
//IMPORT CLIENT SIDE APOLLO
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
//IMPORT STYLING
import logo from './logo.png';
import './App.css';
//IMPORT COMPONENTS
import Page from './components/Donate/index';
import About from './components/About/index';
import Carbon from './components/Carbon/index';
import Form from './components/Form/index';
import Thermostat from './components/Thermostat/index';
// import Volunteer from './components/Volunteer/Page';
import Footer from './components/Footer/index';
import PageContainer from './components/PageContainer';

const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      
      <div className="App">
        <header className="App-header">
          <div>
            <img src={logo} className="App-logo" alt="happy bein bumble bee" />
            <p>Start bein!<span> Sign up today!</span>
            </p>
          </div>
        </header>
      </div>
      <PageContainer />
      <Footer />
    </ApolloProvider>
  );
  // >>>>>>> 7d388f671160b448ea5c2fb81b8ac5c48d83b113
  //   );
}

export default App;

