package com.hospital.medicamentos.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "receta")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Receta {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_receta")
    private Integer idReceta;

    @Column(name = "id_paciente")
    private Integer idPaciente;

    @Column(name = "id_medico")
    private Integer idMedico;

    @Column(name = "fecha_emision")
    private LocalDateTime fechaEmision;

    @Column(name = "validez_dias")
    private Integer validezDias;

    private String observaciones;

    @Column(name = "created_by")
    private Integer createdBy;
}
