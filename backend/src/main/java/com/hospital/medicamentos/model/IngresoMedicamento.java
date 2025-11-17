package com.hospital.medicamentos.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "ingreso_medicamento")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class IngresoMedicamento {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_ingreso")
    private Integer idIngreso;

    @Column(name = "id_inventario")
    private Integer idInventario;

    private Double cantidad;

    @Column(name = "costo_unitario")
    private Double costoUnitario;

    @Column(name = "fecha_ingreso")
    private LocalDateTime fechaIngreso;

    private String referencia;

    @Column(name = "created_by")
    private Integer createdBy;
}
