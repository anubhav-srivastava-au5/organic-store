const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/Product');
const isAdmin = require('../middleware/isAdmin');
const isAuth = require('../middleware/isAuth');

router.post('/create', isAuth,isAdmin, async(req, res, next) => {
    
    console.log(req.user.isAdmin);
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        image:req.body.image,
        price: req.body.price,
        countInStock: req.body.countInStock,
        description: req.body.description,
        category: req.body.category
    });
    const newProduct=await product.save();
    if(newProduct){
       return res.status(201).send({message:"new product created",data:newProduct})
    }
    return res.status(500).send({message:"error in creating product"})
});


router.get('/', async (req, res) => {
  const category = req.query.category ? { category: req.query.category } : {};
  const searchKeyword = req.query.searchKeyword
    ? {
        name: {
          $regex: req.query.searchKeyword,
          $options: 'i',
        },
      }
    : {};

  const products = await Product.find({ ...category, ...searchKeyword })
 
  res.send(products);
});

router.get('/:id', async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found.' });
  }
});


router.get('/category/:category', async(req, res, next) => {

    const product=await Product.find({category:req.params.category});
    if(product){
        res.send(product)
    }
    else{
        res.status(404).send({message:"category not found."})
    }
    

});

router.put('/:id', isAuth, isAdmin, async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      product.name = req.body.name;
      product.price = req.body.price;
      product.image = req.body.image;
      product.brand = req.body.brand;
      product.category = req.body.category;
      product.countInStock = req.body.countInStock;
      product.description = req.body.description;
      const updatedProduct = await product.save();
      if (updatedProduct) {
        return res
          .status(200)
          .send({ message: 'Product Updated', data: updatedProduct });
      }
    }
    return res.status(500).send({ message: ' Error in Updating Product.' });
  });

router.delete('/:id', isAuth, isAdmin, async (req, res) => {
    const deletedProduct = await Product.findById(req.params.id);
    if (deletedProduct) {
      await deletedProduct.remove();
      res.send({ message: 'Product Deleted' });
    } else {
      res.send('Error in Deletion.');
    }
  });

module.exports = router;
