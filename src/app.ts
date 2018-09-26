function globalFunction(welcomeMessage) {
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