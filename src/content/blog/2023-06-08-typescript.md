---
date: 2023-06-08
description: "Deep dive with Typescript and its features. Some notes and examples."
draft: false
heroImage: "https://www.typescriptlang.org/images/branding/logo-grouping.svg"
heroImageAlt: "Typescript Logo, credits to Microsoft"
postType: "learning"
pubDate: "2023-06-08"
title: "Typescript"
tags: ["Typescript", "Programming"]
---

## Introduction

I started this journey into Typescript by taking a ton of notes with Github Copilot X and "[Typescript in 50 Lessons](https://typescript-book.com/)". I was able to tailor my experience in understanding how to create types through this method, as well as pouring over the docs. Without further ado, here's some notes that I generated (and modified).

## What is Typescript?

TypeScript is a superset of JavaScript that adds optional static typing and other features to the language. It is designed to make it easier to write and maintain large-scale JavaScript applications. TypeScript code is compiled into JavaScript code that can run in any browser or JavaScript runtime.

TypeScript provides features such as classes, interfaces, enums, and modules that are not available in standard JavaScript. It also includes support for modern JavaScript features such as async/await and decorators.

TypeScript is developed and maintained by Microsoft, and it is open source and free to use. It is widely used in web development, and many popular frameworks and libraries such as Angular, React, and Vue have TypeScript support.

## Static Typing

Static typing in TypeScript allows you to specify the types of variables, function parameters, and return values. This means that you can catch type-related errors at compile-time rather than at runtime.

For example, you can specify that a variable is of type string, and TypeScript will give you an error if you try to assign a number to that variable. Similarly, you can specify that a function takes a parameter of type number, and TypeScript will give you an error if you try to call that function with a string.

Here's an example of a function that takes two numbers and returns their sum, with static typing:

```ts
function addNumbers(x: number, y: number): number {
  return x + y;
}
```

In this example, the x and y parameters are of type number, and the function returns a value of type number. If you try to call this function with non-numeric arguments, TypeScript will give you an error.

In addition, you can declare types for functions separately to the function implementation. This allows you to define a function type once and reuse it in multiple places.

```ts
type SearchFn = (
  query: string,
  tags?: string[] | undefined
) => Promise<Result[]>;
```

The `void` type is used to indicate that a function does not return a value. You can use `void` as the return type of a function to explicitly indicate that the function does not return anything.

Here's an example of a function that returns `void`:

```ts
function logMessage(message: string): void {
  console.log(message);
}
```

In this example, the logMessage function takes a parameter of type string and logs it to the console. The function returns `void`, which means it does not return a value.

### Type Assertions

A type assertion is a way to tell the compiler that you know more about the type of a value than it does. Type assertions are sometimes necessary when working with values that have a more general type than you need.

You can use a type assertion by adding the type you want to assert to the end of an expression, preceded by the as keyword. Here's an example:

```ts
let myValue: any = "hello world";
let myLength: number = (myValue as string).length;
```

In this example, the `myValue` variable is declared as type `any`, which means it can hold any value. We then use a type assertion to tell the compiler that we know `myValue` is actually a `string`, so we can access its `length` property.

You can also use angle bracket syntax (`< >`) to perform a type assertion:

```ts
let myValue: any = "hello world";
let myLength: number = (<string>myValue).length;
```

In this example, the type assertion is performed using angle bracket syntax instead of the as keyword.

It's important to note that type assertions do not change the runtime behavior of your code. They only affect the type checking performed by the TypeScript compiler.

You can use rest parameters to represent an indefinite number of arguments as an array. Rest parameters are denoted by an ellipsis (...) followed by the parameter name.

Here's an example of a function that uses rest parameters:

```ts
function sum(...numbers: number[]): number {
  return numbers.reduce((total, num) => total + num, 0);
}
```

### Primitive Types

There are several primitive types that represent the most basic types of values. These primitive types include:

