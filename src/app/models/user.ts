export class User {
    name: String
    username: String

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
