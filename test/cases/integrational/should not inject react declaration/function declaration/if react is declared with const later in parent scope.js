function parentContextIgnored() {
    function someFunctionIgnored() {
        React.render();
    }
    const React = {};
}
