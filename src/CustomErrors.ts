export class BadRequest extends Error {

    constructor(message: string) {
        super(message);
    }
}

export class Unauthorized extends Error {
    constructor(msg: string) {
        super(msg);
    }
}


export class Forbidden extends Error {
    constructor(msg: string) {
        super(msg);
    }
}


export class NotFound extends Error {
    constructor(msg: string) {
        super(msg);
    }
}