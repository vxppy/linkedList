# linkedList
An implementation of linkedList

This project is free to edit and make you can own version of this. But your help to improve this would be very helpful
It is a class for JavaScript for Linked List. Currently only has Singly Linked List. Double Linked List is in progress.

Singly Linked List can perform Doubly Linked List functions, but use more memory in that case *this is somthing I have added, will remove once I implement doubly linked list*

### Installing:
Currently, you can't use `npm install linkedList` with this class, so you have to download this from here. *P.S. someone already has their own linkedlist on npm*

### Importing
To import the files, simply use 
```js
const { SingleLinkedList, DoubleLinkedList } = require("filepath/linkedList")

//or if you use relative path then

const { SingleLinkedList, DoubleLinkedList } = require("./location/linkedList")
```

### Using the class
You can use 2 classes avaible. To use all the classes(*basically error messages classes which I created*), just go in the file, and add them to module.exports

To create a LinkedList
```js
let list = new SingleLinkedList()
let list2 = new DoubleLinkedList()
```
To create a Node
```js
let node = new Node()
let node2 = new SingleNode()
let node3 = new DoubleNode()
```

### Functions:
#### 1. SingleLinkedList:

```js
SingleLinkedList.push(item)

//usage

SingleLinkedList.push("Hello world")

//You don't need to turn objects into nodes to add them. Node class is just for you to experiment with.
//push() is also one of the only ways to add arrays as elements of linkedList. Don't push array >:(
```

ok i m tired. i will write here later
