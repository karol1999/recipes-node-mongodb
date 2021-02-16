class RecipeNotFoundException extends Error {
    constructor(message) {
        super(message || "Book not found");
        this.status = 404
    }
}

module.exports = RecipeNotFoundException;