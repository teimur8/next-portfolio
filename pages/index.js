import React from "react";
import Typed from "react-typed";
export default class Index extends React.Component {
  constructor(props) {
    super(props);

    this.roles = ["Developer", "Tech Lover", "Team Player", "React.js"];
  }

  render() {
    return (
      <div className="layout-container">
        <main className={`cover`}>
          <div className="wrapper d-block d-md-flex justify-content-center align-items-center">
            <div className="main-section">
              <div className="container text-white pt-5">
                <div className="row">
                  <div className="col-lg-6 mb-5">
                    <div className="hero-section shadow-lg d-flex align-items-end">
                      <div className="hero-section-content p-4">
                        <h2> Full Stack Web Developer </h2>
                        <div className="hero-section-content-intro">
                          Have a look at my portfolio and job history.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 mb-5 d-flex align-items-center">
                    <div className="hero-welcome-text">
                      <div className="h4 text-uppercase">
                        Welcome to the portfolio website of Tima. Get informed,
                        collaborate and discover projects I was working on
                        through the years!
                      </div>
                      <Typed
                        loop
                        typeSpeed={60}
                        backSpeed={60}
                        strings={this.roles}
                        backDelay={1000}
                        loopCount={0}
                        showCursor
                        className="h5 font-weight-bold"
                        cursorChar="|"
                      />
                    </div>
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
