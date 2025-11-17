package com.hospital.medicamentos.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "pacientes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Pacientes {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_paciente")
    private Integer idPaciente;

    @Column(name = "id_tipo_documento")
    private Integer idTipoDocumento;

    @Column(name = "numero_documento")
    private String numeroDocumento;

    private String nombre;
    private String apellido;

    @Column(name = "fecha_nacimiento")
    private LocalDate fechaNacimiento;

    private String sexo;
    private String direccion;
    private String telefono;
    private String correo;

    @Column(name = "is_active")
    private Integer isActive;

    private LocalDateTime created_at;
    private LocalDateTime updated_at;
}
