import * as ItemCtrl from './ItemCtrl.js';
import * as UICtrl from './UICtrl.js';

UICtrl.clearEditSate();

UICtrl.updateList();

loadEventListeners();

function loadEventListeners() {
    const UISelectors = UICtrl.getSelectors();
    
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
    document.querySelector(UISelectors.itemList).addEventListener('click', itemEditSubmit);
}

function itemEditSubmit(e) {
    e.preventDefault();

    if(e.target.classList.contains('edit-item')) {
        const id = parseInt(e.target.parentElement.parentElement.id.match(/\d/)[0]);

        const itemToEdit = ItemCtrl.getItemById(id);

        ItemCtrl.setCurrentItem(itemToEdit);
        UICtrl.addItemToForm();
    }
}

function itemAddSubmit(e){
    e.preventDefault();
    const input = UICtrl.getItemInput();

    if(input){
        ItemCtrl.addItem(input)

        UICtrl.updateList();

        UICtrl.clearInput();
    }
}