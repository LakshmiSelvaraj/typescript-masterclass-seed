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

//Mapped types - all of these types are available built in Typescript too
interface PersonInterface {
    name: string,
    age: number,
    address: {}
    nickname?: string
}
//To create a readonly Person interface type
type ReadOnlyType<T> = {
    readonly [P in keyof T] : T[P];
}

const readOnlyPerson: ReadOnlyType<PersonInterface> = {
    name: 'Lakshmi',
    age: 31,
    address: {}
}
//readOnlyPerson.name = 'XYZ'; //ERROR as readonly

//To create a partial Person interface type
type PartialType<T> = {
    [P in keyof T]?: T[P];//can also be written as [P in keyof T]+?:T[P]
}
const partialPerson: PartialType<PersonInterface> = {
    name: 'XYZ'
}

//To create a fully required Person interface type
// type RequiredType<T> = {
//     [P in keyof T]-?: T[P];
// }

type PickPerson<T, K extends keyof T> = {
    [P in K]: T[P];
}
const pickedPerson: PickPerson<PersonInterface, 'name' | 'age'> = {
    name: 'Lakshmi',
    age: 31
}
//Check out the built in Record mapped type
let dictionary:Record<string, string>

//typeof, instanceof and custom type guards
class Song {
    constructor(public name:string, public duration?: string | number) {
    }
    
    printSong() {
        if(typeof this.duration === 'string') {
            console.log(`${this.name}'s duration is ${this.duration}`);
        } else {
            const minutes = Math.floor(this.duration/60000);
            const seconds = (this.duration/1000) % 60;
            console.log(`${this.name}'s duration is ${minutes}:${seconds}`);
        }

    }
}

const newSong = new Song('Good morning sunshine!', '5:30');
newSong.printSong();
const newSongDurationAsNum = new Song('Good morning sunshine Extended!', 1223000);
newSongDurationAsNum.printSong();

class Playlist {
    constructor(public title:string, public duration:number) {}
}

function printItemName(item: Song | Playlist) {
    if(item instanceof Song) {  //For custom type guard use : isItemSong(item)
        console.log(`Song is: ${item.name}`);
    } else {
        console.log(`Playlist is: ${item.title}`);
    }
}
printItemName(new Song('GoodMorning Sunshine'));

function isItemSong(item: Song | Playlist) : item is Song {
    return 'name' in item;
}

function printItemNameWithCustomGuard(item: Song | Playlist) {
    if(isItemSong(item)) {  //For custom type guard use : isItemSong(item)
        console.log(`Song is: ${item.name}`);
    } else {
        console.log(`Playlist is: ${item.title}`);
    }
}
printItemNameWithCustomGuard(new Song('GoodMorning Sunshine'));
//Literal types
const foo = 'bar'; //Hover over foo will show that the type of foo is bar
let foo1 = 'bar'; //Hover over foo1 will show that the type of foo1 is string

//Intersection types
interface Order {
    id: string,
    currency: string,
    amount: string
}

interface Stripe {
    type: 'stripe'
    card: string,
    cvv: string
}

interface Paypal {
    type:'paypal'
    email: string
}

type CheckoutCard = Order & Stripe;
type CheckoutPaypal = Order & Paypal;

const order = {
    id: "aasid2",
    amount: "100",
    currency: "AUD"
}

const orderWithCard: CheckoutCard = {
    ...order,
    type: 'stripe',
    card: "1000 2000 4000 3000",
    cvv: "100"
}

const orderWithPaypal: CheckoutPaypal = {
    ...order,
    type: 'paypal',
    email: "abc@xyz.com"
}

function processOrder(payload: CheckoutCard | CheckoutPaypal) {
    if(payload.type === 'stripe') {
        console.log("Processing order via stripe card");
    } else {
        console.log("Processing order via paypal");
    }
}

processOrder(orderWithCard);
processOrder(orderWithPaypal);