import React from "react";
import axios from "axios";
import { Link } from "../routes";

export default class Portfolios extends React.Component {
  static async getInitialProps({ req }) {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    const posts = response.data;
    return { posts };
  }

  render() {
    const { posts } = this.props;
    return (
      <div className="layout-container">
        <main className={`cover`}>
          <div className="wrapper">
            <div className="main-section">
              <div className="container text-white pt-5">
                <div className="row">
                  <div className="col">
                    <ul>
                      {posts.map(item => (
                        <li key={item.id}>
                          <Link route={`/portfolio/${item.id}`}>
                            <a>{item.title}</a>
                          </Link>
                        </li>
                      ))}
                    </ul>
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
