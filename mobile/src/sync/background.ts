import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import { processSyncQueue } from './index';

const BACKGROUND_SYNC_TASK = 'background-sync-task';

// Define the task
TaskManager.defineTask(BACKGROUND_SYNC_TASK, async () => {
  try {
    console.log("Running background sync task...");
    await processSyncQueue();
    // Be sure to return the successful result type!
    return BackgroundFetch.BackgroundFetchResult.NewData;
  } catch (error) {
    console.error("Background sync failed:", error);
    return BackgroundFetch.BackgroundFetchResult.Failed;
  }
});

// Function to register the task
export const registerBackgroundSync = async () => {
  try {
    await BackgroundFetch.registerTaskAsync(BACKGROUND_SYNC_TASK, {
      minimumInterval: 60 * 15, // 15 minutes
      stopOnTerminate: false, // android only
      startOnBoot: true, // android only
    });
    console.log("Background sync task registered.");
  } catch (err) {
    console.log("Task Register failed:", err);
  }
};

export const unregisterBackgroundSync = async () => {
    try {
        await BackgroundFetch.unregisterTaskAsync(BACKGROUND_SYNC_TASK);
    } catch (err) {
        console.log("Task Unregister failed:", err);
    }
}
