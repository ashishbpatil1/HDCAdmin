using HDCAdmin.Models;
using HDCDataServiceLib.DAL;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Host.SystemWeb;
using System.Web;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Threading;


namespace HDCAdmin.Controllers
{
    public class AdminController : ApiController
    {
        HDCAdminAppDbContext db = new HDCAdminAppDbContext();
        #region Dashboard
        //get all customer
        [HttpGet]
        [ActionName("GetUserCount")]
        public int GetUserCount()
        {
            return db.UserDetails.AsEnumerable().Count();
        }
        #endregion

        #region Material Type
        [HttpGet]
        [ActionName("GetMaterial")]
        public List<MaterialType> GetMaterial()
        {

            return db.MaterialTypes.ToList();
            //return new HttpResponseMessage(HttpStatusCode.OK);
        }
        [HttpPost]
        [ActionName("EditMaterial")]
        public HttpResponseMessage EditMaterial([FromBody] MaterialType Mt)
        {
            try
            {
                decimal d;
                if (Mt.DefaultCost != null)
                {
                    if (!decimal.TryParse(Mt.DefaultCost.ToString(), out d))
                    {
                        return new HttpResponseMessage { StatusCode = HttpStatusCode.BadRequest, Content = new StringContent("Please enter valide number for Default Cost!") };
                    }
                }

                MaterialType mtObj = db.MaterialTypes.Where(m => m.MaterialId == Mt.MaterialId).FirstOrDefault();
                if (mtObj != null)
                {
                    mtObj.MaterialType1 = Mt.MaterialType1;
                    mtObj.DefaultCost = Mt.DefaultCost;
                    db.SaveChanges();
                    return new HttpResponseMessage(HttpStatusCode.OK);
                }
                else
                {
                    return new HttpResponseMessage { StatusCode = HttpStatusCode.BadRequest, Content = new StringContent("Material Type not found. Please try again later.") };
                }

            }
            catch (Exception ex)
            {
                return new HttpResponseMessage { StatusCode = HttpStatusCode.BadRequest, Content = new StringContent("An Error has occured while editing Material Type") };
            }
        }

        [HttpPost]
        [ActionName("AddMaterial")]
        public HttpResponseMessage AddMaterial([FromBody] MaterialType Mt)
        {
            try
            {
                decimal d;
                if (Mt.DefaultCost != null)
                {
                    if (!decimal.TryParse(Mt.DefaultCost.ToString(), out d))
                    {
                        return new HttpResponseMessage { StatusCode = HttpStatusCode.BadRequest, Content = new StringContent("Please enter valide number for Default Cost!") };
                    }
                }
                MaterialType mtObj = db.MaterialTypes.Where(m => m.MaterialType1 == Mt.MaterialType1).FirstOrDefault();
                if (mtObj == null)
                {
                    db.MaterialTypes.Add(Mt);
                    db.SaveChanges();
                    return new HttpResponseMessage(HttpStatusCode.OK);
                }
                else
                {
                    return new HttpResponseMessage { StatusCode = HttpStatusCode.BadRequest, Content = new StringContent("Material Type with this name is aready exist.") };
                }
            }
            catch (Exception ex)
            {
                return new HttpResponseMessage { StatusCode = HttpStatusCode.BadRequest, Content = new StringContent("Error occured while adding Material Type") };
            }
        }

        [HttpPost]
        [ActionName("DeleteMaterial")]
        public HttpResponseMessage DeleteMaterial([FromBody] MaterialType Mt)
        {
            try
            {
                int submtCount = db.MaterialSubTypes.Where(m => m.MaterialId == Mt.MaterialId).ToList().Count;
                if (submtCount == 0)
                {//delete material
                    MaterialType mtObj = db.MaterialTypes.Where(m => m.MaterialId == Mt.MaterialId).FirstOrDefault();
                    if (mtObj != null)
                    {
                        db.MaterialTypes.Remove(mtObj);
                        db.SaveChanges();
                    }
                    return new HttpResponseMessage { StatusCode = HttpStatusCode.OK };
                }
                else
                {//do not delete material
                    return new HttpResponseMessage { StatusCode = HttpStatusCode.BadRequest, Content = new StringContent("Can not delete Material Type. This Material Type is in use. Please remove its dependancies and then try again.") };
                }

            }
            catch (Exception ex)
            {
                return new HttpResponseMessage { StatusCode = HttpStatusCode.OK, Content = new StringContent("Error occured while deleting Material Type.") };
            }
        }

