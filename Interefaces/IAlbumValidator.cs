using ReactStarterKit.Models;
using System.Threading.Tasks;

namespace ReactStarterKit.Interfaces
{
    public interface IAlbumValidator
    {
        Task<AlbumValidationResult> ValidateAlbumCaptionAsync(string caption, int albumId = 0);
    }
}
