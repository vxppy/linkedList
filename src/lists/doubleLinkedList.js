const { DoubleNode } = require("../nodes/nodes")
const { IndexError, ItemError, RangeError, NumError } = require("../errors/error")

/**
 * A DoubleLinkedList object. Can be used like arrays but items can't be accesed by index
 * @example
 * let some_list = new DoubleLinkedList()
 * @example
 * some_list[0]
 * //will return undefined, instead use
 * some_list.get(0)
*/

class DoubleLinkedList {
    #head
    #size
    #circular = false

    constructor() {
        this.#head = null
        this.#size = 0
    }

    /**
     * Returns the size of the list
     * @returns {Number}
    */

     get size() {
        return this.#size
    }

    /**
     * Returns the first node in list
     * @returns {*}
    */

    get root() {
        return this.#head
    }

    /**
     * Returns the last node in list
     * @returns {*}
    */

    get tail() {
        return this.getNode(this.#size - 1)
    }

    /**
     * Returns if list is circular or not
     * @returns {Boolean}
    */

    get isCircular() {
        return this.#circular
    }

    /**
     * Returns if list is empty or not
     * @returns {Boolean}
    */

    get isEmpty() {
        return this.#size == 0
    }

    /**
     * Add item to end of list
     * @example
     * doubleLinkedList.push("Hello world")
     * @param {any} item - Item to be added to the list
    */

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

    /**
     * Add item to start of list
     * @example
     * doubleLinkedList.pushStart("Hello world")
     * @param {any} item - Item to be added to the list
    */

    pushStart(item) {
        this.insertAt(0, item)
    }

    /**
     * Add multipe items the of list
     * @example
     * doubleLinkedList.pushMany(false, 1, 2, 3)
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
     * doubleLinkedList.pop()
     * @returns {any} Returns the value of item removed.
    */
   
    pop() {
        return this.removeAt(this.#size - 1)
    }

    /**
     * Removes item first item in the list
     * @example
     * doubleLinkedList.popHead()
     * @returns {any} Returns the value of item removed.
    */

    popHead() {
        return this.removeAt(0)
    }
    
    /**
     * Removes items from the list. A positive number remvoes from end and negative from start
     * @example
     * doubleLinkedList.popBy(1)
     * @param {Number} times Number of times to remove item
     * @returns {*[]} Returns the value of item removed.
    */

    popBy(times) {
        let items = []
        if(times > 0) {
            for(let i = 0; i < times; i++) {
                items.push(this.pop())
            }    
        } else if (times < 0) {
            for(let i = 0; i < -times; i++) {
                items.push(this.popHead())
            }    
        }

        return items
    }

    /** 
     * Removes item at specific index
     * @example
     * doubleLinkedList.removeAt(2)
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
            curr.next.previous = prev 
        }

        this.#size--;

        return curr.value;
    }

    /** 
     * Adds item at specific index
     * @example
     * doubleLinkedList.insertAt("Hi", 2)
     * //Adds the "Hi" at index 2
     * @param {Number} index - the index of the item. Must be Integer
     * @param {any} item - the item to be added
    */

    insertAt(index, item) {
        if (index < 0 || index >= this.#size) throw new IndexError(item)

        if (this.has(item)) throw new ItemError(item) 

        let node = new DoubleNode(item);
        let curr, prev;

        curr = this.#head;

        if (index == 0) {
            node.next = this.#head;
            this.#head = node;

            if(this.#circular) {
                this.tail.next = node
                this.#head.prev = this.tail
            }
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

    /** 
     * Replaces the item specified at index with a the one provided
     * @example
     * doubleLinkedList.replacesAt("Hi", 2)
     * //Replace the item at index 2 with "Hi"
     * @param {Number} index - the index of the item. Must be Integer
     * @param {any} item - the item to be added
    */

    replaceAt(index, item) {
        if (index < 0 || index >= this.#size) throw new IndexError(this.#size - 1)

        if (this.has(item) && this.search(item) != index) throw new ItemError(item)

        let node = new DoubleNode(item);
        let curr, prev;

        if (index == 0) {
            this.#head.value = node.value
        } else {
            curr = this.#head;
            let it = 0;

            while (it < index) {
                it++;
                prev = curr;
                curr = curr.next;
            }

            prev.next.value = node.value;
        }
        this.#size
    }

    /**
     * Returns a string representation of the list
     * @example
     * doubleLinkedList.join(", ")
     * //returns a string with items seperated by ", "
     * @param {String} sep - the string to seperate the items by
     * @returns {String} string representation of list
    */

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
     * doubleLinkedList.hasItemInList("Hello")
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
     * doubleLinkedList.search("Hello")
     * @param {any} item - the item to check for. 
     * @returns {Number} index of the item 
    */

    search(item) {
        let current = this.#head;

        let index = 0;
        if (current == null) return -1

        if (current.value == item) return index

        while (current.hasNext()) {
            index++
            if (current.value == item) {
                return index
            }
            current = current.next;
        }

        if (current.value == item) return index
        
        return -1
    }

    /** 
     * Returns the item at the index provided. If index out of bounds, throws error
     * @example
     * doubleLinkedList.get(3)
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
     * Returns the node at the index provided. If index out of bounds, throws error
     * @example
     * doubleLinkedList.getNode(3)
     * //gives the node at index 3 if it exists
     * @param {Number} index - the index of the item. Must be Integer
     * @returns {SingleNode} the node at the index
    */

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
     * Returns an iterable of the DoubleLinkedList
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

    /**
     * Shifts all elements in the list by one
     * @returns {void}
    */

    shift() {
        let change = false
        if(this.#circular) {
            change = true
            this.makeNormal()
        }

        let iter = this.iterator()
        let size = this.#size
        let all_elemets = []

        all_elemets.push(iter.current())
        while(iter.hasNext()) {
            all_elemets.push(iter.next())
        }

        this.#head = new SingleNode(all_elemets[all_elemets.length - 1]);

        for(let i = 0; i < all_elemets.length - 1; i++) {
            this.push(all_elemets[i])
        }

        this.#size = size

        if(change) this.makeCircular()
    }


    /**
     * Shifts all elements in the list by negative one
     * @returns {void}
    */

    unshift() {
        let change = false
        if(this.#circular) {
            change = true
            this.makeNormal()
        }

        let iter = this.iterator()
        let size = this.#size
        let all_elemets = []

        all_elemets.push(iter.current())
        while(iter.hasNext()) {
            all_elemets.push(iter.next())
        }

        this.#head = new SingleNode(all_elemets[1]);

        for(let i = 2; i < all_elemets.length; i++) {
            this.push(all_elemets[i])
        }

        this.#size = size

        this.push(all_elemets[0])

        if(change) this.makeCircular()
    }

    /**
     * Shifts all elements by the number of times provided
     * @example
     * doubleLinkedList.shiftBy(6)
     * doubleLinkedList.shiftBy(-3)
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
     * doubleLinkedList.splice(1, 3)
     * @example
     * doubleLinkedList.splice(1, 3, "hello")
     * //"inserts hello at index 0"
     * @param {Number} start the start index of the splice. Must be Integer
     * @param {Number} end the end index of the splice. Must be Integer
     * @param {*} insert the values to be inserted
     * @returns {DoubleLinkedList} A linked list of all elements removed
    */

    splice(start = 0, end = this.#size - 1, ...insert) {
        let list = new DoubleLinkedList()
    

        if(end < start) {
            return list
        } else if(start < 0 || end < 0 || start >= this.#size || end >= this.#size) {
            throw new RangeError(start < 0 || start >= this.#size ? "start" : "end", this.#size)
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
     * doubleLinkedList.cut(1, 3)
     * @example
     * doubleLinkedList.cut(1, 3, "hello")
     * //"inserts hello at index 0"
     * @param {Number} start the start index of the splice. Must be Integer
     * @param {Number} length the count of items to be spliced. Must be Integer
     * @param {*} insert the values to be inserted
     * @returns {DoubleLinkedList} A linked list of all elements removed
    */

    cut(start, length, ...insert) {
        if(length < 0) {
            throw new NumError("Cannot splice a negative length")
        }
        return this.splice(start, start + length - 1, ...insert)
    }

    /**
     * Makes the list circularly linked, that is, makes the tail item point to the head
    */

    makeCircular() {
        this.#circular = true
        this.tail.next = this.#head
    }

    /**
     * Converts a circular list back to a normal one
    */

    makeNormal() {
        this.#circular = false
        this.tail.next = null
    }

    /**
     * Swaps two items in the list
     * @param {Number} i index of the first item
     * @param {Number} j index of the second item
    */

     swap(i, j) {
        let first_item = this.get(i)
        this.replaceAt(i, this.get(j))
        this.replaceAt(j, first_item)
    }

    /**
     * @callback callbackFunction 
     * @param {*} item
     * @param {Number} index
     * @param {DoubleLinkedList} list 
    */

    /**
     * A function to execute a function on all items in index
     * @param {callbackFunction} callback
     * @returns {void}
    */

    forEach(callback) {
        if(this.#head == null) {
            return
        }

        let change = false
        if(this.#circular) {
            this.makeNormal()
            change = true
        } 

        let iter = this.iterator()
        let index = 0

        callback(iter.current(), index, this)

        while(iter.hasNext()) {
            index++
            callback(iter.next(), index, this)
        }

        if(change) this.makeCircular()
    }

    /**
     * Returns a string representation of the list. Currently in development
     * @returns {String} a string representation of the DoubleLinkedList
    */

    toString() {
        return `DoubleLinkedList: ${this.#head.toString()}`
    }

    /** 
     * Makes a copy of list
     * @example
     * doubleLinkedList.copy(DoubleLinkedList)
     * @param {DoubleLinkedList} list - the list to be copied
     * @returns {DoubleLinkedList} the copy of the list
    */

    static copy(list) {
        let nlist = new DoubleLinkedList()
        for (let i = 0; i < list.size; i++) {
            nlist.push(list.get(i))
        }
        return nlist
    }

    /** 
     * Converts an given params to a Linked List
     * @example
     * doubleLinkedList.toLinkedList(1, 2, ["hello", "bye"])
     * @param {*} data - the items to be converted
     * @returns {DoubleLinkedList} the linked list of the items
    */

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

    /** 
     * Converts the linked list into an array
     * @example
     * doubleLinkedList.toArray(DoubleLinkedList)
     * @param {DoubleLinkedList} list - the list to be converted
     * @returns {Array} the array of the list
    */
   
    static toArray(list) {       
        if(list.root == null) return []

        let change = false
        if(list.isCircular) {
            change = true
            list.makeNormal()
        }

        let iter = list.iterator()
        let array = []

        array.push(iter.current())
        while(iter.hasNext()) {
            array.push(iter.next())
        }

        if(change) this.makeCircular()

        return array
    }
}

module.exports = { DoubleLinkedList }
