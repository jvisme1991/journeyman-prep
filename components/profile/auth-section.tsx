"use client";

import { LogIn, LogOut, User as UserIcon } from "lucide-react";

import { useAuth } from "@/hooks/useAuth";

export function AuthSection() {
  const { user, loading, configured, signInWithGoogle, signOut } = useAuth();

  if (loading) {
    return null;
  }

  if (!user) {
    return (
      <button
        onClick={signInWithGoogle}
        disabled={!configured}
        className="flex w-full items-center justify-center gap-2 rounded-card border border-border bg-card py-3 font-semibold text-foreground shadow-lg shadow-black/20 transition hover:border-accent/50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <LogIn size={18} />
        Sign in with Google
      </button>
    );
  }

  const avatarUrl = user.user_metadata?.avatar_url as string | undefined;
  const name = (user.user_metadata?.full_name as string | undefined) ?? user.email;

  return (
    <div className="flex items-center gap-4 rounded-card border border-border bg-card p-4 shadow-lg shadow-black/20">
      {avatarUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={avatarUrl} alt="" className="size-10 shrink-0 rounded-full" />
      ) : (
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
          <UserIcon size={18} />
        </div>
      )}

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-foreground">{name}</p>
        <p className="truncate text-xs text-muted-foreground">{user.email}</p>
      </div>

      <button
        onClick={signOut}
        aria-label="Sign out"
        className="shrink-0 text-muted-foreground transition hover:text-danger"
      >
        <LogOut size={18} />
      </button>
    </div>
  );
}
