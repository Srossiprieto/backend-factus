# API Client y Controllers Documentation

## Índice
- [Introducción](#introducción)
- [API Client](#api-client)
  - [Características principales](#características-principales)
  - [Funciones disponibles](#funciones-disponibles)
- [Uso en Controllers](#uso-en-controllers)
- [Ejemplo de implementación](#ejemplo-de-implementación)

## Introducción

Este repositorio contiene la documentación del `apiClient` y guías para la creación de controladores para interactuar con la API de Factus. El sistema está diseñado para manejar la autenticación y las peticiones HTTP de manera eficiente y segura.

## API Client

El `apiClient` es una instancia personalizada de Axios que gestiona automáticamente la autenticación mediante tokens. Este cliente maneja todo el ciclo de vida de los tokens de acceso y refresco.

### Características principales

- Gestión automática de tokens de acceso y refresco
- Almacenamiento en memoria de tokens
- Renovación automática de tokens expirados
- Manejo de errores de autenticación
- Regeneración de tokens en caso de fallo

### Funciones disponibles

#### `getAccessToken()`
Recupera el token de acceso actual almacenado en memoria.

#### `getRefreshToken()`
Recupera el token de refresco actual almacenado en memoria.

#### `setAccessToken(token: string, expiresIn: number)`
Establece un nuevo token de acceso con su tiempo de expiración.

**Parámetros:**
- `token`: Token de acceso
- `expiresIn`: Tiempo de expiración en segundos

#### `setRefreshToken(token: string)`
Establece un nuevo token de refresco.

**Parámetros:**
- `token`: Token de refresco

#### `generateToken()`
Genera nuevos tokens de acceso y refresco utilizando las credenciales configuradas.

#### `refreshTokenHandler()`
Renueva el token de acceso utilizando el token de refresco actual.

## Uso en Controllers

Los controladores pueden utilizar el `apiClient` para realizar peticiones autenticadas a la API de Factus. El cliente maneja automáticamente la inclusión del token en las cabeceras y su renovación cuando sea necesario.

## Ejemplo de implementación

```typescript
import apiClient, { generateToken, getAccessToken } from '@/utils/apiClient';
import type { Request, Response } from 'express';

export const billController = {
    getBills: async (req: Request, res: Response) => {
        try {
            let token = getAccessToken();

            // Generación de token si no existe
            if (!token) {
                await generateToken();
                token = getAccessToken();
            }

            // Validación de token
            if (!token) {
                return res.status(401).json({
                    error: 'No se pudo generar un token de autenticación'
                });
            }

            // Realización de la petición
            const response = await apiClient.get('/v1/bills', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            res.status(200).json(response.data);

        } catch (error: any) {
            console.error('Error al obtener las facturas:', error.message);

            if (error.response) {
                console.error('Detalles del error:', error.response.data);
                return res.status(error.response.status).json(error.response.data);
            }

            res.status(500).json({ error: 'Error al obtener las facturas' });
        }
    }
};
```

## Contribución

Si deseas contribuir a este proyecto, por favor:

1. Haz fork del repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Realiza tus cambios
4. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
5. Push a la rama (`git push origin feature/AmazingFeature`)
6. Abre un Pull Request


