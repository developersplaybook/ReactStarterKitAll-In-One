using ReactStarterKit.ViewModels;
using System.Threading.Tasks;

namespace ReactStarterKit.Interfaces
{
    public interface IPhotoDetailsService
    {
        Task<PhotoViewModel> GetPhotoViewModelByIdAsync(int photoId);
    }
}