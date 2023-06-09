export const shiftBy = (arr: number[], shift: number) => {
  // The solution below runs at time complexity of O(n) (worst case if shift = n)
  if (arr.length <= 1) return arr;

  shift = shift % arr.length;
  let i = 0;
  if (shift > 0) {
    while (i < shift) {
      arr.unshift(arr.pop()!);
      i++;
    }
  } else if (shift < 0) {
    while (i > shift) {
      arr.push(arr.shift()!);
      i--;
    }
  }
  return arr;
};
