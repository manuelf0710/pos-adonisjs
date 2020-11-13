'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class LinkModulo extends Model {
 static get table () {
    return 'link_modulos'
  }
  static get deleteTimestamp () {
    return 'deleted_at'
  }  
  static get hidden () {
    return ['created_at','updated_at','deleted_at']
  }  
  static get visible () {
    return ['id','modulo', 'page', 'url', 'estado', 'padre']
  }  
}

module.exports = LinkModulo
