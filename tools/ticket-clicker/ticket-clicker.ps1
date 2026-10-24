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
$script:folder = Join-Path $env:LOCALAPPDATA 'TicketClicker'
[IO.Directory]::CreateDirectory($script:folder) | Out-Null
$script:profiles = @(@{name='Танец карпов'; stock=19; steps=@()}, @{name='Сказки весны'; stock=30; steps=@()}, @{name='Любви письма'; stock=50; steps=@()})
$script:config = Join-Path $script:folder 'profiles.json'
$script:balanceCorners = @()
$script:balanceRect = $null
function Save-Config {
 $script:profiles[$profile.SelectedIndex].steps=@($script:steps.ToArray())
 $script:profiles[$profile.SelectedIndex].stock=[int]$stock.Value
 ConvertTo-Json -InputObject $script:profiles -Depth 8 | Set-Content -LiteralPath $script:config -Encoding UTF8
}
function Capture-Balance($suffix) {
 if($null -eq $script:balanceRect) { return }
 $r=$script:balanceRect
 $bitmap=New-Object Drawing.Bitmap($r.Width,$r.Height)
 $graphics=[Drawing.Graphics]::FromImage($bitmap)
 try {
  $graphics.CopyFromScreen($r.Location,[Drawing.Point]::Empty,$r.Size)
  $bitmap.Save((Join-Path $script:session ($suffix+'.png')),[Drawing.Imaging.ImageFormat]::Png)
 } finally { $graphics.Dispose(); $bitmap.Dispose() }
}

