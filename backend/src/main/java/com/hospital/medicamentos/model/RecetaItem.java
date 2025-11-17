package com.hospital.medicamentos.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "receta_item")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecetaItem {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_receta_item")
    private Integer idRecetaItem;

    @Column(name = "id_receta")
    private Integer idReceta;

    @Column(name = "id_medicamento")
    private Integer idMedicamento;

    private String dosis;
    private String frecuencia;

    @Column(name = "duracion_dias")
    private Integer duracionDias;

    private String instrucciones;
}
