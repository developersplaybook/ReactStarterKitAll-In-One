using ReactStarterKit.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ReactStarterKit.Interfaces
{
    public interface IAlbumHelperService
    {
        Task<List<AlbumViewModel>> GetAlbumsWithPhotoCountAsync();
    }
}
