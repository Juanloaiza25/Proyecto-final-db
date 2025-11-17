package com.hospital.medicamentos.model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name = "medicamentos")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Medicamentos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_medicamento")
    private Integer idMedicamento;

    @Column(name = "nombre_comercial")
    private String nombreComercial;

    @Column(name = "nombre_generico")
    private String nombreGenerico;

    // Relaciones con catálogos
    @ManyToOne
    @JoinColumn(name = "id_categoria")
    private CategoriaMedicamento categoria;

    @ManyToOne
    @JoinColumn(name = "id_unidad")
    private UnidadMedida unidad;

    @ManyToOne
    @JoinColumn(name = "id_forma")
    private FormaFarmaceutica forma;

    private String concentracion;
    private String presentacion;

    @Column(name = "efectos_secundarios")
    private String efectosSecundarios;

    private String contraindicaciones;

    @Column(name = "is_active")
    private Boolean isActive = true;

    @CreatedDate
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

}
