import * as ItemCtrl from './ItemCtrl.js';

const UISelectors = {
    itemList: '#item-list',
    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn',
    itemName: '#item-name',
    itemCalories: '#item-calories',
    totalCalories: '.total-calories'
}

const nameInput = document.querySelector(UISelectors.itemName);
const caloriesInput = document.querySelector(UISelectors.itemCalories);
const updateBtn = document.querySelector(UISelectors.updateBtn);
const deleteBtn = document.querySelector(UISelectors.deleteBtn);
const backBtn = document.querySelector(UISelectors.backBtn);
const addBtn = document.querySelector(UISelectors.addBtn);


function populateItemlist(items) {
    let html = '';

    for (let item of items){
        html +=
            `<li class="collection-item" id="item-${item.id}">
                <strong>${item.name}:</strong> <em>${item.calories} Calories</em>
                <a href="#" class="secondary-content"><i class="fa fa-pencil edit-item"></i></a>
            </li>`
    }

    document.querySelector(UISelectors.itemList).innerHTML = html;
}

export const getSelectors = () => UISelectors;

export function getItemInput(){
    return {
        name: nameInput.value,
        calories: caloriesInput.value
    }
}

export function updateList(){
    const items = ItemCtrl.getItems();

    populateItemlist(ItemCtrl.getItems());
    
    document.querySelector(UISelectors.totalCalories).textContent = ItemCtrl.getTotalCalories();
}

export function clearInput(){
    nameInput.value = '';
    caloriesInput.value = '';
}

export function clearEditSate() {
    clearInput();
    updateBtn.style.display = 'none';
    deleteBtn.style.display = 'none';
    backBtn.style.display = 'none';
    addBtn.style.display = 'inline';
}

export function showEditSate() {
    updateBtn.style.display = 'inline';
    deleteBtn.style.display = 'inline';
    backBtn.style.display = 'inline';
    addBtn.style.display = 'none';
}

export function addItemToForm(){
    nameInput.value = ItemCtrl.getCurrentItem().name;
    caloriesInput.value = ItemCtrl.getCurrentItem().calories;

    showEditSate();
}