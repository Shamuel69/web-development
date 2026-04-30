
const express = require("express");
const app = express();
const cors = require("cors");

const PORT = 8080;

const corsOptions = {
    origin: ["http://localhost:5173"]
};



// started the server now basically we want to allow cross-origin requests from our frontend which is running on port 5173
// connect those two together and allow them to talk to each other
app.use(cors(corsOptions));

app.use(express.json());

let profiles = [{'id': 'EwXdSEfLYp', 'name': 'John Doe', 'age': 30, 'email': 'examplemail@gmail.com', 'password': 'password123'},]

let inventory = [{'label': 'Ring', 'description': 'A stunning ring with a brilliant cut diamond.', 'price': 250, 'tags': ['Gold', 'Diamond'], 'name': 'Gold Diamond Ring'},
    {'id': 'EwXdSEfLYp', 'label': 'Ring', 'description': 'A stunning ring with a brilliant cut diamond.', 'price': 250, 'tags': ['Gold', 'Diamond'], 'name': 'Gold Diamond Ring'},
    {'id': 'a27hkwk6fL', 'label': 'Necklace', 'description': 'A beautiful necklace with a pendant design.', 'price': 100, 'tags': ['Silver', 'Ruby'], 'name': 'Silver Ruby Necklace'},
    {'id': 'jay8XPmzfa', 'label': 'Earrings', 'description': 'A pair of elegant earrings with a timeless design.', 'price': 70, 'tags': ['Gold', 'Pearl'], 'name': 'Gold Pearl Earrings'},
    {'id': 'wODuWE97Uo', 'label': 'Bracelets', 'description': 'A stylish bracelet made with high-quality materials.', 'price': 80, 'tags': ['Silver', 'Sapphire'], 'name': 'Silver Sapphire Bracelets'},
    {'id': 'LBz7eaK5ul', 'label': 'Necklace', 'description': 'A beautiful necklace with a pendant design.', 'price': 100, 'tags': ['Platinum', 'Diamond'], 'name': 'Platinum Diamond Necklace'},
    {'id': 'YfmBtXjfVV', 'label': 'Earrings', 'description': 'A pair of elegant earrings with a classic design.', 'price': 70, 'tags': ['Gold', 'Emerald'], 'name': 'Gold Emerald Earrings'},
    {'id': 'WkBr8omj2l', 'label': 'Bracelets', 'description': 'A trendy bracelet with a modern design.', 'price': 90, 'tags': ['Silver', 'Ruby'], 'name': 'Silver Ruby Bracelets'},
    {'id': 'Vrtp6cdHlk', 'label': 'Bracelets', 'description': 'A stylish bracelet made with premium materials.', 'price': 80, 'tags': ['Gold', 'Sapphire'], 'name': 'Gold Sapphire Bracelets'},
    {'id': '3_qaYD7zFV', 'label': 'Necklace', 'description': 'An elegant necklace made with high-quality materials.', 'price': 150, 'tags': ['Platinum', 'Emerald'], 'name': 'Platinum Emerald Necklace'},
    {'id': 'eHtHzo5jlJ', 'label': 'Ring', 'description': 'A stunning ring with a brilliant cut diamond.', 'price': 250, 'tags': ['Gold', 'Diamond'], 'name': 'Gold Diamond Ring'},
    {'id': '8QAeFb8kQb', 'label': 'Necklace', 'description': 'A beautiful necklace with intricate designs.', 'price': 120, 'tags': ['Silver', 'Ruby'], 'name': 'Silver Ruby Necklace'},
    {'id': 'EvxVcqyWj-', 'label': 'Ring', 'description': 'A stunning ring with a brilliant cut diamond.', 'price': 250, 'tags': ['Gold', 'Diamond'], 'name': 'Gold Diamond Ring'},
    {'id': 'Htpxk6AbD0', 'label': 'Ring', 'description': 'A stunning ring with a brilliant cut diamond.', 'price': 250, 'tags': ['Gold', 'Diamond'], 'name': 'Gold Diamond Ring'},
    {'id': 'I8QtwDEJOL', 'label': 'Necklace', 'description': 'A beautiful necklace with a pendant design.', 'price': 100, 'tags': ['Silver', 'Ruby'], 'name': 'Silver Ruby Necklace'},
    {'id': 'MMBdbyaxoh', 'label': 'Earrings', 'description': 'A pair of elegant earrings with a timeless design.', 'price': 70, 'tags': ['Gold', 'Pearl'], 'name': 'Gold Pearl Earrings'},
    {'id': 'iKhxppkHLn', 'label': 'Bracelets', 'description': 'A stylish bracelet made with high-quality materials.', 'price': 80, 'tags': ['Silver', 'Sapphire'], 'name': 'Silver Sapphire Bracelets'},
    {'id': 'dYS8eLUN7v', 'label': 'Necklace', 'description': 'A beautiful necklace with a pendant design.', 'price': 100, 'tags': ['Platinum', 'Diamond'], 'name': 'Platinum Diamond Necklace'},
    {'id': 'rUTQOLjnDU', 'label': 'Earrings', 'description': 'A pair of elegant earrings with a classic design.', 'price': 70, 'tags': ['Gold', 'Emerald'], 'name': 'Gold Emerald Earrings'},
    {'id': 'Zc5-MD5b54', 'label': 'Bracelets', 'description': 'A trendy bracelet with a modern design.', 'price': 90, 'tags': ['Silver', 'Ruby'], 'name': 'Silver Ruby Bracelets'},
    {'id': 'vYf5TiDajt', 'label': 'Bracelets', 'description': 'A stylish bracelet made with premium materials.', 'price': 80, 'tags': ['Gold', 'Sapphire'], 'name': 'Gold Sapphire Bracelets'},
    {'id': 'myOioyBath', 'label': 'Necklace', 'description': 'An elegant necklace made with high-quality materials.', 'price': 150, 'tags': ['Platinum', 'Emerald'], 'name': 'Platinum Emerald Necklace'},
    {'id': 'VZE-3L0gP5', 'label': 'Ring', 'description': 'A stunning ring with a brilliant cut diamond.', 'price': 250, 'tags': ['Gold', 'Diamond'], 'name': 'Gold Diamond Ring'},
    {'id': 'fAAvwuFfnq', 'label': 'Necklace', 'description': 'A beautiful necklace with intricate designs.', 'price': 120, 'tags': ['Silver', 'Ruby'], 'name': 'Silver Ruby Necklace'},
    {'id': 'GYYD37o-tz', 'label': 'Ring', 'description': 'A stunning ring with a brilliant cut diamond.', 'price': 250, 'tags': ['Gold', 'Diamond'], 'name': 'Gold Diamond Ring'}]

