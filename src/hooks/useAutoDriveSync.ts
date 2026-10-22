import { useState, useEffect, useRef, useCallback } from 'react';
import { ApprenticeProfile, UserProgress } from '../types/induction';
import {
  initAuth,
  googleSignIn,
  getAccessToken,
  setCachedToken
} from '../services/googleAuth';
import {
  autoSyncApprenticeRecord,
  getSavedSpreadsheetInfo,
  saveSpreadsheetInfo
} from '../services/googleSheetsService';
import { User } from 'firebase/auth';

export type SyncStatus = 'idle' | 'syncing' | 'synced' | 'not_connected' | 'error';

export function useAutoDriveSync(profile: ApprenticeProfile, progress: UserProgress) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [status, setStatus] = useState<SyncStatus>('not_connected');
  const [lastSyncedAt, setLastSyncedAt] = useState<string | null>(() => {
    try {
      return localStorage.getItem('sena_last_synced_at') || null;
    } catch {
      return null;
    }
  });
  const [sheetLink, setSheetLink] = useState<string | null>(() => {
    const cached = getSavedSpreadsheetInfo();
    return cached ? cached.webViewLink : null;
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isInitialMount = useRef(true);
  const isSyncInProgress = useRef(false);

  // Initialize auth listener
  useEffect(() => {
    const unsubscribe = initAuth(
      (user, token) => {
        setCurrentUser(user);
        if (token) {
          setStatus('idle');
          // If we had a cached sheet, set link
          const cached = getSavedSpreadsheetInfo();
          if (cached) {
            setSheetLink(cached.webViewLink);
          }
        } else {
          setStatus('not_connected');
        }
      },
      () => {
        setCurrentUser(null);
        setStatus('not_connected');
      }
    );
    return () => unsubscribe();
  }, []);

  // Core background sync function
  const executeSync = useCallback(
    async (force: boolean = false) => {
      const token = await getAccessToken();
      if (!token) {
        setStatus('not_connected');
        return;
      }

      if (isSyncInProgress.current) {
        return;
      }

      try {
        isSyncInProgress.current = true;
        setStatus('syncing');
        setErrorMessage(null);

        const result = await autoSyncApprenticeRecord(
          token,
          profile,
          progress,
          currentUser?.email || undefined
        );

        setSheetLink(result.webViewLink);
        setLastSyncedAt(result.syncedAt);
        setStatus('synced');

        try {
          localStorage.setItem('sena_last_synced_at', result.syncedAt);
          saveSpreadsheetInfo(result.spreadsheetId, result.webViewLink);
        } catch {
          // Ignore storage errors
        }
      } catch (err: any) {
        console.warn('Auto-sync notice:', err);
        setErrorMessage(err.message || 'Error al sincronizar con Google Sheets');
        setStatus('error');
      } finally {
        isSyncInProgress.current = false;
      }
    },
    [profile, progress, currentUser]
  );

  // 1-Click Connect Google flow
  const connectGoogle = useCallback(async () => {
    try {
      setStatus('syncing');
      const result = await googleSignIn();
      if (result) {
        setCurrentUser(result.user);
        setCachedToken(result.accessToken);
        // Sync immediately upon connecting
        await executeSync(true);
      }
    } catch (err: any) {
      console.error('Error connecting Google:', err);
      setStatus('not_connected');
      setErrorMessage('No se completó el inicio de sesión.');
    }
  }, [executeSync]);

  // Event-Driven Auto-Sync with debounce (1.5s after any state mutation)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      // On first load, check if token is already active and trigger silent sync
      getAccessToken().then(tok => {
        if (tok) {
          executeSync(false);
        }
      });
      return;
    }

    // Clear previous timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Set new debounce timer
    debounceTimerRef.current = setTimeout(() => {
      executeSync(false);
    }, 1500);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [profile, progress, executeSync]);

  return {
    currentUser,
    status,
    lastSyncedAt,
    sheetLink,
    errorMessage,
    triggerSync: executeSync,
    connectGoogle
  };
}
