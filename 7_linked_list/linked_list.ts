class Nodes {
  private value: number;
  private next: Nodes | null;

  arrToLinkedList(arr: number[], index: number = 0) {
    if (arr.length <= 0) return null;

    if (index === arr.length) {
      return null;
    }

    const newNode = index === 0 ? this : new Nodes();

    newNode.value = arr[index];
    newNode.next = this.arrToLinkedList(arr, index + 1);

    return newNode;
  }

  insert(
    element: number,
    index: number = 0,
    currentIndex: number = 0,
    currentNode: Nodes | null = this
  ) {
    if (!currentNode) return console.log("This index does not exist!");

    if (currentIndex !== index)
      return this.insert(element, index, currentIndex + 1, currentNode.next);

    if (Object.keys(currentNode).length === 0) {
      this.value = element;
      this.next = null;
      return;
    }

    const oldNode = new Nodes();

    oldNode.value = currentNode.value;
    oldNode.next = currentNode.next;

    currentNode.value = element;
    currentNode.next = oldNode;
  }

  update(
    newValue: number,
    index: number,
    currentIndex: number = 0,
    currentNode: Nodes | null = this
  ) {
    if (!currentNode || Object.keys(currentNode).length === 0)
      return console.log("This index does not exist!");

    if (currentIndex !== index)
      return this.update(newValue, index, currentIndex + 1, currentNode.next);

    currentNode.value = newValue;
  }

  find(
    value: number,
    currentIndex: number = 0,
    currentNode: Nodes | null = this
  ): number | null {
    if (!currentNode || Object.keys(currentNode).length === 0) return null;

    if (currentNode.value !== value)
      return this.find(value, currentIndex + 1, currentNode.next);

    return currentIndex;
  }

  length(index: number = 0, currentNode: Nodes | null = this): number {
    if (!currentNode || Object.keys(currentNode).length === 0) return index;

    return this.length(index + 1, currentNode.next);
  }

  delete(
    index: number = 0,
    currentIndex: number = 0,
    currentNode: Nodes | null = this
  ) {
    if (!currentNode) return console.log("This node does not exist!");

    if (index !== currentIndex)
      return this.delete(index, currentIndex + 1, currentNode.next);

    const nextNode = currentNode.next;

    if (!nextNode) return (currentNode = null);

    currentNode.value = nextNode.value;
    currentNode.next = nextNode.next;
  }

  print() {
    console.log(this);
    console.log(this.value);
  }
}

const linkedList = new Nodes();

// 2nd argument is optional, if you only want to insert at a certain index.
linkedList.insert(15);

linkedList.insert(13);

// Takes 2 arguments, value and the index you want to update.
linkedList.update(12, 1);

// You can put an index here to delete a certain index
linkedList.delete();

// This function will return the index if the input provided is found.
console.log(linkedList.find(12));

console.log(linkedList.length());

linkedList.print();
