package com.hospital.medicamentos.repository;

import com.hospital.medicamentos.model.FormaFarmaceutica;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FormaFarmaceuticaRepository extends JpaRepository<FormaFarmaceutica, Integer> {
}
