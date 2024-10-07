using ReactStarterKit.Models;
using System.IO;
using System.Threading.Tasks;

namespace ReactStarterKit.Interfaces
{
    public interface IRandomHandlerService
    {
        Task<int> GetRandomAlbumIdAsync();
        Task<int> GetRandomPhotoIdAsync(int albumId);
        Task<Stream> GetFirstPhotoAsync(int albumId, PhotoSize size);
        Task<Stream> GetPhotoAsync(int photoId, PhotoSize size);
    }
}
