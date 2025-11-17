package com.hospital.medicamentos.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "historiales_medicos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class HistorialesMedicos {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_historial")
    private Integer idHistorial;

    @Column(name = "id_paciente")
    private Integer idPaciente;

    @Column(name = "fecha_apertura")
    private LocalDateTime fechaApertura;

    private String diagnosticos;
    private String notas;

    @Column(name = "created_by")
    private Integer createdBy;
}
