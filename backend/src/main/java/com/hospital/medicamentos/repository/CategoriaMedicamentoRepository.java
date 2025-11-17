package com.hospital.medicamentos.repository;

import com.hospital.medicamentos.model.CategoriaMedicamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoriaMedicamentoRepository extends JpaRepository<CategoriaMedicamento, Integer> {
}
