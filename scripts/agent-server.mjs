import {spawn} from "node:child_process";
import {createServer} from "node:net";
import path from "node:path";

const ROOT = process.cwd();
const NEXT_BIN = path.join(ROOT, "node_modules", "next", "dist", "bin", "next");

async function freePort() {
  const server = createServer();
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  const address = server.address();
  await new Promise((resolve) => server.close(resolve));

  if (!address || typeof address === "string") {
    throw new Error("Unable to allocate a local port");
  }

  return address.port;
}

function recentOutput(lines) {
  return lines.slice(-40).join("");
}

export async function startNextServer(command) {
  const port = await freePort();
  const output = [];
  const child = spawn(
    process.execPath,
    [NEXT_BIN, command, "--hostname", "127.0.0.1", "--port", String(port)],
    {
      cwd: ROOT,
      env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1" },
      stdio: ["ignore", "pipe", "pipe"],
    },
  );

  for (const stream of [child.stdout, child.stderr]) {
    stream.setEncoding("utf8");
    stream.on("data", (chunk) => output.push(chunk));
  }

  const origin = `http://127.0.0.1:${port}`;
  const deadline = Date.now() + 120_000;

  while (Date.now() < deadline) {
    if (child.exitCode !== null) {
      throw new Error(`Next.js exited before becoming ready:\n${recentOutput(output)}`);
    }

    try {
      const response = await fetch(`${origin}/sitemap.xml`, {
        signal: AbortSignal.timeout(5_000),
      });
      if (response.ok) return { child, origin };
    } catch {
      // Compilation can take a few seconds on the first request.
    }

    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  child.kill("SIGTERM");
  throw new Error(`Next.js did not become ready:\n${recentOutput(output)}`);
}

export async function stopNextServer(child) {
  if (child.exitCode !== null) return;

  child.kill("SIGTERM");
  await Promise.race([
    new Promise((resolve) => child.once("exit", resolve)),
    new Promise((resolve) => setTimeout(resolve, 5_000)),
  ]);

  if (child.exitCode === null) child.kill("SIGKILL");
}
