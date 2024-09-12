exports.success_function = function (api_data) {

    let response = {
        success : true,
        statuscode : api_data.statuscode,
        data : api_data.data ? api_data.data : null,
        message : api_data.message ? api_data.message : null,
    };
    return response;
}

exports.error_function = function (api_data) {

    let response = {
        success : false,
        statuscode : api_data.statuscode,
        data : api_data.data ? api_data.data : null,
        message : api_data.message ? api_data.message : null,
    };
    return response;
}