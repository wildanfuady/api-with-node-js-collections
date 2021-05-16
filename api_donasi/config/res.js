
'use strict';
// response untuk user
exports.ok = function(val ,res){
    var data = {
        'status': 200,
        'data': val
    }
    res.json(data)
    res.end
}

exports.null = function(val, res){
    var data = {
        'status': 404,
        'data': 'data ' + val + ' tidak ditemukan'
    }
    res.json(data)
    res.end
}
