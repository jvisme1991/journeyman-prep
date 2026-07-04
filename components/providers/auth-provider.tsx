"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import type { User } from "@supabase/supabase-js";

import { getMigrationAck, setMigrationAck } from "@/lib/migration-ack";
import { setSessionState } from "@/lib/session-state";
import { supabase } from "@/lib/supabase-client";
import { StorageService } from "@/services/storage-service";
import {
  getCloudSummary,
  pushLocalToCloud,
  replaceCloudWithLocal,
} from "@/services/supabase-progress-service";

type MigrationStatus = "idle" | "checking" | "ready" | "conflict";

interface ConflictInfo {
  localCount: number;
  cloudCount: number;
}

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  configured: boolean;
  migrationStatus: MigrationStatus;
  conflictInfo: ConflictInfo | null;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  resolveMigrationConflict: (choice: "cloud" | "local") => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [migrationStatus, setMigrationStatus] = useState<MigrationStatus>("idle");
  const [conflictInfo, setConflictInfo] = useState<ConflictInfo | null>(null);

  // Guards against re-running the migration check for the same signed-in
  // user every time this component re-renders (onAuthStateChange can fire
  // more than once for the same session, e.g. token refresh).
  const checkedForUserRef = useRef<string | null>(null);

  async function runMigrationCheck(userId: string) {
    setMigrationStatus("checking");
    // Keep routing to localStorage while we figure out what to do --
    // never switch to Supabase mid-check.
    setSessionState({ userId: null });

    const ack = getMigrationAck();

    if (ack === userId) {
      setMigrationStatus("ready");
      setSessionState({ userId });
      return;
    }

    const localRecord = StorageService.load();
    const hasLocal = localRecord.history.length > 0;
    const cloudSummary = await getCloudSummary(userId);

    if (!hasLocal) {
      // Nothing local worth migrating -- just start using the cloud
      // (existing or brand new) account.
      setMigrationAck(userId);
      setMigrationStatus("ready");
      setSessionState({ userId });
      return;
    }

    if (!cloudSummary.hasData) {
      // Local guest progress, empty cloud account: push it up. Local data
      // is left untouched in localStorage in case anything goes wrong.
      await pushLocalToCloud(userId, localRecord);
      setMigrationAck(userId);
      setMigrationStatus("ready");
      setSessionState({ userId });
      return;
    }

    // Both local and cloud have real data that don't necessarily match --
    // don't guess, ask.
    setConflictInfo({ localCount: localRecord.history.length, cloudCount: cloudSummary.historyCount });
    setMigrationStatus("conflict");
  }

  async function resolveMigrationConflict(choice: "cloud" | "local") {
    if (!user) return;

    if (choice === "local") {
      const localRecord = StorageService.load();
      await replaceCloudWithLocal(user.id, localRecord);
    }

    setMigrationAck(user.id);
    setConflictInfo(null);
    setMigrationStatus("ready");
    setSessionState({ userId: user.id });
  }

  async function signInWithGoogle() {
    if (!supabase) return;

    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/profile`,
      },
    });
  }

  async function signOut() {
    if (!supabase) return;

    await supabase.auth.signOut();
  }

  useEffect(() => {
    if (!supabase) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) {
      checkedForUserRef.current = null;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMigrationStatus("idle");
      setConflictInfo(null);
      setSessionState({ userId: null });
      return;
    }

    if (checkedForUserRef.current === user.id) {
      return;
    }
    checkedForUserRef.current = user.id;

    runMigrationCheck(user.id);
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        configured: supabase !== null,
        migrationStatus,
        conflictInfo,
        signInWithGoogle,
        signOut,
        resolveMigrationConflict,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext(): AuthContextValue {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }

  return ctx;
}