- `number`: represents numeric values, including integers and floating-point numbers.
- `string`: represents textual values, such as words and sentences.
- `boolean`: represents logical values, either true or false.
- `null`: represents the intentional absence of any object value.
- `undefined`: represents the unintentional absence of any object value.
- `symbol`: represents a unique identifier that can be used as an object property.

```ts
let age: number = 30;
let name: string = "John";
let isStudent: boolean = true;
let favoriteColor: string | null = null;
let phoneNumber: string | undefined = undefined;
let id: symbol = Symbol("id");
```

Non-primitive types are types that are based on objects rather than simple values. These types include:

- `object`: represents any non-primitive value, including arrays, functions, and objects.
- `array`: represents an ordered list of values of a single type.
- `function`: represents a callable object that can be invoked with arguments.
- `class`: represents a blueprint for creating objects that have properties and methods.
- `interface`: represents a contract that describes the shape of an object.
- `enum`: represents a set of named constants.

### Dynamically Generated Types

Dynamically generated types are types that are generated at runtime based on the shape of the data. There are several ways to generate types dynamically in TypeScript:

1. Index signatures: You can use index signatures to define an object type with dynamic keys. For example:

```ts
interface Dictionary<T> {
  [key: string]: T;
}
```

This interface defines a dictionary type with a dynamic key of type `string` and a value of type `T`.

2. Type assertions: You can use type assertions to cast a value to a specific type at runtime.

```ts
const data = JSON.parse(jsonString) as MyType;
```

This code uses a type assertion to cast the parsed JSON data to a specific type called `MyType`.

3. Type guards: You can use type guards to check the type of a value at runtime and conditionally cast it to a specific type. For example:

```ts
function isPerson(obj: any): obj is Person {
  return "name" in obj && "age" in obj;
}

function printPerson(obj: any) {
  if (isPerson(obj)) {
    console.log(`Name: ${obj.name}, Age: ${obj.age}`);
  } else {
    console.log("Not a person");
  }
}
```

4. Intersection types: You can use intersection types to combine multiple types into one.

### Union Types

A union type is a type that can represent values of multiple types. Union types are denoted by the | symbol between the types.

```ts
function printId(id: number | string) {
  console.log(`ID is ${id}`);
}
```

Union types are useful when you want to write code that can handle multiple types of values.

### Intersection Types

An intersection type is a type that combines multiple types into one. Intersection types are denoted by the & symbol between the types.

```ts
interface Named {
  name: string;
}
interface Loggable {
  log(): void;
}
function logName(obj: Named & Loggable) {
  console.log(`Name is ${obj.name}`);
  obj.log();
}
```

Intersection types are useful when you want to write code that can handle objects with multiple sets of properties and methods.

### Value Types

This interface definition ensures that this `Event` must have a `kind` property with one of the three specified values. This can help prevent errors and make the code more self-documenting.

```ts
interface Event {
  kind: "conference" | "meetup" | "webinar";
}
```

### Type Guards

You can use a type guard function to check the type of a value at runtime and conditionally cast it to a specific type. A type guard is a function that returns a boolean value and has a special `obj is Type` syntax that tells TypeScript that the value is of a specific type.

```ts
function isPerson(obj: any): obj is Person {
  return "name" in obj && "age" in obj;
}
```

You can then use the type guard function to conditionally cast a value to a specific type. Here's an example:

```ts
function printPerson(obj: any) {
  if (isPerson(obj)) {
    console.log(`Name: ${obj.name}, Age: ${obj.age}`);
  } else {
    console.log("Not a person");
  }
}
```

### Type Assertions

Type assertions in TypeScript are a way to tell the compiler that you know more about the type of a value than it does. Type assertions are similar to type casting in other languages, but they don't actually change the type of the value at runtime. Type assertions use the `as` keyword.

```ts
const myValue: any = "hello world";
const myLength: number = (myValue as string).length;
```

This can be useful in JSX format too.

```ts
const myComponent = (
  <MyComponent prop1={value1} prop2={value2} />
) as JSX.Element;
```

### Type Aliases

