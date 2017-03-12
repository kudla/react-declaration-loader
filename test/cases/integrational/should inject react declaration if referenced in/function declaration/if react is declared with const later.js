/* inject React */
function someFunctionIgnored() {
    React.render();
    const React = {};
}
