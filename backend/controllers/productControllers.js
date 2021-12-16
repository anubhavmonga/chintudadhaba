import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// @desc Fetch ALl products
// @route GET /api/data/
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  const product = await Product.find({});
  res.json(product);
});

const getProductByFilter = asyncHandler(async (req, res) => {
  let product = await Product.find({});
  let searchCategory = req.query.category;
  let searchCuisine = req.query.cuisine;
  if (searchCuisine) {
    if (searchCuisine > 1) {
      product = await Product.find({
        cuisine: { $in: [...searchCuisine] },
      });
    } else {
      product = await Product.find({
        cuisine: { $in: searchCuisine },
      });
    }
  }

  if (searchCategory) {
    if (searchCategory.length > 0 && searchCategory.length !== 2) {
      let newProduct = product.filter(
        (item) => item.category === searchCategory
      );

      product = newProduct;
    }
  }
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product Not Found" });
  }
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product Not Found" });
  }
});
const addProduct = asyncHandler(async (req, res) => {
  const { name, user, cuisine, price, img, category } = req.body;
  const productExists = await Product.findOne({ name });

  if (productExists) {
    res.status(400);
    throw new Error("User already Exists");
  }
  const product = await Product.create({
    user,
    name,
    cuisine,
    price,
    img,
    category,
  });
  if (product) {
    res.status(201).json({
      _id: product._id,
      name: product.name,
      cuisine: product.cuisine,
      price: product.price,
      img: product.img,
      category: product.category,
    });
  } else {
    res.status(400);
    throw new Error("Invaild Product data");
  }
});
const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const productExists = await Product.findById(id);

  if (productExists) {
    const newProductList = await Product.deleteOne({ _id: id });
    res.status(200).json(newProductList);
  } else {
    res.status(400);
    throw new Error("Product Does Not Exist");
  }
});

export {
  getProductByFilter,
  getProductById,
  getProducts,
  addProduct,
  deleteProduct,
};