Type aliases in TypeScript are a way to create a new name for an existing type. They allow you to define a custom name for a type that may be complex or difficult to remember.

```ts
type MyType = {
  prop1: string;
  prop2: number;
};

const myVar: MyType = { prop1: 'hello', prop2: 42 };

function myFunc(param: MyType) {
  // function body
}
```

Type aliases can also be used with union types, intersection types, and other advanced type constructs. They can help make your code more readable and maintainable by giving complex types a simpler name.

### Mapped Types

Mapped types in TypeScript are a way to create new types based on an existing type by transforming each property in the original type in a consistent way. Mapped types use the `keyof` keyword to iterate over the keys of an object type and apply a transformation to each key.

```ts
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

interface Person {
  name: string;
  age: number;
}

const myPerson: Readonly<Person> = { name: 'John', age: 30 };
myPerson.name = 'Jane'; // Error: Cannot assign to 'name' because it is a read-only property.
```

Mapped types can be used to create many other types, such as `Partial`, `Pick`, and `Record`. They are a powerful feature of TypeScript that can help make your code more expressive and maintainable.

`Partial` is a mapped type that creates a new type with all properties of the original type set to optional. Here's an example:

```ts
interface Person {
  name: string;
  age: number;
  address: {
    street: string;
    city: string;
  };
}

type PartialPerson = Partial<Person>;

const myPerson: PartialPerson = { name: 'John' };
```

`Pick` is a mapped type that creates a new type with a subset of the properties of the original type. Here's an example:

```ts
interface Person {
  name: string;
  age: number;
  address: {
    street: string;
    city: string;
  };
}

type PersonNameAndAge = Pick<Person, 'name' | 'age'>;

const myPerson: PersonNameAndAge = { name: 'John', age: 30 };
```

`Record` is a mapped type that creates a new type with a set of properties of a given type. Here's an example:

```ts
type MyRecord = Record<string, number>;

const myObj: MyRecord = { a: 1, b: 2, c: 3 };
```

### Type Predicates

A type predicate in TypeScript is a function that takes an argument and returns a boolean value indicating whether the argument is of a certain type. Type predicates are used to narrow the type of a variable or parameter based on a runtime check.

```ts
function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function myFunc(value: unknown) {
  if (isString(value)) {
    // value is now of type string
    console.log(value.toUpperCase());
  } else {
    console.log('Not a string');
  }
}

```

We define a function `myFunc` that takes an argument `value` of type `unknown`. We then use the `isString` function to check if `value` is of type `string`. If it is, we can safely call the `toUpperCase` method on `value` because TypeScript has narrowed the type to `string`.

### never, undefined, null Types

`never` is a type that represents a value that will never occur. It is used to indicate that a function will not return normally, or that a variable will never have a certain value.

```ts
function throwError(message: string): never {
  throw new Error(message);
}
```

`undefined` and `null` are both types and values. The `undefined` type represents a value that is not defined, while the `null` type represents a value that is explicitly set to `null`.

TypeScript also has a `--strictNullChecks` compiler option that can help prevent null and undefined errors. When this option is enabled, variables that are not explicitly set to `null` or `undefined` are considered to be of a non-nullable type. This means that you cannot assign `null` or `undefined` to these variables without first checking for their existence.

## Classes

Classes in TypeScript are a way to define object-oriented programming (OOP) constructs. They allow you to define a blueprint for creating objects that have properties and methods.

Here's an example of a class in TypeScript:

```ts
class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  sayHello() {
    console.log(
      `Hello, my name is ${this.name} and I am ${this.age} years old.`
    );
  }
}
```

In this example, the Person class has two properties (name and age) and a method (sayHello). The constructor method is used to initialize the properties when a new object is created.

You can create a new Person object like this:

```ts
const person = new Person("Alice", 30);
person.sayHello(); // logs "Hello, my name is Alice and I am 30 years old."
```

One of the main differences between TypeScript and JavaScript classes is that TypeScript allows you to specify the types of class properties, method parameters, and return values. This helps catch type-related errors at compile-time rather than at runtime.

