console.exception = function exception() {
    if ("error" in console) {
        Function.prototype.apply.call(console.error, console, arguments);
    }
};
