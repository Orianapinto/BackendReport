Este documento describe la estructura de los modelos de datos utilizados en la aplicación. Los modelos están diseñados para ser utilizados con MongoDB y Mongoose, asegurando una correcta gestión y validación de la información.

Task (Tarea)

Descripción: Representa una tarea que puede estar en diferentes estados y asociada a una ubicación específica.

Campos
title (String, requerido): Título de la tarea.
description (String, requerido): Descripción detallada.
location (String, requerido, enum): Ubicación de la tarea.
category (String, requerido, enum): Categoría de la tarea.
taskRef (String, opcional): Referencia a una tarea en otro sistema.
status (String, requerido, enum): Estado de la tarea (completed, in-progress, pending).
completedDate (Date, requerido): Fecha de finalización.
timestamps: Incluye createdAt y updatedAt automáticamente.

Improvement (Mejora)

Descripción: Representa una mejora implementada en un área específica.

Campos
description (String, requerido): Descripción de la mejora.
location (String, requerido, enum): Ubicación de la mejora.
status (String, requerido, enum): Estado de la mejora.
beforeImage (String, opcional): Imagen antes de la mejora.
afterImage (String, opcional): Imagen después de la mejora.
timestamps: Incluye createdAt y updatedAt automáticamente.

Metrics (Métricas)

Descripción: Contiene datos sobre métricas de actividad en diferentes ubicaciones.

Campos
location (String, requerido, enum): Ubicación asociada.
activeUsers (Number, requerido): Número de usuarios activos.
conversions (Number, opcional): Número de conversiones registradas.

WeeklyReport (Reporte Semanal)

Descripción: Resumen semanal de tareas, mejoras y métricas.

Campos
date (Date, requerido): Fecha del reporte.
week (Number, requerido): Semana del año.
month (String, requerido): Mes correspondiente.
year (Number, requerido): Año correspondiente.
completedTasks (Array de Task): Tareas completadas en la semana.
improvements (Array de Improvement): Mejoras implementadas en la semana.
metrics (Array de Metrics): Métricas registradas en la semana.
observations (Array de String, opcional): Comentarios adicionales.
nextSteps (Array de String, opcional): Próximos pasos sugeridos.
timestamps: Incluye createdAt y updatedAt automáticamente.

MonthlyReport (Reporte Mensual)

Descripción: Resumen mensual basado en los reportes semanales.

Campos
month (String, requerido): Mes del reporte.
year (Number, requerido): Año del reporte.
reports (Array de WeeklyReport): Reportes semanales incluidos en el resumen.
totalTasksByLocation (Map): Total de tareas completadas por ubicación.
totalImprovementsByLocation (Map): Total de mejoras por ubicación.
averageMetricsByLocation (Map de Metrics): Promedio de métricas por ubicación.
timestamps: Incluye createdAt y updatedAt automáticamente.

Consideraciones

Uso de Enum: Se usan valores predefinidos para location, category y status.
Timestamps: Se activan automáticamente en los modelos para manejar fechas de creación y actualización.
Relaciones: Los reportes semanales incluyen tareas, mejoras y métricas en arreglos anidados.
Mapas: Se usan mapas (Map) en el reporte mensual para facilitar cálculos por ubicación.

Este modelo de datos está optimizado para MongoDB y facilita la generación de reportes semanales y mensuales con información estructurada y fácilmente accesible.
