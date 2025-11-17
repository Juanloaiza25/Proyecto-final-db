package com.hospital.medicamentos.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "citas")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Citas {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_cita")
    private Integer idCita;

    @Column(name = "id_paciente")
    private Integer idPaciente;

    @Column(name = "id_medico")
    private Integer idMedico;

    @Column(name = "id_sala")
    private Integer idSala;

    @Column(name = "fecha_hora")
    private LocalDateTime fechaHora;

    @Column(name = "duracion_min")
    private Integer duracionMin;

    private String motivo;

    @Column(name = "estado_cita")
    private String estadoCita;

    private LocalDateTime created_at;
    private LocalDateTime updated_at;
}
