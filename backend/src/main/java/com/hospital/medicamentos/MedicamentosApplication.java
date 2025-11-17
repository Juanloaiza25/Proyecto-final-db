package com.hospital.medicamentos;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class MedicamentosApplication {

	public static void main(String[] args) {
		SpringApplication.run(MedicamentosApplication.class, args);
	}

}
