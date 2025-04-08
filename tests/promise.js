
const myPromise = new Promise((resolve,reject) =>{
    const condition = true ;

    if (condition) {
        resolve("The operation succeeded");
    } else {
        reject("The operation failed");
    }
})

myPromise
    .then(result => console.log(result))
    .catch(error => console.log(error));

const userOrder = {
    items: ["Laptop", "Mouse"],
    paymentInfo: { valid: true }
};


function validateOrder(order) {
    return new Promise((resolve,reject) => {
        setTimeout(()=>{
            if (order.items.length > 0){
                resolve("Order validated");
            } else {
                reject("Validatiom failed")
            }
        }, 1000);
    })
}

function processPayment(order){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            if (order.paymentInfo.valid){
                resolve("Payment Valid");
            } else {
                reject("Payment Invalid")
            }
        }, 1000)
    })
}

function confirmOrder(order){
    return new Promise((resolve)=>{
        setTimeout(()=>resolve("Order Confirmed"), 2000)
    })
}

validateOrder(userOrder)
    .then(result => {
        console.log(result);
        return processPayment(userOrder);
    })
    .then(result  => {
        console.log(result);
        return confirmOrder(userOrder);
    })
    .then(result => {
        console.log(result);
    })
    .catch(error => {
        console.log('error :>> ', error);
    })
    .finally(() => {
        console.log("Completed");
    })
