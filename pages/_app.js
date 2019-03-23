import React from "react";
import App, { Container } from "next/app";
import Page from "./../components/shared/Page";
import auth0Client from "./../services/auth0";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    const user = process.browser
      ? await auth0Client.clientAuth()
      : await auth0Client.serverAuth(ctx.req);

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    const auth = { user, isAuth: !!user };

    return { pageProps, auth };
  }

  render() {
    const { Component, pageProps, auth } = this.props;

    return (
      <Container>
        <Page auth={auth}>
          <Component {...pageProps} auth={auth} />
        </Page>
      </Container>
    );
  }
}

export default MyApp;
