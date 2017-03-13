/* inject React */
function someFunctionIgnored() {
    React.render();
    var React = {};
}
