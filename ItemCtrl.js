// Item Constructor
const Item = function(id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = parseInt(calories);
}

// Data Structur / State
const data = {
    items: [],
    currentItem: null,
    totalCalories: 0
}

export function addItem({name, calories}){
    if(name && calories){
        let nextID

        if(data.items.length > 0)
            nextID = Math.max(...data.items.map(data => data.id)) + 1
        else
            nextID = 1;

        data.items.push(new Item(nextID, name, calories));
    }
}

export function getTotalCalories(){
    return data.items.map(item => item.calories).reduce((acu, calories) => acu + calories, 0);
}

export const getData = () => data;

export const getItems = () => data.items;

export const getCurrentItem = () => data.currentItem;

export function getItemById(id){
    return data.items.find(item => item.id === id)
}

export function setCurrentItem(item){
    data.currentItem = item;
}