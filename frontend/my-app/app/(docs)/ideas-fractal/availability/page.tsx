"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CodeBlock } from "@/components/code-block";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

const codeExamples = [
  {
    language: "curl",
    label: "cURL",
    code: `curl -X GET "https://api.ideasfractal.com/v1/availability?destination=CTG&check_in=2024-03-15&check_out=2024-03-20&guests=2" \\
  -H "Authorization: Bearer TU_API_KEY" \\
  -H "Content-Type: application/json"`,
  },
  {
    language: "javascript",
    label: "JavaScript",
    code: `const response = await fetch(
  'https://api.ideasfractal.com/v1/availability?destination=CTG&check_in=2024-03-15&check_out=2024-03-20&guests=2',
  {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer TU_API_KEY',
      'Content-Type': 'application/json',
    },
  }
);

const data = await response.json();
console.log(data);`,
  },
  {
    language: "python",
    label: "Python",
    code: `import requests

url = "https://api.ideasfractal.com/v1/availability"
params = {
    "destination": "CTG",
    "check_in": "2024-03-15",
    "check_out": "2024-03-20",
    "guests": 2
}
headers = {
    "Authorization": "Bearer TU_API_KEY",
    "Content-Type": "application/json"
}

response = requests.get(url, params=params, headers=headers)
data = response.json()
print(data)`,
  },
  {
    language: "csharp",
    label: "C#",
    code: `using System;
using System.Net.Http;
using System.Threading.Tasks;

var client = new HttpClient();
var request = new HttpRequestMessage(
    HttpMethod.Get, 
    "https://api.ideasfractal.com/v1/availability?destination=CTG&check_in=2024-03-15&check_out=2024-03-20&guests=2"
);

request.Headers.Add("Authorization", "Bearer TU_API_KEY");
request.Headers.Add("Content-Type", "application/json");

var response = await client.SendAsync(request);
var content = await response.Content.ReadAsStringAsync();
Console.WriteLine(content);`,
  },
];

const responseExample = {
  language: "json",
  label: "Respuesta",
  code: `{
  "status": "success",
  "data": {
    "destination": "CTG",
    "destination_name": "Cartagena de Indias",
    "check_in": "2024-03-15",
    "check_out": "2024-03-20",
    "guests": 2,
    "results": [
      {
        "id": "HTL_CTG_001",
        "name": "Hotel Caribe by Faranda Grand",
        "type": "hotel",
        "category": "5 estrellas",
        "rating": 4.7,
        "location": {
          "address": "Bocagrande, Cartagena",
          "latitude": 10.3978,
          "longitude": -75.5605
        },
        "price": {
          "amount": 1250000,
          "currency": "COP",
          "breakdown": {
            "nightly_rate": 250000,
            "nights": 5,
            "taxes": 125000,
            "service_fee": 50000
          }
        },
        "availability": true,
        "amenities": ["wifi", "desayuno", "piscina", "spa", "gimnasio"],
        "images": ["https://cdn.ideasfractal.com/hotels/ctg001/1.jpg"]
      },
      {
        "id": "VLO_CTG_045",
        "name": "Vuelo Bogotá - Cartagena",
        "type": "flight",
        "airline": "Avianca",
        "flight_number": "AV8552",
        "departure": {
          "airport": "BOG",
          "airport_name": "El Dorado",
          "time": "2024-03-15T08:30:00-05:00"
        },
        "arrival": {
          "airport": "CTG",
          "airport_name": "Rafael Núñez",
          "time": "2024-03-15T10:15:00-05:00"
        },
        "price": {
          "amount": 485000,
          "currency": "COP"
        },
        "availability": true,
        "baggage": "23kg incluido"
      }
    ],
    "total_results": 24,
    "filters": {
      "price_range": { "min": 450000, "max": 3500000 },
      "categories": ["3 estrellas", "4 estrellas", "5 estrellas"]
    }
  }
}`,
};

