# Script para iniciar servidor de desarrollo
# Inicia el servidor de email y Next.js en paralelo

Write-Host "🚀 Iniciando servidores de desarrollo..." -ForegroundColor Green

# Iniciar servidor de email en background
$emailJob = Start-Job -ScriptBlock {
    Set-Location $using:PWD
    node dev-email-server.js
}

Write-Host "📧 Servidor de email iniciado (Job ID: $($emailJob.Id))" -ForegroundColor Cyan

# Esperar un momento
Start-Sleep -Seconds 2

# Iniciar Next.js (foreground)
Write-Host "⚡ Iniciando Next.js..." -ForegroundColor Yellow
npm run dev:next

# Cleanup cuando termine
Stop-Job $emailJob
Remove-Job $emailJob
