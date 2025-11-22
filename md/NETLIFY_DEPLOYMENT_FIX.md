# Correcciones de Despliegue en Netlify

## Problemas Solucionados

### 1. ⚠️ Configuración Duplicada en next.config.mjs

**Problema**: Configuración duplicada de `images` causaba conflictos
**Solución**: Eliminada duplicación y simplificada configuración

### 2. 🚫 API Routes con Static Export

**Problema**: Next.js no soporta API routes con exportación estática
**Solución**: API routes movidos a `/api-backup/` para preservar código

- `email-status.js` → Respaldo temporal
- `send-contact.js` → Respaldo temporal
- `send-simple-contact.js` → Respaldo temporal
- `test-status.js` → Respaldo temporal

### 3. 🔧 Configuración de Netlify Optimizada

**Problema**: Redirects complejos innecesarios
**Solución**: Configuración simplificada en `netlify.toml`

### 4. ❌ Error de Parser ESLint

**Problema**: "Failed to load parser '@typescript-eslint/parser'"
**Solución**: Instalado `@typescript-eslint/parser` y `@typescript-eslint/eslint-plugin`

### 5. 🚫 Error ESM "Cannot use import statement outside a module"

**Problema**: Dependencias ESM-only causaban SyntaxError en build de Netlify
**Solución**: Configurado `transpilePackages` en next.config.mjs para:

- `framer-motion` (v12.15.0)
- `gsap` (v3.13.0)
- `react-scroll-parallax` (v3.4.5)
- `@nextui-org/*` (todos los componentes NextUI)
- `react-icons` (v5.5.0)

## Estado Actual ✅

- ✅ Build local exitoso sin errores críticos
- ✅ Static export funcionando correctamente
- ✅ 13 páginas generadas estáticamente
- ✅ Parser de ESLint instalado y configurado
- ✅ Dependencias ESM transpiladas correctamente
- ✅ Configuración de Netlify optimizada
- ✅ Node.js 18 especificado correctamente

## Archivos Modificados

1. `next.config.mjs` - Configuración simplificada + transpilePackages
2. `netlify.toml` - Configuración optimizada
3. `eslint.config.mjs` - Configuración de parser TypeScript
4. `package.json` - Dependencias de ESLint añadidas
5. `src/pages/api/` - Directorio movido a backup

## Próximos Pasos

1. Confirmar despliegue exitoso en Netlify
2. Implementar API endpoints usando Netlify Functions si es necesario
3. Restaurar funcionalidad de contacto con alternativas compatibles

## Notas Importantes

- El sitio ahora es completamente estático
- Las funciones de contacto necesitarán implementación alternativa
- Todos los estilos y componentes mantienen funcionalidad completa
