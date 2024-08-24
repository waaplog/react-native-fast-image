import _extends from '@babel/runtime/helpers/extends';
import React, { forwardRef, memo, useRef, useImperativeHandle } from 'react';
import { NativeModules, Platform, StyleSheet, Image, requireNativeComponent, findNodeHandle, View } from 'react-native';

const FastImageViewNativeModule = NativeModules.FastImageView;
const resizeMode = {
  contain: 'contain',
  cover: 'cover',
  stretch: 'stretch',
  center: 'center'
};
const priority = {
  low: 'low',
  normal: 'normal',
  high: 'high'
};
const cacheControl = {
  // Ignore headers, use uri as cache key, fetch only if not in cache.
  immutable: 'immutable',
  // Respect http headers, no aggressive caching.
  web: 'web',
  // Only load from cache.
  cacheOnly: 'cacheOnly'
};

function FastImageBase({
  source,
  defaultSource,
  tintColor,
  onLoadStart,
  onProgress,
  onLoad,
  onError,
  onLoadEnd,
  style,
  fallback,
  children,
  // eslint-disable-next-line no-shadow
  resizeMode = 'cover',
  forwardedRef,
  ...props
}) {
  var _Image$resolveAssetSo, _Image$resolveAssetSo2;

  const innerRef = useRef(null);
  const outerRef = useRef(null);
  useImperativeHandle(forwardedRef, () => ({
    measureInWindow: cb => {
      var _outerRef$current;

      return (_outerRef$current = outerRef.current) === null || _outerRef$current === void 0 ? void 0 : _outerRef$current.measureInWindow(cb);
    },
    playAnimation: () => {
      FastImageViewNativeModule.playAnimation(findNodeHandle(innerRef === null || innerRef === void 0 ? void 0 : innerRef.current));
    }
  }));

  if (fallback || Platform.OS === 'web') {
    if (source && typeof source === 'object' && source.uri === undefined && onError) onError();
    return /*#__PURE__*/React.createElement(Image, _extends({}, props, {
      ref: outerRef,
      style: style,
      source: source,
      onLoadStart: onLoadStart,
      onProgress: onProgress,
      onLoad: onLoad,
      onError: onError,
      onLoadEnd: onLoadEnd,
      resizeMode: resizeMode
    }));
  }

  if ((tintColor === null || tintColor === undefined) && style) {
    tintColor = StyleSheet.flatten(style).tintColor;
  }

  const resolvedSource = Image.resolveAssetSource(source);
  const resolvedDefaultSource = Platform.OS === 'android' ? defaultSource && ((_Image$resolveAssetSo = (_Image$resolveAssetSo2 = Image.resolveAssetSource(defaultSource)) === null || _Image$resolveAssetSo2 === void 0 ? void 0 : _Image$resolveAssetSo2.uri) !== null && _Image$resolveAssetSo !== void 0 ? _Image$resolveAssetSo : null) : defaultSource;
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.imageContainer, style],
    ref: outerRef
  }, /*#__PURE__*/React.createElement(FastImageView, _extends({}, props, {
    ref: innerRef,
    tintColor: tintColor,
    style: StyleSheet.absoluteFill,
    defaultSource: resolvedDefaultSource,
    source: resolvedSource,
    onFastImageLoadStart: onLoadStart,
    onFastImageProgress: onProgress,
    onFastImageLoad: onLoad,
    onFastImageError: onError,
    onFastImageLoadEnd: onLoadEnd,
    resizeMode: resizeMode
  })), children);
}

const FastImageMemo = /*#__PURE__*/memo(FastImageBase);
const FastImageComponent = /*#__PURE__*/forwardRef((props, ref) => {
  return /*#__PURE__*/React.createElement(FastImageMemo, _extends({
    forwardedRef: ref
  }, props));
});
FastImageComponent.displayName = 'FastImage';
const FastImage = FastImageComponent;
FastImage.resizeMode = resizeMode;
FastImage.cacheControl = cacheControl;
FastImage.priority = priority;

FastImage.preload = sources => Platform.OS !== 'web' && FastImageViewNativeModule.preload(sources);

FastImage.clearMemoryCache = () => Platform.OS !== 'web' && FastImageViewNativeModule.clearMemoryCache();

FastImage.clearDiskCache = () => Platform.OS !== 'web' && FastImageViewNativeModule.clearDiskCache();

const styles = StyleSheet.create({
  imageContainer: {
    overflow: 'hidden'
  }
}); // Types of requireNativeComponent are not correct.

const FastImageView = Platform.OS === 'web' ? Image : requireNativeComponent('FastImageView', FastImage, {
  nativeOnly: {
    onFastImageLoadStart: true,
    onFastImageProgress: true,
    onFastImageLoad: true,
    onFastImageError: true,
    onFastImageLoadEnd: true
  }
});

export default FastImage;
