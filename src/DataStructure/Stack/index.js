import cloneDeep from 'clone-deep';

class Stack {
  constructor() {
    this.array = [];
  }

  push(element) {
    this.array.push(element);
  }

  pop() {
    const size = this.size();
    if (size > 0) {
      return this.array.splice(this.array.length - 1, 1)[0];
    }
    return null;
  }

  size() {
    return this.array.length;
  }

  print() {
    const length = this.size();
    const reverseStack = cloneDeep(this.array).reverse();
    for(let i = 0; i < length; i++) {
      console.log(`| ${reverseStack[i]} |`);
    }
  }

  top() {
    const size = this.size();
    if (size > 0) {
      return this.array[size - 1];
    }
    return null;
  }

  isEmpty() {
    return this.size() === 0;
  }
}

export default Stack;