
## Accessing VSTerm

VSTerm se puede abrir de **dos maneras**:

### 1️⃣ From SNAPP
- Abre **SNAP**.
- Haga clic en el enlace **Aplicaciones**.
- Seleccione **VSTerm**.

### 2️⃣ As a standalone application from CUTE
- Abre el **menú principal del sistema CUTE**.
- Seleccione **VSTerm** como aplicación independiente.

<img src="./screenshots/Accessing VS Term.jpg" width="800"></img>

VSTerm es el motor del sistema nativo que se encuentra detrás de SNAPP. Contiene todas las reservas de los huéspedes y la información del sistema relacionada con el check-in, las puertas, la emisión de boletos y las ventas auxiliares.

<img src="./screenshots/VSTerm Native System.jpg" width="800"></img>

## VSTerm Keyboard System

VSTerm es un **sistema basado en entradas de teclado**, que implica el uso de entradas específicas (códigos) para realizar acciones.

A continuación se muestra una tabla que muestra la **ubicación del teclado de los principales delimitadores de VSTerm**.

<img src="./screenshots/VS Term Function Key.jpg" width="800"></img>

## VSTerm Window Layout

Dentro de la **ventana VSTerm**, la **barra de herramientas del sistema** siempre se mostrará en la parte superior de la pantalla.

![terminal](/imgsvg/002.svg)

## VSTerm Toolbar Functions

A continuación se muestra una tabla que enumera todas las **funciones independientes que encontrará en la barra de herramientas**.


<img src="./screenshots/Tool Bar Function.jpg" width="800"></img>

## VSTerm Check-In Module

Aquí aprenderemos sobre el **proceso de registro de VSTerm**.

#### Accessing VSTerm 

Para iniciar sesión en VSTerm, utilice el **código LOG** que se le proporcionó.

> LOG/A/NÚMERO_USUARIO

> CONTRASEÑA


#### VSTerm Login Example 

Sesión VSTerm simulada que muestra mensajes del sistema y de inicio de sesión:

![terminal](/imgsvg/003.svg)


#### VSTerm Login Example 2


Sesión VSTerm simulada que muestra mensajes del sistema y de inicio de sesión:

![terminal](/imgsvg/004.svg)


## LOG Codes / Códigos LOG

Estos códigos se utilizan para rastrear **inicios de sesión** y acceso al sistema en VSTerm.


| Segmento | Significado |
|-------------------|----------------------|
| REGISTRO | Login / system access / Inicio de sesión |
| ANUNCIO | Canal de conexión / Canal de conexión (A, B, C, D) |
| 037915 | Worker ID / ID del trabajador |
| PD | Primary Duty / Función principal asignada |

#### VSTerm Login Messages 

| Mensaje | Significado |
|------------------|---------------------|
| A-INICIO DE SESIÓN COMPLETO | Iniciar sesión exitosamente |
| 03JUN-ML/PD | Información de fecha/sesión del sistema |
| DLM A/PD | Canal de conexión e información de servicio principal |
| LOS USUARIOS DE PRODUCCIÓN DE AIR4 DEBEN CUMPLIR CON LA POLÍTICA DE SEGURIDAD DE VAA | Recordatorios |
| VSTerm> | Aviso del sistema listo para los siguientes comandos |

#### VSTerm Keyboard Shortcuts

| Llave | Función |
|-----|---------|
| **F12** | Limpiar la pantalla |

Sesión VSTerm simulada que muestra mensajes del sistema y de inicio de sesión:

![terminal](/imgsvg/005.svg)


## Searching for a Booking in VSTerm

Puede mostrar la reserva de un huésped utilizando **vuelo y apellido**.

Ejemplo:
> **503** – Vuelo

> **LAWRENCE** – Apellido

Dominio:

> *503\\\\$LAWRENCE

Sesión VSTerm simulada que muestra mensajes del sistema y de inicio de sesión:

![terminal](/imgsvg/006.svg)


Sesión VSTerm simulada que muestra mensajes del sistema y de inicio de sesión:

![terminal](/imgsvg/007.svg)


### Explanation of Each Line / Meaning

