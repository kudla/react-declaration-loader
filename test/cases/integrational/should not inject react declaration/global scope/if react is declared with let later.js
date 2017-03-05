React.render();
// React wont be reached in that case
// but declaration injection will conflict with const declaration :(
let React = require('react');