inventory.forEach(item => {
    if(!item.name){
        item.name = item.tags.map(tag => tag).join(" ") + " " + item.label;
    }
});
app.get("/profiles", (req, res) => {
    res.json({profiles: profiles});
});

app.get("/inventory", (req, res) =>{
    res.json({inventory});
});

app.get("/inventory/:id", (req, res) => {
    const itemID = inventory.find(item => item.id === req.params.id);
    if(itemID){
        res.json({item: itemID});
    } else {
        res.status(404).json({error: "Item not found"});
    }
});

app.post("/profiles", (req, res) => {
    const newProfile = req.body;
    const exists = profiles.some(profile => profile.email === newProfile.email);
    if(!exists){
        profiles.push(newProfile);
        res.json({message: "Profile created successfully", profiles});
    } else {
        res.status(400).json({error: "Profile already exists"});
    }
});

app.post("/inventory", (req, res) => {
    const newItems = req.body;
    let inventory = [];
    newItems.forEach(newItem => {
        const exists = inventory.some((item => item.id === newItem.id) || (item => item.name === newItem.name && item.tags.join() === newItem.tags.join()))
        if (!exists) {
            inventory.push(newItem);

        }
    });
    
    inventory = [...inventory, ...newItems];
    res.json({message : "Items added successfully", inventory});
})
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});