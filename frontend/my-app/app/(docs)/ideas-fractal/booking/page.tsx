"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CodeBlock } from "@/components/code-block";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, FileText, Ticket } from "lucide-react";

const codeExamples = [
  {
    language: "curl",
    label: "cURL",
    code: `curl -X POST "{{URLBase}}/flights/booking" \\
  -H "x-api-key: GrOA6TMEdR7Q5ryEXXXXXXXXXX" \\
  -H "Authorization: Bearer eyJ0eXAiOiJKV1Qi..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "SourceCode": "sabre",
    "BookingType": "STANDARD",
    "Segments": [/* segmentos tarifados */],
    "Passengers": [
      {
        "Type": "ADT",
        "FirstName": "JUAN",
        "LastName": "PEREZ",
        "DocumentType": "CC",
        "DocumentNumber": "1234567890",
        "BirthDate": "1985-05-15"
      }
    ],
    "Contact": {
      "Email": "juan.perez@email.com",
      "Phone": "+573001234567"
    }
  }'`,
  },
  {
    language: "javascript",
    label: "JavaScript",
    code: `const response = await fetch('{{URLBase}}/flights/booking', {
  method: 'POST',
  headers: {
    'x-api-key': 'GrOA6TMEdR7Q5ryEXXXXXXXXXX',
    'Authorization': 'Bearer eyJ0eXAiOiJKV1Qi...',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    SourceCode: 'sabre',
    BookingType: 'STANDARD',
    Segments: segments, // De tarifación
    Passengers: [
      {
        Type: 'ADT',
        FirstName: 'JUAN',
        LastName: 'PEREZ',
        DocumentType: 'CC',
        DocumentNumber: '1234567890',
        BirthDate: '1985-05-15'
      }
    ],
    Contact: {
      Email: 'juan.perez@email.com',
      Phone: '+573001234567'
    }
  }),
});

const data = await response.json();
console.log(data.RecordLocator); // Código de reserva`,
  },
];

const bodyParameters = [
  {
    name: "SourceCode",
    type: "string",
    required: true,
    description: "Código de la fuente/proveedor.",
  },
  {
    name: "BookingType",
    type: "string",
    required: true,
    description: "Tipo de reserva: STANDARD, CORPORATE, etc.",
  },
  {
    name: "Segments",
    type: "array",
    required: true,
    description: "Segmentos obtenidos del servicio de Tarifación.",
  },
  {
    name: "Passengers",
    type: "array",
    required: true,
    description: "Array de pasajeros con datos personales.",
  },
  {
    name: "Contact",
    type: "object",
    required: true,
    description: "Información de contacto (email y teléfono).",
  },
];

export default function BookingPage() {
  return (
    <div className="max-w-4xl space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-3">
          <FileText className="h-8 w-8 text-blue-500" />
          <h1 className="text-4xl font-bold tracking-tight">Reserva de Vuelos</h1>
        </div>
        
        <p className="text-lg text-muted-foreground">
          Proceso de reserva ante el proveedor de vuelos indicando información 
          de pasajeros y datos adicionales de contacto.
        </p>
      </motion.div>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Pre-requisito</AlertTitle>
        <AlertDescription>
          Debes haber completado el paso de <strong>Tarifación</strong> antes de crear una reserva.
        </AlertDescription>
      </Alert>

      <Separator />

      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20 font-mono">
            POST
          </Badge>
          <code className="text-lg font-mono">/flights/booking</code>
        </div>
      </section>

      <Separator />

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

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Ejemplo de Solicitud</h2>
        <CodeBlock examples={codeExamples} />
      </section>

      <Separator />

      <Alert className="bg-green-500/10 border-green-500/20">
        <Ticket className="h-4 w-4 text-green-500" />
        <AlertTitle className="text-green-500">Siguiente Paso</AlertTitle>
        <AlertDescription>
          Una vez creada la reserva, puedes proceder a la 
          <a href="/ideas-fractal/issuance" className="font-semibold underline">emisión del tiquete</a>.
        </AlertDescription>
      </Alert>
    </div>
  );
}
