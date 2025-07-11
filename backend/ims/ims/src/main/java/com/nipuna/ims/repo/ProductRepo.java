package com.nipuna.ims.repo;

import com.nipuna.ims.model.ProductModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductRepo extends JpaRepository<ProductModel,Integer> {

    Optional<ProductModel> findByProductName(String productName);

}
