import * as LocalStorageTrack from './localStorage.js';

// Item Constructor
class Item {
    constructor(id, name, calories){
        this.id = id;
        this.name = name;
        this.calories = parseInt(calories);
    }
}

export const States = Object.freeze({'ADD':1, 'EDIT':2});

// Data Structur / State
const data = {
    items: LocalStorageTrack.getItemsLocalStorage(),
    currentItem: null,
    totalCalories: 0,
    currentState: States.ADD
}

export function addItem({name, calories}){
    if(name && calories){
        let nextID

        if(data.items.length > 0)
            nextID = Math.max(...data.items.map(data => data.id)) + 1
        else
            nextID = 1;

        data.items.push(new Item(nextID, name, calories));

        LocalStorageTrack.saveLocalStorage();
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

export function updateCurrentItem({name, calories}){
    if(data.currentItem.name !== name || data.currentItem.calories !== calories) {
        data.currentItem.name = name;
        data.currentItem.calories = calories;
    
        saveCurrentItem();

        return true
    }

    return false
}

export function saveCurrentItem(){
    if(data.currentItem){
        for (const item of data.items)
            if(item.id == data.currentItem.id){
                item.name = data.currentItem.name
                item.calories = data.currentItem.calories
            }

        LocalStorageTrack.saveLocalStorage();
    }
}

export function clearCurrentItem(){
    data.currentItem = null
}

export function deleteCurrentItem(){
    if(data.currentItem){
        data.items = data.items.filter(item => item.id !== data.currentItem.id);

        LocalStorageTrack.saveLocalStorage();
    }
}

export function setCurrentState(state){
    data.currentState = state;
}

export const getCurrentState = () => data.currentState;

export function clearItems(){
    data.items = [];
    data.currentItem = null;
    data.currentState = States.ADD;

    LocalStorageTrack.saveLocalStorage();
}