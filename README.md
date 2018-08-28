## Bamazon-Node-App
#### An Amazon like web-front built on node.JS and uses MySQL for database.

_Currently, the app has two levels/views, namely: **Customer** & **Manager** ._

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
  
