package com.hospital.medicamentos.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "unidad_medida")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UnidadMedida {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_unidad")
    private Integer idUnidad;

    private String nombre;
}
