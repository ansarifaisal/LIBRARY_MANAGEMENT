using LibraryBackEnd.Configuration;
using LibraryBackEnd.Core.IRepositories;
using LibraryBackEnd.Core.Models;
using System.Collections.Generic;
using System.Linq;

namespace LibraryBackEnd.Persistence.Repositories
{
    public class PeriodicMagazineRepository : GenericRepository<PeriodicMagazine>, IPeriodicMagazineRepository
    {
        private ApplicationDbContext _context;
        public PeriodicMagazineRepository(ApplicationDbContext context)
            : base(context)
        {
            _context = context;
        }

        public PeriodicMagazine GetByTitle(string title)
        {
            return _context.PeriodicMagazines
                .Where(p => p.Title == title)
                .SingleOrDefault();
        }

        public IEnumerable<PeriodicMagazine> GetMagazineByCourse(string course)
        {
            return _context.PeriodicMagazines
                .Where(m => m.Course == course)
                .ToList();
        }

        public IEnumerable<PeriodicMagazine> GetMagazineByPeriodicity(string periodicity)
        {
            return _context.PeriodicMagazines
                .Where(m => m.Periodicity == periodicity)
                .ToList();
        }

        public IEnumerable<PeriodicMagazine> GetMagazineBySubscription(int year)
        {
            return _context.PeriodicMagazines
                .Where(m => m.From.Year == year)
                .ToList();
        }

        public IEnumerable<PeriodicMagazine> GetMagazineByTitle(string title)
        {
            return _context.PeriodicMagazines
               .Where(m => m.Title == title)
               .ToList();
        }

        public IEnumerable<PeriodicMagazine> GetMagazineByTypes(string type)
        {
            return _context.PeriodicMagazines
               .Where(m => m.Type == type)
               .ToList();
        }

        public object GetMagazineCourse()
        {
            return _context.PeriodicMagazines
              .GroupBy(m => m.Course)
              .Select(g => new
              {
                  Course = g.Key,
                  Count = g.Count()
              })
              .ToList();
        }

        public object GetMagazinePeriodicity()
        {
            return _context.PeriodicMagazines
              .GroupBy(m => m.Periodicity)
              .Select(g => new
              {
                  Periodicity = g.Key,
                  Count = g.Count()
              })
              .ToList();
        }

        public object GetMagazineSubscriptionInYear()
        {
            return _context.PeriodicMagazines
              .GroupBy(m => m.From.Year)
              .Select(g => new
              {
                  Year = g.Key,
                  Count = g.Count()
              })
              .ToList();
        }

        public object GetMagazineTitles()
        {
            return _context.PeriodicMagazines
               .GroupBy(m => m.Title)
               .Select(g => new
               {
                   Title = g.Key,
                   Count = g.Count()
               })
               .ToList();
        }

        public object GetMagazineTypes()
        {
            return _context.PeriodicMagazines
              .GroupBy(m => m.Type)
              .Select(g => new
              {
                  Type = g.Key,
                  Count = g.Count()
              })
              .ToList();
        }
    }
}