| Línea / Campo | Significado |
|--------------|---------|
| `VS LOCALIZADOR DE REGISTROS CSY8YE` | Localizador de sistema único para la reserva (como un PNR). |
| `ETKT PRESENTE-VER ETR* Y *T!` | Boleto electrónico presente, verifique los comandos ETR* y *T para más detalles. |
| `1. 1LAWRENCE/MATEO 2. 1LAWRENCE/SARAH` | Nombres de los pasajeros en la reserva. |
| `1 VS 503Y 03JUN1 LHRJFK HK2` | Vuelo 503Y, salida 03JUN, ruta LHR → JFK, HK2 = 2 asientos ocupados. |
| `600P 825P` | Horarios programados de salida y llegada del vuelo 503. |
| `2 VS 504Y 03JUN1 JFKLHR HK2` | Vuelo de regreso 504Y, 03JUN, ruta JFK → LHR, 2 asientos ocupados. |
| `1159P 1030AY1` | Horarios programados de salida y llegada del vuelo 504. |
| `HA FAX- ** SSRS PRESENTE **` | Solicitudes de servicios especiales (SSR) presentes; HA = agente de manipulación; Información de fax incluida. |
| `SIN DATOS FF` | No hay datos de viajero frecuente para pasajeros. |
| `TKT-TK/TE/TL30/03JUN1314/LHR` | Información de emisión de billetes: TK = emitido, TE/TL = oficina de emisión de billetes, fecha/hora/lugar de emisión. |
| `TKI-E/ADDL` | Detalles de entrada para la emisión de boletos, información adicional. |
| `TARIFA` | Encabezado de la sección de tarifas. |
| `4P A-GBP 2706,00 TX 473,79 TTL 3179,79 ML03JUN` | 4 pasajeros, tarifa de adulto GBP 2706, impuestos 473,79, total 3179,79, ML = fecha de cálculo de la tarifa 03JUN. |
| `HACER CALCULAR` | Encabezado de cálculo de tarifa. |
| `A LON VS NYC M1694.86YYSOADSA VS LON M1694.86YYSOADSA NUC339Y` | Cálculo de tarifa ruta LON → NYC y viceversa, importes en cada tramo, NUC = unidad de conversión neutral. |

---

💡 **Consejo:**
Este diseño es **típico de VSTerm**: cada línea contiene **información clave para vuelos, pasajeros, boletos, tarifas y solicitudes especiales**. Memorizar el significado de cada sección ayuda a los agentes a procesar el check-in de manera eficiente.

#### VSTerm Check-In Entry: PS*

| Entrada | Función |
|-------|---------|
| **PD\*** | Detalles del pasaporte y documento. |
| `1` | Pasajero **número 1** en la reserva (el primer pasajero listado) |

#### Practical Example

Supongamos que tiene la siguiente reserva:

1. 1LAWRENCE/MATEO
2. 1LAWRENCE/SARAH

Dominio:

> PS*1


Sesión VSTerm simulada que muestra mensajes del sistema y de inicio de sesión:

![terminal](/imgsvg/008.svg)

Sesión VSTerm simulada que muestra mensajes del sistema y de inicio de sesión:

![terminal](/imgsvg/009.svg)

## VSTerm Travel Document Fields / PS* Details

| Campo/mensaje | Significado |
|----------------|---------|
| `>4BMASCARA` | Comando para mostrar los documentos de viaje del pasajero seleccionado |
| `***DOCUMENTOS DE VIAJE***DOC 1 DE 1` | Encabezado que indica que esto es **documento 1 de 1** para el pasajero |
| `01.01 LAWRENCE/MATEO` | Número de pasajero y nombre completo |
| `¿TIPO DE DOCUMENTO?` | Tipo de documento de viaje (por ejemplo, pasaporte) |
| `NBR ?254625654` | Número de documento / Número de pasaporte |
| `VFY ?Y` | Estado de verificación: Y = Verificado |
| `VISA RQD ?N` | Indica si se requiere visa: N = No |
| `¿ERC?Y` | Estado verificado: indica que el documento o la información ha sido revisado/verificado |
| `APELLIDO ?LAWRENCE` | Apellido del pasajero |
| `NOMBRE/S ?MATHEW` | Nombre(s) del pasajero |
| `GÉNERO ?M` | Género del pasajero: M = Masculino, F = Femenino |
| `Fecha de nacimiento ?10 ?10 ?90` | Fecha de nacimiento: día, mes, año (10/10/1990) |
| `CENTRO CIUDADANO ?GBR` | Código de país de ciudadanía (GBR = Reino Unido) |
| `CENTRO RESIDENCIAL?GBR` | País de residencia |
| `¿CNTRY DE PROBLEMA DEL DOC?GBR` | País emisor del pasaporte |
| `DOC FECHA CAD ?10 ?10 ?30` | Fecha de vencimiento del pasaporte (10/10/2030) |
| `¿REPARACIÓN?` | Número de reparación para viajeros con control especial (si corresponde) |
| "¿VIAJERO CONOCIDO?" | Indica si el pasajero está en el Programa Viajero Conocido |
| `¿ACCIÓN?.. A/DDR G/OV Q/QUIT E/END H/HLP Z/DEL MU/MD/MT/MB N/NXT` | Acciones disponibles: agregar/modificar, anular, salir, ayudar, eliminar, siguiente documento, etc. |
| `?>0909` | Mensaje de entrada, listo para aceptar su siguiente comando |

#### VSTerm Document Actions / ACTION Codes

