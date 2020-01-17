import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete
} from "@nestjs/common";
import { ProductsService } from "./products.service";

@Controller("products")
export class ProductsController {
  constructor(public productsService: ProductsService) {}

  @Get()
  getProducts() {
    return this.productsService.getProducts();
  }

  @Post()
  addProduct(
    @Body("title") title: string,
    @Body("description") description: string,
    @Body("price") price: number
  ) {
    return this.productsService.addProduct(title, description, price);
  }

  @Get(":id")
  getProduct(@Param("id") id: string) {
    return this.productsService.getProduct(id);
  }

  @Patch("id")
  updateProduct(
    @Param("id") id: string,
    @Body("title") title: string,
    @Body("description") description: string,
    @Body("price") price: number
  ) {
    return this.productsService.updateProduct(id, title, description, price);
  }

  @Delete("id")
  deleteProduct(@Param("id") id: string) {
    return this.productsService.deleteProduct(id);
  }
}
