
# E-commerce marketplace

This project is a node.js, typescript based implementation of E-commerce marketplace system. This repository contains backend code for E-commerce system where user can create/register their account having user type either seller or buyer with which they can do following things:

- Buyers and sellers can register and login to the system
- Sellers can build a catalog of items, with each item having a product details
- Buyers can GET a list of sellers
- Buyers can GET a specific seller's catalog (list of items)
- Buyers can create an Order that contains a list of items from the seller's catalog
- Sellers can GET a list of all orders they've received



## Features

- Create User
- Create Catalog to sell products
- Add/Remove products to catalog
- Create order of products from different sellers
- Review order placed and order received by buyer and seller respectively


## Frameworks

**Server:** Node, Express, Typescript


## Setup

- To start with project you need to install npm

```bash
  npm i
```

- You will need postman to run APIs
- Add .env file in root directory with following:

```bash
   MONGOURL=YOUR_MONGO_URL
````

## Entities

- Users
Two types: buyers and sellers.
A user can sign up as a buyer or as a seller.
- Catalogs
A catalog belongs to a seller.
One seller can have one catalog.
A catalog consists of Products.
- Products
A product has a name, description, price.
- Orders
An order can be created by a buyer to purchase items from a seller's catalog.
An order consists of a list of products.



