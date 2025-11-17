package com.hospital.medicamentos.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "salida_medicamento")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SalidaMedicamento {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_salida")
    private Integer idSalida;

    @Column(name = "id_inventario")
    private Integer idInventario;

    private Double cantidad;

    @Column(name = "fecha_salida")
    private LocalDateTime fechaSalida;

    private String tipo;
    private String referencia;

    @Column(name = "created_by")
    private Integer createdBy;
}
