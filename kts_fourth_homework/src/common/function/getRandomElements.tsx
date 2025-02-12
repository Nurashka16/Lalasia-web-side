export function getRandomElements(arr:number[], countElem:number) {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, countElem);
}