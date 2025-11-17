package com.hospital.medicamentos.repository;

import com.hospital.medicamentos.model.Medicamentos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List; // <--- IMPORTAR List

@Repository
public interface MedicamentoRepository extends JpaRepository<Medicamentos, Integer> {

    // Buscar por nombre comercial (contiene, case insensitive)
    List<Medicamentos> findByNombreComercialContainingIgnoreCase(String nombre);

}
