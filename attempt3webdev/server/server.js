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

const inventory = [{id:1, name: 'Ring', label: 'Ring', description: 'A stunning ring with a brilliant cut diamond.', price: 250, tags: ['Gold', 'Diamond'] },
        {id:2, name: 'Necklace', label: 'Necklace', description: 'A beautiful necklace with a pendant design.', price: 100, tags: ['Silver', 'Ruby'] },
        {id:3, name: 'Earrings', label: 'Earrings', description: 'A pair of elegant earrings with a timeless design.', price: 70, tags: ['Gold', 'Pearl'] },
        {id:4, name: 'Bracelets', label: 'Bracelets', description: 'A stylish bracelet made with high-quality materials.', price: 80, tags: ['Silver', 'Sapphire'] },
        {id:5, name: 'Necklace2', label: 'Necklace', description: 'A beautiful necklace with a pendant design.', price: 100, tags: ['Platinum', 'Diamond'] },
        {id:6, name: 'Earrings2', label: 'Earrings', description: 'A pair of elegant earrings with a classic design.', price: 70, tags: ['Gold', 'Emerald'] },
        {id:7, name: 'Bracelets2', label: 'Bracelets', description: 'A trendy bracelet with a modern design.', price: 90, tags: ['Silver', 'Ruby'] },
        {id:8, name: 'Bracelets3', label: 'Bracelets', description: 'A stylish bracelet made with premium materials.', price: 80, tags: ['Gold', 'Sapphire'] },
        {id:9, name: 'Necklace3', label: 'Necklace', description: 'An elegant necklace made with high-quality materials.', price: 150, tags: ['Platinum', 'Emerald'] },
        {id:10, name: 'Ring4', label: 'Ring', description: 'A stunning ring with a brilliant cut diamond.', price: 250, tags: ['Gold', 'Diamond'] },
        {id:11, name: 'Necklace4', label: 'Necklace', description: 'A beautiful necklace with intricate designs.', price: 120, tags: ['Silver', 'Ruby'] },
        {id:12, name: 'Ring5', label: 'Ring', description: 'A stunning ring with a brilliant cut diamond.', price: 250, tags: ['Gold', 'Diamond'] },]

app.get("/inventory", (req, res) =>{
    res.json({inventory});
});

app.get("/inventory/:id", (req, res) => {
    const itemID = inventoyr.find(item => item.id === parseInt(req.params.id));
    if(itemID){
        res.json({item: itemID});
    } else {
        res.status(404).json({error: "Item not found"});
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});