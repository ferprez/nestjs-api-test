import { Model } from "mongoose";
import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./product.model";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel("Product") private readonly productModel: Model<Product>
  ) {}

  public products: Product[] = [];

  async getProducts() {
    const products = await this.productModel.find().exec();
    return products.map(p => ({
      id: p.id,
      title: p.title,
      description: p.description,
      price: p.price
    }));
  }

  async addProduct(
    title: string,
    description: string,
    price: number
  ): Promise<any> {
    const newProduct = new this.productModel({ title, description, price });
    const result = await newProduct.save();
    return { id: result._id };
  }

  async getProduct(id: string) {
    const product = await this.findProduct(id);
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price
    };
  }

  async updateProduct(
    id: string,
    title: string,
    description: string,
    price: number
  ) {
    const product = await this.findProduct(id);
    if (title) {
      product.title = title;
    }
    if (description) {
      product.description = description;
    }
    if (price) {
      product.price = price;
    }
    product.save();
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price
    };
  }

  async deleteProduct(id: string) {
    const result = await this.productModel.deleteOne({ _id: id }).exec();
    if (result.n === 0) {
      throw new NotFoundException("Could not find the product");
    }
  }

  private async findProduct(id: string) {
    let product;
    try {
      product = await this.productModel.findById(id);
    } catch (error) {
      throw new NotFoundException("Could not find product");
    }
    if (!product) {
      throw new NotFoundException("Could not find product");
    }
    return product;
  }
}
