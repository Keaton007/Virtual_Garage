declare namespace JSX {
  interface IntrinsicElements {
    primitive: any;
  }
}

declare global {
  // eslint-disable-next-line no-var
  var mongoose: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };
}

export {};

