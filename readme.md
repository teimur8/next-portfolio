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
