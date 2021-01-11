using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using SimpleWebApi.Identity;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace SimpleWebApi.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class AuthenticateController : ControllerBase
  {
    private readonly UserManager<IdentityUser> userManager;
    private readonly IConfiguration configuration;

    public AuthenticateController(UserManager<IdentityUser> userManager, IConfiguration configuration)
    {
      this.userManager = userManager;
      this.configuration = configuration;
    }

    [HttpPost]
    [Route("login")]
    public async Task<IActionResult> Login([FromBody] LoginModel model)
    {
      var user = await userManager.FindByNameAsync(model.Email);

      if (user != null && await userManager.CheckPasswordAsync(user, model.Password))
      {
        var userRoles = await userManager.GetRolesAsync(user);

        var authClaims = new List<Claim>
        {
          new Claim(ClaimTypes.Name, user.UserName),
          new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        };

        foreach (var userRole in userRoles)
        {
          authClaims.Add(new Claim(ClaimTypes.Role, userRole));
        }

        var authSigningKey = new SymmetricSecurityKey(
          Encoding.UTF8.GetBytes(configuration["JWT:Secret"])
        );

        var token = new JwtSecurityToken(
          issuer: configuration["JWT:ValidIssuer"],
          audience: configuration["JWT:ValidAudience"],
          expires: DateTime.Now.AddHours(1),
          claims : authClaims,
          signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
        );

        return Ok(new {
          token = new JwtSecurityTokenHandler().WriteToken(token),
        });
      }

      return Unauthorized();
    }

    [HttpPost]
    [Route("register")]

    public async Task<IActionResult> Register([FromBody] LoginModel model)
    {
      var userExists = await userManager.FindByNameAsync(model.Email);

      if (userExists !=null)
      {
        return StatusCode(
          StatusCodes.Status500InternalServerError,
          new Response { Status = "Error", Message = "User already exists !"}
          );
      }

      IdentityUser user = new IdentityUser()
      {
        Email = model.Email,
        UserName = model.Email
      };

      var result = await userManager.CreateAsync(user, model.Password);

      if (!result.Succeeded)
      {
        return StatusCode(
          StatusCodes.Status500InternalServerError,
          new Response { Status = "Error", Message="User creation failed !"}
        );
      }

      return Ok(new Response { Status = "Success", Message = "User created successfully !" });
    }
  }
}
