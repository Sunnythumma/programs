let arr = [2,3,5,1,25,4,12];
let result = [];
arr.sort( (x,y) => x-y );

console.log(arr);
result.push(arr[1],arr[arr.length-2]);
result.join(", ");

console.log(result); 