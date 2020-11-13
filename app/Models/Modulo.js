'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Modulo extends Model {
 static get table () {
    return 'modulos'
  }
  static get deleteTimestamp () {
    return 'deleted_at'
  }  
  static get hidden () {
    return ['created_at','updated_at','deleted_at']
  }  
  static get visible () {
    return ['id', 'nombre', 'descripcion', 'estado', 'icon', 'img','url']
  }  
}

module.exports = Modulo
