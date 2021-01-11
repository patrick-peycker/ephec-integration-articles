using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using SimpleWebApi.Models;

namespace SimpleWebApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ArticleController : ControllerBase
    {
        private static List<ArticleModel> _articles = new List<ArticleModel>
        {
            new ArticleModel
            {
                Id = 1,
                Nom = "Poire",
                Description = "Magnifiques poires",
                Prix = 1,
                Stock = 10
            },
            new ArticleModel
            {
                Id = 2,
                Nom = "Pomme",
                Description = "Magnifiques pommes",
                Prix = 2,
                Stock = 20
            },
            new ArticleModel
            {
                Id = 3,
                Nom = "Orange",
                Description = "Magnifiques oranges",
                Prix = 3,
                Stock = 30
            }
        };
        // GET: api/Article/List
        [HttpGet]
        [ActionName("List")]
        public IActionResult List()
        {
            try
            {
                return Ok(_articles);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        // GET: api/Article/Item?id=5
        [HttpGet]
        [ActionName("Item")]
        public IActionResult Item(int id)
        {
            try
            {
                if (_articles.Exists(x => x.Id == id))
                {
                    return Ok(_articles.Find(x => x.Id == id));
                }
                return NotFound(id);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        // POST: api/Article/Add
        [HttpPost]
        [ActionName("Add")]
        public IActionResult Add(ArticleModel model)
        {
            try
            {
                model.Id = _articles.Max(x => x.Id) + 1;
                _articles.Add(model);
                return Ok(_articles.Find(x => x.Id == model.Id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
