const STORAGE_KEY = "journeyman-prep";

export interface SavedProgress {
  currentQuestion: number;
  score: number;
  dailyCompleted: number;
  dailyGoal: number;
}

export const StorageService = {
  load(): SavedProgress | null {
    if (typeof window === "undefined") {
      return null;
    }

    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) {
      return null;
    }

    return JSON.parse(data);
  },

  save(progress: SavedProgress) {
    if (typeof window === "undefined") {
      return;
    }

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(progress)
    );
  },

  clear() {
    if (typeof window === "undefined") {
      return;
    }

    localStorage.removeItem(STORAGE_KEY);
  },
};