'use strict'
const Database = use('Database');
const Categoria = use('App/Models/pos/Categoria');
const { validate } = use('Validator')

class CategoriaController {
	
  async index(){
	  let categorias = await Categoria.query().whereNull('deleted_at').fetch();
	  
	  let response = {data: categorias};
	  
	  return response;
  }
	
  async listado ({ request, response }) {
	
	let input = request.all();
	
	let pageSize = input.pageSize;
	let page = input.page;
	page == '' ? page = 1 : page;	
	pageSize == '' ? pageSize = 20 : pageSize;	
	let categoria = input.categoria;
	let globalSearch = input.globalsearch;
		
    /*let categorias = await Database.table('categorias').select('id','nombre').paginate(page, pageSize)
	    categorias.from = await 1 + ((categorias.page * pageSize) - pageSize);
		categorias.to   = await categorias.page * pageSize >= categorias.total ? categorias.total : categorias.page * pageSize;
	return categorias; */
	let categorias = [];
	if(globalSearch!=''){
		 categorias = await Categoria.query().globalSearch(globalSearch).whereNull('deleted_at').paginate(page, pageSize);
	}else{
		 categorias = await Categoria.query().categoria(globalSearch).whereNull('deleted_at').paginate(page, pageSize);
	}
	
	return categorias;
	}

	async store({request, response}){
		const rules = {
			nombre: 'required|string|max:100'
		  };

		const validation = await validate(request.all(), rules);

		  if (!validation.fails()) {
			const categoria_nueva = new Categoria()
			categoria_nueva.nombre = request.input('nombre')
			await categoria_nueva.save();

			return response.json({
				status: 'ok',
				code: '200',
				data: categoria_nueva,
				msg: 'Guardado'
			});
		  }else{
			return response.json({
				status: 'error',
				msg: validation.messages(),
				validator:validation
			});
		  }
		  
	}	
}

module.exports = CategoriaController
