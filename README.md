# bamazon

How to Use the App

The app has two modes, customer and manager. 

From the customer mode, the only action that can be taken is to purchase items. This is accomplished by entering the item ID. Only an exact match will allow a sale to proceed. After a valid item ID has been entered, the user must enter the desired quantity to purchase. If the quantity entered exceeds the available quantity the transaction will be cancelled. 

From the manager mode, the user has four possible actions: 

    * View Products for Sale
    
    * View Low Inventory
    
    * Add to Inventory
    
    * Add New Product
	
  * If a manager selects `View Products for Sale`, the app will list every available item: the item IDs, names, prices, and quantities.

  * If a manager selects `View Low Inventory`, then it will list all items with an inventory count lower than five.

  * If a manager selects `Add to Inventory`, the app will display a prompt that will let the manager "add more" of any item currently in the store.

  * If a manager selects `Add New Product`, it will allow the manager to add a completely new product to the store.
  
The images in the screenshots folder shows the program run on node and the table displayed in MySQL workbench. All of the various scenarios are documented in a screenshot that shows the output in GitBash and the affected table in SQL. Note that item_id 1 (couch) was the affected item in the scenarios that adjust existing item quantity . It started with a quantity of 3, that was then reduced to 2 after a purchase was made on the customer app, then to 4 using the manager app.