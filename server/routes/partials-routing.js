module.exports = function (partialsPath, app) {
    app.get('/partials/:partialArea/:partialName', function (req, res) {
        res.render(partialsPath + req.params.partialArea + '/' + req.params.partialName)
    });
};