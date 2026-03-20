using Microsoft.AspNetCore.Mvc;
using Mission11.Data;
using Mission11.Models;

namespace Mission11.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BooksController : ControllerBase
    {
        private readonly BookstoreContext _context;

        public BooksController(BookstoreContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetBooks(int pageNum = 1, int pageSize = 5, string sortOrder = "asc")
        {
            var query = _context.Books.AsQueryable();

            query = sortOrder == "desc"
                ? query.OrderByDescending(b => b.Title)
                : query.OrderBy(b => b.Title);

            var totalNumBooks = query.Count();
            var books = query
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return Ok(new { books, totalNumBooks });
        }
    }
}
