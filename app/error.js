'use client';

import { useEffect } from 'react';

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    // In a production environment, you would log this error to an observability 
    // service like Sentry, Datadog, or Axiom.
    console.error('Global Error Boundary caught an exception:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <h2 className="mb-4 text-3xl font-bold tracking-tight">Something went wrong!</h2>
      <p className="mb-8 text-stone-400">
        We encountered an unexpected error. Our engineering team has been notified.
      </p>
      <button
        onClick={() => reset()}
        className="rounded-md bg-amber-500 px-6 py-3 font-medium text-stone-900 transition-colors hover:bg-amber-400"
      >
        Try again
      </button>
    </div>
  );
}
