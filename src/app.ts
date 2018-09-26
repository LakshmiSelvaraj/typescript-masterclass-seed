function globalFunction(this:any, welcomeMessage) {
    console.log(welcomeMessage);
    //Function invoked from the global scope and hence "this" will be the Window object
    console.log(this);
}
globalFunction("Hello from global invocation!");

const obj = {
    name: 'Lakshmi',
    getWelcomeMessage():string {
        console.log(`"This" inside a function in an object: `);
        //this will point to the obj as that is where it is called from
        console.log(this);
        return `Hello ${name}!`;
    }
}

obj.getWelcomeMessage();

class Person {
    constructor(name:string) {

    }

    getWelcomeMessage():string {
        console.log(`"This" inside a function in an object: `);
        //this will point to an object of the Person class
        console.log(this);
        return `Hello ${name}!`;
    }
}

const personObj = new Person('Lakshmi');
personObj.getWelcomeMessage();

//call, apply and bind - allow us to bind this to an object of choice
globalFunction.call(obj, 'Hello from "call" where the argument list needs to be a comma separated list!');
globalFunction.apply(obj, ['Hello from "apply" where the argument list needs to be an array!']);

//Can be used when the same function has to be invoked multiple times bound to the same object
const boundObjFunction = globalFunction.bind(obj);
boundObjFunction( 'Hello from bound function using the bind keyword called first time');
boundObjFunction( 'Hello from bound function using the bind keyword called second time');

//Typing 'this'; If we want to be truly typesafe with this, then we can strongly type this by specifying the type as the first
//argument to any function. noImplicitThis when set to true in tsconfig.json, will call out places in the code where the type of this
//is being inferred.
const element = document.querySelector('.click');
function handleClickEvent(this:HTMLAnchorElement, event: Event) {
    event.preventDefault();
    console.log("Inside the click event handler");
    console.log(this.href);
}
element.addEventListener('click', handleClickEvent, false);

//typeof - Once you have an obj/var with a structure you can easily create a type from that structure 
const person = {
    name: 'Lakshmi',
    age: 31
}

type PersonType = typeof person;
//To write a function that accepts an object that looks like person we can do something like this.
function printPersonDetails(person:PersonType) {
    console.log(person.name);
    console.log(person.age);
}

printPersonDetails(person);
//printPersonDetails({name: 'XYZ'}); //error as age is missing
printPersonDetails({name: 'XYZ', age:25});

//keyof
type PersonKeysType = keyof PersonType;
function getPersonKeysType(personKey: PersonKeysType) {
    console.log(personKey);
}
getPersonKeysType('name');
getPersonKeysType('age');
//getPersonKeysType('naem');//ERROR