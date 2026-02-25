"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CodeBlock } from "@/components/code-block";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, CreditCard, ArrowRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const endpoints = [
  {
    type: "price",
    label: "Por Precio",
    path: "/flights/pricing",
    description: "Para tarifación de búsquedas por precio (RT).",
  },
  {
    type: "schedule",
    label: "Por Horario/Familia",
    path: "/flights/pricing/single",
    description: "Para tarifación de búsquedas por horario o familia tarifaria.",
  },
];

const requestBody = `{
  "SourceCode": "sabre",
  "BestBuy": false,
  "Segments": [
    {
      "Flights": [
        {
          "FlightId": 3,
          "InternalId": "3",
          "DepartureStation": "PEI",
          "ArrivalStation": "BOG",
          "DepartureDateTime": "2024-04-23T16:02:00",
          "ArrivalDateTime": "2024-04-23T16:55:00",
          "CarrierCode": "LA",
          "FlightNumber": "4126",
          "FareOption": {
            "Cabin": "Economy",
            "Class": "A",
            "FareBase": "A34QP5DB/DD00",
            "FareFamily": "QP"
          }
        }
      ],
      "SourceCode": "sabre",
      "ValidatingCarrier": "LA"
    }
  ],
  "PaxAdults": 1,
  "PaxChildren": 0,
  "PaxInfants": 0,
  "Currency": "COP",
  "GetCorporateParams": false,
  "GetFareRules": false
}`;

const codeExamples = [
  {
    language: "curl",
    label: "cURL",
    code: `curl -X POST "{{URLBase}}/flights/pricing" \\
  -H "x-api-key: GrOA6TMEdR7Q5ryEXXXXXXXXXX" \\
  -H "Authorization: Bearer eyJ0eXAiOiJKV1Qi..." \\
  -H "Content-Type: application/json" \\
  -d '${requestBody}'`,
  },
  {
    language: "javascript",
    label: "JavaScript",
    code: `const response = await fetch('{{URLBase}}/flights/pricing', {
  method: 'POST',
  headers: {
    'x-api-key': 'GrOA6TMEdR7Q5ryEXXXXXXXXXX',
    'Authorization': 'Bearer eyJ0eXAiOiJKV1Qi...',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    SourceCode: 'sabre',
    BestBuy: false,
    Segments: [/* segmentos de disponibilidad */],
    PaxAdults: 1,
    PaxChildren: 0,
    PaxInfants: 0,
    Currency: 'COP',
    GetCorporateParams: false,
    GetFareRules: false
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
var request = new HttpRequestMessage(HttpMethod.Post, "{{URLBase}}/flights/pricing");

request.Headers.Add("x-api-key", "GrOA6TMEdR7Q5ryEXXXXXXXXXX");
request.Headers.Add("Authorization", "Bearer eyJ0eXAiOiJKV1Qi...");

var json = JsonSerializer.Serialize(new {
    SourceCode = "sabre",
    BestBuy = false,
    Segments = segments, // Tomados de disponibilidad
    PaxAdults = 1,
    PaxChildren = 0,
    PaxInfants = 0,
    Currency = "COP",
    GetCorporateParams = false,
    GetFareRules = false
});

request.Content = new StringContent(json, Encoding.UTF8, "application/json");

var response = await client.SendAsync(request);
var content = await response.Content.ReadAsStringAsync();`,
  },
];

const bodyParameters = [
  {
    name: "SourceCode",
    type: "string",
    required: true,
    description: "Código de la fuente/proveedor (ej: sabre, amadeus, latam).",
  },
  {
    name: "BestBuy",
    type: "boolean",
    required: true,
    description: "Si es true, busca la mejor tarifa disponible.",
  },
  {
    name: "Segments",
    type: "array",
    required: true,
    description: "Listado de segmentos seleccionados tal cual se obtienen del servicio de Disponibilidad.",
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
    name: "Currency",
    type: "string",
    required: true,
    description: "Moneda para la tarifación (ej: COP, USD).",
  },
  {
    name: "GetCorporateParams",
    type: "boolean",
    required: false,
    description: "Incluir parámetros corporativos en la respuesta.",
  },
  {
    name: "GetFareRules",
    type: "boolean",
    required: false,
    description: "Incluir reglas tarifarias en la respuesta.",
  },
];

export default function PricingPage() {
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
          <CreditCard className="h-8 w-8 text-blue-500" />
          <h1 className="text-4xl font-bold tracking-tight">Tarifación</h1>
        </div>
        
        <p className="text-lg text-muted-foreground">
          Servicio disponible para obtener las tarifas de uno o varios trayectos 
          según los segmentos obtenidos en la disponibilidad. Estos segmentos pueden 
          pertenecer a un solo proveedor de contenido o a varios.
        </p>
      </motion.div>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Importante</AlertTitle>
        <AlertDescription>
          Para un correcto funcionamiento, es necesario enviar el listado de segmentos 
          seleccionados por el usuario <strong>tal cual se obtienen de la respuesta del 
          Servicio de Disponibilidad</strong>. El objeto <code>Segments</code> debe ser 
          enviado de un servicio a otro sin modificar.
        </AlertDescription>
      </Alert>

      <Separator />

      {/* Endpoints */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Endpoints</h2>
        
        <Tabs defaultValue="price" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
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
        
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Documentación de Objetos</CardTitle>
          </CardHeader>
          <CardContent>
            <a 
              href="https://beta-dev-rest.kontroltravel.com/json/metadata?op=PricingRQ" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-blue-500 hover:underline"
            >
              PricingRQ →
            </a>
          </CardContent>
        </Card>
      </section>

      <Separator />

      {/* Next Steps */}
      <Alert className="bg-green-500/10 border-green-500/20">
        <ArrowRight className="h-4 w-4 text-green-500" />
        <AlertTitle className="text-green-500">Siguiente Paso</AlertTitle>
        <AlertDescription>
          Una vez tarifado, puedes proceder a crear la 
          <a href="/ideas-fractal/booking" className="font-semibold underline">reserva</a>.
        </AlertDescription>
      </Alert>
    </div>
  );
}
