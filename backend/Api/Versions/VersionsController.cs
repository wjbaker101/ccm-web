using CustomCrosshairModApi.Api.Versions.Types;
using Microsoft.AspNetCore.Mvc;

namespace CustomCrosshairModApi.Api.Versions
{
    [Route("api/versions")]
    public sealed class VersionsController : Controller
    {
        private readonly IVersionsService _versionsService;

        public VersionsController(IVersionsService versionsService)
        {
            _versionsService = versionsService;
        }

        [Route("{minecraftVersion}/{modLoaderType}")]
        public IActionResult GetLatestVersionForMinecraftVersion([FromRoute] string minecraftVersion, [FromRoute] ModLoaderType modLoaderType)
        {
            var responseResult = _versionsService.GetLatestVersionForMinecraftVersion(minecraftVersion, modLoaderType);
            if (responseResult.HasError)
                return BadRequest();

            return Ok(responseResult.Value);
        }
    }
}