using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace HDCAdmin.Models
{
    public class UserModel
    {
        [MaxLength(128)]
        [Column(TypeName = "varchar")]
        public string Id { get; set; }

        [Required]
        [MaxLength(256)]
        [Column(TypeName = "varchar")]
        public string UserId { get; set; }

        [Required]
        [MaxLength(256)]
        [Column(TypeName = "varchar")]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(256)]
        [Column(TypeName = "varchar")]
        public string LastName { get; set; }

        [Required]
        [MaxLength(256)]
        [Column(TypeName = "varchar")]
        public string Email { get; set; }

        [Required]
        [Column(TypeName = "varchar")]
        public string Password { get; set; }

        [Column(TypeName = "varchar")]
        [MaxLength(15)]
        public string PhoneNumber { get; set; }

        [Column(TypeName = "int")]
        [MaxLength(10)]
        public string MobNumber { get; set; }

        [Column(TypeName = "varchar")]
        [MaxLength(200)]
        public string Address { get; set; }

        [Column(TypeName = "varchar")]
        [MaxLength(200)]
        public string Description { get; set; }

        //[Required]
        //[Column(TypeName = "bit")]
        //public Boolean IsEnabled { get; set; }

        //[Column(TypeName = "varchar")]
        //public string IsEnabledStr { get; set; }

        //public List<UserTypeMappingModel> UserTypeMappingObj { get; set; }
    }

    public class UserTypeMappingModel
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(256)]
        [Column(TypeName = "varchar")]
        public string UserId { get; set; }

        [Required]
        public int UserTypeId { get; set; }
    }

    public class MaterialSubTypeWithMaterial
    {
        public int MaterialId { get; set; }
        public int MaterialSubId { get; set; }
        [Required]
        [MaxLength(50)]
        [Column(TypeName = "varchar")]
        public string MaterialType { get; set; }
        [Required]
        [MaxLength(50)]
        [Column(TypeName = "varchar")]
        public string MaterialSubType { get; set; }

        [MaxLength(18)]
        public string DefaultCost { get; set; }
    }

    public class Sites
    {
        public int SiteId { get; set; }
        public int CompanyId { get; set; }
        public string SiteName { get; set; }
        public string DefaultCost { get; set; }
        public string NoOfHouse { get; set; }
        public string CompanyName { get; set; }
    }

    public class MaterialForSubType
    {
        public int MaterialId { get; set; }
        public string MaterialType1 { get; set; }
    }

    public class UserTypeForUser
    {
        public int id { get; set; }
        public string label { get; set; }
    }
}