var Mock = require('mockjs');
var Random = Mock.Random

module.exports = Mock.mock({
    "data|15-40": [{
        'shopName': '@ctitle',
        'dealGroupTitle':'@csentence',
        'dealgroupPrice|1-100':0,
        'sales|1-100':0,
        'img':Random.image('200x100','','hello'),
        'id|+1': 1
    }]
});