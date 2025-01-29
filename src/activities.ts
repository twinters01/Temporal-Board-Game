export async function greet()
{
    console.log("hello world")
}

export async function rollDice(): Promise<number> {
    return 1 + Math.floor((Math.random() * 6))
}