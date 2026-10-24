$ErrorActionPreference = 'Stop'
$compiler = Join-Path $env:WINDIR 'Microsoft.NET\Framework64\v4.0.30319\csc.exe'
$automation = Join-Path $env:WINDIR 'Microsoft.NET\assembly\GAC_MSIL\System.Management.Automation'
$reference = Get-ChildItem -LiteralPath $automation -Filter System.Management.Automation.dll -Recurse | Select-Object -First 1
if (-not $reference) { throw 'Windows PowerShell 5.1 assembly not found.' }
$destination = Join-Path $PSScriptRoot 'TicketClicker.exe'
& $compiler /nologo /target:winexe /platform:x64 /optimize+ "/out:$destination" "/reference:$($reference.FullName)" /reference:System.Windows.Forms.dll "/resource:$PSScriptRoot\ticket-clicker.ps1,ticket-clicker.ps1" (Join-Path $PSScriptRoot 'Launcher.cs')
if ($LASTEXITCODE -ne 0) { throw 'Compilation failed.' }
$process = Start-Process -FilePath $destination -ArgumentList '--self-test' -WindowStyle Hidden -Wait -PassThru
if ($process.ExitCode -ne 0) { throw "EXE self-test failed: $($process.ExitCode)" }
Write-Output "Built and verified: $destination"
