const yargs = require("yargs");
const customers = require("./controllers/customers");
yargs.command({
    command: "add",
    describe: "add new customer",
    builder: {
        accNum: { default: Date.now() },
        name: { type: "string", demandOption: true },
        balance: { type: "string", demandOption: true },
        transaction: { default: [] },
    },
    handler: (argv) => customers.addCustomer(argv),
});
yargs.command({
    command: "showAll",
    describe: "show all customers",
    handler: () => customers.showCustomers(),
});
yargs.command({
    command: "showOne",
    describe: "show customer",
    builder: {
        searchKey: { type: "string", demandOption: true },
        searchVal: { type: "string", demandOption: true },
    },
    handler: (argv) => customers.showCustomer(argv.searchKey, argv.searchVal),
});
yargs.command({
    command: "edit",
    describe: "edit customer",
    builder: {
        searchKey: { type: "string", demandOption: true },
        searchVal: { type: "string", demandOption: true },
        name: { type: "string" },
        balance: { type: "string" },
        transaction: { default: [] },
    },
    handler: (argv) => customers.editCustomer(argv),
});
yargs.command({
    command: "delete",
    describe: "delete customer",
    builder: {
        searchKey: { type: "string", demandOption: true },
        searchVal: { type: "string", demandOption: true },
    },
    handler: (argv) => customers.deleteCustomer(argv.searchKey, argv.searchVal),
});
yargs.argv;