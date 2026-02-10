export class BadRequest extends Error {
    constructor(message) {
        super(message);
    }
}
export class Unauthorized extends Error {
    constructor(msg) {
        super(msg);
    }
}
export class Forbidden extends Error {
    constructor(msg) {
        super(msg);
    }
}
export class NotFound extends Error {
    constructor(msg) {
        super(msg);
    }
}
