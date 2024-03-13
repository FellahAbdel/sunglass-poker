# How to test js file with jest

file to be tested has a naming convention which is : `[name].test.js`

Go to the shared directory and then :

```bash
npm init -y
npm i --save-dev jest  #
```

and then update the test script test key like this:

```js
  "scripts": {
    "test": "jest"
  },

```

Enter `npm test` it will run jest to make the test.
