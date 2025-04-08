package com.animal.animalserver;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.animal.animalserver.mapper")
public class AnimalServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(AnimalServerApplication.class, args);
    }

}
