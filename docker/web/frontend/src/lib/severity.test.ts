// Copyright 2026 SK Telecom Co., Ltd.
// SPDX-License-Identifier: Apache-2.0

import { describe, expect, it } from "vitest";

import { severityTone } from "./severity";

describe("severityTone", () => {
  it("maps each known grade to its tone", () => {
    expect(severityTone("CRITICAL")).toBe("critical");
    expect(severityTone("HIGH")).toBe("high");
    expect(severityTone("MEDIUM")).toBe("medium");
    expect(severityTone("LOW")).toBe("low");
    expect(severityTone("UNKNOWN")).toBe("info");
    expect(severityTone("NONE")).toBe("info");
  });

  it("falls back to info for anything unrecognized, absent, or null", () => {
    expect(severityTone("WEIRD")).toBe("info");
    expect(severityTone("")).toBe("info");
    expect(severityTone(undefined)).toBe("info");
    expect(severityTone(null)).toBe("info");
  });
});
