import auth0 from "auth0-js";
import Cookies from "js-cookie";
import axios from "axios";
import jwt from "jsonwebtoken";
import { getCookieFromReq } from "./../helpers/utils";

class Auth0 {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: "dev-n-vb18pe.eu.auth0.com",
      clientID: "NKVsVyWEn0pHKslAkyv01SFtW6eRV2ti",
      redirectUri: "http://localhost:3000/callback",
      responseType: "token id_token",
      scope: "openid profile"
    });
    this.login = () => this.auth0.authorize();
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
  }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setSession(authResult);
          resolve();
        } else if (err) {
          reject(err);
          console.log(err);
        }
      });
    });
  }

  async getJWKS() {
    const res = await axios.get(
      "https://dev-n-vb18pe.eu.auth0.com/.well-known/jwks.json"
    );
    const jwks = res.data;
    return jwks;
  }

  async verifyToken(token) {
    if (token) {
      // get the decoded payload and header
      const decodedToken = jwt.decode(token, { complete: true });

      if (!decodedToken) {
        return undefined;
      }

      const jwks = await this.getJWKS();
      const jwk = jwks.keys[0];

      // BUILD CERTIFICATE
      let cert = jwk.x5c[0];
      // обрезает по 64 символа и склеивает в ряд
      cert = cert.match(/.{1,64}/g).join("\n");

      cert = `-----BEGIN CERTIFICATE-----\n${cert}\n-----END CERTIFICATE-----\n`;

      // kid - key identifier
      if (jwk.kid === decodedToken.header.kid) {
        try {
          const tokenPayload = jwt.verify(token, cert);
          const expiresAt = tokenPayload.exp * 1000;

          console.log(tokenPayload);
          return tokenPayload && new Date().getTime() < expiresAt
            ? tokenPayload
            : undefined;
        } catch (err) {
          console.log(err);
          return undefined;
        }
      }
    }

    return undefined;
  }

  setSession(authResult) {
    Cookies.set("jwt", authResult.idToken);
  }

  logout() {
    Cookies.remove("jwt");
  }

  async clientAuth() {
    const token = Cookies.getJSON("jwt");
    const verifiedToken = await this.verifyToken(token);

    return verifiedToken;
  }
  async serverAuth(req) {
    if (req.headers.cookie) {
      const token = getCookieFromReq(req, "jwt");
      const verifiedToken = await this.verifyToken(token);
      return verifiedToken;
    }

    return undefined;
  }
}

const auth0Client = new Auth0();

export default auth0Client;