$form = New-Object Windows.Forms.Form
$form.Text = 'Билеты — автокликер'
$form.ClientSize = New-Object Drawing.Size(620,710)
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
 if($script:running -and $script:session) {
  if([TicketInput]::GetForegroundWindow() -eq $script:game) { Capture-Balance 'balance-stop' }
  @{stopped=[DateTime]::Now.ToString('o');reason=$message; batch=$script:batch; completedCycles=$script:done} | ConvertTo-Json | Set-Content (Join-Path $script:session 'stop.json') -Encoding UTF8
 }
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
 Save-Config
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
$null=Label 'Вид билета:' 15 525 100 25
$profile=New-Object Windows.Forms.ComboBox
$profile.SetBounds(120,520,240,28); $profile.DropDownStyle='DropDownList'
$profile.Items.AddRange(@('Танец карпов','Сказки весны','Любви письма'))
$form.Controls.Add($profile)
$stock=New-Object Windows.Forms.NumericUpDown
$stock.SetBounds(470,520,100,28); $stock.Minimum=0; $stock.Maximum=1000
$form.Controls.Add($stock)
$null=Label 'Осталось:' 380 525 80 25
$all=New-Object Windows.Forms.CheckBox
$all.Text='Скупить все три вида по указанным остаткам'; $all.SetBounds(15,555,570,28)
$form.Controls.Add($all)
$null=Label 'F7 дважды: углы области баланса (верхний левый / нижний правый).' 15 590 590 25
$null=Label 'Баланс в начале (необязательно):' 15 625 270 25
$balance=New-Object Windows.Forms.TextBox
$balance.SetBounds(290,620,180,28); $form.Controls.Add($balance)
$null=Label 'Снимки баланса до/после сохраняются локально. Esc — стоп.' 15 665 590 30
if(Test-Path -LiteralPath $script:config) {
 try {
  $loaded=@(Get-Content -LiteralPath $script:config -Raw | ConvertFrom-Json)
  if($loaded.Count -ne 3) { throw 'Invalid profiles' }
  for($i=0;$i -lt 3;$i++) {
   if($loaded[$i].stock -lt 0 -or $loaded[$i].stock -gt 1000) { throw 'Invalid stock' }
   $validated=@()
   foreach($s in $loaded[$i].steps) {
    if($null -eq $s.x -or $null -eq $s.y -or $s.wait -lt 500 -or $s.wait -gt 60000) { throw 'Invalid step' }
    $validated+=@{x=[int]$s.x;y=[int]$s.y;wait=[int]$s.wait}
   }
   $script:profiles[$i].steps=$validated
   $script:profiles[$i].stock=[int]$loaded[$i].stock
  }
 } catch { $status.Text='Не удалось прочитать профили. Настрой запись заново.' }
}
$script:activeProfile=0
$profile.Add_SelectedIndexChanged({
 if($script:running -or $script:recording) {
  if($profile.SelectedIndex -ne $script:activeProfile) { $profile.SelectedIndex=$script:activeProfile }
  return
 }
 $script:activeProfile=$profile.SelectedIndex
 $script:steps.Clear()
 foreach($s in $script:profiles[$profile.SelectedIndex].steps) { [void]$script:steps.Add($s) }
 $stock.Value=$script:profiles[$profile.SelectedIndex].stock
 Refresh-Steps
})
$profile.SelectedIndex=0
$stock.Add_ValueChanged({
 if(-not $script:running) { $script:profiles[$script:activeProfile].stock=[int]$stock.Value }
})
function Advance-Batch {
 if($script:done -lt $script:target) { return $true }
 $script:batch++
 if($script:batch -ge $script:queue.Count) { return $false }
 $script:runSteps=$script:queue[$script:batch].steps
 $script:target=$script:queue[$script:batch].target
 $script:done=0; $script:index=0
 return $true
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
  $esc=Pressed 27; $f6=Pressed 117; $f8=Pressed 119; $f7=Pressed 118
  if($esc) { $script:recording=$false; Stop-Run 'Остановлено по Esc. Перед новым стартом верни игру к началу цикла.'; return }
  $foreground=[TicketInput]::GetForegroundWindow()
  if($f7 -and -not $script:running -and $foreground -ne $form.Handle) {
   $script:balanceCorners+= [Windows.Forms.Cursor]::Position
   if($script:balanceCorners.Count -eq 2) {
    $a=$script:balanceCorners[0]; $b=$script:balanceCorners[1]
    $script:balanceCorners=@()
    if($b.X -le $a.X -or $b.Y -le $a.Y) { $status.Text='Неверные углы баланса. Повтори F7 слева сверху, затем справа снизу.'; return }
    $script:balanceRect=New-Object Drawing.Rectangle($a.X,$a.Y,($b.X-$a.X),($b.Y-$a.Y))
    $status.Text='Область баланса выбрана. Снимок будет сохранен при старте и остановке.'
   } else { $status.Text='Теперь наведи на нижний правый угол баланса и нажми F7.' }
  }
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
   Save-Config
   $script:queue=New-Object System.Collections.ArrayList
   if($all.Checked) {
    for($i=0;$i -lt 3;$i++) {
     $p=$script:profiles[$i]
     if($p.stock -gt 0 -and $p.steps.Count -eq 0) { $status.Text='Сначала запиши цикл для каждого вида с ненулевым остатком.'; return }
     if($p.stock -gt 0) { [void]$script:queue.Add(@{profile=$i;target=$p.stock;steps=$p.steps}) }
    }
   } else { [void]$script:queue.Add(@{profile=$profile.SelectedIndex;target=[int]$count.SelectedItem;steps=@($script:steps.ToArray())}) }
   if($script:queue.Count -eq 0) { $status.Text='Все остатки равны нулю.'; return }
   $script:batch=0; $script:runSteps=$script:queue[0].steps
   $script:game=$foreground; $script:target=$script:queue[0].target
   $script:session=Join-Path $script:folder ('runs\'+[DateTime]::Now.ToString('yyyyMMdd-HHmmss-fff'))
   [IO.Directory]::CreateDirectory($script:session) | Out-Null
   @{started=[DateTime]::Now.ToString('o'); balanceEntered=$balance.Text; queue=@($script:queue.ToArray())} | ConvertTo-Json -Depth 8 | Set-Content (Join-Path $script:session 'start.json') -Encoding UTF8
   Capture-Balance 'balance-start'
   $script:done=0; $script:index=0; $script:running=$true
   $script:due=[DateTime]::UtcNow.AddSeconds(3)
   $status.Text='Старт через 3 секунды. Esc — остановить.'
  }
  if(-not $script:running) { return }
  if($foreground -ne $script:game) { Stop-Run 'Остановлено: активное окно изменилось. Перед стартом верни исходный экран.'; return }
  if([DateTime]::UtcNow -lt $script:due) { return }
  if(-not (Advance-Batch)) { Stop-Run 'Все заданные остатки обработаны. Проверь результат в игре.'; return }
  $s=$script:runSteps[$script:index]
  if(-not [TicketInput]::SetCursorPos($s.x,$s.y)) { throw 'Не удалось переместить курсор.' }
  [TicketInput]::mouse_event(2,0,0,0,[UIntPtr]::Zero)
  [TicketInput]::mouse_event(4,0,0,0,[UIntPtr]::Zero)
  $script:due=[DateTime]::UtcNow.AddMilliseconds($s.wait)
  $script:index++
  if($script:index -ge $script:runSteps.Count) { $script:index=0; $script:done++ }
  $status.Text="Вид $($script:batch+1)/$($script:queue.Count). Выполнено циклов: $($script:done) / $($script:target). Esc — стоп."
 } catch { Stop-Run "Ошибка: $($_.Exception.Message)" }
})
$form.Add_FormClosed({Stop-Run 'Окно программы закрыто.'; $timer.Stop(); $timer.Dispose()})
if($SelfTest) {
 if($profile.Items.Count -ne 3 -or $script:profiles[0].stock -lt 0) { throw 'Profiles missing' }
 if($count.Items.Count -ne 4) { throw 'Count options missing' }
 $script:queue=@(@{target=19;steps=@(@{x=1;y=2;wait=2500})},@{target=30;steps=@(@{x=3;y=4;wait=2500})},@{target=50;steps=@(@{x=5;y=6;wait=2500})})
 $script:batch=0; $script:target=19; $script:done=18
 if(-not (Advance-Batch) -or $script:batch -ne 0) { throw 'Advanced too early' }
 $script:done=19
 if(-not (Advance-Batch) -or $script:target -ne 30 -or $script:done -ne 0 -or $script:runSteps[0].x -ne 3) { throw 'Second profile transition failed' }
 $script:done=30
 if(-not (Advance-Batch) -or $script:target -ne 50) { throw 'Third profile transition failed' }
 $script:done=50
 if(Advance-Batch) { throw 'Queue did not stop' }
 $form.CreateControl()
 $form.Dispose()
 Write-Output 'Self-test passed: GUI and native input bindings initialized; no clicks sent.'
 exit 0
}
$timer.Start()
[void]$form.ShowDialog()
