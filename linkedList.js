/**
 * A linkedList object. Can be used like arrays but items can't be accesed by index
 * @example
 * let some_node = new LinkedList()
 * @example
 * some_node[0]
 * //will return undefined, instead use
 * some_node.get(0)
*/

class LinkedList {
    #head
    #size

    /**
     * Creates the new linkedList
     * @returns {LinkedList} the node created
    */
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

    /**
     * Add item to end of list
     * @example
     * linkedlist.push("Hello world")
     * @param {any} item - Item to be added to the list
    */

    push(item) {
        let node = new Node(item)

        if (this.has(item)) {
            throw new ItemError(item)
        }

        if (this.#head == null) {
            this.#head = node
        } else {
            let current = this.#head;
            while (current.hasNext()) {
                current = current.next;
            }
            current.next = node;
        }

        this.#size++
    }
    
    /**
     * Add item to start of list
     * @example
     * linkedlist.pushStart("Hello world")
     * @param {any} item - Item to be added to the list
    */

    pushStart(item) {
        this.insertAt(item, 0)
    }

    /**
     * Add multipe items the of list
     * @example
     * linkedlist.pushMany(false, 1, 2, 3)
     * @param {Boolean} start wheater to insert at start or end
     * @param {*} items - Item to be added to the list
    */

    pushMany(start, ...items) {
        for(let i of items) {
            if (Array.isArray(i)) {
                i = i.flat(Infinity)
                for (let j = 0; j < i.length; j++) {
                    start ? this.pushStart(i[j]):this.push(i[j])
                }
            } else {
                start ? this.pushStart(i):this.push(i)
            }
        }
    }

    /**
     * Removes item from end of list
     * @example
     * linkedlist.pop()
     * @returns {any} Returns the value of item removed.
    */

