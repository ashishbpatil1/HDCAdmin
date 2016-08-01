using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HDCAdmin.Controllers
{
    public class UserController : Controller
    {
        // GET: User
        public ActionResult Index()
        {
            return View("Index");
        }

        public ActionResult AboutUs()
        {

            return View("AboutUs");
        }

        public ActionResult Services()
        {

            return View("Services");
        }

        public ActionResult Projects()
        {

            return View("Projects");
        }

        public ActionResult ContactUs()
        {

            return View("ContactUs");
        }
    }
}