# Rust Example

SBOM generation for Rust projects using Cargo.

## Dependencies

- **actix-web** (4.4): Web framework
- **serde** (1.0): Serialization
- **tokio** (1.35): Async runtime

## Generate SBOM

```bash
cd examples/rust
../../scripts/scan-sbom.sh --project "RustExample" --version "1.0.0" --generate-only
```

## Expected Components

~35-45 crates including transitive dependencies

## Validate

```bash
jq '.components | length' RustExample_1.0.0_bom.json
```
