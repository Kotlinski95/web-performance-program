import { sayHello, sayBye } from './fn1';

if (process.env.NODE_ENV !== "development") {
    console.log = () => {};
    console.debug = () => {};
    console.info = () => {};
    console.warn = () => {};
}

sayHello();
sayBye();