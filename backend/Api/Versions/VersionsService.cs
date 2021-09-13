using CustomCrosshairModApi.Api.Versions.Types;
using CustomCrosshairModApi.Types;
using System.Collections.Generic;

namespace CustomCrosshairModApi.Api.Versions
{
    public interface IVersionsService
    {
        Result<GetLatestVersionForMinecraftVersionResponse> GetLatestVersionForMinecraftVersion(string minecraftVersion, ModLoaderType modLoaderType);
    }

    public sealed class VersionsService : IVersionsService
    {
        public VersionsService()
        {
        }

        public Result<GetLatestVersionForMinecraftVersionResponse> GetLatestVersionForMinecraftVersion(string minecraftVersion, ModLoaderType modLoaderType)
        {
            var mapping = new Dictionary<string, string>
            {
                { "1.17.1-forge", "1.3.4-forge" },
                { "1.17.1-fabric", "1.3.5-fabric" }
            };

            if (!mapping.TryGetValue($"{minecraftVersion}-{modLoaderType.ToString().ToLower()}", out var modVersion))
                return Result<GetLatestVersionForMinecraftVersionResponse>.Error("No version found for this version of Minecraft.");

            return Result<GetLatestVersionForMinecraftVersionResponse>.Of(new GetLatestVersionForMinecraftVersionResponse
            {
                Version = modVersion
            });
        }
    }
}