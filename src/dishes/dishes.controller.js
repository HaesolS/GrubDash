const path = require("path");

// Use the existing dishes data
const dishes = require(path.resolve("src/data/dishes-data"));

// Use this function to assign ID's when necessary
const nextId = require("../utils/nextId");

function list(req, res) {
    res.json({ data: dishes });
}

function bodyDataHas(propertyName) {
    return function(req, res, next) {
        const { data = {} } = req.body;
        if (data[propertyName]) {
            return next();
        }
        next({ status: 400, message: `Dish must include a ${propertyName}` });
    };
}

function priceIsValidInteger(req, res, next) {
    const { data: { price } = {} } = req.body;
    if (price <= 0 || !Number.isInteger(price)) {
    return next({
        status: 400,
        message: `Dish must have a price that is an integer greater than 0`});
    }
    return next();
}

function create(req, res) {
    const { data: { name, description, price, image_url } = {} } = req.body;
    const newDish = { id: nextId(), name, description, price, image_url };
    dishes.push(newDish);
    res.status(201).json({ data: newDish });
}

function dishExists(req, res, next) {
    const { dishId } = req.params;
    const foundDish = dishes.find((dish) => dish.id === dishId);
    if (foundDish) {
        res.locals.dish = foundDish;
        return next();
    }
    next({
        status: 404,
        message: `Dish does not exist: ${dishId}`
    });
}

function read(req, res) {
    res.json({ data: res.locals.dish });
}

function idMatchesDishId(req, res, next) {
    const { dishId } = req.params;
    const { data: { id } = {} } = req.body;
    if (dishId === id || !id) {
        return next();
    }
    next({
        status: 400,
        message: `Dish id does not match route id. Dish: ${id}, Route: ${dishId}`
    });
}

function update(req, res) {
    const dish = res.locals.dish;
    const { data: { name, description, price, image_url } = {} } = req.body;
    dish.name = name;
    dish.description = description;
    dish.price = price;
    dish.image_url = image_url;
    res.json({ data: dish });
}

module.exports = {
    list,
    create: [
        bodyDataHas("name"),
        bodyDataHas("description"),
        bodyDataHas("price"),
        bodyDataHas("image_url"),
        priceIsValidInteger,
        create
    ],
    read: [
        dishExists,
        idMatchesDishId,
        read
    ],
    update: [
        dishExists,
        bodyDataHas("name"),
        bodyDataHas("description"),
        bodyDataHas("price"),
        bodyDataHas("image_url"),
        priceIsValidInteger,
        idMatchesDishId,
        update
    ]
}