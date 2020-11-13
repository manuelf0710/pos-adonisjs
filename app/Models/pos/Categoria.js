'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Categoria extends Model {
 static get table () {
    return 'categorias'
  }
  static get deleteTimestamp () {
    return 'deleted_at'
  }  
  static get hidden () {
    return ['created_at','updated_at','deleted_at']
  }  
  static get visible () {
    return ['id','nombre']
  }

  static scopeCategoria(query, cat) {
	if(cat){
	return query.where('nombre', 'like', '%'+cat+'%');
	}
  }  
  static scopeGlobalSearch(query, cat) {
	if(cat){
	return query.where('nombre', 'like', '%'+cat+'%');
	}
  }
}

module.exports = Categoria
