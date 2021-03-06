## Bamazon-Node-App
#### An Amazon like web-front built on node.JS and uses MySQL for database.
#### [View the app demo](https://drive.google.com/file/d/1B2FBcAt7tPeFzyWGtb9C90-8bAosXYw7/view) 

_Currently, the app has two fully functional levels/views, namely: **Customer** & **Manager** ._
_The **Supervisor** level is under progress.

##### Customer View
  * Customer sees a list of items with their price and id
  * Customer is asked if he/she wishes to buy and item:
    * if Yes
      * Customer is prompted to enter the **id** & **#units** of the item he/she wishes to buy
      * Item stock is checked
        * if available
          * _**cost incurred**_ is displayed
        * else
          * _**insufficient quantity**_ is displayed
    * else
      * the app quits


##### Manager View
  * Manager is presented with 4 choices (to act upon):
    * View items for sale
      * all the items with their _**id, name, price, stock-quantity**_ are displayed
    * View low inventory
      * all the items (_**id, name, stock-quantity**_) with an inventory value less than or equal to **5** are displayed
    * Add to an item's inventory
      * manager can add units to an item by entering the item id and the number of units he wishes to add
    * Add a new item
      * manager can also add a new item by supplying all the 4 fields - _**name, department, price, stock-quantity**_
      
##### Supervisor View
  * Supervisor is presented with 2 choices (to act upon):
    * View sales by department
      * all the departments with their _**id, name, over-head-costs, product-sales, total profits**_ are displayed
    * Add new department
      * **this functionality is under progress

 
  
