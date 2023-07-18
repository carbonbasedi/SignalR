using Microsoft.AspNetCore.Mvc;

namespace WebSocket_SignalR.Controllers
{
	public class HomeController : Controller
	{
		public IActionResult Index()
		{
			return View();
		}
	}
}