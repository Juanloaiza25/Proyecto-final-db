package com.hospital.medicamentos.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "medicos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Medicos {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_medico")
    private Integer idMedico;

    @Column(name = "num_registro")
    private String numRegistro;

    private String nombre;
    private String apellido;

    @Column(name = "id_especialidad")
    private Integer idEspecialidad;

    private String telefono;
    private String correo;

    @Column(name = "is_active")
    private Integer isActive;

    private LocalDateTime created_at;
    private LocalDateTime updated_at;
}