    pop() {
        return this.removeAt(this.#size - 1)
    }

    /**
     * Removes item first item in the list
     * @example
     * linkedlist.popHead()
     * @returns {any} Returns the value of item removed.
    */

    popHead() {
        return this.removeAt(0)
    }

    popBy(times) {
        if(times > 0) {
            for(let i = 0; i < times; i++) {
                this.pop(this.#size - 1)
            }    
        } else if (times < 0) {
            for(let i = 0; i < -times; i++) {
                this.popHead(this.#size - 1)
            }    
        }
        
    }

    /** 
     * Removes item at specific index
     * @example
     * linkedlist.removeAt(2)
     * //removes the item at index 2
     * @returns {any} Returns the value of item removed.
     * @param {Number} index - the index of the item. Must be Integer
    */

    removeAt(index) {
        if (index < 0 || index >= this.#size) throw new IndexError(this.#size)

        let curr, prev, it = 0;
        curr = this.#head;
        prev = curr;

        if (index === 0) {
            this.#head = curr.next;
        } else {
            while (it < index) {
                it++;
                prev = curr;
                curr = curr.next;
            }
            prev.next = curr.next;
        }

        this.#size--;

        return curr.value;
    }

    /** 
     * Adds item at specific index
     * @example
     * linkedlist.insertAt("Hi", 2)
     * //Adds the "Hi" at index 2
     * @param {any} item - the item to be added
     * @param {Number} index - the index of the item. Must be Integer
    */

    insertAt(item, index) {
        if (index < 0 || index >= this.#size) throw new IndexError(this.#size - 1)

        if (this.has(item)) throw new ItemError(item)

        let node = new Node(item);
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
            prev.next = node;
        }
        this.#size++;
    }

    /**
     * Returns if listy is empty or not
     * @returns {Boolean} is_list_empty?
    */

    isEmpty() {
        return this.#size == 0
    }

    /**
     * Returns a string representation of the list
     * @example
     * linkedList.join(", ")
     * //returns a string with items seperated by ", "
     * @param {String} sep - the string to seperate the items by
     * @returns {String} string representation of list
    */

    join(sep = " ") {
        if(this.#head == null) {
            return null
        }

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
     * linkedlist.hasItemInList("Hello")
     * @param {any} item - the item to check for
     * @returns {Boolean} true if found else false
    */

    has(item) {
        let current = this.#head;

        if (current == null) {
            return false
        }

        if (current.value == item) {
            return true
        }

        while (current.hasNext()) {
            if (current.value == item) {
                return true
            }
            current = current.next;
        }

        if (current.value == item) {
            return true
        }

        return false
    }

    /** 
     * Returns the item at the index provided. If index out of bounds, throws error
     * @example
     * LinkedList.get(3)
     * //gives the item at index 3 if it exists
     * @param {Number} index - the index of the item. Must be Integer
     * @returns {any} the item at the index
    */


    get(index) {
        if (index < 0 || index >= this.#size) throw new IndexError(this.#size - 1)

        let current = this.#head;
        while (index > 0) {
            current = current.next;
            index--
        }

        return current.value
    }

    /** 
     * Finds the index of an item. Returns -1 if item not found
     * @example
     * linkedlist.search("Hello")
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
     * Returns next item in iterable
     *
     * @callback getPrevious
     * @returns {any} the value of the item
    */

    /**
     * Checks if iterable has anymore items
     *
     * @callback hNext
     * @returns {Boolean} 
    */


    /**
     * Checks if iterable is at the start of the list
     *
     * @callback hPrevious
     * @returns {Boolean} 
    */


    /**
     * Checks if iterable is at the start of the list
     *
     * @callback skip
     * @returns {Boolean} 
    */


    /**
     * @typedef {Object} Iterable
     * @property {curr} current
     * @property {getNext} next
     * @property {hNext} hasNext
     * @property {getPrevious} previous
     * @property {hPrevious} hasPrevious
     * @property {skip} jump
    */

    /**
     * Returns an iterable of the linkedList
     * @returns {Iterable} the functions to allow you to iterate
    */

    iterator() {
        var _this = this
        let index = 0

        const iterable = {
            /** @type {curr} */
            current: function () {
                return _this.get(index)
            },

            /** @type {getNext} */
            next: function() {
                if(index >= _this.#size) return
                if(index < 0) index = -1
                return _this.get(++index)
            },

             /** @type {hNext} */
            hasNext: function() {
                try {
                    _this.get(index + 1)
                    return true
                } catch {
                    return false
                }
            },

            /** @type {getPrevious} */
            previous: function() {
                if(index - 1 < 0) return
                if(index >= _this.#size) index = _this.#size + 1
                return _this.get(--index)
            },

            /** @type {hPrevious} */
            hasPrevious: function() {
                try {
                    _this.get(index - 1)
                    return true
                } catch {
                    return false
                }
            },

            /** @type {skip} */
            jump: function(value) {
                if(index + value < 0 || index + value > _this.#size) return

                index += value
                return _this.get(index)
            }
        }
        
        return iterable
    }

    /**
     * Shifts all elements in the list by one
     * @returns {void}
    */

    shift() {
        let iter = this.iterator()
        let size = this.#size
        let all_elemets = []

        all_elemets.push(iter.current())
        while(iter.hasNext()) {
            all_elemets.push(iter.next())
        }

        this.#head = new Node(all_elemets[all_elemets.length - 1]);

        for(let i = 0; i < all_elemets.length - 1; i++) {
            this.push(all_elemets[i])
        }

        this.#size = size
    }


    /**
     * Shifts all elements in the list by negative one
     * @returns {void}
    */

    unshift() {
        let iter = this.iterator()
        let size = this.#size
        let all_elemets = []

        all_elemets.push(iter.current())
        while(iter.hasNext()) {
            all_elemets.push(iter.next())
        }

        this.#head = new Node(all_elemets[1]);

        for(let i = 2; i < all_elemets.length; i++) {
            this.push(all_elemets[i])
        }

        this.#size = size

        this.push(all_elemets[0])
    }

    /**
     * Shifts all elements by the number of times provided
     * @example
     * linkedList.shiftBy(6)
     * linkedList.shiftBy(-3)
     * @param {Number} times the number of time to shift the items by. Must be Integer
     * @returns {void}
    */

    shiftBy(times) {
        if(times < 0) {
            for(let i = 0; i > times; i--) {
                this.unshift()
            }
        } else if (times > 0) {
            for(let i = 0; i < times; i++) {
                this.shift()
            }
        }
    }

    /**
     * Splices a linked list. Overwrites the original and removes the spliced elements.
     * Returns a new linked list with removed elements
     * @example
     * linkedList.splice(1, 3)
     * @example
     * linkedList.splice(1, 3, "hello")
     * //"inserts hello at index 0"
     * @param {Number} start the start index of the splice. Must be Integer
     * @param {Number} end the end index of the splice. Must be Integer
     * @param {*} insert the values to be inserted
     * @returns {LinkedList} A linked list of all elements removed
    */

    splice(start = 0, end = this.#size - 1, ...insert) {
        let list = new LinkedList()
    

        if(end < start) {
            return list
        } else if(start < 0 || end < 0 || start >= this.#size || end >= this.#size) {
            throw new Error(`${start < 0 || start >= this.#size ? "start" : "end"} is not in range from '0' to '${this.#size}'`)
        }

        for(let i = start; i <= end; i++) {
            list.push(this.get(i))
        }

        this.shiftBy(-start)
        this.popBy(-end)

        let len = 0;

        for(let i of insert) {
            if (Array.isArray(i)) {
                i = i.flat(Infinity)
                for (let j = 0; j < i.length; j++) {
                    this.push(i[j])
                    len++
                }
            } else {
                this.push(i)
                len++
            }
        }
        
        this.shiftBy(len + 1)

        return list
    }

    /**
     * Splices a linked list. Overwrites the original and removes the spliced elements.
     * Returns a new linked list with removed elements
     * @example
     * linkedList.cut(1, 3)
     * @example
     * linkedList.cut(1, 3, "hello")
     * //"inserts hello at index 0"
     * @param {Number} start the start index of the splice. Must be Integer
     * @param {Number} length the count of items to be spliced. Must be Integer
     * @param {*} insert the values to be inserted
     * @returns {LinkedList} A linked list of all elements removed
    */
    cut(start, length, ...insert) {
        if(length < 0) {
            throw new Error("Cannot splice a negative length")
        }
        return this.splice(start, start + length - 1, ...insert)
    }

    /**
     * Returns a string representation of the list. Currently in development
     * @returns {String} a string representation of the linkedList
    */

    toString() {
        if(this.#head == null) {
            return null
        }
        return `LinkedList: ${this.#head.toString()}`
    }

    /** 
     * Converts an given params to a Linked List
     * @example
     * LinkedList.toLinkedList(1, 2, ["hello", "bye"])
     * @param {*} data - the items to be converted
     * @returns {LinkedList} the linked list of the items
    */

    static toLinkedList(...data) {
        let linked = new LinkedList()
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

    /** 
     * Makes a copy of list
     * @example
     * LinkedList.copy(linkedlist)
     * @param {LinkedList} list - the list to be copied
     * @returns {LinkedList} the copy of the list
    */

    static copy(list) {
        let linkedlist = new LinkedList()
        for (let i = 0; i < list.size; i++) {
            linkedlist.push(list.get(i))
        }
        return linkedlist
    }

    /** 
     * Converts the linked list into an array
     * @example
     * LinkedList.toArray(linkedlist)
     * @param {LinkedList} list - the list to be converted
     * @returns {Array} the array of the list
    */

    static toArray(list) {
        let iter = list.iterator()
        let array = []

        array.push(iter.current())
        while(iter.hasNext()) {
            array.push(iter.next())
        }

        return array
    }
}

/**
 * A node item. Has a value and an optional reference to next value
 * @example
 * let some_node = new Node("Bye")
 * let node = new Node("Hello", some_node)
*/
class Node {
    #value;
    #next;

    /**
     * Creates the new node
     * @param {any} value - the value of the node
     * @param {Node | Null} next - (Optional) the reference to next node
     * @returns {Node} the node created
    */
    constructor(value, next = null) {
        this.#value = value
        this.#next = next
    }

    get value() {
        return this.#value
    }

    get next() {
        return this.#next
    }

    set value(val) {
        this.#value = val;
    }

    set next(val) {
        this.#next = val;
    }

    /**
     * Returns a string representation of the node. Currently in development
     * @returns {String} a string representation of the node
    */
    toString() {
        return `Node: { value: { ${this.#value} }, next: { ${this.#next} } }`
    }
    
    /**
     * Returns if the node has next
     * @returns {boolean} 
    */

    hasNext() {
        return this.next != null
    }

    /** 
     * Makes a copy of node
     * @example
     * Node.copy(node)
     * @param {Node} node - the list to be copied
     * @returns {Node} the copy of the list
    */
    static copy(node) {
        return new Node(node.value, node.next)
    }
}

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

module.exports = { LinkedList, Node }
