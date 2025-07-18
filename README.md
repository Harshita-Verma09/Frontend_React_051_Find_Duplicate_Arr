# Smallest Range in K Sorted Lists

## Problem Description

Given a 2D integer array `arr[][]` of size `k*n`, where each row is sorted in ascending order, the task is to find the smallest range `[l, r]` that includes at least one element from each of the `k` lists. If more than one such range exists, return the first one encountered.

**Difficulty:** Hard

## Solution Approach

The solution uses a min-heap to efficiently find the smallest range. The main idea is to maintain a sliding window of elements, ensuring the window always contains at least one element from each of the `k` sorted lists. The window is adjusted iteratively to minimize its size.

### Algorithm Steps

1. **Initialization:**
   - `k`: Number of sorted lists.
   - `pointers`: Array to track the current index in each list.
   - `minHeap`: Min-priority queue storing `[value, listIndex]`.
   - `maxVal`: Tracks the maximum value in the current window.
   - `rangeStart`, `rangeEnd`: Store the smallest range found.

2. **Initial Heap Population:**
   - Push the first element of each list into the min-heap.
   - Update `maxVal` with the maximum of these elements.

3. **Iterative Range Minimization:**
   - While all lists have elements in the window:
     - Extract the minimum element from the min-heap.
     - If the current range is smaller than the previous, update `rangeStart` and `rangeEnd`.
     - Advance the pointer for the list from which the minimum element came.
     - If any list is exhausted, break.
     - Otherwise, push the next element from that list into the min-heap and update `maxVal`.

4. **Return Result:**
   - Return `[rangeStart, rangeEnd]`.

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

// Helper function for min-heap implementation
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

## Time and Space Complexity

- **Time Complexity:** $O(N \log k)$, where $N$ is the total number of elements across all $k$ lists. Each heap operation takes $O(\log k)$ time.
- **Space Complexity:** $O(k)$, as the
