

// Item Controller
const ItemCtrl = (function(){
    // Item Constructor
    const Item = function(id, name, calories) {
        this.id = id;
        this.name = name;
        this.calories = parseInt(calories);
    }

    // Data Structur / State
    const data = {
        items: [
        ],
        currentItem: null,
        totalCalories: 0
    }

    function addItem(name, calories){
        if(name && calories){
            let nextID 
            if(data.items.length > 0)
                nextID = Math.max(...data.items.map(data => data.id)) + 1
            else
                nextID = 1;

            data.items.push(new Item(nextID, name, calories));
        }
    }

    function getTotalCalories(){
        return data.items.map(item => item.calories).reduce((acu, calories) => acu + calories, 0);
    }

    return {
        logData: () => data,
        getItems: () => data.items,
        addItem,
        getTotalCalories
    }
})();


// UI Controller
const UICtrl = (function(){
    const UISelectors = {
        itemList: '#item-list',
        addBtn: '.add-btn',
        itemName: '#item-name',
        itemCalories: '#item-calories',
        totalCalories: '.total-calories'
    }

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

    function getSelectors(){
        return UISelectors;
    }

    function getItemInput(){
        const name = document.querySelector(UISelectors.itemName).value;
        const calories = document.querySelector(UISelectors.itemCalories).value;

        if(!name || !calories)
            return null;

        return {
            name,
            calories
        }
    }

    function updateList(){
        const items = ItemCtrl.getItems();

        populateItemlist(items);
        
        document.querySelector(UISelectors.totalCalories).textContent = ItemCtrl.getTotalCalories();
    }

    function clearInput(){
        document.querySelector(UISelectors.itemName).value = '';
        document.querySelector(UISelectors.itemCalories).value = '';
    }

    return {
        updateList,
        getSelectors,
        getItemInput,
        clearInput
    }

})();


// App Controller
const App = (function(ItemCtrl, UICtrl){
    const loadEventListeners = function() {
        const UISelectors = UICtrl.getSelectors();
        
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit)
    }

    function itemAddSubmit(e){
        e.preventDefault();
        const input = UICtrl.getItemInput();

        if(input){
            ItemCtrl.addItem(input.name, input.calories)

            UICtrl.updateList();

            UICtrl.clearInput();
        }
    }

    return {
        init: function() {
            UICtrl.updateList();

            loadEventListeners();
        }
    }
})(ItemCtrl, UICtrl);

App.init();