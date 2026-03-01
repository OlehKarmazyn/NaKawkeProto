import PocketBase from 'pocketbase';

const url = import.meta.env.VITE_POCKETBASE_URL ?? '';

/** Singleton PocketBase instance for the whole app. */
export const pb = new PocketBase(url);

pb.autoCancellation(false);
