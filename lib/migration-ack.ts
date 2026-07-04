const KEY = "journeyman-prep:migration-ack:v1";

/**
 * Records which signed-in user id this browser's local guest data has
 * already been reconciled against (pushed up, or explicitly resolved via
 * a conflict choice), so we don't re-run the migration/conflict check --
 * or worse, re-prompt the user -- on every sign-in. Deliberately stored
 * per-browser (not server-side): a different browser/device signing into
 * the same account has its own, independent local guest data that still
 * needs its own conflict check.
 */
export function getMigrationAck(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

export function setMigrationAck(userId: string): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem(KEY, userId);
  } catch {
    // Ignore -- if localStorage is unavailable, worst case the check
    // re-runs next sign-in, which is safe (just redundant).
  }
}
