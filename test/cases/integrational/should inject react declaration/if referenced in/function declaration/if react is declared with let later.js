/* inject React */
function someFunctionIgnored() {
    React.render();
    let React = {};
}
