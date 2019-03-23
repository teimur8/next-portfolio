import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";

import Router from "next/router";
import NProgress from "nprogress";

Router.onRouteChangeStart = () => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => {
  NProgress.done();
};
Router.onRouteChangeError = () => {
  NProgress.done();
};

import { Link } from "../../routes";
import auth0 from "../../services/auth0";

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  logout() {
    auth0.logout();
    Router.push("/");
  }

  render() {
    const { auth } = this.props;

    return (
      <div>
        <Navbar className="text-white custom fixed-top" dark expand="md">
          <Link route="/">
            <a className="navbar-brand text-white font-weight-bold">Profolio</a>
          </Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav navbar className="ml-auto">
              <NavItem>
                <Link route="/portfolios ">
                  <NavLink>Portfolios</NavLink>
                </Link>
              </NavItem>

              {!auth.isAuth && (
                <NavItem>
                  <NavLink onClick={auth0.login}>Login</NavLink>
                </NavItem>
              )}
              {auth.isAuth && (
                <>
                  <NavItem>
                    <NavLink onClick={this.logout}>Logout</NavLink>
                  </NavItem>
                  <span className="navbar-text">{auth.user.given_name}</span>
                </>
              )}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
