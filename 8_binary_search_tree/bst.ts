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

  buildTree(
    arr: number[],
    start: number = 0,
    end: number = arr.length - 1
  ): node | null {
    if (start > end) return null;

    const middleIndex = Math.floor((start + end) / 2);

    const currNode = new node(arr[middleIndex]);

    currNode.left = this.buildTree(arr, start, middleIndex - 1);
    currNode.right = this.buildTree(arr, middleIndex + 1, end);

    return currNode;
  }

  rebalance() {
    const sortedArr = this.inOrderTraversal();

    this.root = this.buildTree(sortedArr);
  }

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
  ) {
    if (!currentNode) return null;

    if (value === currentNode.value) {
      const { left, right } = currentNode;

      if (!left && !right) {
        if (!parentNode) return null;

        console.log(currentNode.value);

        if (parentNode.left === currentNode) {
          parentNode.left = null;
        } else {
          parentNode.right = null;
        }

        return;
      }

      if (!left && right) {
        currentNode = right;

        if (!parentNode) return null;

        parentNode.right = right;
        return;
      }

      if (left && !right) {
        currentNode = left;

        if (!parentNode) return null;

        parentNode.left = left;
        return;
      }

      const rightSubTree = currentNode.right;

      this.searchMinimumAndReplace(rightSubTree, currentNode);
    }

    if (value < currentNode.value) {
      return this.delete(value, currentNode.left, currentNode);
    } else {
      return this.delete(value, currentNode.right, currentNode);
    }
  }

  searchMinimumAndReplace(
    currentNode: node | null,
    parentNode: node,
    newNode: node = parentNode
  ) {
    if (currentNode === null) return null;

    if (!currentNode.left && currentNode.right) {
      newNode.value = currentNode.value;

      const right = currentNode.right;

      if (parentNode.left === currentNode) {
        parentNode.left = right;
      } else {
        parentNode.right = right;
      }

      return;
    }

    if (!currentNode.left && !currentNode.right) {
      newNode.value = currentNode.value;

      if (parentNode.left === currentNode) {
        parentNode.left = null;
      } else {
        parentNode.right = null;
      }

      return null;
    }

    this.searchMinimumAndReplace(currentNode.left, currentNode, newNode);
  }

  search(value: number, currNode: node | null = this.root): node | null {
    if (!currNode) return null;

    if (currNode.value === value) return currNode;

    if (value < currNode.value) {
      if (!currNode.left) return null;

      return this.search(value, currNode.left);
    } else {
      if (!currNode.right) return null;

      return this.search(value, currNode.right);
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

  height(currNode: node | null = this.root): number {
    if (!currNode) return -1;

    const left = this.height(currNode.left);

    const right = this.height(currNode.right);

    return Math.max(left, right) + 1;
  }

  depth(
    val: number,
    currNode: node | null = this.root,
    depthValue: number = 0
  ): number {
    if (!currNode) return -1;

    if (currNode.value === val) return depthValue;

    depthValue += 1;

    const left = this.depth(val, currNode.left, depthValue);

    const right = this.depth(val, currNode.right, depthValue);

    return Math.max(left, right);
  }

  isBalance(currNode: node | null = this.root): boolean {
    if (!currNode) return false;

    const leftHeight = this.height(currNode.left);

    const righHeight = this.height(currNode.right);

    console.log(leftHeight);

    console.log(righHeight);

    return Math.abs(leftHeight - righHeight) <= 1;
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
    // If you have Quokka VSCode Extension
    // You would see how the structure of the tree right here.
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };
}

const tree = new Tree();

tree.root = tree.buildTree([8, 3, 11, 1, 7, 10, 15].sort((a, b) => a - b));

tree.insert(0.1);
tree.insert(0.01);

console.log(tree.search(0));

console.log(tree.inOrderTraversal());

console.log(tree.preOrderTraversal());

console.log(tree.postOrderTraversal());

console.log(tree.levelOrderTraversal());

console.log(tree.height());

console.log(tree.depth(60));

console.log(tree.isBalance());

console.log(tree.rebalance());

console.log(tree.isBalance());

tree.prettyPrint();
