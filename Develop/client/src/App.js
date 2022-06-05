import React from 'react';
//IMPORT CLIENT SIDE APOLLO
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
//IMPORT ROUTING 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//IMPORT STYLING
import logo from './logo.png';
import './App.css';
//IMPORT COMPONENTS
import Page from './components/Donate/index';
import About from './components/About/index';
import Carbon from './components/Carbon/index';
import Form from './components/Form/index';
import Thermostat from './components/Thermostat/index';
import Volunteer from './components/Volunteer/Page';
import Footer from './components/Footer/index';
// import PageContainer from './components/PageContainer';

const httpLink = createHttpLink({
  uri: '/graphql',
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
        <div className="container">

        </div>
        <About />
        <Carbon />
        <Page />
        <Volunteer />
        <Footer />
      </div>
    </ApolloProvider>
  );

}

export default App;

