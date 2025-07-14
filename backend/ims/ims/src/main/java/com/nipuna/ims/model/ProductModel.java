package com.nipuna.ims.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Date;

@Entity
@Table(name = "products")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ProductModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int product_id;


    private String productName;


    private int price;


    private String description;


    private String category;


    private int quantity;


    private String imageUrl;

    private LocalDate man_date;
    private LocalDate exp_date;
}
