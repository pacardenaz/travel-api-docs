"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CodeBlock } from "@/components/code-block";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, Plane } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const endpoints = [
  {
    type: "price",
    label: "Por Precio",
    path: "/flights/availability/made",
    description: "Resultados presentados en recomendaciones por precio y aerolínea, agrupando los segmentos por ida y regreso.",
  },
  {
    type: "schedule",
    label: "Por Horario",
    path: "/flights/availability/single",
    description: "Resultados agrupados por trayecto y ordenados según el horario de salida. Ideal para búsquedas nacionales.",
  },
  {
    type: "farefamily",
    label: "Por Familia Tarifaria",
    path: "/flights/availability/farefamily",
    description: "Resultados agrupados por familia tarifaria. Mezcla entre búsqueda por horario con agrupación por familias.",
  },
];

const requestBody = `{
  "SourceCode": [],
  "Itineraries": [
    {
      "DateDeparture": "2024-07-12",
      "IATADeparture": "PEI",
      "IATAArrival": "BOG",
      "TimeDeparture": 0
    },
    {
      "DateDeparture": "2024-07-15",
      "IATADeparture": "BOG",
      "IATAArrival": "PEI",
      "TimeDeparture": 0
    }
  ],
  "PaxAdults": 1,
  "PaxChildren": 0,
  "PaxInfants": 0,
  "BaggageOption": "0",
  "PreferredAirlines": [],
  "Cabin": "Economy",
  "DirectFlight": false,
  "Language": "ES"
}`;

const codeExamples = [
  {
    language: "curl",
    label: "cURL",
    code: `curl -X POST "{{URLBase}}/flights/availability/made" \\
  -H "x-api-key: GrOA6TMEdR7Q5ryEXXXXXXXXXX" \\
  -H "Authorization: Bearer eyJ0eXAiOiJKV1Qi..." \\
  -H "Content-Type: application/json" \\
  -d '${requestBody}'`,
  },
  {
    language: "javascript",
    label: "JavaScript",
    code: `const response = await fetch('{{URLBase}}/flights/availability/made', {
  method: 'POST',
  headers: {
    'x-api-key': 'GrOA6TMEdR7Q5ryEXXXXXXXXXX',
    'Authorization': 'Bearer eyJ0eXAiOiJKV1Qi...',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    SourceCode: [],
    Itineraries: [
      {
        DateDeparture: '2024-07-12',
        IATADeparture: 'PEI',
        IATAArrival: 'BOG',
        TimeDeparture: 0
      },
      {
        DateDeparture: '2024-07-15',
        IATADeparture: 'BOG',
        IATAArrival: 'PEI',
        TimeDeparture: 0
      }
    ],
    PaxAdults: 1,
    PaxChildren: 0,
    PaxInfants: 0,
    BaggageOption: '0',
    PreferredAirlines: [],
    Cabin: 'Economy',
    DirectFlight: false,
    Language: 'ES'
  }),
});

const data = await response.json();`,
  },
  {
    language: "csharp",
    label: "C#",
    code: `using System;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

var client = new HttpClient();
var request = new HttpRequestMessage(HttpMethod.Post, "{{URLBase}}/flights/availability/made");

request.Headers.Add("x-api-key", "GrOA6TMEdR7Q5ryEXXXXXXXXXX");
request.Headers.Add("Authorization", "Bearer eyJ0eXAiOiJKV1Qi...");

var json = @"{
  ""SourceCode"": [],
  ""Itineraries"": [
    {
      ""DateDeparture"": ""2024-07-12"",
      ""IATADeparture"": ""PEI"",
      ""IATAArrival"": ""BOG"",
      ""TimeDeparture"": 0
    },
    {
      ""DateDeparture"": ""2024-07-15"",
      ""IATADeparture"": ""BOG"",
      ""IATAArrival"": ""PEI"",
      ""TimeDeparture"": 0
    }
  ],
  ""PaxAdults"": 1,
  ""PaxChildren"": 0,
  ""PaxInfants"": 0,
  ""Cabin"": ""Economy"",
  ""DirectFlight"": false,
  ""Language"": ""ES""
}";

request.Content = new StringContent(json, Encoding.UTF8, "application/json");

var response = await client.SendAsync(request);
var content = await response.Content.ReadAsStringAsync();
Console.WriteLine(content);`,
  },
];

