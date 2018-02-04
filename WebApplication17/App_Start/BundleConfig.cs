using System.Web;
using System.Web.Optimization;

namespace WebApplication17
{
    public class BundleConfig
    {
        // Дополнительные сведения об объединении см. на странице https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/app").Include(
                "~/Scripts/angular.min.js",
                "~/Scripts/angular-route.min.js",
                "~/Scripts/angular-resource.min.js",
                "~/app/App.js",
                "~/app/itemsClientSvc.js",
                "~/app/Items/ItemsCtrl.js",
                "~/app/Items/pager.js",
                "~/app/ItemsStatistics/ItemsStatisticsCtrl.js",
                "~/app/dialog/dialogItemCtrl.js",
                "~/app/ItemsStatistics/paginator.js"
                ));

            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            // Используйте версию Modernizr для разработчиков, чтобы учиться работать. Когда вы будете готовы перейти к работе,
            // готово к выпуску, используйте средство сборки по адресу https://modernizr.com, чтобы выбрать только необходимые тесты.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/ngDialog.css",
                      "~/Content/ngDialog-theme-default.css",
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));
        }
    }
}
