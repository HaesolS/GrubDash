const path = require("path");

// Use the existing order data
const orders = require(path.resolve("src/data/orders-data"));

// Use this function to assigh ID's when necessary
const nextId = require("../utils/nextId");

function list(req, res) {
    res.json({ data: orders });
}

function bodyDataHas(propertyName) {
    return function(req, res, next) {
        const { data = {} } = req.body;
        if (data[propertyName]) {
            return next();
        }
        next({
            status: 400,
            message: `Order must include a ${propertyName}`
        });
    };
}

function dishesAreValid(req, res, next) {
    const { data: { dishes } = {} } = req.body;
    if (!Array.isArray(dishes) || dishes.length === 0) {
        return next({
            status: 400,
            message: `Order must include at least one dish`
        });
    }
    for (let index = 0; index < dishes.length; index++) {
        const dish = dishes[index]
        if (dish.quantity <= 0 || !Number.isInteger(dish.quantity)) {
        return next({
            status: 400,
            message: `dish ${index} must have a quantity that is an integer greater than 0`
        });
    }
}
    next();
}

function create(req, res) {
    const { data: { deliverTo, mobileNumber, status, dishes } = {} } = req.body;
    const newOrder = { id: nextId(), deliverTo, mobileNumber, status, dishes };
    orders.push(newOrder);
    res.status(201).json({ data: newOrder });
}

function orderExists(req, res, next) {
    const { orderId } = req.params;
    const foundOrder = orders.find((order) => order.id === orderId);
    if (foundOrder) {
        res.locals.order = foundOrder;
        return next();
    }
    next({
        status: 404,
        message: `Order does not exist: ${orderId}`
    });
}

function read(req, res) {
    res.json({ data: res.locals.order });
}

function idMatchesOrderId(req, res, next) {
    const { orderId } = req.params;
    const { data: { id } = {} } = req.body;
    if (orderId === id || !id) {
        return next();
    }
    next({
        status: 400,
        message: `Order id does not match route id. Dish: ${id}, Route: ${orderId}`
    });
}

function statusPropertyIsValid(req, res, next) {
    const { data: { status } = {} } = req.body;
    const validStatus = ["pending", "preparing", "out-for-delivery", "delivered"];
    if (status === "delivered") {
        return next({
            status: 400,
            message: `A delivered order cannot be changed`
        });
    } else if (!validStatus.includes(status)){
        return next({
            status: 400,
            message: `Order must have a status of pending, preparing, out-for-delivery, delivered`
        });
    }
    next();
}

function update(req, res) {
    const order = res.locals.order;
    const { data: { deliverTo, mobileNumber, status, dishes } = {} } = req.body;
    order.deliverTo = deliverTo;
    order.mobileNumber = mobileNumber;
    order.status = status;
    order.dishes = dishes;
    res.json({ data: order });
}

function statusPropertyIsNotPending(req, res, next) {
    const order = res.locals.order
    if (order.status === "pending") {
        return next();
    }
    next({
        status: 400,
        message: `An order cannot be deleted unless it is pending.`
    });
}

function destroy(req, res) {
    const { orderId } = req.params;
    const index = orders.findIndex((order) => order.id === orderId);
    if (index > -1) {
        orders.splice(index, 1);
    }
    res.sendStatus(204);
}

module.exports = {
    list,
    create: [
        bodyDataHas("deliverTo"),
        bodyDataHas("mobileNumber"),
        bodyDataHas("dishes"),
        dishesAreValid,
        create
    ],
    read: [
        orderExists,
        read
    ],
    update: [
        orderExists,
        bodyDataHas("deliverTo"),
        bodyDataHas("mobileNumber"),
        bodyDataHas("dishes"),
        bodyDataHas("status"),
        dishesAreValid,
        idMatchesOrderId,
        statusPropertyIsValid,
        update
    ],
    delete: [
        orderExists,
        statusPropertyIsNotPending,
        destroy
    ]
}