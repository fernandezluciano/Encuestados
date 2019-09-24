/*
 * Modelo
 */
var Modelo = function() {
  this.preguntas = JSON.parse(localStorage.getItem('preguntas')) || [];
  this.ultimoId = 0;

  // Inicialización de eventos //
  this.preguntaAgregada = new Evento(this);
  this.preguntaBorrada = new Evento(this);
  this.todoBorrado = new Evento(this);
  this.preguntaEditada = new Evento(this);
  this.preguntaVotada = new Evento(this);
};

Modelo.prototype = {
  // Se obtiene el id más grande asignado a una pregunta //
  obtenerUltimoId: function() {
    var ultimoId = 0;
    for (let i = 0; i < this.preguntas.length; i++) {
       if(this.preguntas[i].id > ultimoId){
         ultimoId = this.preguntas[i].id
       }
    }
      return ultimoId;
  },

  // Se agrega una pregunta dado un nombre y sus respuestas //
  agregarPregunta: function(nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  },

  borrarPregunta: function(id){
    this.preguntas = this.preguntas.filter(function(pregunta){
      return pregunta.id !== id;
    }); 
    this.guardar();
    this.preguntaBorrada.notificar();
  },

  borrarTodo: function(){
    this.preguntas = [];
    this.guardar();
    this.todoBorrado.notificar();
  },


  editarPregunta: function(id, nuevoTextoPregunta){
   var preguntaAEditar = this.preguntas.find(function(pregunta){
        return pregunta.id === id;
   });
   
   if(preguntaAEditar){
    preguntaAEditar.textoPregunta = nuevoTextoPregunta;
    this.guardar();
    this.preguntaEditada.notificar();
   }
  },

  agregarVotos: function(nombrePregunta, respuestaSeleccionada){
    
    this.preguntaVotada.notificar();
  },

  // Se guardan las preguntas //
  guardar: function(){
    localStorage.setItem('preguntas', JSON.stringify(modelo.preguntas));
  },
};

