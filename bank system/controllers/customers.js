const deal = require("./dealWithJson");
const createCustomerObject = (data) => {
    return {
        accNum: data.accNum,
        name: data.name,
        balance: data.balance,
        transaction: data.transaction,
    };
};
const printCustomers = (customer) => {
    console.log(
        `accNum: ${customer.accNum} - name:${customer.name} - balance:${customer.balance} - transaction:${customer.transaction}`
    );
};
const searchInCustomers = (
    allCustomers,
    searchKey,
    searchVal,
    searchType = "singleIndex"
) => {
    if (searchType == "singleIndex")
        return allCustomers.findIndex(
            (customer) => customer[searchKey] == searchVal
        );
    else if (searchType == "singleData")
        return allCustomers.find((customer) => customer[searchKey] == searchVal);
    else
        return allCustomers.filter((customer) => customer[searchKey] == searchVal);
};
const addCustomer = (data) => {
    try {
        const allCustomers = deal.readDataFromJSON("customers.json");
        if (searchInCustomers(allCustomers, "name", data.name) != -1)
            throw new Error("name used before");
        let customer = createCustomerObject(data);
        allCustomers.push(customer);
        deal.writeDataToJSON("customers.json", allCustomers);
    } catch (e) {
        console.log(e.message);
    }
};
const showCustomers = () => {
    const allCustomers = deal.readDataFromJSON("customers.json");
    allCustomers.forEach((customer) => printCustomers(customer));
};
const showCustomer = (searchKey, searchVal) => {
    try {
        const allCustomers = deal.readDataFromJSON("customers.json");
        let customer = searchInCustomers(
            allCustomers,
            searchKey,
            searchVal,
            "singleData"
        );
        if (!customer) throw new Error("customer not found");
        printCustomers(customer);
    } catch (e) {
        console.log(e.message);
    }
};
const editCustomer = (data) => {
    try {
        const allCustomers = deal.readDataFromJSON("customers.json");
        const index = searchInCustomers(
            allCustomers,
            data.searchKey,
            data.searchVal
        );
        if (index == -1) throw new Error("not found");
        dataHeaders = ["name", "balance", "transaction"];
        dataHeaders.forEach((head) => {
            if (data[head]) allCustomers[index][head] = data[head];
        });
        deal.writeDataToJSON("customers.json", allCustomers);
        console.log("data updated");
    } catch (e) {
        console.log(e.message);
    }
};
const deleteCustomer = (searchKey, searchVal) => {
    try {
        const allCustomers = deal.readDataFromJSON("customers.json");
        let customer = searchInCustomers(allCustomers, searchKey, searchVal);
        if (customer == -1) throw new Error("customer not found");
        allCustomers.splice(customer, 1);
        deal.writeDataToJSON("customers.json", allCustomers);
    } catch (e) {
        console.log(e.message);
    }
};

module.exports = {
    addCustomer,
    showCustomers,
    showCustomer,
    editCustomer,
    deleteCustomer,
};