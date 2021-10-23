export default function createURL(length: number) {
    let result = "";
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    for (var i = 0; i < length / 2; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
        result += Math.floor(Math.random() * 10)
    }

    return result;
}