Another difference is that TypeScript provides access modifiers such as `public`, `private`, and `protected`, which allow you to control the visibility of class members. This can help you write more secure and maintainable code.

Finally, TypeScript classes can implement interfaces, which are contracts that describe the shape of an object. This can help enforce type checking on objects that implement the interface.

Access modifiers in TypeScript classes are keywords that determine the visibility of class members (properties and methods). There are three access modifiers in TypeScript:

- `public`: Public members are accessible from anywhere, both inside and outside the class.
- `private`: Private members are only accessible from within the class. They cannot be accessed from outside the class, not even from derived classes.
- `protected`: Protected members are accessible from within the class and from derived classes. They cannot be accessed from outside the class hierarchy.

Here's an example of a class with access modifiers:

```ts
class Person {
  public name: string;
  private age: number;
  protected address: string;

  constructor(name: string, age: number, address: string) {
    this.name = name;
    this.age = age;
    this.address = address;
  }

  public sayHello() {
    console.log(
      `Hello, my name is ${this.name} and I am ${this.age} years old.`
    );
  }

  private getAge() {
    return this.age;
  }

  protected getAddress() {
    return this.address;
  }
}
```

In this example, the `name` property is `public`, so it can be accessed from anywhere. The age property is `private`, so it can only be accessed from within the `Person` class. The `address` property is protected, so it can be accessed from within the `Person` class and from derived classes.

### Abstract Class

An abstract class is a class that cannot be instantiated directly. Instead, it is meant to be subclassed by other classes that provide concrete implementations of its abstract methods.

An abstract class can have both abstract and non-abstract methods. Abstract methods are declared without an implementation, and must be implemented by any concrete subclass. Non-abstract methods can have an implementation, and can be called by concrete subclasses.

Here's an example of an abstract class in TypeScript:

```ts
abstract class Animal {
  abstract makeSound(): void;

  move(distanceInMeters: number) {
    console.log(`Animal moved ${distanceInMeters}m.`);
  }
}

class Dog extends Animal {
  makeSound() {
    console.log("Woof! Woof!");
  }
}

const dog = new Dog();
dog.makeSound(); // logs "Woof! Woof!"
dog.move(10); // logs "Animal moved 10m."
```

In this example, the `Animal` class is an abstract class that defines an abstract `makeSound` method and a non-abstract move method. The `Dog` class is a concrete subclass of `Animal` that provides an implementation of the `makeSound` method. The `Dog` class can also call the move method inherited from `Animal`.

But then, what's the difference between an abstract class and an interface? Take a look at the following example:

```ts
abstract class Animal {
  abstract makeSound(): void;
  move(): void {
    console.log("Moving...");
  }
}

interface IAnimal {
  makeSound(): void;
  move(): void;
}
```

In this example, the `Animal` abstract class and the `IAnimal` interface both describe objects with a `makeSound` method and a `move` method. However, the `Animal` class is meant to be subclassed, while the `IAnimal` interface is meant to be implemented.

Some advantages of using inheritance instead of interfaces are:

- Multiple Inheritance: An interface can be implemented by multiple classes, while an abstract class can only be subclassed by one class. This can help you create more flexible and reusable code.
- Lighter Weight: An interface is a lighter weight construct than an abstract class, since it does not have any implementation details. This can help you write more modular and composable code.

## Interfaces

In TypeScript, interfaces are contracts that describe the shape of an object. They define a set of properties and methods that an object must have in order to be considered an implementation of the interface.

Here's an example of an interface in TypeScript:

```ts
interface Person {
  name: string;
  age: number;
  sayHello(): void;
}
```

In this example, the `Person` interface has two properties (`name` and `age`) and a method (`sayHello`). Any object that implements the `Person` interface must have these properties and method.

You can use an interface to enforce type checking on objects that implement it. For example, you can define a function that takes a `Person` object as a parameter:

```ts
function greet(person: Person) {
  person.sayHello();
}
```

