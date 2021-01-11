using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SimpleWebApi.Controllers
{
	[Route("api/[controller]")]
	[ApiController]

	[Authorize]
	public class ValuesController : ControllerBase
	{
		[HttpGet]
		[Route("index")]
		public IActionResult Index()
		{
			return Ok(new List<string> { User.Identity.AuthenticationType, User.Identity.Name, User.Identity.IsAuthenticated.ToString(), "Bonjour", "Hello" }) ;
		}
	}
}
