"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CodeBlock } from "@/components/code-block";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, Lock } from "lucide-react";

const codeExamples = [
  {
    language: "curl",
    label: "cURL",
    code: `curl -X POST "{{URLBase}}/auth/credentials" \\
  -H "x-api-key: GrOA6TMEdR7Q5ryEXXXXXXXXXX" \\
  -H "Content-Type: application/json" \\
  -d '{
    "UserName": "XXXXXXX",
    "Password": "ZZZZ"
  }'`,
  },
  {
    language: "javascript",
    label: "JavaScript",
    code: `const response = await fetch('{{URLBase}}/auth/credentials', {
  method: 'POST',
  headers: {
    'x-api-key': 'GrOA6TMEdR7Q5ryEXXXXXXXXXX',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    UserName: 'XXXXXXX',
    Password: 'ZZZZ',
  }),
});

const data = await response.json();
console.log(data.BearerToken); // Usar en siguientes peticiones`,
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
var request = new HttpRequestMessage(HttpMethod.Post, "{{URLBase}}/auth/credentials");

request.Headers.Add("x-api-key", "GrOA6TMEdR7Q5ryEXXXXXXXXXX");

var json = JsonSerializer.Serialize(new {
    UserName = "XXXXXXX",
    Password = "ZZZZ"
});

request.Content = new StringContent(json, Encoding.UTF8, "application/json");

var response = await client.SendAsync(request);
var data = await response.Content.ReadAsStringAsync();
Console.WriteLine(data);`,
  },
];

const responseExample = {
  language: "json",
  label: "Respuesta Exitosa",
  code: `{
  "UserId": "f4ad6f38-d8fb-42dc-960b-53a54e008a25",
  "SessionId": "h1Sfa1Z8gUdwDGG83vP4",
  "UserName": "XXXXXXX",
  "DisplayName": "XXXXXXX",
  "BearerToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImtpZCI6ImRHbCJ9...",
  "ResponseStatus": {}
}`,
};

const errorResponse = {
  language: "json",
  label: "Respuesta Error",
  code: `{
  "ResponseStatus": {
    "ErrorCode": "Unauthorized",
    "Message": "Invalid Username or Password",
    "Errors": []
  }
}`,
};

export default function AuthPage() {
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
          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20 font-mono">
            POST
          </Badge>
          <code className="text-lg font-mono text-muted-foreground">/auth/credentials</code>
        </div>
        
        <h1 className="text-4xl font-bold tracking-tight">Autenticación</h1>
        
        <p className="text-lg text-muted-foreground">
          El API utiliza el estándar JWT (JSON Web Tokens) para autenticación. 
          Al momento de la entrega se proporcionará un usuario y clave asignados 
          para la generación del token que debe ser enviado en todas las peticiones 
          del flujo aéreo.
        </p>
      </motion.div>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Importante</AlertTitle>
        <AlertDescription>
          El ApiKey debe ser SIEMPRE enviado en cada petición de cualquier servicio 
          en la sección de Headers con el nombre <code>x-api-key</code>.
        </AlertDescription>
      </Alert>

      <Separator />

      {/* Headers */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Headers Requeridos</h2>
        
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <code className="text-sm font-mono font-semibold">x-api-key</code>
              <Badge variant="destructive" className="text-xs">requerido</Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm text-muted-foreground">
              API Key entregada al momento de entrar en producción junto con la URL.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <code className="text-sm font-mono font-semibold">Content-Type</code>
              <Badge variant="destructive" className="text-xs">requerido</Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm text-muted-foreground">
              Debe ser <code>application/json</code>
            </p>
          </CardContent>
        </Card>
      </section>

      <Separator />

      {/* Request Body */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Body de la Petición</h2>
        
        <div className="grid gap-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <code className="text-sm font-mono font-semibold">UserName</code>
                <Badge variant="secondary" className="text-xs">string</Badge>
                <Badge variant="destructive" className="text-xs">requerido</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground">Nombre de usuario asignado</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <code className="text-sm font-mono font-semibold">Password</code>
                <Badge variant="secondary" className="text-xs">string</Badge>
                <Badge variant="destructive" className="text-xs">requerido</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground">Contraseña del usuario</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator />

      {/* Examples */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Ejemplos de Solicitud</h2>
        <CodeBlock examples={codeExamples} />
      </section>

      <Separator />

      {/* Response */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Respuesta Exitosa (200 OK)</h2>
        <p className="text-muted-foreground">
          En caso de validación exitosa, utilizar la propiedad <code>BearerToken</code> 
          para ser enviado en el header de las siguientes peticiones al API.
        </p>
        <CodeBlock examples={[responseExample]} />
      </section>

      <Separator />

      {/* Error Response */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Respuesta de Error</h2>
        <CodeBlock examples={[errorResponse]} />
      </section>

      <Separator />

      {/* Next Steps */}
      <Alert className="bg-blue-500/10 border-blue-500/20">
        <Lock className="h-4 w-4 text-blue-500" />
        <AlertTitle className="text-blue-500">Siguiente Paso</AlertTitle>
        <AlertDescription>
          Una vez autenticado, puedes proceder a consultar la 
          <a href="/ideas-fractal/availability" className="font-semibold underline">disponibilidad de vuelos</a>.
        </AlertDescription>
      </Alert>
    </div>
  );
}
