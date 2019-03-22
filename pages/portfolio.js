import React from "react";
import axios from "axios";
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

    return (
      <div className="layout-container">
        <main className={`cover`}>
          <div className="wrapper">
            <div className="main-section">
              <div className="container text-white pt-5">
                <div className="row">
                  <div className="col">
                    <div>{post.title}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default withRouter(Portfolios);
