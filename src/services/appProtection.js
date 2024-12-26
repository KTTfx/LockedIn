import { NativeModules, Platform } from 'react-native';
import { store } from '../store/store';
import { selectActiveSession } from '../store/slices/lockSessionSlice';

const { AppProtectionModule } = NativeModules;

export const setupAppProtection = async () => {
  if (Platform.OS === 'android') {
    try {
      // Request device admin permissions
      await AppProtectionModule.requestDeviceAdmin();
      // Set up uninstall protection
      await AppProtectionModule.enableUninstallProtection();
    } catch (error) {
      console.error('Failed to setup app protection:', error);
    }
  }
};

export const checkUninstallAttempt = async () => {
  const activeSession = selectActiveSession(store.getState());
  
  if (activeSession && activeSession.isLocked) {
    // Show system alert
    if (Platform.OS === 'android') {
      await AppProtectionModule.showUninstallProtectionDialog();
    }
    return false; // Prevent uninstall
  }
  
  return true; // Allow uninstall
};

// Native module implementation (to be created in Android/iOS native code)
/*
Android (Java):
public class AppProtectionModule extends ReactContextBaseJavaModule {
    private static final String MODULE_NAME = "AppProtectionModule";
    private DevicePolicyManager devicePolicyManager;
    private ComponentName deviceAdmin;

    @ReactMethod
    public void requestDeviceAdmin() {
        // Request device admin permissions
    }

    @ReactMethod
    public void enableUninstallProtection() {
        // Enable protection against uninstall
    }

    @ReactMethod
    public void showUninstallProtectionDialog() {
        // Show system dialog
        Activity activity = getCurrentActivity();
        if (activity != null) {
            AlertDialog.Builder builder = new AlertDialog.Builder(activity);
            builder.setTitle("Cannot Uninstall App")
                   .setMessage("This app cannot be uninstalled while a focus session is active. Please complete or unlock your session first.")
                   .setPositiveButton("OK", null)
                   .show();
        }
    }
}
*/
