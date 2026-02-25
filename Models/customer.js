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

// customerSchema.pre("findOneAndDelete" , async () => {
//   console.log("pre middleware called");
// }  ) ;


customerSchema.post("findOneAndDelete" , async (customer) => {
  if( customer.orders.length) {
    let res = await Order.deleteMany({  _id:{$in : customer.orders }});
    console.log(res);
  }
});






const Order = mongoose.model("Order" , orderSchema);
const Customer = mongoose.model("Customer" , customerSchema);

const findCustomer = async () => {
  let result = await Customer.find({}).populate("orders");
  console.log(result[0]);
};

findCustomer();


const addCust = async () => {
  let newCust = new Customer({
    name: "karan Arjun",
  });


let newOrder = new Order ({
   item: "Burger",
   price: 250 ,

});

newCust.orders.push(newOrder);

await newOrder.save();
await newCust.save();

console.log("Added new customer");
};



const delCust = async () => {
  let data = await Customer.findByIdAndDelete("699f19f8d2a0ab58f3d5d46a");
  console.log(data);
}

//  addCust();
 delCust();

