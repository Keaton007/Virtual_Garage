declare module '*.glb' {
  const content: ArrayBuffer;
  export default content;
}

declare module '*.gltf' {
  const content: string;
  export default content;
}
