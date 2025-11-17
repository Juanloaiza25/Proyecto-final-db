package com.hospital.medicamentos.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "inventario_medicamento")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class InventarioMedicamento {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_inventario")
    private Integer idInventario;

    @Column(name = "id_medicamento")
    private Integer idMedicamento;

    private String lote;

    @Column(name = "fecha_vencimiento")
    private LocalDate fechaVencimiento;

    @Column(name = "cantidad_actual")
    private Double cantidadActual;

    @Column(name = "cantidad_minima")
    private Double cantidadMinima;

    private String ubicacion;

    @Column(name = "id_proveedor")
    private Integer idProveedor;

    @Column(name = "fecha_ingreso")
    private LocalDateTime fechaIngreso;

    @Column(name = "is_active")
    private Integer isActive;
}
