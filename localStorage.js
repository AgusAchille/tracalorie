import {getItems} from  './ItemCtrl.js';

export function saveLocalStorage(){
    const items = getItems();

    localStorage.setItem('items', JSON.stringify(items));
}

export function getItemsLocalStorage(){
    const items = localStorage.getItem('items');

    if(items)
        return JSON.parse(items);
    else
        return [];
}