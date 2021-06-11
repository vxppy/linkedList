class ItemError extends Error {
    constructor(item) {
        super(`'${item}' already exists in list`)
    }
}

class IndexError extends Error {
    constructor(size) {
        super(`Index not in range from 0 to ${size}`)
    }
}

class RangeError extends Error {
    constructor(item, size) {
        super(`${item} not in range from 0 to ${size}`)
    }
}

class NumError extends Error {
    constructor(message) {
        super(`${item} not in range from 0 to ${size}`)
    }
}
module.exports = {
    IndexError, ItemError, RangeError, NumError
}
