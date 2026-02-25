"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CodeBlock } from "@/components/code-block";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, Ticket, CheckCircle } from "lucide-react";

const codeExamples = [
  {
    language: "curl",
    label: "cURL",
    code: `curl -X POST "{{URLBase}}/flights/issuance" \\
  -H "x-api-key: GrOA6TMEdR7Q5ryEXXXXXXXXXX" \\
  -H "Authorization: Bearer eyJ0eXAiOiJKV1Qi..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "SourceCode": "sabre",
    "RecordLocator": "ABC123",
    "Payment": {
      "Method": "CREDIT_CARD",
      "CardNumber": "4111111111111111",
      "CardType": "VISA",
      "ExpirationMonth": "12",
      "ExpirationYear": "2027",
      "CVV": "123",
      "HolderName": "JUAN PEREZ"
    }
  }'`,
  },
  {
    language: "javascript",
    label: "JavaScript",
    code: `const response = await fetch('{{URLBase}}/flights/issuance', {
  method: 'POST',
  headers: {
    'x-api-key': 'GrOA6TMEdR7Q5ryEXXXXXXXXXX',
    'Authorization': 'Bearer eyJ0eXAiOiJKV1Qi...',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    SourceCode: 'sabre',
    RecordLocator: 'ABC123',
    Payment: {
      Method: 'CREDIT_CARD',
      CardNumber: '4111111111111111',
      CardType: 'VISA',
      ExpirationMonth: '12',
      ExpirationYear: '2027',
      CVV: '123',
      HolderName: 'JUAN PEREZ'
    }
  }),
});

const data = await response.json();
console.log(data.TicketNumber); // Número de tiquete emitido`,
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
    name: "RecordLocator",
    type: "string",
    required: true,
    description: "Código de reserva (PNR) obtenido del servicio de Reserva.",
  },
  {
    name: "Payment",
    type: "object",
    required: true,
    description: "Información del método de pago.",
  },
];

export default function IssuancePage() {
  return (
    <div className="max-w-4xl space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-3">
          <Ticket className="h-8 w-8 text-blue-500" />
          <h1 className="text-4xl font-bold tracking-tight">Emisión de Tiquetes</h1>
        </div>
        
        <p className="text-lg text-muted-foreground">
          Generación y pago de tiquetes aéreos. Este proceso completa la 
          transacción emitiendo los tiquetes para los pasajeros registrados.
        </p>
      </motion.div>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Pre-requisito</AlertTitle>
        <AlertDescription>
          Debes tener una <strong>reserva confirmada</strong> (RecordLocator) 
          antes de emitir los tiquetes.
        </AlertDescription>
      </Alert>

      <Separator />

      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20 font-mono">
            POST
          </Badge>
          <code className="text-lg font-mono">/flights/issuance</code>
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
        <CheckCircle className="h-4 w-4 text-green-500" />
        <AlertTitle className="text-green-500">¡Proceso Completo!</AlertTitle>
        <AlertDescription>
          Una vez emitidos los tiquetes, el proceso de compra está completo. 
          Los pasajeros recibirán sus tiquetes electrónicos.
        </AlertDescription>
      </Alert>
    </div>
  );
}