        #endregion

        #region MaterialSub Type

        [HttpGet]
        [ActionName("GetMaterialForSubType")]
        public List<MaterialForSubType> GetMaterialForSubType()
        {
            return db.MaterialTypes.Select(s => new MaterialForSubType { MaterialId = s.MaterialId, MaterialType1=s.MaterialType1 }).ToList();
            //return new HttpResponseMessage(HttpStatusCode.OK);
        }

        [HttpGet]
        [ActionName("GetMaterialSubType")]
        public List<MaterialSubTypeWithMaterial> GetMaterialSubType(int id)
        {
            if (id == 0)
            {
                var materialObj = db.MaterialSubTypes       // your starting point - table in the "from" statement
                    .Join(db.MaterialTypes,         // the source table of the inner join
                    ms => ms.MaterialId,            // Select the primary key (the first part of the "on" clause in an sql "join" statement)
                    m => m.MaterialId,              // Select the foreign key (the second part of the "on" clause)
                    (ms, m) => new MaterialSubTypeWithMaterial()
                    {
                        MaterialId = m.MaterialId,
                        MaterialSubId = ms.MaterialSubTypeId,
                        MaterialType = m.MaterialType1,
                        MaterialSubType = ms.MaterialSubType1,
                        DefaultCost = ms.DefaultCost.ToString()
                    }).ToList(); // selection
                // where statement
                return materialObj;
            }
            else
            {
                var materialObj = db.MaterialSubTypes       // your starting point - table in the "from" statement
                    .Join(db.MaterialTypes,         // the source table of the inner join
                    ms => ms.MaterialId,            // Select the primary key (the first part of the "on" clause in an sql "join" statement)
                    m => m.MaterialId,              // Select the foreign key (the second part of the "on" clause)
                    (ms, m) => new MaterialSubTypeWithMaterial()
                    {
                        MaterialId = m.MaterialId,
                        MaterialSubId = ms.MaterialSubTypeId,
                        MaterialType = m.MaterialType1,
                        MaterialSubType = ms.MaterialSubType1,
                        DefaultCost = ms.DefaultCost.ToString()
                    }).Where(mandms => mandms.MaterialId == id).ToList(); // selection
                // where statement
                return materialObj;
            }


        }

        [HttpPost]
        [ActionName("EditSubMaterial")]
        public HttpResponseMessage EditSubMaterial([FromBody] MaterialSubTypeWithMaterial Mt)
        {
            try
            {
                decimal d;
                if (Mt.DefaultCost != null)
                {
                    if (!decimal.TryParse(Mt.DefaultCost.ToString(), out d))
                    {
                        return new HttpResponseMessage { StatusCode = HttpStatusCode.BadRequest, Content = new StringContent("Please enter valide number for Default Cost!") };
                    }
                }
                MaterialSubType mtObj = db.MaterialSubTypes.Where(m => m.MaterialSubTypeId == Mt.MaterialSubId).FirstOrDefault();

                if (mtObj != null)
                {
                    mtObj.MaterialSubType1 = Mt.MaterialSubType;
                    mtObj.DefaultCost = Mt.DefaultCost == null ? 0 : Convert.ToDecimal(Mt.DefaultCost);
                    db.SaveChanges();
                    return new HttpResponseMessage(HttpStatusCode.OK);
                }
                else
                {
                    return new HttpResponseMessage { StatusCode = HttpStatusCode.BadRequest, Content = new StringContent("SubMaterial Type not found. Please try again later.") };
                }
            }
            catch (Exception ex)
            {
                return new HttpResponseMessage { StatusCode = HttpStatusCode.BadRequest, Content = new StringContent("An Error has occured while editing SubMaterial Type") };
            }


            //var materialObj = db.MaterialSubTypes       // your starting point - table in the "from" statement
            //    .Join(db.MaterialTypes,         // the source table of the inner join
            //    ms => ms.MaterialId,            // Select the primary key (the first part of the "on" clause in an sql "join" statement)
            //    m => m.MaterialId,              // Select the foreign key (the second part of the "on" clause)
            //    (ms, m) => new MaterialSubTypeWithMaterial()
            //    {
            //        MaterialId = m.MaterialId,
            //        MaterialSubId = ms.MaterialSubTypeId,
            //        MaterialType = m.MaterialType1,
            //        MaterialSubType = ms.MaterialSubType1
            //    }).Where(a => a.MaterialId == Mt.MaterialId).ToList(); // selection
            //return materialObj;
            //
        }

