package com.hospital.medicamentos.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "permiso")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Permiso {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_permiso")
    private Integer idPermiso;

    private String codigo;
    private String descripcion;
}
