type HeapType = "min" | "max";
class Heap {
  private heap: number[] = [];

  buildHeap(type: HeapType, givenArray: number[]) {
    if (!givenArray.length) {
      return console.log("Empty Array");
    }

    let i = 0;
    let lastIndex: number | null = null;

    // Note: This is basically a heapify already
    // by using a up-bottom approach
    while (i < givenArray.length) {
      // If a node is currently traversing do not
      // put something in our current heap.
      if (!lastIndex) this.heap[i] = givenArray[i];

      const pIndex = Math.floor((i - 1) / 2);

      const condition =
        type === "min"
          ? !(this.heap[i] <= this.heap[pIndex])
          : !(this.heap[i] >= this.heap[pIndex]);

      if (!this.heap[pIndex] || condition) {
        i = lastIndex ?? i + 1;
        lastIndex = null;
        continue;
      }

      [this.heap[pIndex], this.heap[i]] = [this.heap[i], this.heap[pIndex]];

      if (!lastIndex) {
        lastIndex = i + 1;
      }

      i = pIndex;
    }
  }

  heapify(type: HeapType, mode: "up" | "down") {
    if (type === "max") {
      // Max-Heapify
      if (mode === "up") {
        // up-bottom approach
        for (let i = this.heap.length - 1; i >= 0; i--) {
          this.maxHeapify(i);
        }
        return;
      }

      // bottom-up approach
      for (let i = 0; i < this.heap.length; i++) {
        this.maxHeapify(i);
      }
    } else {
      // Min-Heapify
      if (mode === "up") {
        // up-bottom approach
        for (let i = this.heap.length - 1; i >= 0; i--) {
          this.minHeapify(i);
        }
        return;
      }

      // bottom-up approach
      for (let i = 0; i < this.heap.length; i++) {
        this.minHeapify(i);
      }
    }
  }

  maxHeapify(index: number) {
    const left = 2 * index + 1;
    const right = 2 * index + 2;
    let largest: number = index;

    if (this.heap[largest] < this.heap[left]) {
      largest = left;
    }

    if (this.heap[largest] < this.heap[right]) {
      largest = right;
    }

    if (index !== largest) {
      [this.heap[index], this.heap[largest]] = [
        this.heap[largest],
        this.heap[index],
      ];

      this.maxHeapify(largest);
    }
  }

  minHeapify(index: number) {
    const left = 2 * index + 1;
    const right = 2 * index + 2;
    let largest: number = index;

    if (this.heap[largest] > this.heap[left]) {
      largest = left;
    }

    if (this.heap[largest] > this.heap[right]) {
      largest = right;
    }

    if (index !== largest) {
      [this.heap[index], this.heap[largest]] = [
        this.heap[largest],
        this.heap[index],
      ];

      this.maxHeapify(largest);
    }
  }

  insert(element: number, type: HeapType) {
    const lastIndex = this.heap.length;

    this.heap[lastIndex] = element;

    this.heapify(type, "up");
  }

  delete(type: HeapType): number {
    const lastIndex = this.heap.length - 1;
    const i = this.heap[0];

    this.heap[0] = this.heap[lastIndex];

    this.heap.pop();

    this.heapify(type, "down");

    return i;
  }

  sort(type: HeapType): number[] {
    const originalHeap = [...this.heap];
    const tempArr: number[] = [];
    let i = this.heap.length - 1;

    while (i >= 0) {
      tempArr[i] = this.delete(type);
      i--;
    }

    this.heap = originalHeap;

    return type === "min" ? tempArr.reverse() : tempArr;
  }

  print() {
    const n = this.heap.length;
    const levels = Math.ceil(Math.log2(n + 1));

    for (let level = 0; level < levels; level++) {
      const startIdx = Math.pow(2, level) - 1;
      const endIdx = Math.min(Math.pow(2, level + 1) - 1, n);

      let levelStr = "";
      for (let i = startIdx; i < endIdx; i++) {
        levelStr += this.heap[i] + " ";
      }
      console.log(levelStr.trim());
    }
  }
}

// Make sure the "types" are the same
const heap = new Heap();
heap.buildHeap("max", [20, 30, 15, 10, 25]);
heap.delete("max"); // Automatically uses heapify
heap.insert(50, "max"); // Automatically uses heapify
heap.print(); // Make sure to have quokka extension installed to hover and see the result.
