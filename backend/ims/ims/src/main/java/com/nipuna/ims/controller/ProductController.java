package com.nipuna.ims.controller;

import com.nipuna.ims.model.ProductModel;
import com.nipuna.ims.service.ProductService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.*;
import java.time.LocalDate;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@AllArgsConstructor
@NoArgsConstructor
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    //  Add product with image upload
    @PostMapping("/add")
    public ResponseEntity<?> addProduct(
            @RequestParam("productName") String productName,
            @RequestParam("price") int price,
            @RequestParam("description") String description,
            @RequestParam("category") String category,
            @RequestParam("quantity") int quantity,
            @RequestParam("man_date") String manDate,
            @RequestParam("exp_date") String expDate,
            @RequestParam("image") MultipartFile image
    ) {
        try {
            // Save image to uploads folder
            String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
            Path uploadPath = Paths.get("uploads");

            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            Path filePath = uploadPath.resolve(fileName);
            Files.copy(image.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            // Create ProductModel
            ProductModel product = new ProductModel();
            product.setProductName(productName);
            product.setPrice(price);
            product.setDescription(description);
            product.setCategory(category);
            product.setQuantity(quantity);
            product.setMan_date(LocalDate.parse(manDate));
            product.setExp_date(LocalDate.parse(expDate));
            product.setImageUrl("/uploads/" + fileName); // for frontend access

            ProductModel savedProduct = productService.addProduct(product);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedProduct);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error: " + e.getMessage());
        }
    }

    //  Get all products
    @GetMapping("/all")
    public ResponseEntity<?> getAllProducts() {
        try {
            List<ProductModel> products = productService.getAllProduct();
            if (products.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No products found");
            }
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    //  Get product by name
    @GetMapping("/name/{name}")
    public ResponseEntity<?> getProductByName(@PathVariable String name) {
        try {
            ProductModel product = productService.getProductByName(name);
            if (product != null) {
                return ResponseEntity.ok(product);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    //  Get product by ID
    @GetMapping("/get/{id}")
    public ResponseEntity<?> getProductById(@PathVariable int id) {
        try {
            ProductModel product = productService.getProductById(id);
            if (product != null) {
                return ResponseEntity.ok(product);
            } else {
                return ResponseEntity.status(404).body("Product with ID " + id + " not found.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error occurred: " + e.getMessage());
        }
    }

    //  Update product
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable int id, @RequestBody ProductModel product) {
        try {
            ProductModel updatedProduct = productService.updateProduct(id, product);
            if (updatedProduct != null) {
                return ResponseEntity.ok(updatedProduct);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product with ID " + id + " not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    //  Delete product by ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable int id) {
        try {
            boolean deleted = productService.deleteProduct(id);
            if (deleted) {
                return ResponseEntity.ok("Product deleted successfully");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product with ID " + id + " not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }
}
