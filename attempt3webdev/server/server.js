const express = require("express");
const app = express();
const cors = require("cors");

const PORT = 8080;

const corsOptions = {
    origin: ["http://localhost:5173"]
};
let collections = [
    {
        "id": "hyfysdfhsdf",
        title: "My Collection 1",
        description: "Description of My Collection 1",
        items: ["item1", "item2", "item3"],
        username: "John Doe"
    }
];
let profiles = [
    {
        "id": "EwXdSEfLYp",
        "username": "John Doe",
        "email": "examplemail@gmail.com",
        "password": "password123",
        "cart": [],
        "recentlyViewed": [],
        "collections": ["hyfysdfhsdf"],
        "wishlist": [],
        "favorites": []
    },
    {
        "id": "a27hkwk6fL",
        "username": "Jane Smith",
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
    "quantity": 10,
    "reviews": [],
    "ratings": [],
    "front-page": true
}]

app.use(cors(corsOptions));
app.use(express.json());

app.put("/profiles/:id", (req, res) => {
    const userIndex = profiles.findIndex(account => account.id === req.params.id);
    if(userIndex !== -1){
        profiles[userIndex] = {...profiles[userIndex], ...req.body};
        res.json({
            message: "Account updated successfully",
            user: profiles[userIndex]
        });
    }
    return res.status(404).json({error: "User not found"});
})
app.put("/collections/:id", (req, res) => {
    const collectionIndex = collections.findIndex(collection => collection.id === req.params.id);
    if(collectionIndex !== -1){
        collections[collectionIndex] = {...collections[collectionIndex], ...req.body};
        res.json({
            message: "Collection updated successfully",
            collection: collections[collectionIndex]
        });
    }
    return res.status(404).json({error: "Collection not found"});
})

app.get("/profiles", (req, res) => {
    res.json({profiles: profiles});
});

app.get("/inventory", (req, res) => {
    res.json({inventory: inventory});
});
app.get("/collections", (req, res) => {
    res.json({collections: collections});
})
app.get("/collections/:id", (req, res) => {
    const collectionID = collections.find(collection => collection.id === req.params.id);
    if(!collectionID){
        res.status(404).json({error: "Collection not found"});
    }
    res.json({collection: collectionID});
})
app.post("/collections", (req, res) => {
    const newCollection = req.body;
    collections.push(newCollection);
    res.status(201).json({
        message: "Collection created successfully",
        collection: newCollection
    });
})

app.get("inventory/:id", (req, res) => {
    const itemID = inventory.find(item => item.id === req.params.id);
    if(!itemID){
        res.status(404).json({error: "Item not found"});
    }
    res.json({item: itemID});
});
app.post("/profiles", (req, res) => {
    const newAccount = req.body;

    const accountexist = profiles.some(account => account.email === newAccount.email || account.id === newAccount.id);

    if(!accountexist){
        profiles.push(newAccount);
    
        res.status(201).json({
            message: "Account created successfully",
            user: newAccount
        });
    }
    return res.status(400).json({error: "Account already exists with this email"});
});

app.get("/profiles/:id", (req, res) => {
    const userIndex = profiles.findIndex(account => account.id === req.params.id);
    if(userIndex !== -1){
        res.json({user: profiles[userIndex]});
    }
    return res.status(404).json({error: "User not found"});
});
app.get("/inventory", (req, res) => {
    res.json({inventory: inventory});
});
app.get("/inventory/:id", (req, res) => {
    const itemID = inventory.find(item => item.id === req.params.id);
    if(!itemID){
        res.status(404).json({error: "Item not found"});
    }
    res.json({item: itemID});
})
app.get("/profiles", (req, res) => {
    res.json({profiles: profiles});
});
app.get("/profiles/:id", (req, res) => {
    const userIndex = profiles.findIndex(profile => profile.id === req.params.id);
    if(userIndex !== -1){
        res.json({user: profiles[userIndex]});
    }
    return res.status(404).json({error: "User not found"});
})

app.post("/inventory", (req, res) => {
    const itemsToAdd = req.body.filter(item => {
        return !inventory.some(existingItem => existingItem.id === item.id);
    });
    inventory.push(...itemsToAdd);
    res.status(201).json({
        message: "Items added successfully",
        items: itemsToAdd
    });
})


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});