import * as ItemCtrl from './ItemCtrl.js';
import * as UICtrl from './UICtrl.js';

UICtrl.clearEditSate();

UICtrl.updateList();

loadEventListeners();

function loadEventListeners() {
    const UISelectors = UICtrl.getSelectors();
    
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
    document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);
    document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);
    document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);
    document.querySelector(UISelectors.backBtn).addEventListener('click', backEditState);
    document.querySelector(UISelectors.clearBtn).addEventListener('click', clearSubmit);


    document.addEventListener('keypress', function(e){
        if(e.code === 'Enter'){
            e.preventDefault();

            const currentState = ItemCtrl.getCurrentState();

            if(currentState === ItemCtrl.States.ADD)
                itemAddSubmit();
            else if (currentState === ItemCtrl.States.EDIT)
                itemUpdateSubmit();
        }

            return false;
    })
}

function itemEditClick(e) {
    e.preventDefault();

    if(e.target.classList.contains('edit-item')) {
        const id = parseInt(e.target.parentElement.parentElement.id.match(/\d/)[0]);

        const itemToEdit = ItemCtrl.getItemById(id);

        ItemCtrl.setCurrentItem(itemToEdit);
        UICtrl.addItemToForm();
    }
}

function itemUpdateSubmit(e) {
    if(e) e.preventDefault();

    const itemUpdated = ItemCtrl.updateCurrentItem(UICtrl.getItemInput());
    
    if(itemUpdated){
        UICtrl.updateList();
        UICtrl.clearEditSate();
    }
}

function itemAddSubmit(e){
    if(e) e.preventDefault();
        
    const input = UICtrl.getItemInput();

    if(input.name && input.calories){
        ItemCtrl.addItem(input)

        UICtrl.updateList();
        UICtrl.clearInput();
        UICtrl.focusName();
    }
}

function backEditState(e){
    e.preventDefault();
    UICtrl.clearEditSate();
}

function itemDeleteSubmit(e){
    e.preventDefault();

    ItemCtrl.deleteCurrentItem();
    UICtrl.updateList();
    UICtrl.clearEditSate();
}

function clearSubmit(e){
    e.preventDefault();

    ItemCtrl.clearItems();
    UICtrl.updateList();
    UICtrl.clearEditSate();
}