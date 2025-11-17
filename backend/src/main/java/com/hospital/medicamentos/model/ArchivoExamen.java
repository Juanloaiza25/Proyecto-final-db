package com.hospital.medicamentos.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "archivo_examen")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ArchivoExamen {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_archivo")
    private Integer idArchivo;

    @Column(name = "id_historial")
    private Integer idHistorial;

    @Column(name = "nombre_archivo")
    private String nombreArchivo;

    private String ruta;

    @Column(name = "tipo_mime")
    private String tipoMime;

    @Column(name = "fecha_subida")
    private LocalDateTime fechaSubida;
}
