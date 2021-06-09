const { DoubleNode } = require("../nodes/nodes")
const { IndexError, ItemError } = require("../errors/error")

class DoubleLinkedList {
    #head
    #size
    #circular = false

    constructor() {
        this.#head = null
        this.#size = 0
    }

    get size() {
        return this.#size
    }

    get root() {
        return this.#head
    }

    get tail() {
        return this.getNode(this.#size - 1)
    }

    get isCircular() {
        return this.#circular
    }

    
    push(item) {
        let node = new DoubleNode(item)

        if (this.has(item)) throw new ItemError(item)

        if (this.#head == null) {
            this.#head = node
        } else {
            let current = this.#head;
            while (current.next) {
                current = current.next;
            }
            current.next = node;
            node.previous = current
        }

        this.#size++
    }
    
    insertAt(item, index) {
        if (index < 0 || index >= this.#size) throw new IndexError(item)

        if (this.has(item)) throw new ItemError(item) 

        let node = new DoubleNode(item);
        let curr, prev;

        curr = this.#head;

        if (index == 0) {
            node.next = this.#head;
            this.#head = node;
        } else {
            curr = this.#head;
            let it = 0;

            while (it < index) {
                it++;
                prev = curr;
                curr = curr.next;
            }

            node.next = curr;
            node.previous = prev
            prev.next = node;
        }
        this.#size++;
    }

    join(sep = " ") {
        if(this.#head == null) return null

        let text = ""
        let current = this.#head;

        while (current.hasNext()) {
            text += `${current.value}${sep}`
            current = current.next
        }

        text += `${current.value}${sep}`

        text = text.substr(0, text.length - sep.length)
        return text
    }

    /** 
     * Checks if item is in the list
     * @example
     * SingleLinkedList.hasItemInList("Hello")
     * @param {any} item - the item to check for
     * @returns {Boolean} true if found else false
    */

     has(item) {
        let current = this.#head;

        if (current == null) return false
        
        if (current.value == item) return true
        

        while (current.hasNext()) {
            if (current.value == item) return true
            current = current.next;
        }

        if (current.value == item) return true

        return false
    }

        /** 
     * Finds the index of an item. Returns -1 if item not found
     * @example
     * SingleLinkedList.search("Hello")
     * @param {any} item - the item to check for. 
     * @returns {Number} index of the item 
    */

    search(item) {
        let current = this.#head;

        let index = 0;
        if (current == null) {
            return -1
        }

        if (current.value == item) {
            return index
        }

        while (current.hasNext()) {
            index++
            if (current.value == item) {
                return index
            }
            current = current.next;
        }

        if (current.value == item) {
            return index
        }

        return -1
    }

    get(index) {
        if (index < 0 || index >= this.#size) throw new IndexError(this.#size - 1)

        let current = this.#head;
        while (index > 0) {
            current = current.next;
            index--
        }

        return current.value
    }

    getNode(index) {
        if (index < 0 || index >= this.#size) throw new IndexError(this.#size - 1)

        let current = this.#head;
        while (index > 0) {
            current = current.next;
            index--
        }

        return current
    }

    /**
     * Returns current item in iterable
     *
     * @callback curr
     * @returns {any} the value of the item
    */

    /**
     * Returns next item in iterable
     *
     * @callback getNext
     * @returns {any} the value of the item
    */

    /**
     * Returns previous item in iterable
     *
     * @callback getPrevious
     * @returns {any} the value of the item
    */

    /**
     * Checks if iterator has anymore items
     *
     * @callback hNext
     * @returns {Boolean} 
    */

    /**
     * Checks if iterator is at the star of the list
     *
     * @callback hPrevious
     * @returns {Boolean} 
    */

    /**
     * Checks if iterable is at the start of the list
     *
     * @callback skip
     * @param {Number} index the index to jump to
     * @returns {Boolean} 
    */


    /**
     * @typedef {Object} Iterable
     * @property {curr} current
     * @property {getNext} next
     * @property {hNext} hasNext
     * @property {skip} jump
    */

    /**
     * Returns an iterable of the SingleLinkedList
     * @returns {Iterable} the functions to allow you to iterate
    */

    iterator() {
        let curr = this.#head

        const iterable = {
            /** @type {curr} */
            current: function () {
                return curr.value
            },

            /** @type {getNext} */
            next: function() {
                let data = curr.next
                curr = data
                return data.value
            },

             /** @type {hNext} */
            hasNext: function() {
                return curr.next != null
            },

            /** @type {getPrevious} */
            previous: function() {
                let data = curr.previous
                curr = data
                return data.value
            },

            /** @type {hPrevious} */
            hasPrevious: function() {
                return curr.previous != null
            },

            /** @type {skip} */
            jump: function(index) {
                if(index < 0 || index >= _this.#size) return

                curr = _this.get(index)
                return curr.value
            }
        }
        
        return iterable
    }

    toString() {
        return `DoubleLinkedList: ${this.#head.toString()}`
    }

    static copy(list) {
        let nlist = new DoubleLinkedList()
        for (let i = 0; i < list.size; i++) {
            nlist.push(list.get(i))
        }
        return nlist
    }

    static toLinkedList(...data) {
        let linked = new DoubleLinkedList()
        for (let i of data) {
            if (Array.isArray(i)) {
                i = i.flat(Infinity)
                for (let j = 0; j < i.length; j++) {
                    linked.push(i[j])
                }
            } else {
                linked.push(i)
            }
        }

        return linked
    }
}

module.exports = { DoubleLinkedList }