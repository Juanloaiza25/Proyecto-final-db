package com.hospital.medicamentos.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "nota_clinica")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class NotaClinica {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_nota")
    private Integer idNota;

    @Column(name = "id_historial")
    private Integer idHistorial;

    @Column(name = "id_medico")
    private Integer idMedico;

    private String titulo;
    private String descripcion;
    private LocalDateTime fecha;
}
