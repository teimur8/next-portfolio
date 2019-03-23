import React, { Component } from "react";
import Meta from "./Meta";
import NavBar from "./NavBar";

import "../../assets/style.scss";

class Page extends Component {
  render() {
    const { auth } = this.props;
    return (
      <>
        <Meta />
        <NavBar auth={auth} />
        <>{this.props.children}</>
      </>
    );
  }
}

export default Page;
