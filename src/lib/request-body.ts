import "server-only";

export class BodyTooLargeError extends Error {}

// Bound actual bytes, including chunked requests with no Content-Length header.
export async function readBoundedBody(request: Request, limit: number) {
  const length = request.headers.get("content-length");
  if (length && Number(length) > limit) throw new BodyTooLargeError();
  const reader = request.body?.getReader();
  if (!reader) return Buffer.alloc(0);
  const chunks: Uint8Array[] = [];
  let total = 0;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      total += value.length;
      if (total > limit) { await reader.cancel(); throw new BodyTooLargeError(); }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  return Buffer.concat(chunks, total);
}
