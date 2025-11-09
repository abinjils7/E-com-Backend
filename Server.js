const express = require("express");
const cors = require("cors");
const connectDB = require("./DataBase/Db");



connectDB();

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json());

// Routes
const userRoutes = require("./Routes/userRoutes");
const carRoutes = require("./routes/carRoutes");
const cartRoutes = require("./Routes/CartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const authroutes = require("./Routes/Login");
const wishlistRoutes = require("./Routes/WishlistRoutes");
const AdminRotes=require("./Routes/AdminRoutes")

app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.use("/", authroutes);
app.use("/users", userRoutes);
app.use("/cars", carRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", orderRoutes);
app.use("/wishlist", wishlistRoutes);
app.use("/Admin",AdminRotes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
