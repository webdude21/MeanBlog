module.exports = function(apiNotFoundRoute, app){
    app.get(apiNotFoundRoute, function (req, res) {
        res.status(404);
        res.end();
    });
};