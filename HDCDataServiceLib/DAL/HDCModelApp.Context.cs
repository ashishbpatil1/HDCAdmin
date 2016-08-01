﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    using System.Data.Entity.Core.Objects;
    using System.Linq;
    
    public partial class HDCAdminAppDbContext : DbContext
    {
        public HDCAdminAppDbContext()
            : base("name=HDCAdminAppDbContext")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<AspNetRole> AspNetRoles { get; set; }
        public virtual DbSet<AspNetUserClaim> AspNetUserClaims { get; set; }
        public virtual DbSet<AspNetUserLogin> AspNetUserLogins { get; set; }
        public virtual DbSet<AspNetUser> AspNetUsers { get; set; }
        public virtual DbSet<C__MigrationHistory> C__MigrationHistory { get; set; }
        public virtual DbSet<MaterialSubType> MaterialSubTypes { get; set; }
        public virtual DbSet<MaterialType> MaterialTypes { get; set; }
        public virtual DbSet<UserType> UserTypes { get; set; }
        public virtual DbSet<UserTypeMapping> UserTypeMappings { get; set; }
        public virtual DbSet<MyCompany> MyCompanies { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<Site> Sites { get; set; }
        public virtual DbSet<UserDetail> UserDetails { get; set; }
    
        public virtual int GetTestDebug()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("GetTestDebug");
        }
    }
}
