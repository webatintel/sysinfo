function gpu(si) {
  for (let webglType of ['webgl', 'webgl2']) {
    let canvas = document.createElement('canvas');
    let ext;
    let baseName = `gpu.${webglType}`;
    let gl = canvas.getContext(webglType, { alpha: true, antialias: true, depth: true, premultipliedAlpha: true, preserveDrawingBuffer: true, stencil: true });
    if (gl) {
      si[`${baseName}.support`] = true;
      // basic
      si[`${baseName}.version`] = getParam(gl, gl.VERSION);
      si[`${baseName}.shadingLanguageVersion`] = getParam(gl, gl.SHADING_LANGUAGE_VERSION);
      si[`${baseName}.vendor`] = getParam(gl, gl.VENDOR);
      si[`${baseName}.renderer`] = getParam(gl, gl.RENDERER);
      ext = gl.getExtension('WEBGL_debug_renderer_info');
      si[`${baseName}.unmaskedVendor`] = getParam(gl, ext.UNMASKED_VENDOR_WEBGL);

      let unmaskedRenderer = getParam(gl, ext.UNMASKED_RENDERER_WEBGL);
      si[`${baseName}.unmaskedRenderer`] = unmaskedRenderer;


      // vertex shader
      si[`${baseName}.maxVertexAttribs`] = getParam(gl, gl.MAX_VERTEX_ATTRIBS);
      si[`${baseName}.maxVertexTextureImageUnits`] = getParam(gl, gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS);
      si[`${baseName}.maxVertexUniformVectors`] = getParam(gl, gl.MAX_VERTEX_UNIFORM_VECTORS);
      si[`${baseName}.maxVertexVaryingVectors`] = getParam(gl, gl.MAX_VARYING_VECTORS);
      getPrecision(gl, si, baseName, 'VERTEX_SHADER');

      // fragment shader
      si[`${baseName}.maxFragmentTextureImageUnits`] = getParam(gl, gl.MAX_TEXTURE_IMAGE_UNITS);
      si[`${baseName}.maxFragmentUniformVectors`] = getParam(gl, gl.MAX_FRAGMENT_UNIFORM_VECTORS);
      getPrecision(gl, si, baseName, 'FRAGMENT_SHADER');

      // framebuffer
      si[`${baseName}.RGBABits`] = getParam(gl, gl.RED_BITS) + ', ' + getParam(gl, gl.GREEN_BITS) + ', ' + getParam(gl, gl.BLUE_BITS) + ', ' + getParam(gl, gl.ALPHA_BITS);
      si[`${baseName}.DepthBits`] = getParam(gl, gl.DEPTH_BITS);
      si[`${baseName}.StencilBits`] = getParam(gl, gl.STENCIL_BITS);
      si[`${baseName}.maxRenderBufferSize`] = getParam(gl, gl.MAX_RENDERBUFFER_SIZE);
      si[`${baseName}.maxViewportDimensions`] = getParam(gl, gl.MAX_VIEWPORT_DIMS);

      // texture
      si[`${baseName}.maxCombinedTextureImageUnits`] = getParam(gl, gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
      si[`${baseName}.maxTextureSize`] = getParam(gl, gl.MAX_TEXTURE_SIZE);
      si[`${baseName}.maxCubeMapTextureSize`] = getParam(gl, gl.MAX_CUBE_MAP_TEXTURE_SIZE);
      ext = gl.getExtension('EXT_texture_filter_anisotropic');
      si[`${baseName}.maxAnisotropy`] = getParam(gl, ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT);

      // rasterizer
      si[`${baseName}.aliasedLineWidthRange`] = getParam(gl, gl.ALIASED_LINE_WIDTH_RANGE);
      si[`${baseName}.aliasedPointSizeRange`] = getParam(gl, gl.ALIASED_POINT_SIZE_RANGE);
      si[`${baseName}.compressedTextureFormats`] = getParam(gl, gl.COMPRESSED_TEXTURE_FORMATS);

      // misc
      si[`${baseName}.antialias`] = getParam(gl, gl.SAMPLES);
      si[`${baseName}.supportedExtensions`] = gl.getSupportedExtensions();
      if (getParamByName('maxDrawingBufferSize') == 'true') {
        si[`${baseName}.maxDrawingBufferSize(width*height)`] = getMaxDrawingBufferSize(gl);
      }
    } else {
      si[`${baseName}.support`] = false;
    }
  }
}

function getPrecision(gl, si, baseName, shaderType) {
  let precisionTypes = ['LOW_INT', 'MEDIUM_INT', 'HIGH_INT', 'LOW_FLOAT', 'MEDIUM_FLOAT', 'HIGH_FLOAT'];
  for (let precisionType of precisionTypes) {
    let pf = gl.getShaderPrecisionFormat(eval('gl.' + shaderType), eval('gl.' + precisionType));
    si[`${baseName}.${shaderType}.${precisionType}`] = `rangeMin: ${pf.rangeMin}, rangeMax: ${pf.rangeMax}, precision: ${pf.precision}`;
  }
}

function getMaxDrawingBufferSize(gl) {
  size = 4096;
  while (true) {
    gl.canvas.width = size;
    gl.canvas.height = size;
    if (gl.canvas.width != gl.drawingBufferWidth || gl.canvas.height != gl.drawingBufferHeight)
      break;
    size *= 2;
  }
  return gl.drawingBufferWidth + '*' + gl.drawingBufferHeight;
}

// https://github.com/mesa3d/mesa/blob/master/include/pci_ids/i965_pci_ids.h
// https://github.com/mesa3d/mesa/blob/master/include/pci_ids/iris_pci_ids.h
// https://en.wikipedia.org/wiki/List_of_Intel_graphics_processing_units
IntelGPUName = {
  'UHD Graphics 730': 'rocketlake',
  'UHD Graphics 750': 'rocketlake',
  'Iris Xe Graphics': 'tigerlake',
  'Iris Xe Max': 'dg1',
  'Iris Xe Pod': 'dg1',
  'Iris Plus Graphics': 'icelake',
  'UHD Graphics 610': 'coffeelake',
  'UHD Graphics 630': 'coffeelake',
  'Iris Plus Graphics 645': 'coffeelake',
  'Iris Plus Graphics 655': 'coffeelake',
  'HD Graphics 610': 'kabylake',
  'HD Graphics 615': 'kabylake',
  'HD Graphics 620': 'kabylake',
  'UHD Graphics 620': 'kabylake',
  'HD Graphics 630': 'kabylake',
  'HD Graphics P630': 'kabylake',
  'Iris Plus Graphics 640': 'kabylake',
  'Iris Plus Graphics 650': 'kabylake',
  'UHD Graphics 600': 'geminilake',
  'UHD Graphics 605': 'geminilake',
  'HD Graphics 510': 'skylake',
  'HD Graphics 515': 'skylake',
  'HD Graphics 520': 'skylake',
  'HD Graphics 530': 'skylake',
  'HD Graphics P530': 'skylake',
  'Iris Graphics 540': 'skylake',
  'Iris Graphics 550': 'skylake',
  'Iris Pro Graphics P555': 'skylake',
  'Iris Pro Graphics 580': 'skylake',
  'Iris Pro Graphics P580': 'skylake',
  'HD Graphics 500': 'apollolake',
  'HD Graphics 505': 'apollolake',
}

function gpuGuess(si) {

}