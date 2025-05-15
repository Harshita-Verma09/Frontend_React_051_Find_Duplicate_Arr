Markdown

# Smallest Range in K Sorted Lists

## Problem Description

Given a 2D integer array `arr[][]` of size `k*n`, where each row is sorted in ascending order, the task is to find the smallest range `[l, r]` that includes at least one element from each of the `k` lists. If more than one such range exists, return the first one encountered.

**Difficulty:** Hard

**Examples:** 


## Solution Approach

The solution utilizes a min-heap to efficiently find the smallest range. The core idea is to maintain a sliding window of elements, ensuring that the window always contains at least one element from each of the `k` sorted lists. We then iteratively adjust this window to minimize its size.

**Algorithm:**

1.  **Initialization:**
    * `k`: The number of sorted lists (rows in `arr`).
    * `pointers`: An array of size `k` to keep track of the current index being considered in each list, initialized to all zeros.
    * `minHeap`: A min-priority queue to store tuples of `[value, listIndex]`, where `value` is the current element and `listIndex` is the index of the list it belongs to.
    * `maxVal`: Keeps track of the maximum value currently present in the `minHeap`.
    * `rangeStart`, `rangeEnd`: Variables to store the start and end of the smallest range found so far, initialized to `0` and `Infinity` respectively.

2.  **Initial Heap Population:**
    * Iterate through the first element of each of the `k` lists.
    * Push a tuple `[arr[i][0], i]` into the `minHeap`.
    * Update `maxVal` with the maximum of these initial elements.

3.  **Iterative Range Minimization:**
    * While it's possible to extract an element from each of the `k` lists (i.e., we haven't reached the end of any list for the current minimum element):
        * Extract the minimum element `[minVal, listIndex]` from the `minHeap`.
        * Check if the current range `(maxVal - minVal)` is smaller than the smallest range found so far `(rangeEnd - rangeStart)`. If it is, update `rangeStart = minVal` and `rangeEnd = maxVal`.
        * Advance the pointer for the list from which the minimum element came (`pointers[listIndex]++`).
        * If the pointer for `listIndex` reaches the end of that list (`arr[listIndex].length`), it means we cannot include an element from this list in any further valid range, so we break the loop.
        * Otherwise, get the next element from the same list: `nextVal = arr[listIndex][pointers[listIndex]]`.
        * Push `[nextVal, listIndex]` into the `minHeap`.
        * Update `maxVal = Math.max(maxVal, nextVal)`.

4.  **Return Result:**
    * Return the `[rangeStart, rangeEnd]`.

## Implementation (JavaScript)

```javascript
class Solution {
  findSmallestRange(arr) {
    const k = arr.length;
    const pointers = new Array(k).fill(0);
    const minHeap = [];
    let maxVal = -Infinity;
    let rangeStart = 0;
    let rangeEnd = Infinity;

    // Initialize min-heap with the first element of each list
    for (let i = 0; i < k; i++) {
      heapq.heappush(minHeap, [arr[i][0], i]);
      maxVal = Math.max(maxVal, arr[i][0]);
    }

    while (true) {
      const [minVal, listIndex] = heapq.heappop(minHeap);

      // Update the smallest range if the current range is smaller
      if (maxVal - minVal < rangeEnd - rangeStart) {
        rangeStart = minVal;
        rangeEnd = maxVal;
      }

      // Move to the next element in the list from which the minimum element came
      pointers[listIndex]++;

      // If we have reached the end of any list, we can stop
      if (pointers[listIndex] === arr[listIndex].length) {
        break;
      }

      // Add the next element from the same list to the min-heap
      const nextVal = arr[listIndex][pointers[listIndex]];
      heapq.heappush(minHeap, [nextVal, listIndex]);
      maxVal = Math.max(maxVal, nextVal);
    }

    return [rangeStart, rangeEnd];
  }
}

// Helper function for min-heap implementation (using array-based heap)
const heapq = {
  heap: [],
  parent: (i) => Math.floor((i - 1) / 2),
  left: (i) => 2 * i + 1,
  right: (i) => 2 * i + 2,

  swap: function (i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  },

  heapifyUp: function (i) {
    while (i > 0 && this.heap[this.parent(i)][0] > this.heap[i][0]) {
      this.swap(i, this.parent(i));
      i = this.parent(i);
    }
  },

  heapifyDown: function (i) {
    const n = this.heap.length;
    while (true) {
      let smallest = i;
      const l = this.left(i);
      const r = this.right(i);

      if (l < n && this.heap[l][0] < this.heap[smallest][0]) {
        smallest = l;
      }

      if (r < n && this.heap[r][0] < this.heap[smallest][0]) {
        smallest = r;
      }

      if (smallest !== i) {
        this.swap(i, smallest);
        i = smallest;
      } else {
        break;
      }
    }
  },

  heappush: function (val) {
    this.heap.push(val);
    this.heapifyUp(this.heap.length - 1);
  },

  heappop: function () {
    if (this.heap.length === 0) {
      return null;
    }
    if (this.heap.length === 1) {
      return this.heap.pop();
    }
    const minVal = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown(0);
    return minVal;
  },

  size: function () {
    return this.heap.length;
  },
};
``` 
** Time and Space Complexity
Time Complexity: $O(N \log k)$, where $N$ is the total number of elements across all $k$ lists. In the worst case, we might process each element once, and each heap operation takes $O(\log k)$ time.
Space Complexity: $O(k)$, as the min-heap will at most contain one element from each of the $k$ lists. The pointers array also takes $O(k)$ space.
Key Considerations
The input lists are guaranteed to be sorted, which is essential for the efficiency of this algorithm.
The use of a min-heap allows for efficient tracking of the smallest element across the current window of elements from the k lists.
The algorithm naturally finds the "first" smallest range because it iteratively shrinks the range and updates the result whenever a smaller valid range is encountered.
<!-- end list -->
