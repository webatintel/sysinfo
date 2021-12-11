function misc(si) {
  // hardware
  si['cpu.logicalCoreNumber'] = navigator.hardwareConcurrency;
  si['memory'] = navigator.deviceMemory;
  si['screen.width'] = screen.width;
  si['screen.height'] = screen.height;
  si['screen.colorDepth'] = screen.colorDepth;
}
