# SBOM Tools

> Automated Software Bill of Materials (SBOM) generation tool for supply chain security

[![GitHub release](https://img.shields.io/github/v/release/haksungjang/sbom-tools?style=flat-square)](https://github.com/haksungjang/sbom-tools/releases)
[![Docker Pulls](https://img.shields.io/docker/pulls/sktelecom/sbom-scanner?style=flat-square)](https://github.com/haksungjang/sbom-tools/pkgs/container/sbom-scanner)
[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg?style=flat-square)](LICENSE)

## Overview

SBOM Tools automatically generates Software Bill of Materials (SBOM) in [CycloneDX 1.4](https://cyclonedx.org/) format for multiple programming languages and environments. Originally developed by SK Telecom for supply chain security management, now available as open source.

### Key Features

- **Multi-language Support**: Java, Python, Node.js, Ruby, PHP, Rust, Go, .NET, C/C++
- **Versatile Analysis Modes**: Source code, Docker images, binary files, RootFS
- **Standard Format**: CycloneDX 1.4
- **Docker-based**: No language-specific runtime installation required on the host
- **Cross-platform**: Linux (AMD64, ARM64), macOS, Windows (Git Bash)

### Supported Languages & Tools

| Language | Package Managers | Analysis Tool |
|----------|-----------------|---------------|
| **Java** | Maven, Gradle | cdxgen |
| **Python** | pip, Poetry | cdxgen |
| **Node.js** | npm, Yarn, pnpm | cdxgen |
| **Ruby** | Bundler | cdxgen |
| **PHP** | Composer | cdxgen |
| **Rust** | Cargo | cdxgen |
| **Go** | Go modules | cdxgen |
| **.NET** | NuGet | cdxgen |
| **Docker Image** | — | syft |
| **Binary / RootFS** | — | syft |

## Quick Start

### Prerequisites

- Docker 20.10 or higher
- 4 GB+ available disk space

### Installation

```bash
# Clone the repository
git clone https://github.com/haksungjang/sbom-tools.git
cd sbom-tools

# Pull the scanner image
docker pull ghcr.io/sktelecom/sbom-scanner:latest
```

### Basic Usage

```bash
# Scan source code (run from project root)
./scripts/scan-sbom.sh --project "MyApp" --version "1.0.0" --generate-only

# Scan a Docker image
./scripts/scan-sbom.sh --project "MyApp" --version "1.0.0" \
  --target "nginx:latest" --generate-only

# Scan a binary file
./scripts/scan-sbom.sh --project "MyFirmware" --version "2.0.0" \
  --target "./firmware.bin" --generate-only
```

Output file: `{ProjectName}_{Version}_bom.json` (CycloneDX 1.4 JSON)

## Architecture

```
┌────────────────────────────────────────────────┐
│           scan-sbom.sh  (Wrapper Script)       │
│  • Parses arguments & detects target type      │
│  • Orchestrates Docker execution               │
└────────────────────────┬───────────────────────┘
                         │  docker run
                         ▼
┌────────────────────────────────────────────────┐
│        Docker Container (sbom-scanner)         │
│  ┌─────────────────────────────────────────┐   │
│  │     Multi-language Runtime Environment  │   │
│  │  JDK 17 · Python 3 · Node.js 20 · Ruby │   │
│  │  PHP · Rust · Go · .NET · Build Tools  │   │
│  └─────────────────────────────────────────┘   │
│  ┌──────────────────┐  ┌────────────────────┐  │
│  │ cdxgen           │  │ syft               │  │
│  │ (source code)    │  │ (images/binaries)  │  │
│  └──────────────────┘  └────────────────────┘  │
└────────────────────────┬───────────────────────┘
                         │
                         ▼
                  CycloneDX 1.4 SBOM (.json)
```

See [docs/architecture.md](docs/architecture.md) for details (Korean).

## Documentation (한국어)

| 문서 | 설명 |
|------|------|
| [시작하기](docs/getting-started.md) | 설치, 환경 설정, 첫 SBOM 생성 |
| [사용 가이드](docs/usage-guide.md) | 전체 옵션, 분석 모드, CI/CD 통합, 트러블슈팅 |
| [예제 가이드](docs/examples-guide.md) | 언어별 예제 프로젝트 실습 |
| [아키텍처](docs/architecture.md) | 시스템 구조 및 설계 원칙 |
| [테스트 가이드](docs/contributing/testing-guide.md) | 테스트 작성 및 실행 |
| [패키지 매니저 추가](docs/contributing/package-manager-guide.md) | 새로운 언어/패키지 매니저 지원 추가 |
| [기여하기](CONTRIBUTING.md) | 기여 절차 및 코딩 규칙 |

## Testing

```bash
./tests/test-scan.sh                    # 기본 실행
VERBOSE=true ./tests/test-scan.sh       # 상세 출력
DEBUG_MODE=true ./tests/test-scan.sh    # 디버그 모드
```

## Contributing

We welcome contributions of all kinds — bug fixes, new language support, documentation improvements, and more.

- **Bug reports**: [GitHub Issues](https://github.com/haksungjang/sbom-tools/issues)
- **Feature requests**: [GitHub Discussions](https://github.com/haksungjang/sbom-tools/discussions)
- **Code contributions**: [CONTRIBUTING.md](CONTRIBUTING.md) (Korean)

## License

Apache License 2.0 — Copyright 2026 SK Telecom Co., Ltd.  
See [LICENSE](LICENSE) for details.

## Acknowledgments

- [CycloneDX](https://cyclonedx.org/) — SBOM standard
- [cdxgen](https://github.com/CycloneDX/cdxgen) — Source code analysis
- [Syft](https://github.com/anchore/syft) — Container & binary analysis

---

Made with ❤️ by SK Telecom Open Source Team · [opensource@sktelecom.com](mailto:opensource@sktelecom.com)
