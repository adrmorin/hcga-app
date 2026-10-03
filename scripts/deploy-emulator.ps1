# Compila la app React, la sincroniza con Capacitor, genera la APK de depuración,
# la instala en el emulador/dispositivo Android conectado y la abre.
# Uso: npm run emulator   (o: powershell -ExecutionPolicy Bypass -File scripts/deploy-emulator.ps1)

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

$appId = 'com.hcgatrading.app'
$sdk = if ($env:ANDROID_HOME) { $env:ANDROID_HOME } else { Join-Path $env:LOCALAPPDATA 'Android\Sdk' }
$adb = Join-Path $sdk 'platform-tools\adb.exe'
$jbr = 'C:\Program Files\Android\Android Studio\jbr'
if (-not $env:JAVA_HOME -and (Test-Path $jbr)) { $env:JAVA_HOME = $jbr }
$env:ANDROID_HOME = $sdk

function Step($msg) { Write-Host "`n==> $msg" -ForegroundColor Cyan }
function Run($exe, [string[]]$argv) {
  & $exe @argv
  if ($LASTEXITCODE -ne 0) { throw "Falló: $exe $($argv -join ' ') (código $LASTEXITCODE)" }
}

Step 'Comprobando emulador/dispositivo'
$devices = & $adb devices | Select-String -Pattern "`tdevice$"
if (-not $devices) { throw 'No hay ningún emulador o dispositivo conectado. Arranca el emulador desde Android Studio (Device Manager).' }
$serial = ($devices[0].ToString() -split "`t")[0]
Write-Host "Dispositivo: $serial"

Step 'Compilando la web (Vite)'
Run 'npx.cmd' @('vite', 'build')

Step 'Sincronizando con Capacitor'
Run 'npx.cmd' @('cap', 'sync', 'android')

Step 'Generando APK de depuración (Gradle)'
# La salida de Gradle va a un archivo: el daemon de Gradle sigue vivo tras compilar y, si heredara
# la consola, dejaría el comando esperando indefinidamente.
$androidDir = Join-Path $root 'android'
$log = Join-Path $androidDir 'build\deploy-gradle.log'
$errLog = Join-Path $androidDir 'build\deploy-gradle.err.log'
New-Item -ItemType Directory -Force (Split-Path $log) | Out-Null
$gradle = Start-Process -FilePath (Join-Path $androidDir 'gradlew.bat') -ArgumentList 'assembleDebug', '-q' `
  -WorkingDirectory $androidDir -RedirectStandardOutput $log -RedirectStandardError $errLog -NoNewWindow -Wait -PassThru
if ($gradle.ExitCode -ne 0) {
  Get-Content $errLog -Tail 30
  throw "Falló la compilación de Gradle (registros: $log, $errLog)"
}

$apk = Join-Path $root 'android\app\build\outputs\apk\debug\app-debug.apk'

Step 'Instalando en el emulador'
Run $adb @('-s', $serial, 'install', '-r', $apk)

Step 'Abriendo la app'
& $adb -s $serial shell am force-stop $appId | Out-Null
& $adb -s $serial shell monkey -p $appId -c android.intent.category.LAUNCHER 1 | Out-Null
if ($LASTEXITCODE -ne 0) { throw 'No se pudo abrir la app en el emulador' }

Write-Host "`nApp actualizada en $serial" -ForegroundColor Green
