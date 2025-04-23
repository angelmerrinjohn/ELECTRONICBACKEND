const express = require('express')
const cors = require('cors')

const UserModel = require('./User')
const ProductModel = require('./Products')  //Add a Product Model
const mongoose = require('mongoose')

const app = express()
app.use(cors())
app.use(express.json())

//DB Connection
mongoose.connect('mongodb+srv://angelmerrinjohn:<db_password>@electronicstore.z0sstsz.mongodb.net/')
.then(() => console.log('DB connected'))
.catch(err => console.log(err))

//Register API Route
app.post('/register',(req,res)=>{
    UserModel.create(req.body)
    .then(res.json('Data Saved Successfully'))
    .catch(err=>res.json(err))
    })



// Create Rest API (http://localhost:8000/addProduct)
app.post('/addProduct', async (req, res)=>{
    try {
        await ProductModel.create(req.body)
        res.json({ message: 'Product Added Successfully' })
    } 
    catch(error) {
        res.json(error)
    }
})

// Read All - Rest API (http://localhost:8000/viewProducts)
app.get('/viewProducts', async (req, res)=>{
    try {
        const records = await ProductModel.find()
        res.json(records)
    } 
    catch(error) {
        res.json(error)
    }
})

// Read By ID Rest API - to display before updation (EditProduct)
app.get('/findProduct/:id', async (req, res)=>{
    try {
        const record = await ProductModel.findById(req.params.id)
        res.json(record)
    } 
    catch(error) {
        res.json(error)
    }
})

// Update - REST API
app.put('/editProduct/:id', async (req, res)=>{
    try {
        const updatedProduct = await ProductModel.findByIdAndUpdate(
            req.params.id, req.body, { new: true }
        )
        if (!updatedProduct) {
            return res.send('Item not found');
        }
        res.json({ message: 'Product Updated Successfully' });
    } 
    catch (err) {
        res.json(err);
    }
})

// Delete - REST API
app.delete('/deleteProduct/:id', async (req, res)=>{
    try {
        const deletedItem = await ProductModel.findByIdAndDelete({ _id: req.params.id })
        res.json({ message: 'Item Deleted Successfully!' });
    } 
    catch (error) {
        res.json(error);
    }
})



//Create API End Points (HTTP Request,Response)
app.get('/',(req,res)=>{
res.send('Welcome to Node JS Server')
})
//config PORT and Start Server
const PORT = 8000
app.listen(PORT, ()=>{
console.log(`Server running on port ${PORT}`)
})

// const express = require('express');
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const cors = require('cors');
// require('dotenv').config()

// const app =express()
// app.use(express.json())
// app.use(cors())

// //Start server
// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

// const User = require('./models/User')
// mongoose.connect(process.env.MONGODB_URL)
// .then(() => console.log('Connected to MongoDB'))
// .catch(err => console.log(err));

// // REST API Route for SignUp
// app.post('/register', async (req, res) => {
//     const { username,password,email } = req.body;
//     try {
//         // Check if user exists
//         const existingUser = await User.findOne({ email });
//         if (existingUser != null)
//             return res.json({ msg: 'User already exists' });

//         // Hash password
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const newUser = new User({username,password: hashedPassword,email});
//         await newUser.save();
//         res.json({ msg: 'User Created ! Please Login'});
//     } catch(err) {
//         console.error(err);
//     }
// });

// // REST API for Login
// app.post('/login', async (req, res) => {
//     const {password , email } = req.body;
//     try{
//         //Find user by username
//         const user = await User.findOne({ email });
//         if (!user) return res.json({ msg: 'User not found' });
//         //Verify password
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) return res.json({ msg: 'Invalid Password' });
//         //Generate JWT token
//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//         res.json({msg: 'Login Successful', token });
//     }catch(err) {
//         console.error(err);
//     }
// });

// // Protected Rest API Route
// const ProtectRoute = require('./middleware/authMiddleware')
// const ProductModel = require('./models/Products') 

// // Rest API for listing Product Details(Ex 4)
// //Only authorized users can access this route
// app.get('/viewProducts', ProtectRoute, async (req, res) => {
//     try {
//         let authorizedUser = req.user
//         const records = await ProductModel.find()
//         res.json({user:authorizedUser,products:records}); 
//     } 
//     catch(err) {
//         res.json({msg: 'Invalid token'})
//     }
// });