In this example, the `greet` function takes a `Person` object as a parameter. TypeScript will give you an error if you try to call this function with an object that does not implement the `Person` interface.

While interfaces and classes have similar ways in defining object types, here are some differences:

- Implementation: A class can have both properties and methods, while an interface can only have properties and method signatures. A class is an implementation of an object, while an interface is just a description of an object.
- Instantiation: A class can be instantiated to create objects, while an interface cannot. An interface is just a contract that describes the shape of an object.
- Inheritance: A class can inherit from another class or multiple classes, while an interface can only extend other interfaces.
- Access Modifiers: A class can have access modifiers (`public`, `private`, `protected`) to control the visibility of its members, while an interface cannot.

The benefits of using an interface are the following:

1. Type checking: Interfaces allow you to enforce type checking on objects that implement them. This can help catch errors at compile-time rather than at runtime.
2. Code reuse: Interfaces can be used to define a common set of properties and methods that multiple objects can implement. This can help reduce code duplication and make your code more modular.
3. Abstraction: Interfaces can be used to abstract away implementation details and focus on the contract between objects. This can help make your code more maintainable and easier to reason about.
4. Polymorphism: Interfaces can be used to create polymorphic behavior, where different objects can be used interchangeably as long as they implement the same interface.

### Polymorphism

Polymorphism is the ability of objects to take on multiple forms. In TypeScript, interfaces can be used to create polymorphic behavior, where different objects can be used interchangeably as long as they implement the same interface.

Here's an example of polymorphism in TypeScript:

```ts
interface Shape {
  getArea(): number;
}

class Rectangle implements Shape {
  constructor(private width: number, private height: number) {}

  getArea() {
    return this.width * this.height;
  }
}

class Circle implements Shape {
  constructor(private radius: number) {}

  getArea() {
    return Math.PI * this.radius ** 2;
  }
}

function printArea(shape: Shape) {
  console.log(`The area of the shape is ${shape.getArea()}`);
}

const rectangle = new Rectangle(10, 20);
const circle = new Circle(5);

printArea(rectangle); // logs "The area of the shape is 200"
printArea(circle); // logs "The area of the shape is 78.53981633974483"
```

In this example, the `Shape` interface defines a `getArea` method that returns a number. The `Rectangle` and `Circle` classes both implement the `Shape` interface, so they both have a `getArea` method. The `printArea` function takes a `Shape` object as a parameter, so it can be called with either a `Rectangle` or a `Circle` object. This is an example of polymorphism, where different objects can be used interchangeably as long as they implement the same interface.

### Namespace

In TypeScript, a namespace is a way to group related code into a named scope. Namespaces can contain classes, interfaces, functions, and other code constructs.

You can define a namespace using the `namespace` keyword, and you can access its contents using the dot notation. Here's an example:

```ts
namespace MyNamespace {
  export interface Person {
    name: string;
    age: number;
  }

  export function greet(person: Person) {
    console.log(`Hello, ${person.name}!`);
  }
}

const person: MyNamespace.Person = { name: "Alice", age: 30 };
MyNamespace.greet(person); // logs "Hello, Alice!"
```

In this example, the `MyNamespace` namespace contains an interface `Person` and a function greet. The `Person` interface is exported so that it can be used outside of the namespace. The `greet` function is also exported, and it takes a `Person` object as an argument.

To use the `Person` interface and the `greet` function, you can access them using the dot notation with the namespace name (`MyNamespace.Person` and `MyNamespace.greet`).

### Enums

In TypeScript, an enum is a way to define a set of named constants. Enums are useful when you have a fixed set of values that a variable can take on, such as the days of the week or the colors of the rainbow.

Here's an example of an enum in TypeScript:

```ts
enum Color {
  Red,
  Green,
  Blue,
}

let myColor: Color = Color.Red;
console.log(myColor); // logs 0
```

In this example, the `Color` enum defines three named constants (`Red`, `Green`, and `Blue`). Each constant is assigned a numeric value (`0`, `1`, and `2`, respectively) by default. You can also assign string or numeric values explicitly:

