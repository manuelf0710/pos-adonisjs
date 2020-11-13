'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Venta extends Model {
 static get table () {
    return 'ventas'
  }
  static get deleteTimestamp () {
    return 'deleted_at'
  }  
  static get hidden () {
    return ['created_at','updated_at','deleted_at']
  }  
  static get visible () {
    return ['id','cliente_id', 'vendedor_id', 'comision_id', 'impuesto', 'neto', 'total', 'metodo_pago']
  }	
}

module.exports = Venta
