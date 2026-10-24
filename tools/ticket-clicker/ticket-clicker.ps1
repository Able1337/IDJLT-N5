param([switch]$SelfTest)
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing
Add-Type @'
using System;
using System.Runtime.InteropServices;
public static class TicketInput {
 [DllImport("user32.dll")] public static extern short GetAsyncKeyState(int key);
 [DllImport("user32.dll")] public static extern IntPtr GetForegroundWindow();
 [DllImport("user32.dll")] public static extern bool SetCursorPos(int x, int y);
 [DllImport("user32.dll")] public static extern void mouse_event(uint flags,uint x,uint y,uint data,UIntPtr extra);
 [DllImport("user32.dll")] public static extern bool SetProcessDPIAware();
}
'@
[void][TicketInput]::SetProcessDPIAware()
$script:steps = New-Object System.Collections.ArrayList
$script:running = $false
$script:recording = $false
$script:keys = @{}
$script:game = [IntPtr]::Zero
$script:lastCapture = [DateTime]::UtcNow
$script:config = Join-Path $env:LOCALAPPDATA 'TicketClicker\sequence.json'
$form = New-Object Windows.Forms.Form
$form.Text = 'Билеты — автокликер'
$form.ClientSize = New-Object Drawing.Size(620,530)
$form.FormBorderStyle = 'FixedDialog'
$form.MaximizeBox = $false
$form.StartPosition = 'CenterScreen'
function Label($text,$x,$y,$w,$h) {
 $c = New-Object Windows.Forms.Label
 $c.Text=$text; $c.SetBounds($x,$y,$w,$h); $form.Controls.Add($c)
 return $c
}
function Button($text,$x,$y,$w,$action) {
 $c = New-Object Windows.Forms.Button
 $c.Text=$text; $c.SetBounds($x,$y,$w,32); $c.Add_Click($action); $form.Controls.Add($c)
 return $c
}
$null=Label '1. Открой игру в оконном режиме. Нажми «Записать заново».' 15 15 590 25
$null=Label '2. Наводи мышь на каждую кнопку и нажимай F6 (клика не будет).' 15 42 590 25
$null=Label 'Запиши один полный цикл: купить → открыть → закрыть, до исходного экрана.' 15 69 590 36
$null=Label 'Паузы между F6 запоминаются. Заверши запись кнопкой ниже.' 15 105 590 25
$list=New-Object Windows.Forms.ListBox
$list.SetBounds(15,145,590,155); $form.Controls.Add($list)
function Refresh-Steps {
 $list.Items.Clear()
 foreach($s in $script:steps) { [void]$list.Items.Add("Клик: $($s.x), $($s.y) · пауза после: $($s.wait) мс") }
}
function Stop-Run($message) {
 $script:running=$false
 $status.Text=$message
}
$record=Button 'Записать заново' 15 310 180 {
 Stop-Run 'Запись: наведи мышь в игре и нажимай F6. Esc — отменить запись.'
 $script:steps.Clear(); Refresh-Steps
 $script:game=[IntPtr]::Zero; $script:recording=$true
 $script:lastCapture=[DateTime]::UtcNow
}
$finish=Button 'Завершить запись' 205 310 180 {
 $script:recording=$false
 if($script:steps.Count -eq 0) { $status.Text='Сначала добавь точки клавишей F6.'; return }
 [IO.Directory]::CreateDirectory((Split-Path $script:config)) | Out-Null
 ConvertTo-Json -InputObject @($script:steps.ToArray()) | Set-Content -LiteralPath $script:config -Encoding UTF8
 $status.Text='Записано. Верни игру к началу цикла и нажми F8 в окне игры.'
}
$clear=Button 'Удалить последний' 395 310 210 {
 if($script:running) { return }
 if($script:steps.Count) { $script:steps.RemoveAt($script:steps.Count-1); Refresh-Steps }
}
$null=Label 'Количество циклов:' 15 365 145 25
$count=New-Object Windows.Forms.ComboBox
$count.SetBounds(165,360,85,28); $count.DropDownStyle='DropDownList'
$count.Items.AddRange(@('1','20','30','50')); $count.SelectedIndex=1; $form.Controls.Add($count)
$null=Label '1 — пробный запуск. F8 — старт из окна игры. Esc — стоп.' 15 400 590 25
$null=Label 'Считаются циклы кликов, а не подтвержденные покупки.' 15 428 590 25
$status=Label 'Нет настройки. Запиши один цикл. Сообщение «нет билетов» пока не распознается.' 15 465 590 55
if(Test-Path -LiteralPath $script:config) {
 try {
  foreach($s in @(Get-Content -LiteralPath $script:config -Raw | ConvertFrom-Json)) {
   if($null -eq $s.x -or $null -eq $s.y -or $s.wait -lt 500 -or $s.wait -gt 60000) { throw 'Invalid sequence' }
   [void]$script:steps.Add(@{x=[int]$s.x;y=[int]$s.y;wait=[int]$s.wait})
  }
  Refresh-Steps
  $status.Text='Загружена запись. Проверь положение окна игры. Сначала попробуй 1 цикл.'
 } catch { $script:steps.Clear(); $status.Text='Не удалось загрузить запись. Запиши заново.' }
}
function Pressed($key) {
 $down=([TicketInput]::GetAsyncKeyState($key) -band 0x8000) -ne 0
 $was=$script:keys[$key]; $script:keys[$key]=$down
 return ($down -and -not $was)
}
$timer=New-Object Windows.Forms.Timer
$timer.Interval=30
$timer.Add_Tick({
 try {
  $esc=Pressed 27; $f6=Pressed 117; $f8=Pressed 119
  if($esc) { $script:recording=$false; Stop-Run 'Остановлено по Esc. Перед новым стартом верни игру к началу цикла.'; return }
  $foreground=[TicketInput]::GetForegroundWindow()
  if($script:recording -and $f6 -and $foreground -ne $form.Handle) {
   if($script:game -ne [IntPtr]::Zero -and $script:game -ne $foreground) { $status.Text='Записывай точки только в одном окне игры.'; return }
   $script:game=$foreground
   $now=[DateTime]::UtcNow
   if($script:steps.Count) { $script:steps[$script:steps.Count-1].wait=[int][Math]::Min(60000,[Math]::Max(1000,($now-$script:lastCapture).TotalMilliseconds)) }
   $p=[Windows.Forms.Cursor]::Position
   [void]$script:steps.Add(@{x=$p.X;y=$p.Y;wait=2500})
   $script:lastCapture=$now; Refresh-Steps
  }
  if($f8 -and -not $script:running -and -not $script:recording -and $script:steps.Count -and $foreground -ne $form.Handle) {
   $script:game=$foreground; $script:target=[int]$count.SelectedItem
   $script:done=0; $script:index=0; $script:running=$true
   $script:due=[DateTime]::UtcNow.AddSeconds(3)
   $status.Text='Старт через 3 секунды. Esc — остановить.'
  }
  if(-not $script:running) { return }
  if($foreground -ne $script:game) { Stop-Run 'Остановлено: активное окно изменилось. Перед стартом верни исходный экран.'; return }
  if([DateTime]::UtcNow -lt $script:due) { return }
  if($script:done -ge $script:target) { Stop-Run "Готово: $($script:done) циклов. Проверь результат в игре."; return }
  $s=$script:steps[$script:index]
  if(-not [TicketInput]::SetCursorPos($s.x,$s.y)) { throw 'Не удалось переместить курсор.' }
  [TicketInput]::mouse_event(2,0,0,0,[UIntPtr]::Zero)
  [TicketInput]::mouse_event(4,0,0,0,[UIntPtr]::Zero)
  $script:due=[DateTime]::UtcNow.AddMilliseconds($s.wait)
  $script:index++
  if($script:index -ge $script:steps.Count) { $script:index=0; $script:done++ }
  $status.Text="Выполнено циклов: $($script:done) / $($script:target). Esc — стоп."
 } catch { Stop-Run "Ошибка: $($_.Exception.Message)" }
})
$form.Add_FormClosed({$timer.Stop(); $timer.Dispose()})
if($SelfTest) {
 if($count.Items.Count -ne 4) { throw 'Count options missing' }
 $form.CreateControl()
 $form.Dispose()
 Write-Output 'Self-test passed: GUI and native input bindings initialized; no clicks sent.'
 exit 0
}
$timer.Start()
[void]$form.ShowDialog()