```ts
enum Color {
  Red = "#ff0000",
  Green = "#00ff00",
  Blue = "#0000ff",
}
```

## Generics

Generics in TypeScript allow you to create reusable code components that can work with different types. They provide a way to define functions, classes, and interfaces that can work with a variety of data types, without having to write the same code multiple times.

Here's an example of a generic function that takes an array of any type and returns the first element:

```ts
function getFirstElement<T>(arr: T[]): T {
  return arr[0];
}
```

In this example, the <T> syntax indicates that the function is generic and can work with any type. The T is a placeholder for the actual type that will be used when the function is called.

The arr parameter is an array of type T, and the function returns a value of type T. When the function is called, the actual type for T is inferred from the type of the array that is passed in.

Generics in TypeScript are commonly used in situations where you want to write code that can work with multiple types. Here are some common use cases for generics:

- Collections: Generics can be used to create collections that can hold any type of data. For example, you can create a generic List<T> class that can hold a list of any type of data.
- Functions: Generics can be used to create functions that can work with any type of data. For example, you can create a generic identity<T> function that returns its argument of type T.
- Interfaces: Generics can be used to create interfaces that can work with any type of data. For example, you can create a generic Comparable<T> interface that defines a method for comparing two objects of type T.
- Classes: Generics can be used to create classes that can work with any type of data. For example, you can create a generic Repository<T> class that provides CRUD operations for a data type T.

## Modules

In TypeScript, a module is a way to organize code into reusable units. A module can contain classes, functions, interfaces, and other code constructs.

A module can be defined using the `export` keyword, which makes its contents available for use in other modules. You can also use the `import` keyword to import code from other modules.

Here's an example of a module in TypeScript:

```ts
// math.ts
export function add(a: number, b: number): number {
  return a + b;
}

export function subtract(a: number, b: number): number {
  return a - b;
}
```

In this example, the `math.ts` file defines a module that exports two functions (`add` and `subtract`). These functions can be imported and used in other modules:

```ts
// app.ts
import { add, subtract } from "./math";

console.log(add(1, 2)); // logs 3
console.log(subtract(3, 2)); // logs 1
```

In this example, the `app.ts` file imports the `add` and `subtract` functions from the `math` module using the `import` keyword.

## Decorators

In TypeScript, a decorator is a special kind of declaration that can be attached to a class declaration, method, accessor, property, or parameter. Decorators use the form `@expression`, where `expression` must evaluate to a function that will be called at runtime with information about the decorated declaration.

Decorators can be used to modify the behavior of a class or its members, or to annotate them with additional metadata. For example, you can use a decorator to add logging or validation to a method, or to mark a property as required.

Here's an example of a decorator in TypeScript:

```ts
function log(target: any, key: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(`Calling ${key} with arguments: ${JSON.stringify(args)}`);
    const result = originalMethod.apply(this, args);
    console.log(`Result of ${key}: ${JSON.stringify(result)}`);
    return result;
  };
  return descriptor;
}

class Calculator {
  @log
  add(a: number, b: number) {
    return a + b;
  }
}

const calculator = new Calculator();
console.log(calculator.add(1, 2)); // logs "Calling add with arguments: [1,2]" and "Result of add: 3"
```

In this example, the `log` function is a decorator that takes three arguments: the target object (the class prototype), the name of the decorated method (`add`), and a descriptor object that describes the method. The `log` function modifies the behavior of the method by adding logging statements before and after the original method is called.

The `Calculator` class has a method `add` that is decorated with the `@log` decorator. When the `add` method is called, the `log` decorator is executed, which logs the arguments and result of the method.

Similarities can occur on the class level. For example, in this following example, you can write a logger for instantiation.

```ts
function log(target: any) {
  console.log(`Creating instance of ${target.name}`);
}

@log
class Calculator {
  add(a: number, b: number) {
    return a + b;
  }
}

const calculator = new Calculator(); // logs "Creating instance of Calculator"
console.log(calculator.add(1, 2)); // logs 3
```
