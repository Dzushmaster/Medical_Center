class ApiError extends Error{
    status;
    errors;

    constructor(status, message, errors = []) {
        super(message);
        this.status = status
        this.errors = errors
    }
    static badRequest(message, errors = []){
        return new ApiError(400, message, errors)
    }
    static internal(message){
        return new ApiError(500, message)
    }
    static forbiden(message){
        return new ApiError(403, message)
    }
    static unauthorized(message){
        return new ApiError(401, message)
    }
}
module.exports = ApiError