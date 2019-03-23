```js
<div>
  <h1 className="bg-success text-white">hello world</h1>
  <style jsx>{`
    h1 {
      font-size: 100px;
    }
  `}</style>
</div>
```

```js
const className = props.className || "default";
// or
Portfolios.defaultProps = {
  className: "default"
};
```

[PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html)

Верификация токена в verifyToken(), в ларке используется просто секрет, а здесь сертификат

- Токен приходит с сервиса auth0
- Он подписан сертифкиатом https://dev-n-vb18pe.eu.auth0.com/.well-known/jwks.json
- Мы проверяем подпись:
  - вытаскиваем x5c
  - разбиваем по 64 символа
  - вставляем, подписываем и проеряем
