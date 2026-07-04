/**
 * A tiny synchronous bridge between the React-only auth/migration state
 * (components/providers/auth-provider.tsx) and plain non-React modules
 * (services/progress-service.ts, services/practice-service.ts) that need
 * to know, right now, whether reads/writes should go to Supabase or
 * localStorage. `userId` is only set once a signed-in user's migration
 * check has fully resolved -- while checking or awaiting a conflict
 * choice, this stays `null` so those modules keep behaving like a guest.
 */
interface SessionState {
  userId: string | null;
}

let current: SessionState = { userId: null };

export function getSessionState(): SessionState {
  return current;
}

export function setSessionState(next: SessionState): void {
  current = next;
}
