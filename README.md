# **react-declaration-loader**
Populates **JSX** sources with React declaration.

Since **JSX** turns out your XML kind of
```jsx
return <span>{userStatus}</span>;
```
to pure javascript code like
```js
return React.createElement('span', null, userStatus);
```
it still doesn't care whether you declared **React** in your code or not.

So **react-declaration-loader** is doing it's job. If it detects references
to **React** without appropriate declaration it populates your source with
needed one.

Thus you may wright out your code just like this
```jsx
import {Component} from 'react';
export class MyComponent extends Component {
    render() {
        let {message} = this.props;
        return <h1>{message}</h1>;
    }
}
```
### Usage
```bash
npm install react-declaration-loader --save
```
Add **react-declaration-loader** to your `webpack.config.js`
```js
//...
module: {
    loaders: [
        {
            test: /.jsx?$/,
            loaders: ['react-declaration-loader', 'babel-loader']
        },
//...
```
Make sure **react-declaration-loader** to handle your sources after they were transpiled to pure javascript code with **babel-loader** (or sth.) because it can not resolve **JSX** it self.
