﻿using LibraryBackEnd.Configuration;
using LibraryBackEnd.Core.IRepositories;
using LibraryBackEnd.Core.Models;
using System.Linq;

namespace LibraryBackEnd.Persistence.Repositories
{
    public class MagazinePublisherRepository : GenericRepository<MagazinePublisher>, IMagazinePublisherRepository
    {
        private ApplicationDbContext _context;

        public MagazinePublisherRepository(ApplicationDbContext context)
            : base(context)
        {
            _context = context;
        }

        public MagazinePublisher GetByTitle(string title)
        {
            return _context.MagazinePublishers
                .Where(m => m.Title == title)
                .SingleOrDefault();
        }
    }
}
