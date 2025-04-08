const num = [1,2,3,4,5,6,7,8];
//func
num.push(9);
num.unshift(0);
num.pop();
num.shift();
console.log(num);
console.log(num.length);

//iteration

num.forEach((n) => {
    console.log(n*n);
})

//map

const sqr = num.map(num => num**2);
console.log(sqr);

