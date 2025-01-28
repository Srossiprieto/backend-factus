### API Client Configuration

Este módulo configura un cliente API utilizando Axios para interactuar con una API externa. Maneja automáticamente la autenticación mediante tokens, incluyendo la generación y el refresco de tokens cuando sea necesario.

#### Variables

- `accessToken`: Almacena el token de acceso.
- `refreshToken`: Almacena el token de actualización.

#### Axios Instance

- `apiClient`: Instancia de Axios configurada con la URL base de la API y los encabezados comunes.

#### Interceptors

- **Request Interceptor**: Añade el token de acceso a los encabezados de las solicitudes si está disponible.
- **Response Interceptor**: Maneja respuestas con errores. Si la respuesta tiene un error 401 (no autorizado) y hay un `refreshToken` disponible, intenta refrescar el token y reintentar la solicitud original. Si falla el refresco del token, intenta generar un nuevo token y reintentar la solicitud.

#### Functions

- **`generateToken(username: string, password: string): Promise<void>`**:
  - Genera un nuevo token de acceso y de actualización haciendo una solicitud a la API con las credenciales del usuario.
  - Parámetros:
    - `username`: Nombre de usuario.
    - `password`: Contraseña del usuario.
  - Retorna: Una promesa que se resuelve cuando los tokens son generados y almacenados.

- **`refreshTokenHandler(): Promise<void>`**:
  - Refresca el token de acceso utilizando el `refreshToken` actual.
  - Retorna: Una promesa que se resuelve cuando el token de acceso es refrescado y almacenado.

#### Exportaciones

- `apiClient`: Cliente API configurado.
- `generateToken`: Función para generar tokens.
- `refreshTokenHandler`: Función para refrescar el token de acceso.

---

Esta documentación proporciona una visión general de las funcionalidades y el propósito del código, facilitando su comprensión y uso.