const bodyParameters = [
  {
    name: "SourceCode",
    type: "array",
    required: false,
    description: "Códigos de fuentes/proveedores a consultar. Si está vacío, consulta todas las fuentes configuradas.",
  },
  {
    name: "Itineraries",
    type: "array",
    required: true,
    description: "Array de itinerarios (ida y/o vuelta). Cada itinerario debe tener DateDeparture, IATADeparture, IATAArrival y TimeDeparture.",
  },
  {
    name: "PaxAdults",
    type: "integer",
    required: true,
    description: "Número de pasajeros adultos.",
  },
  {
    name: "PaxChildren",
    type: "integer",
    required: true,
    description: "Número de pasajeros niños.",
  },
  {
    name: "PaxInfants",
    type: "integer",
    required: true,
    description: "Número de pasajeros infantes.",
  },
  {
    name: "Cabin",
    type: "string",
    required: true,
    description: "Clase de cabina: Economy, Business, First.",
  },
  {
    name: "DirectFlight",
    type: "boolean",
    required: true,
    description: "Si es true, solo retorna vuelos directos.",
  },
  {
    name: "Language",
    type: "string",
    required: true,
    description: "Idioma de la respuesta: ES, EN, etc.",
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
          <Plane className="h-8 w-8 text-blue-500" />
          <h1 className="text-4xl font-bold tracking-tight">Disponibilidad de Vuelos</h1>
        </div>
        
        <p className="text-lg text-muted-foreground">
          Nuestro API permite hacer tres tipos de consultas de disponibilidad. 
          Para el proceso de búsqueda se usa el mismo objeto de petición para los 
          tres tipos de consultas; la manera como llegan los resultados depende 
          de cuál endpoint se utilice.
        </p>
      </motion.div>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Headers Requeridos</AlertTitle>
        <AlertDescription>
          <code>x-api-key</code> y <code>Authorization: Bearer {'{token}'}</code> son obligatorios.
        </AlertDescription>
      </Alert>

      <Separator />

      {/* Endpoints */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Endpoints</h2>
        
        <Tabs defaultValue="price" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            {endpoints.map((ep) => (
              <TabsTrigger key={ep.type} value={ep.type}>{ep.label}</TabsTrigger>
            ))}
          </TabsList>
          
          {endpoints.map((ep) => (
            <TabsContent key={ep.type} value={ep.type} className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20 font-mono">
                      POST
                    </Badge>
                    <code className="text-lg font-mono">{ep.path}</code>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{ep.description}</p>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      <Separator />

      {/* Request Body */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Body de la Petición</h2>
        
        <div className="grid gap-4">
          {bodyParameters.map((param, index) => (
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

      {/* Examples */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Ejemplo de Solicitud</h2>
        <CodeBlock examples={codeExamples} />
      </section>

      <Separator />

      {/* Metadata Links */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Metadatos</h2>
        
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Documentación de Objetos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <a 
                href="https://beta-dev-rest.kontroltravel.com/json/metadata?op=AvailabilityByPriceRQ" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-blue-500 hover:underline block"
              >
                AvailabilityByPriceRQ →
              </a>
              <a 
                href="https://beta-dev-rest.kontroltravel.com/json/metadata?op=AvailabilitySingleRQ" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-blue-500 hover:underline block"
              >
                AvailabilitySingleRQ →
              </a>
              <a 
                href="https://beta-dev-rest.kontroltravel.com/json/metadata?op=AvailabilityFareFamilyRQ" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-blue-500 hover:underline block"
              >
                AvailabilityFareFamilyRQ →
              </a>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
