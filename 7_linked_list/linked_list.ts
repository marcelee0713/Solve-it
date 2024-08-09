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

  insert(element: number, currentNode: Nodes = this, index: number) {
    if (index === 0) {
      const oldNode = this;

      this.value = element;
      this.next = oldNode;
    }

    // TODO Complete LinkedList
  }

  update(index: number, newValue: string) {}

  find(value: number) {}

  length() {}

  delete(index?: number) {}

  print() {
    console.log(this);
    console.log(this.value);
    console.log(this.next);
  }
}

const linkedList = new Nodes();

linkedList.arrToLinkedList([12, 15, 64, 43, 80, 100]);
