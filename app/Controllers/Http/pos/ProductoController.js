'use strict'
const Producto = use('App/Models/pos/Producto');

class ProductoController {
  async listado ({ request, response }) {
	
	let input = request.all();
	
	let pageSize = input.pageSize;
	let page = input.page;
	page == '' ? page = 1 : page;	
	pageSize == '' ? pageSize = 20 : pageSize;	
	let codigo = input.codigo;
	let descripcion = input.descripcion;
	let categoria = input.categoria;
	let globalSearch = input.globalsearch;
		
	let productos = [];
	if(globalSearch!=''){
		 productos = await Producto.query().globalSearch(globalSearch)
		 								   .whereNull('deleted_at')
		 								   .paginate(page, pageSize);
	}else{
		 productos = await Producto.query()
		 .codigo(codigo)
		 .descripcion(descripcion)
		 .categoria(categoria)
		 .whereNull('deleted_at')
		 .paginate(page, pageSize);
	}
	
	return productos;
	}

  async getBarcode({params, response}){
	    
		let codigo = params.codigo;
		let productos = await Producto.query()
							.where('barras', '=', codigo)
							.orWhere('codigo', '=', codigo)
							.fetch();
		return productos;
  } 	
}

module.exports = ProductoController
