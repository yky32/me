"use client";

import { useState } from "react";

export function SkillsGate() {
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(form: FormData) {
    setPending(true);
    setError("");
    const res = await fetch("/skills/login", {
      method: "POST",
      body: form,
    });
    if (res.redirected) {
      window.location.href = res.url;
      return;
    }
    if (!res.ok) {
      setError("Wrong password.");
      setPending(false);
      return;
    }
    window.location.href = "/skills";
  }

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center px-6">
      <h1 className="text-2xl font-semibold tracking-tight">Skills</h1>
      <p className="mt-2 text-sm text-neutral-500">Private. Password required.</p>
      <form
        className="mt-6 flex flex-col gap-3"
        action={async (form) => {
          await onSubmit(form);
        }}
      >
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="rounded-lg border border-neutral-300 bg-transparent px-3 py-2"
        />
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-neutral-900 px-3 py-2 text-sm text-white disabled:opacity-60"
        >
          {pending ? "Checking…" : "Open"}
        </button>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
      </form>
    </main>
  );
}