const queryParameters = [
  {
    name: "destination",
    type: "string",
    required: true,
    description: "Código del destino (código IATA o código interno). Ejemplos: CTG (Cartagena), BOG (Bogotá), MDE (Medellín), SMR (Santa Marta)",
  },
  {
    name: "check_in",
    type: "string",
    required: true,
    description: "Fecha de entrada en formato ISO 8601 (YYYY-MM-DD)",
  },
  {
    name: "check_out",
    type: "string",
    required: true,
    description: "Fecha de salida en formato ISO 8601 (YYYY-MM-DD)",
  },
  {
    name: "guests",
    type: "integer",
    required: true,
    description: "Número de huéspedes (1-10)",
  },
  {
    name: "type",
    type: "string",
    required: false,
    description: "Filtrar por tipo: hotel, flight, activity, package. Por defecto: todos",
  },
  {
    name: "min_price",
    type: "number",
    required: false,
    description: "Precio mínimo en COP",
  },
  {
    name: "max_price",
    type: "number",
    required: false,
    description: "Precio máximo en COP",
  },
  {
    name: "category",
    type: "string",
    required: false,
    description: "Categoría del hotel: 3_estrellas, 4_estrellas, 5_estrellas",
  },
];

export default function AvailabilityPage() {
  return (
    <div className="max-w-4xl space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20 font-mono">
            GET
          </Badge>
          <code className="text-lg font-mono text-muted-foreground">/v1/availability</code>
        </div>
        
        <h1 className="text-4xl font-bold tracking-tight">Consultar Disponibilidad</h1>
        
        <p className="text-lg text-muted-foreground">
          Busca disponibilidad de hoteles, vuelos, actividades y paquetes turísticos 
          en destinos de Colombia. Este endpoint retorna información en tiempo real 
          de precios y disponibilidad de múltiples proveedores locales.
        </p>
      </motion.div>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Límite de Peticiones</AlertTitle>
        <AlertDescription>
          Este endpoint tiene un límite de 100 peticiones por minuto por API Key. 
          Considera implementar caché para mejorar el rendimiento de tu aplicación.
        </AlertDescription>
      </Alert>

      <Separator />

      {/* Request Examples */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Ejemplos de Solicitud</h2>
        
        <p className="text-muted-foreground">
          A continuación ejemplos de cómo llamar este endpoint en diferentes lenguajes:
        </p>
        
        <CodeBlock examples={codeExamples} />
      </section>

      <Separator />

      {/* Query Parameters */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Parámetros de Consulta</h2>
        
        <div className="grid gap-4">
          {queryParameters.map((param, index) => (
            <motion.div
              key={param.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <code className="text-sm font-mono font-semibold">{param.name}</code>
                    <Badge variant="secondary" className="text-xs">{param.type}</Badge>
                    {param.required && (
                      <Badge variant="destructive" className="text-xs">requerido</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground">{param.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <Separator />

      {/* Response */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Respuesta</h2>
        
        <p className="text-muted-foreground">
          La respuesta contiene una lista de opciones disponibles con precios en COP y detalles:
        </p>
        
        <CodeBlock examples={[responseExample]} title="200 OK - Respuesta Exitosa" />
      </section>

      <Separator />

      {/* Error Responses */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Respuestas de Error</h2>
        
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Badge variant="destructive">400</Badge>
                <CardTitle className="text-base">Solicitud Incorrecta</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <pre className="text-sm bg-muted p-3 rounded-md">
                {JSON.stringify({
                  "status": "error",
                  "code": "INVALID_DATE_FORMAT",
                  "message": "La fecha check_in debe estar en formato YYYY-MM-DD"
                }, null, 2)}
              </pre>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Badge variant="destructive">401</Badge>
                <CardTitle className="text-base">No Autorizado</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <pre className="text-sm bg-muted p-3 rounded-md">
                {JSON.stringify({
                  "status": "error",
                  "code": "UNAUTHORIZED",
                  "message": "API Key inválida o no proporcionada"
                }, null, 2)}
              </pre>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Badge variant="destructive">429</Badge>
                <CardTitle className="text-base">Demasiadas Peticiones</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <pre className="text-sm bg-muted p-3 rounded-md">
                {JSON.stringify({
                  "status": "error",
                  "code": "RATE_LIMIT_EXCEEDED",
                  "message": "Límite de peticiones excedido. Intenta nuevamente en 60 segundos."
                }, null, 2)}
              </pre>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
