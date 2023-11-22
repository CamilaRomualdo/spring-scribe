package com.romualdo.camila.springscribe;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.romualdo.camila")
public class SpringScribeApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringScribeApplication.class, args);
	}

}
