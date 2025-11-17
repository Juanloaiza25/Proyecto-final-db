package com.hospital.medicamentos.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "forma_farmaceutica")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FormaFarmaceutica {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_forma")
    private Integer idForma;

    private String nombre;
}
