using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication17.Entities;
using WebApplication17.Servicies;

namespace WebApplication17.Controllers
{
    public class ItemsController : ApiController
    {
        
        IItemsService _itemsService;
         public ItemsController(IItemsService itemsService)
        {
            this._itemsService = itemsService;
        }
    
        public IHttpActionResult Get()
        {
            return Ok(_itemsService.GetAll());
        }

        
        public IHttpActionResult Get(int id)
        {
            try
            {
                return Ok(_itemsService.GetById(id));

            }
            catch (Exception ex)
            {
                return InternalServerError(ex);

            }
        }

        [HttpPost]
        public IHttpActionResult Post([FromBody]Item value)
        {
            try
            {
                var it = _itemsService.Create(new Item()
                {
                    Name = value.Name,
                    Type = value.Type
                });
                _itemsService.SaveChanges();
                return Ok(it);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
       
        }

        [HttpPut]
        public IHttpActionResult Put([FromBody]Item value)
        {
            try
            {
                _itemsService.Edit(value.Id, value.Name, value.Type);
                _itemsService.SaveChanges();
                return Ok();
            }
            catch(Exception ex)
            {
                return InternalServerError(ex);
            }
        }

       
        [HttpDelete]
        public IHttpActionResult Delete(int id)
        {
            try
            {
                _itemsService.Delete(id);
                _itemsService.SaveChanges();
                return Ok();
            }
            catch(Exception ex)
            {
                return InternalServerError(ex);
            }
           
        }
    }
}
