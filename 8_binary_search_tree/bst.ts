class node {
  value: number;
  left: node | null;
  right: node | null;

  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  root: node | null;

  insert(value: number, currNode: node | null = this.root) {
    if (!currNode) return (this.root = new node(value));

    if (!currNode) return null;

    if (value < currNode.value) {
      if (!currNode.left) return (currNode.left = new node(value));

      this.insert(value, currNode.left);
    } else {
      if (!currNode.right) return (currNode.right = new node(value));

      this.insert(value, currNode.right);
    }
  }

  delete(
    value: number,
    currentNode: node | null = this.root,
    parentNode: node | null = null
  ): node | null {
    if (!currentNode) return null;

    if (value === currentNode.value) {
      const { left, right } = currentNode;

      if (!left && !right) return (currentNode = null);

      if (!left && right) return (currentNode = right);

      if (left && !right) return (currentNode = left);

      const rightSubTree = currentNode.right;

      const newRight = this.findMinimumAndReplace(rightSubTree, currentNode);

      currentNode.right = newRight;
    }

    if (value < currentNode.value) {
      return this.delete(value, currentNode.left, currentNode);
    } else {
      return this.delete(value, currentNode.right, currentNode);
    }
  }

  findMinimumAndReplace(
    currentNode: node | null = this.root,
    parentNode: node | null
  ): node | null {
    if (currentNode === null) return null;

    // if (!currentNode.left && currentNode.right) {
    //   currentNode.value = currentNode.right.value;

    //   currentNode.right = null;

    //   parent
    // }

    if (!currentNode.left && !currentNode.right) {
      return currentNode;
    }

    return this.findMinimumAndReplace(currentNode.left, currentNode);
  }

  find(value: number, currNode: node | null = this.root): node | null {
    if (!currNode) return null;

    if (currNode.value === value) return currNode;

    if (value < currNode.value) {
      if (!currNode.left) return null;

      return this.find(value, currNode.left);
    } else {
      if (!currNode.right) return null;

      return this.find(value, currNode.right);
    }
  }

  levelOrderTraversal(): number[] | null {
    if (!this.root) return null;

    const array: number[] = [];
    const queue: node[] = [];

    queue.push(this.root);

    while (queue) {
      const currentNode = queue.shift();

      if (!currentNode) break;

      array.push(currentNode.value);

      if (currentNode.left) queue.push(currentNode.left);

      if (currentNode.right) queue.push(currentNode.right);
    }

    return array;
  }

  inOrderTraversal(
    currNode: node | null = this.root,
    arr: number[] = []
  ): number[] {
    if (!currNode) return arr;

    this.inOrderTraversal(currNode.left, arr);
    arr.push(currNode.value);
    this.inOrderTraversal(currNode.right, arr);

    return arr;
  }

  preOrderTraversal(
    currNode: node | null = this.root,
    arr: number[] = []
  ): number[] {
    if (!currNode) return arr;

    arr.push(currNode.value);
    this.preOrderTraversal(currNode.left, arr);
    this.preOrderTraversal(currNode.right, arr);

    return arr;
  }

  postOrderTraversal(
    currNode: node | null = this.root,
    arr: number[] = []
  ): number[] {
    if (!currNode) return arr;

    this.postOrderTraversal(currNode.left, arr);
    this.postOrderTraversal(currNode.right, arr);
    arr.push(currNode.value);

    return arr;
  }

  prettyPrint = (node: node | null = this.root, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };
}

const tree = new Tree();

tree.insert(35);
tree.insert(30);
tree.insert(50);
tree.insert(20);
tree.insert(33);
tree.insert(18);
tree.insert(25);
tree.insert(40);
tree.insert(60);
tree.insert(39);
tree.insert(41);
tree.insert(55);
tree.insert(61);
tree.insert(52);
tree.insert(53);

console.log(tree.find(0));

console.log(tree.inOrderTraversal());

console.log(tree.preOrderTraversal());

console.log(tree.postOrderTraversal());

console.log(tree.levelOrderTraversal());

tree.delete(50);

tree.prettyPrint();
