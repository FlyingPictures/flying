'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to monitoring service
    console.error('Global error:', error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center px-4">
          <div className="max-w-md text-center">
            <h1 className="text-6xl font-bold mb-4">500</h1>
            <h2 className="text-2xl font-semibold mb-4">
              Error crítico
            </h2>
            <p className="text-muted-foreground mb-8">
              Ha ocurrido un error crítico en la aplicación. Por favor, recarga la página.
            </p>
            <Button onClick={reset}>
              Recargar página
            </Button>
          </div>
        </div>
      </body>
    </html>
  );
}
