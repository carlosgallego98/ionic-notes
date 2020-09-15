export class Note {
    title: String
    body: String
    slug: String
    userId: Number
    createdAt: Date
    updatedAt: Date

        constructor(values: Object = {}) {
            Object.assign(this, values);
    }
}
