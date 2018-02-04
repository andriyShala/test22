using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;
using WebApplication17.Entities;
using WebApplication17.Models;

namespace WebApplication17.Servicies
{
    public interface IItemsService
    {
        IEnumerable<Item> GetAll();
        Item GetById(int id);
        IEnumerable<Item> GetAllByType(string type);
        bool Delete(int id);
        Item Create(Item item);
        bool Edit(int id, string name, string type);
        void SaveChanges();
    }
    public class ItemsService : IItemsService
    {
        ApplicationContext _context;
        public ItemsService(ApplicationContext context)
        {
            this._context = context;
        }
        /// <summary>
        /// Create New Item in DataBase
        /// </summary>
        /// <param name="item">Creating Itme</param>
        /// <returns>New Item with id</returns>
        public Item Create(Item item)
        {
            if (!String.IsNullOrEmpty(item.Name) && !String.IsNullOrEmpty(item.Type))
            {
                return _context.Items.Add(item);
            }

            else
            {
                throw new Exception("parameters name and type are Null or Empty");
            }
        }
        /// <summary>
        /// Delete Item in DataBase
        /// </summary>
        /// <param name="id">Id item</param>
        /// <returns>is Deleted</returns>
        public bool Delete(int id)
        {
            var deleteItem = _context.Items.FirstOrDefault(x => x.Id == id);
            if (deleteItem != null)
            {
                _context.Items.Remove(deleteItem);
                return true;
            }
            else
            {
                throw new Exception(String.Format("item with id-{0}, doesn't exist", id));
            }
        }
        /// <summary>
        ///  Edit exist item
        /// </summary>
        /// <param name="id">Id item</param>
        /// <param name="name">Name item</param>
        /// <param name="type">Type item</param>
        /// <returns>Is Edited</returns>
        public bool Edit(int id, string name, string type)
        {
            if (!String.IsNullOrEmpty(name) && !String.IsNullOrEmpty(type))
            {
                var item = _context.Items.FirstOrDefault(x => x.Id == id);
                if (item != null)
                {
                    item.Name = name;
                    item.Type = type;
                    return true;
                }
                else
                {
                    throw new Exception(String.Format("item with id-{0}, doesn't exist", id));
                }
            }
            else
            {
                throw new Exception("parameters name and type are Null or Empty");
            }
        }

        /// <summary>
        /// Get All Items From DataBase
        /// </summary>
        /// <returns>Get all items from items table</returns>
        public IEnumerable<Item> GetAll()
        {
            return _context.Items;
        }

        /// <summary>
        /// Get All Items
        /// </summary>
        /// <param name="type">Items Type</param>
        /// <returns>Get all items with specified type</returns>
        public IEnumerable<Item> GetAllByType(string type)
        {
            return _context.Items.Where(x => x.Type == type);
        }
        /// <summary>
        /// Get Element From DataBase
        /// </summary>
        /// <param name="id">Id Item</param>
        /// <returns>item with specified id</returns>
        public Item GetById(int id)
        {
            var item = _context.Items.FirstOrDefault(x => x.Id == id);
            if (item != null)
            {
                return item;
            }
            else
            {
                throw new Exception(String.Format("item with id-{0}, doesn't exist", id));
            }
        }
        /// <summary>
        /// Save All Changes
        /// </summary>
        public void SaveChanges()
        {
            _context.SaveChanges();
        }
    }
}