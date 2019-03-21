import React from "react";
import axios from "axios";
import Link from "next/link";
import { withRouter } from "next/router";

class Portfolios extends React.Component {
  // https://github.com/zeit/next.js#fetching-data-and-component-lifecycle
  static async getInitialProps({ query }) {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${query.id}`
    );
    const post = response.data;

    return { post };
  }

  render() {
    const { post } = this.props;
    // debugger;
    return <div>{post.title}</div>;
  }
}

export default withRouter(Portfolios);
