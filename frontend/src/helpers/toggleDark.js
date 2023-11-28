// This is for adding toggle for dark/light mode sitewide.
import { useDark, useToggle } from '@vueuse/core';

const darkMode = () => {
  const isDark = useDark({
    onChanged(isDark) {
      if (isDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
      }
    },
  });

  const toggleDark = useToggle(isDark);

  return {
    isDark,
    toggleDark,
  };
};

// Export the object with isDark and toggleDark, not the function itself
export const { isDark, toggleDark } = darkMode();