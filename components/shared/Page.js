import React, { Component } from "react";
import Meta from "./Meta";
import NavBar from "./NavBar";

import "../../assets/style.scss";

class Page extends Component {
  render() {
    return (
      <>
        <Meta />
        <NavBar />
        <>{this.props.children}</>
      </>
    );
  }
}

export default Page;
