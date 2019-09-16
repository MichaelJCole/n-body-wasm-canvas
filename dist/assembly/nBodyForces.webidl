interface ASModule {
  unsigned long __alloc(unsigned long size, unsigned long id);
  unsigned long __retain(unsigned long ref);
  void __release(unsigned long ref);
  void __collect();
  unsigned long __rtti_base;
  unsigned long FLOAT64ARRAY_ID;
  unrestricted double G;
  long bodySize;
  long forceSize;
  unsigned long nBodyForces(unsigned long arrBodies);
}
