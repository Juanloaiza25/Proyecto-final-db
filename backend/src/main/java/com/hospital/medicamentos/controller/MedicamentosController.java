package com.hospital.medicamentos.controller;

import com.hospital.medicamentos.model.*;
import com.hospital.medicamentos.service.MedicamentosService;
import com.hospital.medicamentos.repository.CategoriaMedicamentoRepository;
import com.hospital.medicamentos.repository.UnidadMedidaRepository;
import com.hospital.medicamentos.repository.FormaFarmaceuticaRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/medicamentos")
public class MedicamentosController {

    private final MedicamentosService service;
    private final CategoriaMedicamentoRepository categoriaRepo;
    private final UnidadMedidaRepository unidadRepo;
    private final FormaFarmaceuticaRepository formaRepo;

    public MedicamentosController(
            MedicamentosService service,
            CategoriaMedicamentoRepository categoriaRepo,
            UnidadMedidaRepository unidadRepo,
            FormaFarmaceuticaRepository formaRepo) {
        this.service = service;
        this.categoriaRepo = categoriaRepo;
        this.unidadRepo = unidadRepo;
        this.formaRepo = formaRepo;
    }

    // -----------------------
    // GET ALL MEDICAMENTOS
    // -----------------------
    @GetMapping
    public ResponseEntity<List<Medicamentos>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    // -----------------------
    // GET BY ID
    // -----------------------
    @GetMapping("/{id}")
    public ResponseEntity<Medicamentos> getById(@PathVariable Integer id) {
        try {
            Medicamentos medicamento = service.getById(id);
            return ResponseEntity.ok(medicamento);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // -----------------------
    // CREATE
    // -----------------------
    @PostMapping
    public ResponseEntity<Medicamentos> create(@RequestBody Medicamentos medicamento) {
        try {
            Medicamentos created = service.create(medicamento);
            return ResponseEntity.ok(created);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // -----------------------
    // UPDATE
    // -----------------------
    @PutMapping("/{id}")
    public ResponseEntity<Medicamentos> update(
            @PathVariable Integer id,
            @RequestBody Medicamentos newData
    ) {
        try {
            Medicamentos updated = service.update(id, newData);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // -----------------------
    // DELETE
    // -----------------------
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        try {
            service.delete(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // -----------------------
    // GET CATÁLOGOS PARA SELECTS
    // -----------------------
    @GetMapping("/categorias")
    public ResponseEntity<List<CategoriaMedicamento>> getCategorias() {
        return ResponseEntity.ok(categoriaRepo.findAll());
    }

    @GetMapping("/unidades")
    public ResponseEntity<List<UnidadMedida>> getUnidades() {
        return ResponseEntity.ok(unidadRepo.findAll());
    }

    @GetMapping("/formas")
    public ResponseEntity<List<FormaFarmaceutica>> getFormas() {
        return ResponseEntity.ok(formaRepo.findAll());
    }

    // -----------------------
    // BUSCAR MEDICAMENTOS POR NOMBRE
    // -----------------------
    @GetMapping("/buscar")
    public ResponseEntity<List<Medicamentos>> buscarPorNombre(@RequestParam String nombre) {
        return ResponseEntity.ok(service.buscarPorNombre(nombre));
    }
}
