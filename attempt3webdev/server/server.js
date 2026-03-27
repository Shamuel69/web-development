
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

const inventory = [{ label: 'Ring', description: 'A stunning ring with a brilliant cut diamond.', price: 250, tags: ['Gold', 'Diamond'] },
        { label: 'Necklace', description: 'A beautiful necklace with a pendant design.', price: 100, tags: ['Silver', 'Ruby'] },
        { label: 'Earrings', description: 'A pair of elegant earrings with a timeless design.', price: 70, tags: ['Gold', 'Pearl'] },
        { label: 'Bracelets', description: 'A stylish bracelet made with high-quality materials.', price: 80, tags: ['Silver', 'Sapphire'] },
        { label: 'Necklace', description: 'A beautiful necklace with a pendant design.', price: 100, tags: ['Platinum', 'Diamond'] },
        { label: 'Earrings', description: 'A pair of elegant earrings with a classic design.', price: 70, tags: ['Gold', 'Emerald'] },
        { label: 'Bracelets', description: 'A trendy bracelet with a modern design.', price: 90, tags: ['Silver', 'Ruby'] },
        { label: 'Bracelets', description: 'A stylish bracelet made with premium materials.', price: 80, tags: ['Gold', 'Sapphire'] },
        { label: 'Necklace', description: 'An elegant necklace made with high-quality materials.', price: 150, tags: ['Platinum', 'Emerald'] },
        { label: 'Ring', description: 'A stunning ring with a brilliant cut diamond.', price: 250, tags: ['Gold', 'Diamond'] },
        { label: 'Necklace', description: 'A beautiful necklace with intricate designs.', price: 120, tags: ['Silver', 'Ruby'] },
        { label: 'Ring', description: 'A stunning ring with a brilliant cut diamond.', price: 250, tags: ['Gold', 'Diamond'] },]

inventory.forEach(item => {
    if(!item.name){
        item.name = item.tags.map(tag => tag).join(" ") + " " + item.label;
    }
});

app.get("/inventory", (req, res) =>{
    res.json({inventory});
});

app.get("/inventory/:id", (req, res) => {
    const itemID = inventory.find(item => item.id === parseInt(req.params.id));
    if(itemID){
        res.json({item: itemID});
    } else {
        res.status(404).json({error: "Item not found"});
    }
});
app.post("/inventory", (req, res) => {
    const newItems = req.body;
    inventory = [...inventory, ...newItems];
    res.json({message : "Items added successfully", inventory});
})
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});