'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Producto extends Model {
	
 static get table () {
    return 'productos'
  }
  static get deleteTimestamp () {
    return 'deleted_at'
  }  
  static get hidden () {
    return ['created_at','updated_at','deleted_at']
  }  
  static get visible () {
    return ['id','categoria_id', 'codigo', 'barras', 'descripcion', 'stock', 'precio_compra', 'precio_venta', 'precio_ventaimpuesto', 'imagen']
  }
  
  static scopeGlobalSearch(query, cat) {
	if(cat){
	return query.where('descripcion', 'like', '%'+cat+'%')
			    .orWhere('codigo', 'like', '%'+cat+'%');
	}
  } 
  
  static scopeCodigo(query, cat) {
	if(cat){
	return query.where('codigo', 'like', '%'+cat+'%');
	}
  }
  
  static scopeDescripcion(query, cat) {
	if(cat){
	return query.where('descripcion', 'like', '%'+cat+'%');
	}
  }  
  
  static scopeCategoria(query, cat) {
	if(cat){
	return query.where('categoria_id', '=', cat);
	}
  }   
  
}

module.exports = Producto
