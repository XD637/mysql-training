
class Person{
    constructor(name,age){
        this.name = name;
        this.age = age;
    }
    greet(){
        console.log(`Hi, I'm ${this.name} and I'm ${this.age} years old.`);
    }

}

//inheritance

class Student extends Person{
    constructor(name,age,grade){
        super(name, age);
        this.grade = grade;
    }
    study(){
        console.log(`${this.name} is studying in grade ${this.grade}.`);
    }
}

const person1 = new Person("jane", 25);
person1.greet();

const student1 = new Student("Kath", 19, 'A');
student1.greet();
student1.study();

//encapsulation

class BankAccount {
    #balance;
    constructor(owner, balance) {
        this.owner = owner;
        this.#balance = balance;
    }
    deposit(amount) {
        this.#balance += amount;
        console.log(`Deposited $${amount}. New balance: $${this.#balance}`);
    }
    getBalance(){
        return this.#balance;
    }
}

const account = new BankAccount("john",1000);
account.deposit(500);
console.log(account.getBalance);

//polymorphism

class Animal {
    speak(){
        console.log("this animal makes a sound");
    }
}

class Cat extends Animal {
    speak(){
        console.log("the cat meows.");
    }

}
class Dog extends Animal {
    speak(){
        console.log("the Dog barks.");
    }

}

const animals = [ new Cat(), new Dog(), new Animal()];

animals.forEach(a => a.speak());

