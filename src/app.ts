function globalFunction() {
    //Function invoked from the global scope and hence "this" will be the Window object
    console.log(this);
}
globalFunction();

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