function outerFunc(outerVariable) {
    return function  innerFunc(innerVariable) {
        console.log('Outer variable:', outerVariable);
        console.log('Inner variable:', innerVariable);
    }
}

const newFunc = outerFunc('Outer Value');
newFunc('Inner Value');





