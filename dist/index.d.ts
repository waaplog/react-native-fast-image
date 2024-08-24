import React, { Ref } from 'react';
import { LayoutChangeEvent, StyleProp, AccessibilityProps, ViewProps, NativeMethods, ImageRequireSource, ImageStyle, ColorValue } from 'react-native';
export declare type ResizeMode = 'contain' | 'cover' | 'stretch' | 'center';
declare const resizeMode: {
    readonly contain: "contain";
    readonly cover: "cover";
    readonly stretch: "stretch";
    readonly center: "center";
};
export declare type Priority = 'low' | 'normal' | 'high';
declare const priority: {
    readonly low: "low";
    readonly normal: "normal";
    readonly high: "high";
};
declare type Cache = 'immutable' | 'web' | 'cacheOnly';
declare const cacheControl: {
    readonly immutable: "immutable";
    readonly web: "web";
    readonly cacheOnly: "cacheOnly";
};
export declare type Source = {
    uri?: string;
    headers?: {
        [key: string]: string;
    };
    priority?: Priority;
    cache?: Cache;
};
export interface OnLoadEvent {
    nativeEvent: {
        width: number;
        height: number;
        isAnimated: boolean;
    };
}
export interface OnProgressEvent {
    nativeEvent: {
        loaded: number;
        total: number;
    };
}
export interface FastImageProps extends AccessibilityProps, ViewProps {
    source: Source | ImageRequireSource;
    defaultSource?: ImageRequireSource;
    resizeMode?: ResizeMode;
    fallback?: boolean;
    onLoadStart?(): void;
    onProgress?(event: OnProgressEvent): void;
    onLoad?(event: OnLoadEvent): void;
    onError?(): void;
    onLoadEnd?(): void;
    /**
     * onLayout function
     *
     * Invoked on mount and layout changes with
     *
     * {nativeEvent: { layout: {x, y, width, height}}}.
     */
    onLayout?: (event: LayoutChangeEvent) => void;
    /**
     *
     * Style
     */
    style?: StyleProp<ImageStyle>;
    /**
     * TintColor
     *
     * If supplied, changes the color of all the non-transparent pixels to the given color.
     */
    tintColor?: ColorValue;
    /**
     * A unique identifier for this element to be used in UI Automation testing scripts.
     */
    testID?: string;
    /**
     * Render children within the image.
     */
    children?: React.ReactNode;
}
interface FastImageRefProps {
    ref?: Ref<typeof FastImage>;
}
export interface FastImageStaticProperties {
    resizeMode: typeof resizeMode;
    priority: typeof priority;
    cacheControl: typeof cacheControl;
    preload: (sources: Source[]) => void;
    clearMemoryCache: () => Promise<void>;
    clearDiskCache: () => Promise<void>;
    playAnimation(): void;
}
declare const FastImage: React.ComponentType<FastImageProps & FastImageRefProps> & NativeMethods & FastImageStaticProperties;
export default FastImage;
//# sourceMappingURL=index.d.ts.map