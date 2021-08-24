import React from "react";
import WelcomePage from "pages/Welcome";
import LoginPage from "pages/Login";
import SignUpPage from "pages/Sign_Up";
import ProductPage from "pages/Product_Page";
import ProductDetailPage from "pages/Product_Details_Page";
import AddTrx from "pages/Add_Trx_Page";
import AddGenesis from "pages/Add_Genesis_Bawang";
import UpdateGenesis from "pages/Update_Genesis";
import ConvertGenesis from "pages/Convert_Genesis_Bawang";
import PanenBawang from "pages/Panen_Bawang";

// import TransactionList from "pages/TransactionList";
import SentTrx from "pages/Sent_Trx_Page";
import InboxTrx from "pages/Inbox_Trx_Page";

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
          path="/create_transaction"
          render={() => <AddTrx refreshLayout={refreshLayout} user={user} />}
        />
        <Route
          exact
          path="/add_genesis"
          render={() => (
            <AddGenesis refreshLayout={refreshLayout} user={user} />
          )}
        />
        <Route
          exact
          path="/update_genesis"
          render={() => (
            <UpdateGenesis refreshLayout={refreshLayout} user={user} />
          )}
        />
        <Route
          exact
          path="/tanam_benih"
          render={() => (
            <ConvertGenesis refreshLayout={refreshLayout} user={user} />
          )}
        />
        <Route
          exact
          path="/panen_bawang"
          render={() => (
            <PanenBawang refreshLayout={refreshLayout} user={user} />
          )}
        />
        <Route
          exact
          path="/transactions/inbox/:listType"
          render={(props) => <InboxTrx user={user} {...props} />}
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
