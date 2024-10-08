﻿using Microsoft.EntityFrameworkCore;
using ReactStarterKit.DAL;
using ReactStarterKit.Interfaces;
using ReactStarterKit.Models;
using System.Threading.Tasks;

namespace ReactStarterKit.Services
{
    public class AlbumValidator : IAlbumValidator
    {

        private readonly PersonalContext _context;

        public AlbumValidator(PersonalContext context)
        {
            _context = context;
        }
        public async Task<AlbumValidationResult> ValidateAlbumCaptionAsync(string caption, int albumId = 0)
        {
            var result = new AlbumValidationResult { IsValid = true };
            var oldAlbum = await _context.Albums.FirstOrDefaultAsync(u => u.Caption == caption && u.AlbumID != albumId);
            if (oldAlbum != null)
            {
                result.IsValid = false;
                result.Errors.Add("Caption must be unique");
            }

            return result;
        }
    }
}
