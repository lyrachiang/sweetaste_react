import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Layout from './components/layout';

import Home from './views/home';
import Product from './views/product';
import Favorite from './views/favorite';
import Login from './views/login';
import Cart from './views/cart';
import Checkout from './views/checkout';
import Finish from './views/finish';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Layout>
        <Route path="/" exact component={Home} />
        <Route path="/product" exact component={Product} />
        <Route path="/product/:prodType" component={Product} />
        <Route path="/favorite" component={Favorite} />
        <Route path="/login" component={Login} />
        <Route path="/cart" component={Cart} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/finish" component={Finish} />
      </Layout>
    </Router>
  );
}

export default App;
