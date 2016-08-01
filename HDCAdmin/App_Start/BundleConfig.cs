using System.Web;
using System.Web.Optimization;

namespace HDCAdmin
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/simple-sidebar.css",
                      "~/Content/site.css"));

            bundles.Add(new ScriptBundle("~/bundles/angularjs").Include(
                      "~/Scripts/angular.min.js",
                      "~/Scripts/angular-route.js"
                      ));

            bundles.Add(new ScriptBundle("~/bundles/uibootstrap").Include(
                        "~/Scripts/dirPagination.js"));

            bundles.Add(new ScriptBundle("~/bundles/appjs").Include(
                      "~/Scripts/app/HDCAdminCtrl.js"));

            bundles.Add(new ScriptBundle("~/bundles/notyjs").Include(
                      "~/Scripts/noty/packaged/jquery.noty.packaged.js"));

            //bundles.Add(new ScriptBundle("~/bundles/services").Include(
            //          "~/Scripts/services/service.js"));

            bundles.Add(new StyleBundle("~/Content/font-awesome/css").Include(
                        "~/Content/font-awesome/css/font-awesome.css",
                        "~/Content/font-awesome/css/font-awesome-animation.min.css"));

            //user
            bundles.Add(new StyleBundle("~/Content/usercss").Include(
                        "~/Content/usercss/owl.carousel.css",
                        "~/Content/usercss/owl.theme.css",
                        "~/Content/usercss/owl.transitions.css",
                        "~/Content/usercss/lightbox.css",
                        "~/Content/usercss/style.css",
                        "~/Content/usercss/responsive.css",
                        "~/Content/usercss/animate.css"
                        ));
            bundles.Add(new StyleBundle("~/Content/usercss/colors").Include(
                        "~/Content/usercss/colors/light-red.css"
                        ));





            bundles.Add(new ScriptBundle("~/bundles/cookieManagerjs").Include(
                      "~/Scripts/cookieManager.js"));

            bundles.Add(new ScriptBundle("~/bundles/MultiSelectDDL").Include(
                      "~/Scripts/MultiSelectDDL/highlight.min.js",
                      "~/Scripts/MultiSelectDDL/lodash.min.js",
                      "~/Scripts/MultiSelectDDL/angularjs-dropdown-multiselect.js"));

            bundles.Add(new StyleBundle("~/Scripts/angular-chart").Include(
                      "~/Scripts/angular-chart/angular-chart.css"));

            bundles.Add(new ScriptBundle("~/bundles/AngularChart").Include(
                      "~/Scripts/angular-chart/Chart.min.js",
                      "~/Scripts/angular-chart/angular-chart.js"));

            //user script
            bundles.Add(new ScriptBundle("~/bundles/user").Include(
                      "~/Scripts/user/owl.carousel.min.js",
                      "~/Scripts/user/jquery.nicescroll.min.js",
                      "~/Scripts/user/styleswitcher.js",
                      "~/Scripts/user/lightbox.min.js",
                      "~/Scripts/user/jquery.appear.js",
                      "~/Scripts/user/jquery.fitvids.js",
                      "~/Scripts/user/script.js",
                      "~/Scripts/user/ContactUs.js"
                      ));

        }
    }
}
