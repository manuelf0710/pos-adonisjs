'use strict'
const Database = use('Database');
const Modulo = use('App/Models/Modulo');
const LinkModulo = use('App/Models/LinkModulo');
class ModuloController {
  
  async getModulos ({ request, response }) {
	 //return await Modulo.all();
	 /*return await Modulo.query()
                      .where('estado', 1)
                      .fetch();*/    
    return await Database.table('modulos').select('*')
    }

  async index ({ request, response }) {

   let  modulos = await Modulo.query()
                       .select('id', 'nombre', 'descripcion', 'estado', 'icon', 'img')
                       .where('estado', 1)
                       .fetch();

    let nuevomodulos = modulos.toJSON();         
    let i = 0;
    for (const modulo of nuevomodulos) {
      nuevomodulos[i].pages_menu = await this.getLinksModulo(modulo['id']);
      i++;
    } 
    
    return nuevomodulos;
  }

 async getLinksModulo(id){
    let links =  await LinkModulo.query()
    .where('modulo', id)
    .where('estado', 1)
    .whereNull('padre')
    .fetch();
    
    let nuevolinks = links.toJSON();         
    let i = 0;
    for (const link of nuevolinks) {
      nuevolinks[i].hijos = await this.getSubLinks(link['id']);
      i++;
    }
    return nuevolinks;        
  }

	 async getSubLinks(id_link){
    let links = await LinkModulo.query()
    .where('padre', id_link)
    .where('estado',1)
    .fetch();
    
    return links;
	} 

  
  
}

module.exports = ModuloController
