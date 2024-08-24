'use strict';

var _extends = require('@babel/runtime/helpers/extends');
var React = require('react');
var reactNative = require('react-native');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _extends__default = /*#__PURE__*/_interopDefaultLegacy(_extends);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const FastImageViewNativeModule = reactNative.NativeModules.FastImageView;
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

  const innerRef = React.useRef(null);
  const outerRef = React.useRef(null);
  React.useImperativeHandle(forwardedRef, () => ({
    measureInWindow: cb => {
      var _outerRef$current;

      return (_outerRef$current = outerRef.current) === null || _outerRef$current === void 0 ? void 0 : _outerRef$current.measureInWindow(cb);
    },
    playAnimation: () => {
      FastImageViewNativeModule.playAnimation(reactNative.findNodeHandle(innerRef === null || innerRef === void 0 ? void 0 : innerRef.current));
    }
  }));

  if (fallback || reactNative.Platform.OS === 'web') {
    if (source && typeof source === 'object' && source.uri === undefined && onError) onError();
    return /*#__PURE__*/React__default['default'].createElement(reactNative.Image, _extends__default['default']({}, props, {
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
    tintColor = reactNative.StyleSheet.flatten(style).tintColor;
  }

  const resolvedSource = reactNative.Image.resolveAssetSource(source);
  const resolvedDefaultSource = reactNative.Platform.OS === 'android' ? defaultSource && ((_Image$resolveAssetSo = (_Image$resolveAssetSo2 = reactNative.Image.resolveAssetSource(defaultSource)) === null || _Image$resolveAssetSo2 === void 0 ? void 0 : _Image$resolveAssetSo2.uri) !== null && _Image$resolveAssetSo !== void 0 ? _Image$resolveAssetSo : null) : defaultSource;
  return /*#__PURE__*/React__default['default'].createElement(reactNative.View, {
    style: [styles.imageContainer, style],
    ref: outerRef
  }, /*#__PURE__*/React__default['default'].createElement(FastImageView, _extends__default['default']({}, props, {
    ref: innerRef,
    tintColor: tintColor,
    style: reactNative.StyleSheet.absoluteFill,
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

const FastImageMemo = /*#__PURE__*/React.memo(FastImageBase);
const FastImageComponent = /*#__PURE__*/React.forwardRef((props, ref) => {
  return /*#__PURE__*/React__default['default'].createElement(FastImageMemo, _extends__default['default']({
    forwardedRef: ref
  }, props));
});
FastImageComponent.displayName = 'FastImage';
const FastImage = FastImageComponent;
FastImage.resizeMode = resizeMode;
FastImage.cacheControl = cacheControl;
FastImage.priority = priority;

FastImage.preload = sources => reactNative.Platform.OS !== 'web' && FastImageViewNativeModule.preload(sources);

FastImage.clearMemoryCache = () => reactNative.Platform.OS !== 'web' && FastImageViewNativeModule.clearMemoryCache();

FastImage.clearDiskCache = () => reactNative.Platform.OS !== 'web' && FastImageViewNativeModule.clearDiskCache();

const styles = reactNative.StyleSheet.create({
  imageContainer: {
    overflow: 'hidden'
  }
}); // Types of requireNativeComponent are not correct.

const FastImageView = reactNative.Platform.OS === 'web' ? reactNative.Image : reactNative.requireNativeComponent('FastImageView', FastImage, {
  nativeOnly: {
    onFastImageLoadStart: true,
    onFastImageProgress: true,
    onFastImageLoad: true,
    onFastImageError: true,
    onFastImageLoadEnd: true
  }
});

module.exports = FastImage;
