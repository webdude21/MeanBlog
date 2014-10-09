var crypto = require('crypto');

module.exports = {
    populateResponse: function (req, res, DataSource, PAGE_SIZE, getViewModel) {
        var gridRequest = req.body;
        var query = DataSource.find({});
        var countQuery = DataSource.find({});
        addFilters(gridRequest.columns, query);
        addFilters(gridRequest.columns, countQuery);
        countQuery.count({}, function (err, totalEntryCount) {
            if (err) {
                console.log('Database error: ' + err);
            }
            gridRequest.pager.totalPages = calculateTotalPages(totalEntryCount, PAGE_SIZE);
            gridRequest.pager.currentPage = gridRequest.pager.currentPage > gridRequest.pager.totalPages ?
                gridRequest.pager.totalPages : gridRequest.pager.currentPage;

            var currentPage = gridRequest.pager.currentPage;
            if (currentPage < 1) {
                currentPage = 1;
            }

            var sortObject = {};
            sortObject[gridRequest.sort.columnName] = gridRequest.sort.order;
            query
                .sort(sortObject)
                .skip((currentPage - 1) * PAGE_SIZE)
                .limit(PAGE_SIZE)
                .exec(function (err, entries) {
                    if (err) {
                        console.log('Database error: ' + err);
                    }

                    var viewModel = [];
                    if(entries) {
                        entries.forEach(function (entry) {
                            viewModel.push(getViewModel(entry))
                        });
                    }

                    gridRequest.data = viewModel;
                    res.json(gridRequest);
                })
        });
    }
};

function calculateTotalPages(totalUsersCount, PAGE_SIZE) {
    var totalPages = (totalUsersCount + PAGE_SIZE - 1) / PAGE_SIZE;
    totalPages = Math.floor((totalPages));

    return totalPages;
}

function addFilters(columns, query){
    if(columns) {
        columns.forEach(function (column) {
            if (column.filter != undefined && column.filter != '') {
                var filterObject = {};
                filterObject[column.name] = new RegExp('^' + column.filter);
                query.where(filterObject);
            }
        });
    }
}

var gridResult = {
    pager: {
        currentPage: 1,
        totalPages: 10
    },
    sort: {
        columnName: "username",
        order: "desc"
    },
    data: []
};
