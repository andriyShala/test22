using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplication17.Models;

namespace WebApplication17.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ApplicationContext db = new ApplicationContext();
            db.Items.Any();
            ViewBag.Title = "Home Page";

            return View();
        }
    }
}
