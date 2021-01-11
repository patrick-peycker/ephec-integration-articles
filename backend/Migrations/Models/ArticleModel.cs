using System.Collections.Generic;

namespace SimpleWebApi.Models
{
  public class ArticleModel
  {
    public int Id { get; set; }
    public string Nom { get; set; }
    public string Description { get; set; }
    public int Prix { get; set; }
    public int Stock { get; set; }

    public List<string> Magasins { get; set; }
  }
}
