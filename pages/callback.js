import React from "react";
import { withRouter } from "next/router";
import auth0Client from "./../services/auth0";

class Callback extends React.Component {
  async componentDidMount() {
    await auth0Client.handleAuthentication();
    this.props.router.push("/");
  }

  render() {
    return (
      <div className="layout-container">
        <main className={`cover`}>
          <div className="wrapper">
            <div className="main-section">
              <div className="container text-white pt-5">
                <div className="row">
                  <div className="col">
                    <h1> Verifying login data ... </h1>
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

export default withRouter(Callback);
