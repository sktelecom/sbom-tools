# .NET Example

SBOM generation for .NET projects using NuGet.

## Dependencies

- **Newtonsoft.Json** (13.0.3): JSON library
- **Serilog.AspNetCore** (8.0.0): Logging
- **EntityFrameworkCore** (8.0.0): ORM

## Generate SBOM

```bash
cd examples/dotnet
../../scripts/scan-sbom.sh --project "DotNetExample" --version "1.0.0" --generate-only
```

## Expected Components

~50-60 NuGet packages

## Validate

```bash
jq '.components | length' DotNetExample_1.0.0_bom.json
```
