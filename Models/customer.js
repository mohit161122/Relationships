const mongoose = require('mongoose');
const {Schema} = mongoose;


main()
      .then(() => console.log("connection Sucesfully") )
      .catch(err => console.log(err));


async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}


const orderSchema = new Schema ({
    item: String,
    price: Number,
});


const customerSchema = new Schema({
  name: String,
  orders: [
    {
      type:Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
});



const Order = mongoose.model("Order" , orderSchema);
const Customer = mongoose.model("Customer" , customerSchema);

const findCustomer = async () => {
  let result = await Customer.find({}).populate("orders");
  console.log(result);

};

findCustomer();

// const addOrders = async () => {
//   let res =  await Order.insertMany([
//     {item: "Samosa" , price: 12},
//     {item: "Chips" , price: 10},
//     {item: "Chocolate" , price: 40},
//   ]);
//   console.log(res);
// };

// addOrders();

