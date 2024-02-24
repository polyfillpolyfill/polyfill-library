/* global Symbol, ArrayIterator*/
HTMLCollection.prototype[Symbol.iterator] = function () {
  return new ArrayIterator(this);
};
