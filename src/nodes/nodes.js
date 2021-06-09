class Node {
    #value;

    /**
     * Creates a new node
     * @param {any} value - the value of the node
     * @returns {Node}
    */

    constructor(value) {
        this.#value = value
    }

    get value() {
        return this.#value
    }

    set value(value) {
        this.#value = value
    }
}

class SingleNode extends Node {
    #next;

    /**
     * Creates the new node
     * @param {any} value - the value of the node
     * @param {SingleNode | Null} next - (Optional) the reference to next node
     * @returns {SingleNode} the node created
    */
    constructor(value, next = null) {
        super(value)
        this.#next = next
    }

    get next() {
        return this.#next
    }

    set next(val) {
        this.#next = val;
    }

    /**
     * Returns a string representation of the node. Currently in development
     * @returns {String} a string representation of the node
    */
    toString() {
        return `${this.value}${this.#next ? ` -> ${this.#next}` : ""}`
    }
    
    /**
     * Returns if the node has next
     * @returns {boolean} 
    */

    hasNext() {
        return this.next !== null
    }

    /** 
     * Makes a copy of node
     * @example
     * Node.copy(node)
     * @param {SingleNode} node - the list to be copied
     * @returns {SingleNode} the copy of the list
    */
    static copy(node) {
        return new SingleNode(node.value, node.next)
    }
}

class DoubleNode extends Node {
    #next;
    #prev;

    /**
     * Creates the new node
     * @param {any} value - the value of the node
     * @param {DoubleNode | Null} next - (Optional) the reference to next node
     * @param {DoubleNode | Null} previous - (Optional) the reference to previous node
     * @returns {DoubleNode} the node created
    */
    constructor(value, next = null, previous = null) {
        super(value)
        this.#next = next
        this.#prev = previous
    }

    get next() {
        return this.#next
    }

    get previous() {
        return this.#prev
    }

    set next(val) {
        this.#next = val;
    }

    set previous (prev) {
        return this.#prev = prev
    }

    /**
     * Returns a string representation of the node. Currently in development
     * @returns {String} a string representation of the node
    */
    toString() {
        return `${this.value}${this.#next ? ` <-> ${this.#next}` : ""}`
    }
    
    /**
     * Returns if the node has next
     * @returns {boolean} 
    */

    hasNext() {
        return this.#next !== null
    }

    hasPrevious() {
        return this.#prev !== null
    }

    /** 
     * Makes a copy of node
     * @example
     * Node.copy(node)
     * @param {DoubleNode} node - the list to be copied
     * @returns {DoubleNode} the copy of the list
    */
    static copy(node) {
        return new DoubleNode(node.previous, node.value, node.next)
    }
}

module.exports = {
    Node, SingleNode, DoubleNode
}