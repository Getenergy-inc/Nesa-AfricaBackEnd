import mongoose from "mongoose";

const productCatalogSchema = new mongoose.Schema({
  itemName: String,
  description: String,
  price: Number,
  referralLink: String,
  ambassadorEarnings: Number
});

export default mongoose.model("ProductCatalog", productCatalogSchema);
