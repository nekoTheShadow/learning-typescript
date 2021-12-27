const sayHello = (name: string) => {
    return `Hello ${name}!`
}

// console.log(sayHello('Micheal Jackson'))
process.stdout.write(sayHello('Micheal Jackson'))