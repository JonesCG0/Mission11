using Microsoft.EntityFrameworkCore;
using Mission11.Models;

namespace Mission11.Data
{
    public class BookstoreContext : DbContext
    {
        public BookstoreContext(DbContextOptions<BookstoreContext> options) : base(options) { }

        public DbSet<Book> Books { get; set; }
    }
}
