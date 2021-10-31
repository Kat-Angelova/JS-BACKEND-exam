exports.getErrorMessage = function (error) {
    let errorNames = Object.keys(error.errors);

    if(errorNames.length > 0) {
        return error.errors[errorNames[0]]
    } else {
        return error.message
    }
};