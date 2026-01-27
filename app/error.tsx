'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to monitoring service (Sentry, etc.)
    console.error('Error:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-6xl font-bold text-foreground mb-4">500</h1>
        <h2 className="text-2xl font-semibold mb-4">
          Algo salió mal
        </h2>
        <p className="text-muted-foreground mb-8">
          Lo sentimos, ha ocurrido un error inesperado. Por favor, intenta nuevamente.
        </p>
        <div className="flex gap-4 justify-center">
          <Button onClick={reset} variant="primary">
            Intentar de nuevo
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Volver al inicio</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
