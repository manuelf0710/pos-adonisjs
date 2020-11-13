'use strict'
const User = use('App/Models/User')
const Modulo = use('App/Models/Modulo');
const LinkModulo = use('App/Models/LinkModulo');

class AuthController {
    async login({request, response, auth}){
        let input = request.all();
        let token = await auth.withRefreshToken().attempt(input.email, input.password)
        //return response.json({'hola':'test', INPUT:input});
        /*return response.json({
            res:true,
            token:token,
            message: 'Iniciada sesión'
        }) */

        let  modulos = await Modulo.query()
        .select('id', 'nombre', 'descripcion', 'estado', 'icon', 'img', 'url')
        .where('estado', 1)
        .fetch();
        let usuario = await User.query()
                                .where('email', input.email)
                                .first();

        let nuevomodulos = modulos.toJSON();         
        let i = 0;
        for (const modulo of nuevomodulos) {
        nuevomodulos[i].pages_menu = await this.getLinksModulo(modulo['id']);
        i++;
        }
        return await response.json({
            "token":  {
                'access_token': token,
                'token_type' : 'Bearer',
                'expires_in' :3600,
                'user' :  usuario,
            },
            "data": { "modulos" : nuevomodulos },
         });
    
    }

    respondWithToken(token, request){
        return {

        };        
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

module.exports = AuthController
