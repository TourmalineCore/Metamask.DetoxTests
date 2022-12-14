// Third party dependencies.
import { StyleSheet } from 'react-native';

// Internal dependencies.
import { TabBarStyleSheetVars } from './TabBar.types';

/**
 * Style sheet function for TabBar component.
 *
 * @param params Style sheet params.
 * @param params.theme App theme from ThemeContext.
 * @param params.vars Inputs that the style sheet depends on.
 * @returns StyleSheet object.
 */
const styleSheet = (params: { vars: TabBarStyleSheetVars }) => {
  const { vars } = params;
  const { bottomInset } = vars;
  return StyleSheet.create({
    base: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 82,
      marginBottom: bottomInset,
    },
  });
};

export default styleSheet;
