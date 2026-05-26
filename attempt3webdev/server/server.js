const express = require("express");
const app = express();
const cors = require("cors");

const PORT = 8080;

const corsOptions = {
    origin: ["http://localhost:5173"]
};
let accounts = [
    {
        "id": "EwXdSEfLYp",
        "name": "John Doe",
        "email": "examplemail@gmail.com",
        "password": "password123",
        "cart": [],
        "recentlyViewed": [],
        "collections": [],
        "wishlist": [],
        "favorites": []
    },
    {
        "id": "a27hkwk6fL",
        "name": "Jane Smith",
        "email": "examplemail2@gmail.com",
        "password": "password456",
        "cart": [],
        "recentlyViewed": [],
        "collections": [],
        "wishlist": [],
        "favorites": []
    }
];
let inventory = [{
    "id": "a27hkwk6fL",
    "label": "ring",
    "description": "A stunning ring with a brilliant cut diamond.",
    "price": 250,
    "tags": ["Gold", "Diamond"],
    "name": "Gold Diamond Ring",
    "image": "https://github.com/Shamuel69/web-development/blob/main/attempt3webdev/server/photos/ring1.png",
}]

app.use(cors(corsOptions));
app.use(express.json());


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});