        [HttpPost]
        [ActionName("AddSubMaterial")]
        public HttpResponseMessage AddSubMaterial([FromBody] MaterialSubTypeWithMaterial Mt)
        {
            try
            {
                decimal d;
                if (Mt.DefaultCost != null)
                {
                    if (!decimal.TryParse(Mt.DefaultCost.ToString(), out d))
                    {
                        return new HttpResponseMessage { StatusCode = HttpStatusCode.BadRequest, Content = new StringContent("Please enter valide number for Default Cost!") };
                    }
                }

                MaterialSubType mtObj1 = db.MaterialSubTypes.Where(m => m.MaterialSubType1 == Mt.MaterialSubType).FirstOrDefault();
                if (mtObj1 == null)
                {
                    MaterialSubType mtObj = new MaterialSubType();
                    mtObj.MaterialId = Mt.MaterialId;
                    mtObj.MaterialSubType1 = Mt.MaterialSubType;
                    mtObj.DefaultCost = Convert.ToDecimal(Mt.DefaultCost);
                    db.MaterialSubTypes.Add(mtObj);
                    db.SaveChanges();
                    return new HttpResponseMessage(HttpStatusCode.OK);
                }
                else
                {
                    return new HttpResponseMessage { StatusCode = HttpStatusCode.BadRequest, Content = new StringContent("Please enter valide number for Default Cost!") };
                }

            }
            catch (Exception ex)
            {
                return new HttpResponseMessage { StatusCode = HttpStatusCode.BadRequest, Content = new StringContent("Error occured while adding SubMaterial Type.") };
            }
        }

        [HttpPost]
        [ActionName("DeleteSubMaterial")]
        public HttpResponseMessage DeleteSubMaterial([FromBody] MaterialSubTypeWithMaterial Mt)
        {
            try
            {
                MaterialSubType mtObj = db.MaterialSubTypes.Where(m => m.MaterialSubTypeId == Mt.MaterialSubId).FirstOrDefault();
                if (mtObj != null)
                {
                    db.MaterialSubTypes.Remove(mtObj);
                    db.SaveChanges();
                    return new HttpResponseMessage(HttpStatusCode.OK);
                }
                else
                {
                    return new HttpResponseMessage { StatusCode = HttpStatusCode.BadRequest, Content = new StringContent("SubMaterial Type not found. Please try again later.") };
                }
            }
            catch (Exception ex)
            {
                return new HttpResponseMessage { StatusCode = HttpStatusCode.BadRequest, Content = new StringContent("Error occured while deleting SubMaterial Type.") };
            }
        }
        #endregion

        #region User Type

        [HttpGet]
        [ActionName("GetUserType")]
        public List<UserType> GetUserType()
        {
            var userTypeObj = db.UserTypes.AsEnumerable().ToList();
            return userTypeObj;
        }

