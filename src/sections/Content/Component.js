import React from "react";
import WelcomePage from "pages/Welcome";
import LoginPage from "pages/Login";
import SignUpPage from "pages/Sign_Up";
import ProductPage from "pages/Product_Page";
import ProductDetailPage from "pages/Product_Details_Page";
import AddTrx from "pages/Add_Trx_Page";

// import TransactionList from "pages/TransactionList";
import SentTrx from "pages/Sent_Trx_Page";
import Layanan from "pages/Layanan";
import Keagenan from "pages/Keagenan";
import SPM from "pages/SPM";

import Page from "components/Page";

import { Switch, Route } from "react-router-dom";

// import routes from "routes";

function Content({
  user,
  handleLogin,
  isLoggedIn,
  handleSignUp,
  refreshLayout,
}) {
  return (
    <Page>
      <Switch>
        {/* {routes.map((route) => (
          <Route {...route} key={route.path || "#"} handleLogin={handleLogin} />
        ))} */}
        <Route
          exact
          path="/"
          render={() => (
            <WelcomePage
              isLoggedIn={isLoggedIn}
              user={user}
              refreshLayout={refreshLayout}
            />
          )}
        />
        <Route
          exact
          path="/login"
          render={() => (
            <LoginPage
              handleLogin={handleLogin}
              refreshLayout={refreshLayout}
            />
          )}
        />
        <Route
          exact
          path="/daftar"
          render={() => (
            <SignUpPage
              handleSignUp={handleSignUp}
              refreshLayout={refreshLayout}
            />
          )}
        />
        <Route
          exact
          path="/product/:batchId"
          render={(props) => <ProductPage {...props} />}
        />
        <Route
          exact
          path="/product/:batchId/details/:trxID"
          render={(props) => <ProductDetailPage {...props} />}
        />
        <Route
          exact
          path="/create/:listType/:prevID"
          render={(props) => (
            <AddTrx refreshLayout={refreshLayout} user={user} {...props} />
          )}
        />
        <Route
          path="/create/:listType"
          render={(props) => (
            <AddTrx refreshLayout={refreshLayout} user={user} {...props} />
          )}
        />

        <Route
          exact
          path="/layanan/:listType"
          render={(props) => <Layanan user={user} {...props} />}
        />
        <Route
          exact
          path="/keagenan/:listType"
          render={(props) => <Keagenan user={user} {...props} />}
        />
        <Route
          exact
          path="/spm/:listType"
          render={(props) => <SPM user={user} {...props} />}
        />
        <Route
          exact
          path="/transactions/sent/:listType"
          render={(props) => <SentTrx user={user} {...props} />}
        />
      </Switch>
    </Page>
  );
}

export default Content;
