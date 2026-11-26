// SVG files are turned into React components by react-native-svg-transformer.
declare module '*.svg' {
  import type React from 'react';
  import type { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

// Metro resolves `require`d images to a numeric asset id. Typed as that
// number so it fits both <Image> and <FastImage> `source`.
declare module '*.png' {
  import type { ImageRequireSource } from 'react-native';
  const value: ImageRequireSource;
  export default value;
}
