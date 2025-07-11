package com.nipuna.ims.service;

import com.nipuna.ims.model.ProductModel;
import com.nipuna.ims.repo.ProductRepo;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@NoArgsConstructor
@Service
public class ProductService {

    @Autowired
    private ProductRepo productRepo;

    // add product
    public ProductModel addProduct(ProductModel productModel){
        if(productModel==null){
            return null;
        }
        return productRepo.save(productModel);
    }

    //get all product
    public List<ProductModel> getAllProduct(){
        List<ProductModel> allProduct=productRepo.findAll();
        if(allProduct == null){
            return null;
        }
        return allProduct;
    }

    //get product by name
    public ProductModel getProductByName(String name) {
        Optional<ProductModel> productOptional = productRepo.findByProductName(name);

        if (productOptional.isPresent()) {
            return productOptional.get();
        } else {
            // You can log or throw an exception if needed
            System.out.println("Product with name '" + name + "' not found.");
            return null;
        }
    }

    //get product by id
    public ProductModel getProductById(int id) {
        Optional<ProductModel> productOptional = productRepo.findById(id);

        if (productOptional.isPresent()) {
            return productOptional.get();
        } else {
            System.out.println("Product with ID " + id + " not found.");
            return null;
        }
    }


    //update product
    public ProductModel updateProduct(int id, ProductModel updatedProduct) {
        ProductModel existingProduct = productRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));

        if(updatedProduct.getProductName() != null){
            existingProduct.setProductName(updatedProduct.getProductName());
        }



        if (updatedProduct.getProductName() != null) {
            existingProduct.setProductName(updatedProduct.getProductName());
        }

        if (updatedProduct.getPrice() != 0) {
            existingProduct.setPrice(updatedProduct.getPrice());
        }

        if (updatedProduct.getDescription() != null) {
            existingProduct.setDescription(updatedProduct.getDescription());
        }

        if (updatedProduct.getCategory() != null) {
            existingProduct.setCategory(updatedProduct.getCategory());
        }

        if (updatedProduct.getQuantity() != 0) {
            existingProduct.setQuantity(updatedProduct.getQuantity());
        }

        if (updatedProduct.getImageUrl() != null) {
            existingProduct.setImageUrl(updatedProduct.getImageUrl());
        }

        if (updatedProduct.getMan_date() != null) {
            existingProduct.setMan_date(updatedProduct.getMan_date());
        }

        if (updatedProduct.getExp_date() != null) {
            existingProduct.setExp_date(updatedProduct.getExp_date());
        }


        return productRepo.save(existingProduct);
    }

    //delete product
    public boolean deleteProduct(int id) {
        if (productRepo.existsById(id)) {
            productRepo.deleteById(id);
            return true;
        }
        return false;
    }


}
