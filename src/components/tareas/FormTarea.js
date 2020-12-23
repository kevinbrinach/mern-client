import React, { useContext, useState, useEffect } from "react";
import proyectoContext from "../../contexts/proyectos/proyectoContext";
import tareaContext from "../../contexts/tareas/tareaContext";

const FormTarea = () => {
  // Obtener si un proyecto esta activo
  const proyectosContext = useContext(proyectoContext);
  const { proyecto } = proyectosContext;

  // Obtener la funcion del context de tarea
  const tareasContext = useContext(tareaContext);
  const { errortarea, tareaseleccionada, agregarTarea, validarTarea, obtenerTareas, actualizarTarea, limpiarTarea } = tareasContext;

  // Effect que detecta si hay una tarea seleccionada
  useEffect(() => {
    if(tareaseleccionada !== null) {
      guardarTarea(tareaseleccionada)
    } else {
      guardarTarea({
        nombre: ''
      })
    }
  }, [tareaseleccionada])

  // state del formulario
  const [tarea, guardarTarea] = useState({
    nombre: ""
  });

  // extraer el nombre del proyecto
  const { nombre } = tarea;

  // Si no hay proyecto seleccionado
  if (!proyecto) return null;

  // Array destructuring para extraer el proyecto actual
  const [proyectoActual] = proyecto;

  // Leer los valores del formulario
  const handleChange = e => {
    guardarTarea({
      ...tarea,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault();

    // validar
    if (nombre.trim() === "") {
      validarTarea();
      return;
    }

    // Checkea si es edicio o si se agrega una tarea
    if (tareaseleccionada === null) {
      // agregar la nueva tarea al state de tareas
      tarea.proyectoId = proyectoActual.id;
      tarea.estado = false;
      agregarTarea(tarea);
    } else {
      // actualizar tarea existente
      actualizarTarea(tarea)

      // Elimina tarea seleccionada del estate
      limpiarTarea()
    }

    //Obtener y filtrar las tareas del proyecto actual
    obtenerTareas(proyectoActual.id)

    // reiniciar el form
    guardarTarea({
      nombre: ''
    })
  };

  return (
    <div className="formulario">
      <form onSubmit={onSubmit}>
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="Nombre Tarea"
            name="nombre"
            value={nombre}
            onChange={handleChange}
          />
        </div>

        <div className="contenedor-input">
          <input
            type="submit"
            className="btn btn-primario btn-submit btn-block"
            value={tareaseleccionada ? 'Editar Tarea' : 'Agregar Tarea'}
          />
        </div>
      </form>

      {errortarea ? (
        <p className="mensaje error">El nombre de la tarea es obligatorio</p>
      ) : null}
    </div>
  );
};

export default FormTarea;
