using Core_Sample.Models;
using Microsoft.EntityFrameworkCore;

namespace Core_Sample.DataContexts
{
    public class SampleDataContext : DbContext
    {
        public SampleDataContext(DbContextOptions<SampleDataContext> options)
             : base(options)
        {
        }


        public DbSet<Carrier> Carriers { get; set; }
        public DbSet<Device> Devices { get; set; }
    }
}
