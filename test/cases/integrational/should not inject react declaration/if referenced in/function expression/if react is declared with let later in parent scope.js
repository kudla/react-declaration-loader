function parentContextIgnored() {
    (function () {
        React.render();
    });
    let React = {};
}
