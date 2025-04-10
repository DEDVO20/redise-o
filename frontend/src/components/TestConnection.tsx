import { useState, useEffect } from 'react';

interface TestResponse {
  message: string;
}

export function TestConnection() {
  const [status, setStatus] = useState<string>('Comprobando conexión...');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testConnection = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:5000/api/test');
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        
        const data: TestResponse = await response.json();
        setStatus(`Conexión exitosa: ${data.message}`);
        setError(null);
      } catch (err: any) {
        console.error('Error al probar la conexión:', err);
        setStatus('Error de conexión');
        setError(err.message || 'No se pudo conectar con el servidor');
      } finally {
        setIsLoading(false);
      }
    };

    testConnection();
  }, []);

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 mt-6">
      <h2 className="text-xl font-bold mb-4">Estado del Servidor</h2>
      
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          <span className="ml-2">Comprobando...</span>
        </div>
      ) : (
        <div>
          <div className={`text-lg font-medium ${error ? 'text-red-500' : 'text-green-500'}`}>
            {status}
          </div>
          
          {error && (
            <div className="mt-2 text-sm text-red-400">
              Detalles del error: {error}
            </div>
          )}
          
          <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            <p>Información de conexión:</p>
            <ul className="list-disc pl-5 mt-2">
              <li>URL del servidor: http://localhost:5000</li>
              <li>Endpoint de prueba: /api/test</li>
              <li>Proxy configurado: {window.location.origin}/api</li>
            </ul>
          </div>
          
          <button 
            onClick={() => {
              setStatus('Comprobando conexión...');
              setIsLoading(true);
              setError(null);
              // Volver a probar la conexión
              fetch('http://localhost:5000/api/test')
                .then(response => {
                  if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
                  return response.json();
                })
                .then((data: TestResponse) => {
                  setStatus(`Conexión exitosa: ${data.message}`);
                  setError(null);
                })
                .catch(err => {
                  console.error('Error al probar la conexión:', err);
                  setStatus('Error de conexión');
                  setError(err.message || 'No se pudo conectar con el servidor');
                })
                .finally(() => setIsLoading(false));
            }}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Probar conexión de nuevo
          </button>
        </div>
      )}
    </div>
  );
}