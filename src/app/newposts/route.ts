import { PostData } from "../postdata";

export const dynamic = "force-dynamic";

const CONTROLLERS: ReadableStreamDefaultController[] = [];

export const broadcast = (post: PostData) => {
  const encoder = new TextEncoder();

  for (const controller of CONTROLLERS) {
    try {
      controller.enqueue(encoder.encode(`data: ${JSON.stringify(post)}\n\n`))
    } catch (e: any) {
      console.error(e);
      if (e.code == "ERR_INVALID_STATE") {
        console.log("Removing controller");
        CONTROLLERS.splice(CONTROLLERS.indexOf(controller), 1);
      }
    }
  }
};

export async function GET() {
  const stream = new ReadableStream({
    start(controller) {
      CONTROLLERS.push(controller)
    },
  });

  return new Response(stream, {
    headers: {
      Connection: "keep-alive",
      "Content-Encoding": "none",
      "Cache-Control": "no-cache, no-transform",
      "Content-Type": "text/event-stream; charset=utf-8",
    },
  })
}
