using Microsoft.EntityFrameworkCore;
using Pets.API.Models.Entities;

namespace Pets.API.Data
{
    public class PetsDbContext : DbContext
    {
        public PetsDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Pet> Pets { get; set; }
    }
}