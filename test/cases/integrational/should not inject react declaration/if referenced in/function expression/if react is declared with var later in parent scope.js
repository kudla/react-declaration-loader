function parentContextIgnored() {
    (function () {
        React.render();
    });
    var React = {};
}
