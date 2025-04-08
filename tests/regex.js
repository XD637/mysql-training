const regex = /cat/;
const text = "I Have a cat";
console.log(regex.test(text));

function validateEmail(email){
    const regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
    return regex.test(email);
}

console.log(validateEmail("examples@mail.com"));