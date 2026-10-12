export function GET() {
  return Response.json(
    {
      build: 75,
      url: "itms-beta://",
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
