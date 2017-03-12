function parentContextIgnored() {
    function someFunctionIgnored() {
        React.render();
    }
    let React = {};
}
