//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace HDCDataServiceLib.DAL
{
    using System;
    using System.Collections.Generic;
    
    public partial class UserDetail
    {
        public int Id { get; set; }
        public Nullable<int> MobNumber { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public string Description { get; set; }
        public Nullable<bool> CanLogin { get; set; }
        public Nullable<int> RoleId { get; set; }
        public string Password { get; set; }
        public Nullable<bool> IsEmployee { get; set; }
        public Nullable<bool> IsCustomer { get; set; }
        public Nullable<bool> IsSupplier { get; set; }
        public Nullable<bool> IsFerm { get; set; }
    }
}