| Código de acción | Significado / Función |
|-------------|------------------|
| `A/DDR` | Agregar o modificar un registro de documento. Utilice esto para **agregar un nuevo documento de viaje** o **actualizar la información existente del pasaporte/visado**. |
| `G/OV` | Anular. Permite que el agente **anule una restricción o advertencia del sistema** (se usa con precaución). |
| `Q/SALIR` | Abandonar. Salga de la pantalla actual **sin guardar los cambios**. |
| `E/FIN` | Finalizar sesión. Finalizar la visualización del documento actual o salir al menú anterior. |
| `H/HLP` | Ayuda. Muestra **información de ayuda** para la pantalla o los comandos actuales. |
| `Z/BORR` | Borrar. Elimina el documento o información seleccionada del sistema. |
| ``EN'' | Actualización miscelánea. Funciones de modificación especiales según la configuración del sistema. |
| `MD` | Modificar documento. Editar detalles del documento de viaje seleccionado. |
| `MT` | Modificar viaje. Cambiar los datos relacionados con el viaje del pasajero. |
| `MB` | Modificar reserva. Realizar ajustes al registro de reserva. |
| ``N/NXT'' | Próximo. Pase al **documento siguiente** si existen varios documentos de viaje para este pasajero. |

### We will execute the **`E/END`** action to finish the current document.

## PASSENGER CONTACT TRACING DATA

La pantalla **DATOS DE SEGUIMIENTO DE CONTACTO DE PASAJEROS** dentro del entorno **VSTERM32** es una herramienta diseñada para capturar, verificar y actualizar la información de contacto requerida para un pasajero.

Este formulario aparece cuando el sistema necesita confirmar datos esenciales con fines operativos, regulatorios o de salud pública.

Su diseño estructurado guía al agente a través de cada campo, asegurando que **toda la información obligatoria se recopile de manera precisa y consistente**.

Sesión VSTerm simulada que muestra mensajes del sistema y de inicio de sesión:

![terminal](/imgsvg/011.svg)


| Campo/mensaje | Significado / Descripción |
| --------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `=4BMASCARA` | Comando para mostrar datos de rastreo de contactos de pasajeros. |
| `*** DATOS DE SEGUIMIENTO DE CONTACTO DE PASAJEROS ***` | Encabezado que indica que la sección trata sobre el rastreo de contactos de pasajeros. |
| `01.01 LAWRENCE/MATEO` | Número de pasajero (`01.01`) y nombre completo (`LAWRENCE/MATTHEW`). |
| `DIRECCIÓN DE EE. UU.-/REQUERIDA/D-RECHAZADA/N-NO PROPORCIONADA?:` | Indica si se requiere la dirección de EE. UU. y si se proporcionó (`D` = Rechazada, `N` = No proporcionada). |
| `¿CALLE?` | Dirección postal. Ejemplo: `101 CALLE PRINCIPAL`. |
| `¿CIUDAD?` | Ciudad de residencia. Ejemplo: `NUEVA YORK`. |
| `¿ESTADO?` | Estado o provincia. Ejemplo: `Nueva York`. |
| `¿CÓDIGO POSTAL?` | Código postal o postal. Ejemplo: `10111`. |
| `¿PAÍS?EE.UU. /CTC-RQD/` | País de residencia (EE.UU.) e indicación de que se requiere CTC (Código de rastreo de contactos). |
| `¿TIPO PH1?` | Tipo de teléfono 1 (p. ej., móvil `M`). |
| `¿CÓDIGO CNTRY?` | Código de país para el número de teléfono. Ejemplo: `44`. |
| `¿NBR?` | Número de teléfono. Ejemplo: `222 444 5555`. |
| "¿D/N?" | Indica si el número es nacional (`D`) o no (`N`). |
| ''¿VFY?'' | Estado de verificación del teléfono o datos. Ejemplo: `Y` = Verificado. |
| `¿PH2 TIPO?` | Tipo de teléfono 2 (si está disponible). |
| `¿CORREO ELECTRÓNICO?` | Dirección de correo electrónico principal. |
| `¿CONTINUACIÓN DEL CORREO ELECTRÓNICO?` | Dirección de correo electrónico continuada o alternativa. |
| `¿ACCIÓN?` | Acciones a tomar para estos datos. Las opciones incluyen `U` = Actualizar, `H` = Ayuda, `I` = Ignorar. |

---
---
---

Puede visualizar una reserva mediante:

- Usando el **localizador de PNR**
- Búsqueda por **vuelo y apellido**
- Escanear una **tarjeta de embarque**

Ejemplos de las principales entradas de búsqueda:

> **FBCO4S** – Búsqueda por localizador de PNR

Estas son las cuatro **entradas básicas para memorizar** cuando se utiliza VSTerm para registrarse:

| Entrada | Función |
|-------|---------|
| **PD\*** | Pasaporte y documentos |
| **PBT\*** | equipaje |
| **C.A** | Asientos |
| **A*B** | Completar check-in / Imprimir tarjeta de embarque |

## Important Note on Timatic

Es importante tener en cuenta que **Timatic está desactivado en VSTerm**.

**CBP** y algunos sistemas de viaje electrónicos todavía están verificados en el sistema, como **ESTA**, pero debe tener **mucho cuidado** si no está seguro acerca de los requisitos de visa o entrada para ciertos países, especialmente cuando se trata de **diferentes nacionalidades o pasaportes**.
