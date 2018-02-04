using Microsoft.VisualStudio.TestTools.UnitTesting;
using WebApplication17.Servicies;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using WebApplication17.Entities;

namespace WebApplication17.Servicies.Tests
{
    class DataContextUnderTest: WebApplication17.Models.ApplicationContext
    {
        public DataContextUnderTest()
        {
            Random random = new Random();
            for (int i = 1; i < 30; i++)
            {
                Items.Add(new Item() { Id = i, Name = "Name"+i, Type = "Type"+random.Next(1,5)});
            }
        }
        
    }
    [TestClass()]
    public class ItemsServiceTests
    {
        ItemsService itemsService = new ItemsService(new Models.ApplicationContext());
        [TestMethod()]
        public void CreateItem_Test()
        {
            Item item = new Item() { Name = "test", Type = "test" };

            var result = itemsService.Create(item);
            Assert.AreEqual(item, result);
        }
        [TestMethod()]
        [ExpectedException(typeof(System.Exception))]
        public void CreateItem_Exeption_Test()
        {
            Item item = new Item() { Name = "", Type = null };

            var result = itemsService.Create(item);
        }
        [TestMethod()]
        public void DeleteItem_Test()
        {
            var result = itemsService.Delete(5);
            Assert.AreEqual(result, true);
        }
        [TestMethod()]
        [ExpectedException(typeof(System.Exception))]
        public void DeleteItem_Exeption_Test()
        {
            itemsService.Delete(-1);
        }

        [TestMethod()]
        public void EditItem_Test()
        {
            int id = 3;
            string res_name = "Test_Name";
            string res_type = "Test_Type";
            var result = itemsService.Edit(id, res_name, res_type);
            Assert.AreEqual(result, true);
        }
    }
}