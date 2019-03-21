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
      <div>
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
    );
  }
}
