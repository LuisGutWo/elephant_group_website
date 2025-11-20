# ⚡ INICIO RÁPIDO - 3 Pasos

## 🎯 Tu código YA funciona. Solo necesitas configurar TU número.

---

## Paso 1️⃣: Abre el archivo `.env.local`

```bash
code .env.local
```

---

## Paso 2️⃣: Cambia esta línea

**BUSCA:**
```env
NEXT_PUBLIC_WHATSAPP_NUMBER=56920390272
```

**CAMBIA POR:**
```env
NEXT_PUBLIC_WHATSAPP_NUMBER=TU_NUMERO_AQUI
```

### 📝 Ejemplos por país:

| País | Código | Ejemplo Completo |
|------|--------|------------------|
| 🇨🇱 Chile | 56 | `56912345678` |
| 🇲🇽 México | 52 | `5215512345678` |
| 🇦🇷 Argentina | 54 | `5491112345678` |
| 🇨🇴 Colombia | 57 | `573001234567` |
| 🇵🇪 Perú | 51 | `51987654321` |
| 🇪🇸 España | 34 | `34612345678` |
| 🇺🇸 USA | 1 | `14155551234` |

### ⚠️ IMPORTANTE:
- ❌ NO uses el símbolo `+`
- ❌ NO uses espacios
- ❌ NO uses guiones
- ❌ NO uses paréntesis

### ✅ Correcto:
```env
NEXT_PUBLIC_WHATSAPP_NUMBER=56912345678
```

### ❌ Incorrecto:
```env
NEXT_PUBLIC_WHATSAPP_NUMBER=+56 9 1234 5678
NEXT_PUBLIC_WHATSAPP_NUMBER=+56-9-1234-5678
NEXT_PUBLIC_WHATSAPP_NUMBER=(+56) 9 1234 5678
```

---

## Paso 3️⃣: Reinicia el servidor

### Si el servidor está corriendo:

1. Presiona `Ctrl + C` para detenerlo
2. Ejecuta:

```bash
npm run dev
```

### Si el servidor NO está corriendo:

Simplemente ejecuta:

```bash
npm run dev
```

---

## 🧪 Prueba que funciona

1. **Abre tu navegador:** `http://localhost:3000/dark/page-contact`

2. **Llena el formulario** con cualquier dato de prueba

3. **Haz clic en el botón verde:** "Enviar por WhatsApp"

4. **Verifica:**
   - ✅ Aparece mensaje: "¡Gracias por contactarnos! Serás redirigido a WhatsApp..."
   - ✅ Se abre WhatsApp después de 1 segundo
   - ✅ El número que aparece es **TU número** (no el 56920390272)
   - ✅ El mensaje tiene todos los datos del formulario

---

## 🎉 ¡Listo!

Si seguiste estos 3 pasos, tu formulario ahora envía mensajes directamente a **TU WhatsApp**.

---

## ❓ ¿Algo no funcionó?

### El botón no hace nada
→ ¿Reiniciaste el servidor después de editar `.env.local`?

### Se abre otro número
→ ¿Editaste el archivo `.env.local` (no el `.env.local.example`)?

### WhatsApp no se abre
→ ¿Tienes WhatsApp instalado en tu dispositivo?

### Más ayuda
→ Lee **`COMO_VER_LOS_CAMBIOS.md`** para solución de problemas detallada

---

## 📚 Documentos Útiles

| Documento | Contenido |
|-----------|-----------|
| `SOLUCION.md` | Explicación completa del problema y solución |
| `COMO_VER_LOS_CAMBIOS.md` | Guía de troubleshooting detallada |
| `README.md` | Documentación completa del proyecto |
| `WHATSAPP_QUICK_START.md` | Configuración de WhatsApp |

---

**¡Éxito!** 🚀
