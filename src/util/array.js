export const nextID = (list) => {
    console.log(Math.max.apply(Math, list));
    return Math.max.apply(Math, list) + 1;
}