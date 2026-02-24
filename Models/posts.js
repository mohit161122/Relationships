const mongoose = require('mongoose');
const {Schema} = mongoose;


main()
      .then(() => console.log("connection Sucesfully") )
      .catch(err => console.log(err));


async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}


const userSchema = new Schema ({
    username: String,
    email: String,
});
const postSchema = new Schema ({
    content: String,
    likes: Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

// const User = mongoose.model("User" , userSchema);
// const Post = mongoose.model("Post" , postSchema);

// const addData = async() => {
//     let user = await User.findOne({username: "rahul kumar"});

//     let post2 = new Post({
//         content: "bye bye:)",
//         likes: 23,
//     });

//     post2.user = user;
//     await post2.save();
//     // await post1.save();
// };

// addData();

 const del = async() => {
   await Post.findByIdAndDelete("6999561f94e829a76c13420d");
//     await User.findByIdAndDelete("699883b6c70975c846dcdd94");
 };

del();