        [HttpPost]
        [ActionName("AddUserType")]
        public HttpResponseMessage AddUserType([FromBody] UserType Mt)
        {
            try
            {
                UserType mtObj = new UserType();
                mtObj.UserTypeText = Mt.UserTypeText;
                db.UserTypes.Add(mtObj);
                db.SaveChanges();
                return new HttpResponseMessage(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                return new HttpResponseMessage { StatusCode = HttpStatusCode.BadRequest, Content = new StringContent("Error occured while adding User Type.") };
            }
        }

        [HttpPost]
        [ActionName("EditUserType")]
        public HttpResponseMessage EditUserType([FromBody] UserType Mt)
        {
            try
            {
                UserType mtObj = db.UserTypes.Where(m => m.UserTypeId == Mt.UserTypeId).FirstOrDefault();
                if (mtObj != null)
                {
                    mtObj.UserTypeText = Mt.UserTypeText;
                    db.SaveChanges();
                    return new HttpResponseMessage(HttpStatusCode.OK);
                }
                else
                {
                    return new HttpResponseMessage { StatusCode = HttpStatusCode.BadRequest, Content = new StringContent("User Type not found. Please try again later.") };
                }
            }
            catch (Exception ex)
            {
                return new HttpResponseMessage { StatusCode = HttpStatusCode.BadRequest, Content = new StringContent("Error occured while editing User Type.") };
            }
        }

        [HttpPost]
        [ActionName("DeleteUserType")]
        public HttpResponseMessage DeleteUserType([FromBody] UserType Mt)
        {
            try
            {
                UserType mtObj = db.UserTypes.Where(m => m.UserTypeId == Mt.UserTypeId).FirstOrDefault();
                if (mtObj != null)
                {
                    db.UserTypes.Remove(mtObj);
                    db.SaveChanges();
                    return new HttpResponseMessage(HttpStatusCode.OK);
                }
                else
                {
                    return new HttpResponseMessage { StatusCode = HttpStatusCode.BadRequest, Content = new StringContent("User Type not found. Please try again later.") };
                }
            }
            catch (Exception ex)
            {
                return new HttpResponseMessage { StatusCode = HttpStatusCode.BadRequest, Content = new StringContent("Error occured while deleting User Type.") };
            }
        }

        #endregion

        #region user
        //[HttpGet]
        //[ActionName("GetUserTypeForUser")]
        //public List<UserTypeForUser> GetUserTypeForUser()
        //{
        //    List<UserTypeForUser> userTypeObj = db.UserTypes.AsEnumerable().Select(s => new UserTypeForUser { id = s.UserTypeId, label = s.UserTypeText }).ToList();
        //    return userTypeObj;
        //}

        //[HttpGet]
        //[ActionName("GetUser")]
        //public List<UserModel> GetUser()
        //{
        //    List<UserModel> users = db.AspNetUsers.Join(
        //        db.UserDetails,
        //        a => a.Id,
        //        ud => ud.Id,
        //        (a, ud) => new UserModel()
        //        {
        //            Id = a.Id,
        //            Email = a.Email,
        //            PhoneNumber = a.PhoneNumber,
        //            FirstName = a.FirstName,
        //            LastName = a.LastName,
        //            Address = ud.Address,
        //            Description = ud.Description,
        //            Password = ud.Password
        //        }).ToList();
        //    //IsEnabledStr = ud.IsEnabled ? "Yes" : "No",
        //    //IsEnabled = ud.IsEnabled,
        //    return users;
        //}


        //[HttpPost]
        //[ActionName("AddUser")]
        //public HttpResponseMessage AddUser([FromBody] UserModel usr)
        //{
        //    try
        //    {
        //        var manager = HttpContext.Current.GetOwinContext().GetUserManager<ApplicationUserManager>();
        //        var signInManager = HttpContext.Current.GetOwinContext().Get<ApplicationSignInManager>();
        //        var user = new ApplicationUser()
        //        {
        //            UserName = usr.Email,
        //            Email = usr.Email,
        //            FirstName = usr.FirstName,
        //            LastName = usr.LastName,
        //            PhoneNumber = usr.PhoneNumber
        //        };
        //        IdentityResult result = manager.Create(user, usr.Password);
        //        if (result.Succeeded)
        //        {
        //            var userStore = new Microsoft.AspNet.Identity.EntityFramework.UserStore<IdentityUser>();
        //            UserDetail userDetailsObj = new UserDetail();
        //            userDetailsObj.IsEnabled = Convert.ToBoolean(usr.IsEnabled);
        //            userDetailsObj.Address = usr.Address;
        //            userDetailsObj.Description = usr.Description;
        //            userDetailsObj.Password = usr.Password;
        //            userDetailsObj.UserId = user.Id;
        //            db.UserDetails.Add(userDetailsObj);
        //            db.SaveChanges();
        //            //foreach (var item in usr.UserTypeMappingObj)
        //            //{
        //            //    UserTypeMapping userTypeMappingObj = new UserTypeMapping();
        //            //    userTypeMappingObj.UserTypeId = item.Id;
        //            //    userTypeMappingObj.UserId = user.Id;
        //            //    db.UserTypeMappings.Add(userTypeMappingObj);
        //            //    db.SaveChanges();
        //            //}
        //            return new HttpResponseMessage { StatusCode = HttpStatusCode.OK };
        //        }
        //        else
        //        {
        //            //error occured during adding user
        //            if (result.Errors.FirstOrDefault().ToString().Contains("is already taken"))
        //            {
        //                //if user name is already taken
        //                string strError = "UserName " + usr.Email + " is alredy in use.";
        //                return new HttpResponseMessage { StatusCode = HttpStatusCode.BadRequest, Content = new StringContent(strError) };
        //            }
        //            else
        //            {
        //                //else print error
        //                return new HttpResponseMessage { StatusCode = HttpStatusCode.BadRequest };
        //            }
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        return new HttpResponseMessage { StatusCode = HttpStatusCode.BadRequest, Content = new StringContent("Error occured while adding User. Please try again later.") };
        //    }
        //}

        //[HttpPost]
        //[ActionName("EditUser")]
        //public HttpResponseMessage EditUser([FromBody] UserModel usr)
        //{
        //    try
        //    {
        //        var user = new ApplicationUser()
        //        {
        //            Id = usr.Id,
        //            UserName = usr.Email,
        //            Email = usr.Email,
        //            FirstName = usr.FirstName,
        //            LastName = usr.LastName,
        //            PhoneNumber = usr.PhoneNumber
        //        };
        //        using (var context = new ApplicationDbContext())
        //        {
        //            var store = new UserStore<ApplicationUser>(new IdentityDbContext());
        //            var manager = new UserManager<ApplicationUser>(store);
        //            context.Entry(user).State = EntityState.Modified;
        //            System.Threading.Tasks.Task.WaitAny(manager.UpdateAsync(user));
        //            System.Threading.Tasks.Task.WaitAny(context.SaveChangesAsync());
        //        }
        //        UserDetail userDetailsObj = db.UserDetails.Where(u => u.UserId == usr.Id).FirstOrDefault();
        //        if (userDetailsObj != null)
        //        {
        //            userDetailsObj.IsEnabled = Convert.ToBoolean(usr.IsEnabled);
        //            userDetailsObj.Address = usr.Address;
        //            userDetailsObj.Description = usr.Description;
        //            userDetailsObj.Password = usr.Password;
        //            db.SaveChanges();
        //        }
        //        return new HttpResponseMessage { StatusCode = HttpStatusCode.OK };
        //    }
        //    catch (Exception ex)
        //    {
        //        return new HttpResponseMessage { StatusCode = HttpStatusCode.BadRequest, Content = new StringContent("Error occured while updating User. Please try again later.") };
        //    }
        //}

        //[HttpPost]
        //[ActionName("DeleteUser")]
        //public HttpResponseMessage DeleteUser([FromBody] UserModel usr)
        //{
        //    try
        //    {
        //        UserDetail userDetailsObj = db.UserDetails.Where(u => u.UserId == usr.Id).FirstOrDefault();
        //        if (userDetailsObj != null)
        //        {
        //            db.UserDetails.Remove(userDetailsObj);
        //            db.SaveChanges();

        //            //var user = new ApplicationUser()
        //            //{
        //            //    Id = usr.Id,
        //            //    UserName = usr.Email,
        //            //    Email = usr.Email,
        //            //    FirstName = usr.FirstName,
        //            //    LastName = usr.LastName,
        //            //    PhoneNumber = usr.PhoneNumber
        //            //};

        //            using (var context = new IdentityDbContext())
        //            {
        //                var store = new UserStore<ApplicationUser>(context);
        //                var manager = new UserManager<ApplicationUser>(store);
        //                //context.Entry(user).State = EntityState.Modified;
        //                ApplicationUser ap = manager.FindById(usr.Id);

        //                System.Threading.Tasks.Task.WaitAny(manager.DeleteAsync(ap));// FindAsync(usr.Id, "");
        //                System.Threading.Tasks.Task.WaitAny(context.SaveChangesAsync());
      
        //            }

        //            //var manager = HttpContext.Current.GetOwinContext().GetUserManager<ApplicationUserManager>();
        //            //var result =  manager.DeleteAsync(user);

        //            return new HttpResponseMessage(HttpStatusCode.OK);
        //            //}
        //            //else
        //            //{
        //            //    return new HttpResponseMessage { StatusCode = HttpStatusCode.BadRequest, Content = new StringContent("Can not delete user. This user is in use.") };
        //            //}
        //        }
        //        else
        //        {
        //            return new HttpResponseMessage { StatusCode = HttpStatusCode.BadRequest, Content = new StringContent("User details not found. Please try again later.") };
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        return new HttpResponseMessage { StatusCode = HttpStatusCode.BadRequest, Content = new StringContent("Error occured while deleting User.") };
        //    }
        //}

        #endregion

        #region MyCompany
        [HttpGet]
        [ActionName("GetMyCompany")]
        public List<MyCompany> GetMyCompany()
        {
            return db.MyCompanies.ToList();
        }
        [HttpPost]
        [ActionName("EditMyCompany")]
        public HttpResponseMessage EditMyCompany([FromBody] MyCompany Mt)
        {
            try
            {
                MyCompany mtObj = db.MyCompanies.Where(m => m.Id == Mt.Id).FirstOrDefault();
                if (mtObj != null)
                {
                    mtObj.CompanyName = Mt.CompanyName;
                    mtObj.Address = Mt.Address;
                    mtObj.ContactNo = Mt.ContactNo;
                    mtObj.VatTinNo = Mt.VatTinNo;
                    db.SaveChanges();
                    return new HttpResponseMessage(HttpStatusCode.OK);
                }
                else
                {
                    return new HttpResponseMessage { StatusCode = HttpStatusCode.BadRequest, Content = new StringContent("Company details not found. Please try again later.") };
                }

            }
            catch (Exception ex)
            {
                return new HttpResponseMessage { StatusCode = HttpStatusCode.BadRequest, Content = new StringContent("An Error has occured while editing Company details.") };
            }
        }

        [HttpPost]
        [ActionName("AddMyCompany")]
        public HttpResponseMessage AddMyCompany([FromBody] MyCompany Mt)
        {
            try
            {
                MyCompany mtObj = db.MyCompanies.Where(m => m.CompanyName == Mt.CompanyName).FirstOrDefault();
                if (mtObj == null)
                {
                    db.MyCompanies.Add(Mt);
                    db.SaveChanges();
                    return new HttpResponseMessage(HttpStatusCode.OK);
                }
                else
                {
                    return new HttpResponseMessage { StatusCode = HttpStatusCode.BadRequest, Content = new StringContent("Company with this name is aready exist.") };
                }
            }
            catch (Exception ex)
            {
                return new HttpResponseMessage { StatusCode = HttpStatusCode.BadRequest, Content = new StringContent("Error occured while adding Company details") };
            }
        }

        [HttpPost]
        [ActionName("DeleteMyCompany")]
        public HttpResponseMessage DeleteMyCompany([FromBody] MyCompany Mt)
        {
            try
            {

                    MyCompany mtObj = db.MyCompanies.Where(m => m.Id == Mt.Id).FirstOrDefault();
                    if (mtObj != null)
                    {
                        db.MyCompanies.Remove(mtObj);
                        db.SaveChanges();
                    }
                    return new HttpResponseMessage { StatusCode = HttpStatusCode.OK };
            }
            catch (Exception ex)
            {
                return new HttpResponseMessage { StatusCode = HttpStatusCode.OK, Content = new StringContent("Error occured while deleting Company.") };
            }
        }

        #endregion

        #region Site
        [HttpGet]
        //[ActionName("GetSite")]
        public List<Sites> GetSite(int id)
        {
            if (id == 0)
            {
                var materialObj = db.Sites       // your starting point - table in the "from" statement
                    .Join(db.MyCompanies,         // the source table of the inner join
                    ms => ms.CompanyId,            // Select the primary key (the first part of the "on" clause in an sql "join" statement)
                    m => m.Id,              // Select the foreign key (the second part of the "on" clause)
                    (ms, m) => new Sites()
                    {
                        SiteId = ms.SiteId,
                        CompanyId = ms.CompanyId,
                        CompanyName = m.CompanyName,
                        SiteName = ms.SiteName,
                        DefaultCost = ms.DefaultCost.ToString(),
                        NoOfHouse = ms.NoOfHouse.ToString()
                    }).ToList(); // selection
                // where statement
                return materialObj;

            }
            else
            {
                var materialObj = db.Sites       // your starting point - table in the "from" statement
                    .Join(db.MyCompanies,         // the source table of the inner join
                    ms => ms.CompanyId,            // Select the primary key (the first part of the "on" clause in an sql "join" statement)
                    m => m.Id,              // Select the foreign key (the second part of the "on" clause)
                    (ms, m) => new Sites()
                    {
                        SiteId = ms.SiteId,
                        CompanyId = ms.CompanyId,
                        CompanyName = m.CompanyName,
                        SiteName = ms.SiteName,
                        DefaultCost = ms.DefaultCost.ToString(),
                        NoOfHouse = ms.NoOfHouse.ToString()
                    }).Where(s => s.CompanyId == id).ToList(); // selection
                // where statement
                return materialObj;
            }
        }
        [HttpPost]
        [ActionName("EditSite")]
        public HttpResponseMessage EditSite([FromBody] Sites Mt)
        {
            try
            {
                decimal d;
                if (Mt.DefaultCost != null)
                {
                    if (!decimal.TryParse(Mt.DefaultCost.ToString(), out d))
                    {
                        return new HttpResponseMessage { StatusCode = HttpStatusCode.BadRequest, Content = new StringContent("Please enter valide number for Default Cost!") };
                    }
                }
                Site mtObj = db.Sites.Where(m => m.SiteId == Mt.SiteId).FirstOrDefault();
                if (mtObj != null)
                {
                    mtObj.SiteName = Mt.SiteName;
                    mtObj.DefaultCost = Mt.DefaultCost == null ? 0 : Convert.ToDecimal(Mt.DefaultCost);
                    mtObj.NoOfHouse = Convert.ToInt32(Mt.NoOfHouse);
                    mtObj.CompanyId = Mt.CompanyId;
                    db.SaveChanges();
                    return new HttpResponseMessage(HttpStatusCode.OK);
                }
                else
                {
                    return new HttpResponseMessage { StatusCode = HttpStatusCode.BadRequest, Content = new StringContent("Site details not found. Please try again later.") };
                }

            }
            catch (Exception ex)
            {
                return new HttpResponseMessage { StatusCode = HttpStatusCode.BadRequest, Content = new StringContent("An Error has occured while editing Site details.") };
            }
        }

        [HttpPost]
        [ActionName("AddSite")]
        public HttpResponseMessage AddSite([FromBody] Sites Mt)
        {
            try
            {
                decimal d;
                if (Mt.DefaultCost != null)
                {
                    if (!decimal.TryParse(Mt.DefaultCost.ToString(), out d))
                    {
                        return new HttpResponseMessage { StatusCode = HttpStatusCode.BadRequest, Content = new StringContent("Please enter valide number for Default Cost!") };
                    }
                }
                Site mtObj = db.Sites.Where(m => m.SiteName == Mt.SiteName).FirstOrDefault();
                if (mtObj == null)
                {
                    Site st = new Site();
                    st.NoOfHouse = Convert.ToInt32(Mt.NoOfHouse);
                    st.CompanyId = Mt.CompanyId;
                    st.DefaultCost = Mt.DefaultCost == null ? 0 : Convert.ToDecimal(Mt.DefaultCost);
                    st.SiteName = Mt.SiteName;

                    db.Sites.Add(st);
                    db.SaveChanges();
                    return new HttpResponseMessage(HttpStatusCode.OK);
                }
                else
                {
                    return new HttpResponseMessage { StatusCode = HttpStatusCode.BadRequest, Content = new StringContent("Site with this name is aready exist.") };
                }
            }
            catch (Exception ex)
            {
                return new HttpResponseMessage { StatusCode = HttpStatusCode.BadRequest, Content = new StringContent("Error occured while adding Site details") };
            }
        }

        [HttpPost]
        [ActionName("DeleteSite")]
        public HttpResponseMessage DeleteSite([FromBody] Sites Mt)
        {
            try
            {

                Site mtObj = db.Sites.Where(m => m.SiteId == Mt.SiteId).FirstOrDefault();
                if (mtObj != null)
                {
                    db.Sites.Remove(mtObj);
                    db.SaveChanges();
                }
                return new HttpResponseMessage { StatusCode = HttpStatusCode.OK };
            }
            catch (Exception ex)
            {
                return new HttpResponseMessage { StatusCode = HttpStatusCode.OK, Content = new StringContent("Error occured while deleting Site.") };
            }
        }

        #endregion
    }
}
