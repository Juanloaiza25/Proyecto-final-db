package com.hospital.medicamentos.service;

import com.hospital.medicamentos.model.Medicamentos;
import com.hospital.medicamentos.model.CategoriaMedicamento;
import com.hospital.medicamentos.model.UnidadMedida;
import com.hospital.medicamentos.model.FormaFarmaceutica;
import com.hospital.medicamentos.repository.MedicamentoRepository;
import com.hospital.medicamentos.repository.CategoriaMedicamentoRepository;
import com.hospital.medicamentos.repository.UnidadMedidaRepository;
import com.hospital.medicamentos.repository.FormaFarmaceuticaRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class MedicamentosService {

    private final MedicamentoRepository medicamentoRepo;
    private final CategoriaMedicamentoRepository categoriaRepo;
    private final UnidadMedidaRepository unidadRepo;
    private final FormaFarmaceuticaRepository formaRepo;

    public MedicamentosService(
            MedicamentoRepository medicamentoRepo,
            CategoriaMedicamentoRepository categoriaRepo,
            UnidadMedidaRepository unidadRepo,
            FormaFarmaceuticaRepository formaRepo) {
        this.medicamentoRepo = medicamentoRepo;
        this.categoriaRepo = categoriaRepo;
        this.unidadRepo = unidadRepo;
        this.formaRepo = formaRepo;
    }

    // Obtener todos los medicamentos
    public List<Medicamentos> getAll() {
        return medicamentoRepo.findAll();
    }

    // Obtener por ID
    public Medicamentos getById(Integer id) {
        return medicamentoRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Medicamento no encontrado con ID: " + id));
    }

    // Crear un nuevo medicamento
    public Medicamentos create(Medicamentos medicamento) {
        asignarRelaciones(medicamento);
        return medicamentoRepo.save(medicamento);
    }

    // Actualizar un medicamento existente
    public Medicamentos update(Integer id, Medicamentos newData) {
        Medicamentos medicamento = medicamentoRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Medicamento no encontrado con ID: " + id));

        medicamento.setNombreComercial(newData.getNombreComercial());
        medicamento.setNombreGenerico(newData.getNombreGenerico());
        medicamento.setConcentracion(newData.getConcentracion());
        medicamento.setPresentacion(newData.getPresentacion());
        medicamento.setEfectosSecundarios(newData.getEfectosSecundarios());
        medicamento.setContraindicaciones(newData.getContraindicaciones());
        medicamento.setIsActive(newData.getIsActive());

        // Asignar relaciones
        asignarRelaciones(medicamento, newData);

        return medicamentoRepo.save(medicamento);
    }

    // Eliminar por ID
    public void delete(Integer id) {
        if (!medicamentoRepo.existsById(id)) {
            throw new RuntimeException("No existe un medicamento con ID: " + id);
        }
        medicamentoRepo.deleteById(id);
    }

    // -----------------------
    // Métodos auxiliares
    // -----------------------

    // Asigna relaciones al crear
    private void asignarRelaciones(Medicamentos medicamento) {
        asignarRelaciones(medicamento, medicamento);
    }

    // Asigna relaciones desde otra instancia (update)
    private void asignarRelaciones(Medicamentos medicamento, Medicamentos source) {
        if (source.getCategoria() != null) {
            CategoriaMedicamento categoria = categoriaRepo.findById(source.getCategoria().getIdCategoria())
                    .orElseThrow(() -> new RuntimeException("Categoría no encontrada con ID: " + source.getCategoria().getIdCategoria()));
            medicamento.setCategoria(categoria);
        }

        if (source.getUnidad() != null) {
            UnidadMedida unidad = unidadRepo.findById(source.getUnidad().getIdUnidad())
                    .orElseThrow(() -> new RuntimeException("Unidad no encontrada con ID: " + source.getUnidad().getIdUnidad()));
            medicamento.setUnidad(unidad);
        }

        if (source.getForma() != null) {
            FormaFarmaceutica forma = formaRepo.findById(source.getForma().getIdForma())
                    .orElseThrow(() -> new RuntimeException("Forma farmacéutica no encontrada con ID: " + source.getForma().getIdForma()));
            medicamento.setForma(forma);
        }
    }
    public List<Medicamentos> buscarPorNombre(String nombre) {
    return medicamentoRepo.findByNombreComercialContainingIgnoreCase(nombre);
}
}
