import React, { useMemo, useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  ImageProps,
  StyleProp,
  View,
  ViewStyle,
  ImageStyle,
  ActivityIndicator,
  Animated,
  Easing,
  StyleSheet,
} from 'react-native';
import { colors } from '../../styles/colors';

type SourceProp = string | number | { uri: string };

export type CustomImageProps = Omit<ImageProps, 'source'> & {
  source: SourceProp;
  placeholder?: number | { uri: string } | null;
  containerStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  showLoader?: boolean;
  fadeDuration?: number;
};

const CustomImage: React.FC<CustomImageProps> = ({
  source,
  placeholder = null,
  containerStyle,
  imageStyle,
  showLoader = true,
  fadeDuration = 250,
  resizeMode = 'cover',
  onError,
  onLoad,
  ...rest
}) => {
  const [loading, setLoading] = useState(true);
  const [errored, setErrored] = useState(false);
  const opacity = useMemo(() => new Animated.Value(0), []);

  const resolvedSource: ImageSourcePropType = (() => {
    if (typeof source === 'string') return { uri: source };
    if (typeof source === 'number') return source;
    return source as { uri: string };
  })();

  const resolvedPlaceholder: ImageSourcePropType | null = (() => {
    if (!placeholder) return null;
    if (typeof placeholder === 'string') return { uri: placeholder };
    return placeholder as ImageSourcePropType;
  })();

  const handleLoad = (e: any) => {
    setLoading(false);
    setErrored(false);
    Animated.timing(opacity, {
      toValue: 1,
      duration: fadeDuration,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();

    onLoad && onLoad(e);
  };

  const handleError = (e: any) => {
    setLoading(false);
    setErrored(true);
    onError && onError(e);
  };

  const treatAsLocal = typeof source === 'number';

  return (
    <View style={[styles.container, containerStyle]}>
      {resolvedPlaceholder && (errored || loading) && (
        <Image
          source={resolvedPlaceholder as ImageSourcePropType}
          style={[styles.image, imageStyle]}
          resizeMode={resizeMode}
          blurRadius={1}
          accessible={false}
        />
      )}

      {showLoader && loading && !treatAsLocal && (
        <View style={styles.loader}>
          <ActivityIndicator color={colors.white} />
        </View>
      )}

      <Animated.View style={{ opacity }}>
        <Image
          {...rest}
          source={resolvedSource}
          style={[styles.mainImage, imageStyle]}
          onLoad={handleLoad}
          onError={handleError}
          resizeMode={resizeMode}
        />
      </Animated.View>
    </View>
  );
};

export default React.memo(CustomImage);

const styles = StyleSheet.create({
  container: {
    // overflow: 'hidden',
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  loader: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
});
