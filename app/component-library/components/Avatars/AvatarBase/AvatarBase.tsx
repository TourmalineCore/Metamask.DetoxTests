/* eslint-disable react/prop-types */

// Third party dependencies.
import React from 'react';
import { View } from 'react-native';

// External dependencies.
import { useStyles } from '../../../hooks/useStyles';

// Internal dependencies.
import { AvatarBaseProps, AvatarBaseSize } from './AvatarBase.types';
import styleSheet from './AvatarBase.styles';

const AvatarBase: React.FC<AvatarBaseProps> = ({
  size = AvatarBaseSize.Md,
  style,
  children,
}) => {
  const { styles } = useStyles(styleSheet, {
    size,
    style,
  });

  return <View style={styles.container}>{children}</View>;
};

export default AvatarBase;
